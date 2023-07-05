const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const { SendMail } = require("../service/sendMail");
const {
  Contact,
  ContactType,
  Event,
  Invoice,
  Organization,
  FinanceCategory,
  Product,
  Income,
  Authenticate,
} = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const { invitationEmailTemplate, invoiceEmailTemplate } = require("../constants/emailTemplates");
const mongoose = require("mongoose");
const moment = require("moment");
const User = require("../models/User");
/**
 *
 * @desc Create Event Controller
 * @route POST /api/event/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.replyToEvent = asyncHandler(async (req, res) => {
  try {
    const { contactIdArr, paid, eventId, status } = req.body;
    const curEvent = await Event.findById(eventId);
    const userId = curEvent.userId;
    let tmpContactArr = [];
    for (let i = 0; i < contactIdArr.length; i++) {
      let guestIndex = await curEvent.guests.findIndex(
        (guest, index) => guest.contact == contactIdArr[i]
      );
      if (guestIndex > -1) {
        if (status) {
          curEvent.guests[guestIndex].status = status;
        }
        if (paid != undefined) {
          curEvent.guests[guestIndex].paid = paid;
        }
      } else {
        let existedContact = await Contact.findById(contactIdArr[i]);
        if (existedContact) {
          curEvent.guests.push({
            contact: existedContact._id,
            status: status ? status : "noreply",
            paid: paid ? paid : "notpaid",
          });
        }
      }
    }
    await curEvent.save();
    return res.status(200).json({ data: curEvent, contactIds: tmpContactArr });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

exports.eventCreate = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { organization } = req.headers;

    var url = "";
    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    }
    let payload = req.body;
    payload.eventBanner = url;
    payload = { ...payload, creatorType: user.userType, organizationId: null };
    if (organization) {
      payload = {
        ...payload,
        organizationId: mongoose.Types.ObjectId(organization),
        creatorType: user.organizations.find((c) => c.organizationId.toString() === organization)
          .userType,
      };
    }

    if (payload?.progressionCategory) {
      let tmp = payload?.progressionCategory.split(",");
      payload = { ...payload, progressionCategory: tmp };
    }
    const newEvent = new Event({ ...payload, userId: mongoose.Types.ObjectId(user._id) });
    await newEvent.save();
    return res.json(newEvent);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.eventUpdate = asyncHandler(async (req, res) => {
  try {
    var url = "";
    let file = req.file;
    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    } else if (req.body.eventBanner) {
      url = req.body.eventBanner;
    }
    let eventData = req.body;
    eventData = { ...eventData, eventBanner: url };
    if (eventData?.progressionCategory) {
      let tmp = eventData?.progressionCategory.split(",");
      eventData = { ...eventData, progressionCategory: tmp };
    }

    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    eventData = { ...eventData, guests: event.guests };
    Event.findByIdAndUpdate({ _id: eventId }, { $set: eventData }).exec(async (err, data) => {
      if (err) {
        res.send({
          msg: err,
          success: false,
        });
      } else {
        return res.send({
          msg: "Event updated succesfully",
          success: true,
        });
      }
    });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});
/**
 * @desc Get all events of user
 * @route GET api/event/all/:userId
 * @returns
 */
exports.getEvents = asyncHandler(async (req, res) => {
  const user = req.user;
  const { organization } = req.headers;
  try {
    let q = { userId: mongoose.Types.ObjectId(user._id), organizationId: null };
    if (organization) {
      q = { ...q, organizationId: mongoose.Types.ObjectId(organization) };
    }
    const events = await Event.find(q);
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc Get information of a event
 * @route GET api/event/info/:eventId
 * @return
 */
exports.getEventInfo = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId)
      .populate({
        path: "guests.contact",
        model: Contact,
      })
      .populate({ path: "guests.invoiceId", model: Invoice })
      .populate({ path: "productId", model: Product });

    if (!event) {
      res.status(404).json({ msg: "Not Found" });
    } else {
      res.status(200).json(event);
    }
  } catch (err) {
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});

/**
 * @desc Delete a Event by event Id
 * @route GET api/event/info/:eventId
 * @return
 */
exports.deleteEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  try {
    await Event.findByIdAndDelete(eventId);
    return res.status(200).json({ msg: "Successfully deleted" });
  } catch (err) {
    return res.status(404).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Add new Guests
exports.addNewGuests = asyncHandler(async (req, res) => {
  const { _id, data, sendEmailChecked } = req.body;
  const user = req.user;
  try {
    const event = await Event.findById(_id);

    const remainingTickets = event.ticketAvailabeQuantity - data.length - event.guests.length;
    let status = "";
    if (!event.checkoutType || event.checkoutType === "none") {
      status = "noreply";
    }
    if (remainingTickets < 0) {
      // throw Error("Not enough tickets");
      res.status(404).json({ msg: "Not enough tickets" });
    } else {
      let guestContactIdArr = [],
        // guestNameList = [],
        pwdUrl = "";
      if (event?.guests?.length > 0) {
        event.guests.map((item, index) => {
          if (item.contact) {
            guestContactIdArr.push(item.contact.toString());
          } else return;
        });
      }
      const isNewGuest = (guest) => {
        if (
          guestContactIdArr?.length > 0 &&
          guest?.id &&
          guestContactIdArr.indexOf(guest.id) > -1
        ) {
          return guestContactIdArr.indexOf(guest.id);
        } else {
          return -1;
        }
      };
      const totalContacts = await Contact.find({ userId: user._id });
      for (let i = 0; i < data.length; i++) {
        if (data[i].email == "" || data[i].email == null) {
          res.status(500).json({ msg: "Not Email given" });
        }
        let guestIndex = isNewGuest(data[i]);
        if (guestIndex === -1) {
          const existedContact = totalContacts.find((item) => (item._id = data[i].id));
          if (existedContact) {
            event.guests.unshift({ ...data[i], contact: existedContact._id });
          } else {
            const newContact = new Contact({
              userId: req.user._id,
              email: data[i].email,
              fullName: "Unknown",
            });
            await newContact.save();

            event.guests.unshift({ contact: newContact._id });
          }
        }
        let guestInfo = {
          contactId: data[i].id,
          contactEmail: data[i].email,
          eventId: event._id,
        };
        let eventId = btoa(JSON.stringify(guestInfo));
        pwdUrl = `https://me.mymanager.com/event/${eventId}`;

        const emailBody = invitationEmailTemplate(pwdUrl);
        if (sendEmailChecked) {
          SendMail({
            recipient: data[i].email,
            from: "admin@mymanager.com",
            replyTo: "admin@mymanager.com",
            subject: event.title,
            body: emailBody,
          });
        }
      }
      await event.save().then(res.status(200).json({ data: event, msg: "Successfully added" }));
    }
  } catch (err) {
    return res.status(404).json({
      errors: { common: { msg: err.message } },
    });
  }
});

// Delete Guests
exports.deleteGuests = asyncHandler(async (req, res) => {
  const { eventId, guestId, isInAttendance } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (event) {
      let tmp = [];
      for (let i = 0; i < event.guests.length; i++) {
        if (event.guests[i]._id.toString() != guestId) {
          tmp.push(event.guests[i]);
        } else {
          if (isInAttendance == "true") {
            tmp.push({ ...event.guests[i], status: "maybe" });
          }
        }
      }
      event.guests = tmp;
      await event.save();
      return res.status(200).json({ data: event, msg: "Successfully deleted" });
    } else {
      return res.status(200).json({ msg: "Not Found Current Event" });
    }
  } catch (err) {
    return res.status(404).json({
      errors: { common: { msg: err.message } },
    });
  }
});
exports.deleteGuestsBulk = asyncHandler(async (req, res) => {
  const { eventId, guestIdArr, isInAttendance } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (event) {
      let tmp = [];
      for (let i = 0; i < event.guests.length; i++) {
        if (!guestIdArr.includes(event.guests[i]._id.toString())) {
          tmp.push(event.guests[i]);
        } else {
          if (isInAttendance) {
            tmp.push({ ...event.guests[i], status: "maybe" });
          }
        }
      }
      event.guests = tmp;
      await event.save();
      return res.status(200).json({ data: event, msg: "Successfully deleted" });
    } else {
      return res.status(200).json({ msg: "Not Found Current Event" });
    }
  } catch (err) {
    return res.status(404).json({
      errors: { common: { msg: err.message } },
    });
  }
});
exports.addAndUpdateGuests = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { guestData, isNewEmployee } = req.body;
  try {
    const event = await Event.findById(id);
    if (isNewEmployee) {
      event.guests.push({
        name: guestData.name,
        phone: guestData.phone,
        email: guestData.email,
        status: guestData.status,
      });
    } else {
      event.guests = event.guests.map((item, index) => {
        if (item.name == guestData.name || item.email == guestData.email) {
          item.name = guestData.name;
          item.email = guestData.email;
          item.phone = guestData.phone;
          item.status = guestData.status;
          return item;
        } else return item;
      });
    }
    event.save().then(res.status(200).json({ data: event, msg: "Successfully accepted" }));
  } catch (err) {
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.addPayment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { contactId, email, payment } = req.body;
    const { organization } = req.headers;

    //create invoice
    const event = await Event.findById(mongoose.Types.ObjectId(id))
    .populate({ path: "userId", model: Authenticate })
    .populate({ path: "productId", model: Product });
    let q = { userId: event.userId._id,organizationId: organization? mongoose.Types.ObjectId(organization):null };
    

    const lastInvoice = await Invoice.findOne(q, {}, { sort: { createdAt: -1 } });
    let org = null;
    if (organization) {
      org = await Organization.findById(mongoose.Types.ObjectId(organization));
    }
    let no = 1;
    if (lastInvoice) {
      no = (Number(lastInvoice.no) + 1).toString();
    }

    const items = [
      {
        name:
          event.checkoutType === "product"
            ? `Product ${event.productId.name}`
            : `Ticket ${event.ticketName}`,
        description:
          event.checkoutType === "product" ? `${event?.productId?.description}` : `${event.title}`,
        rate: event.ticketPrice,
        quantity: 1,
      },
    ];
    let fcQ = {};
    if (organization) {
      fcQ = {
        $or: [
          {
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
          {
            organizationId: mongoose.Types.ObjectId(organization),
            isDeleted: false,
            userId: mongoose.Types.ObjectId(_id),
          },
        ],
      };
    } else {
      fcQ = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(_id),
            organizationId: null,
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    }

    const financeCats = await FinanceCategory.find(fcQ)
    let fc = financeCats.find(x=>x.type==='event')
    let invoicePayload = {
      userId: event.userId._id,
      customerId: mongoose.Types.ObjectId(contactId),
      itemType: fc._id,
      no: no,
      internalPaymentNote: "Generate automatically on purchase of event ticket",
      companyName: organization ? org.name : null,
      date: new Date(),
      dueDate: new Date().setMinutes(new Date().getMinutes() + 1),
      items: items,
      salesperson: event.userId.fullName,
      totalAmount: event.ticketPrice,
      paidAmount: event.ticketPrice,
      status: "PAID",
      payments: [{ ...payment }],
      payNow: 0,
      logoUrl: organization ? org.logoLink : null,
    };
    if (organization) {
      invoicePayload = { ...invoicePayload, organizationId: mongoose.Types.ObjectId(organization) };
    }
    const invoiceCreated = await Invoice.create(invoicePayload);
    const emailBody = invoiceEmailTemplate({
      invoiceNo: invoicePayload.no,
      dueDate: moment(invoicePayload.dueDate).format("MM/DD/YYYY"),
      pay: invoicePayload.payNow,
      message: "Thanks for shopping with us! here is your invoice",
      address: "",
      email: "admin@mymanager.com",
      logo: organization ? org.logoLink : null,
      invoiceId: invoiceCreated._id.toString(),
      invoiceLink: organization
        ? `https://${org.path}.mymanager.com/invoice-preview/${invoiceCreated._id.toString()}`
        : `https://me.mymanager.com/invoice-preview/${invoiceCreated._id.toString()}`,
    });
    //send invoice
    SendMail({
      from: `via MyManager <hello@mymanager.com>`,
      recipient: email,
      subject: `Invoice #${invoicePayload.no} | ${org?.name || ""} `,
      body: emailBody,
      replyTo: "",
    });
    //add to income
    
    let incomePayload = {
      userId: invoiceCreated.userId,
      clientId: invoiceCreated.customerId,
      name: "from invoice #" + invoiceCreated.no,
      amount: invoiceCreated.payments[invoiceCreated.payments.length - 1].amount,
      categoryId: fc._id || null,
      note: "from invoice #" + invoiceCreated.no,
      invoiceId: invoiceCreated._id,
    };
    if (organization) {
      incomePayload = { ...incomePayload, organizationId: mongoose.Types.ObjectId(organization) };
    }
    await Income.create(incomePayload);
    await Event.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id), "guests.contact": mongoose.Types.ObjectId(contactId) },
      {
        $set: {
          "guests.$.invoiceId": invoiceCreated._id,
          ticketAvailableQuantity: event.ticketAvailableQuantity - 1,
        },
      }
    );
    return res.status(200).json({ message: "payment updated successfully" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.addBulkPayment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let { contacts, payment } = req.body;
    const { organization } = req.headers;
    const event = await Event.findById(mongoose.Types.ObjectId(id))
      .populate({ path: "userId", model: Authenticate })
      .populate({ path: "productId", model: Product });
    contacts = contacts.map((x) => mongoose.Types.ObjectId(x));

    //create invoice
    let q = {
      userId: event.userId,
    };
    if (organization) {
      q = { ...q, organizationId: mongoose.Types.ObjectId(organization) };
    }
    const lastInvoice = await Invoice.findOne(q, {}, { sort: { createdAt: -1 } });
    let org = null;
    if (organization) {
      org = await Organization.findById(mongoose.Types.ObjectId(organization));
    }
    let no = 1;
    if (lastInvoice) {
      no = (Number(lastInvoice.no) + 1).toString();
    }
    for (let index = 0; index < contacts.length; index++) {
      const contact = contacts[index];
      const buyer = await Contact.findById(contact);
      const items = [
        {
          name:
            event.checkoutType === "product"
              ? `Product ${event?.productId?.name}`
              : `Ticket ${event.ticketName}`,
          description:
            event.checkoutType === "product"
              ? `${event?.productId?.description}`
              : `${event.title}`,
          rate: event.ticketPrice,
          quantity: 1,
        },
      ];
      let invoicePayload = {
        userId: event.userId,
        customerId: buyer._id,
        itemType: "event",
        no: no,
        internalPaymentNote: "Generate automatically on bulk payment of event ticket",
        companyName: organization ? org.name : null,
        date: new Date(),
        dueDate: new Date().setMinutes(new Date().getMinutes() + 1),
        //userAddress: { ...buyer.address },
        items: items,
        totalAmount: event.ticketPrice,
        paidAmount: event.ticketPrice,
        status: "PAID",
        payments: [{ ...payment, amount: event.ticketPrice }],
        payNow: 0,
        salesperson: event?.userId?.fullName,
        logoUrl: organization ? org.logoLink : null,
        organization: null,
      };
      if (organization) {
        invoicePayload = {
          ...invoicePayload,
          organizationId: mongoose.Types.ObjectId(organization),
        };
      }

      const invoiceCreated = await Invoice.create(invoicePayload);
      const emailBody = invoiceEmailTemplate({
        invoiceNo: invoicePayload.no,
        dueDate: moment(invoicePayload.dueDate).format("MM/DD/YYYY"),
        pay: invoicePayload.payNow,
        message: "Thanks for shopping with us! here is your invoice",
        address: "",
        email: "admin@mymanager.com",
        logo: organization ? org.logoLink : null,
        invoiceId: invoiceCreated._id.toString(),
        invoiceLink: organization
          ? `https://${org.path}.mymanager.com/invoice-preview/${invoiceCreated._id.toString()}`
          : `https://me.mymanager.com/invoice-preview/${invoiceCreated._id.toString()}`,
      });
      //update guest with invoice
      await Event.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id), "guests.contact": buyer._id },
        {
          $set: {
            "guests.$.invoiceId": invoiceCreated._id,
            ticketAvailableQuantity: event.ticketAvailableQuantity - 1,
          },
        }
      );
      //send invoice
      SendMail({
        from: `via MyManager <hello@mymanager.com>`,
        recipient: buyer.email,
        subject: `Invoice #${invoicePayload.no} | ${org?.name || ""} `,
        body: emailBody,
        replyTo: "",
      });

      //add income
      const financeCat = await FinanceCategory.findOne({ itemType: invoiceCreated.itemType });
      let incomePayload = {
        userId: invoiceCreated.userId,
        clientId: invoiceCreated.customerId,
        name: "",
        amount: invoiceCreated.payments[invoiceCreated.payments.length - 1].amount,
        categoryId: financeCat._id || null,
        note: "from invoice #" + invoiceCreated.no,
        invoiceId: invoiceCreated._id,
        organization: null,
      };
      if (organization) {
        incomePayload = { ...incomePayload, organizationId: mongoose.Types.ObjectId(organization) };
      }
      await Income.create(incomePayload);
      no++;
    }

    return res.status(200).json({ message: "payment updated successfully" });
  } catch (error) {
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.sendBulkInvoice = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let { contacts } = req.body;
    const { organization } = req.headers;
    const event = await Event.findById(mongoose.Types.ObjectId(id))
      .populate({ path: "userId", model: Authenticate })
      .populate({ path: "productId", model: Product });
    contacts = contacts.map((x) => mongoose.Types.ObjectId(x));

    //create invoice
    let q = {
      userId: event.userId,
    };
    if (organization) {
      q = { ...q, organizationId: mongoose.Types.ObjectId(organization) };
    }
    const lastInvoice = await Invoice.findOne(q, {}, { sort: { createdAt: -1 } });
    let org = null;
    if (organization) {
      org = await Organization.findById(mongoose.Types.ObjectId(organization));
    }
    let no = 1;
    if (lastInvoice) {
      no = (Number(lastInvoice.no) + 1).toString();
    }
    let invoiceCreated;
    for (let index = 0; index < contacts.length; index++) {
      const contact = contacts[index];
      let guest = event.guests.find((x) => x.contact.toString() === contact.toString());
      const buyer = await Contact.findById(contact);
      if (guest.invoiceId) {
        invoiceCreated = await Invoice.findById(guest.invoiceId);
      } else {
        const items = [
          {
            name:
              event.checkoutType === "product"
                ? `Product ${event?.productId?.name}`
                : `Ticket ${event.ticketName}`,
            description:
              event.checkoutType === "product"
                ? `${event?.productId?.description}`
                : `${event.title}`,
            rate: event.ticketPrice,
            quantity: 1,
          },
        ];
        let invoicePayload = {
          userId: event.userId,
          customerId: buyer._id,
          itemType: "event",
          no: no,
          internalPaymentNote: "Generate automatically on bulk payment of event ticket",
          companyName: organization ? org.name : null,
          date: new Date(),
          dueDate: new Date().setDate(new Date().getDate() + 1),
          //userAddress: { ...buyer.address },
          items: items,
          totalAmount: event.ticketPrice,
          paidAmount: 0,
          status: "SENT",
          payments: [],
          payNow: event.ticketPrice,
          salesperson: event?.userId?.fullName,
          logoUrl: organization ? org.logoLink : null,
          organization: null,
        };
        if (organization) {
          invoicePayload = {
            ...invoicePayload,
            organizationId: mongoose.Types.ObjectId(organization),
          };
        }

        invoiceCreated = await Invoice.create(invoicePayload);
      }

      const emailBody = invoiceEmailTemplate({
        invoiceNo: invoiceCreated.no,
        dueDate: moment(invoiceCreated.dueDate).format("MM/DD/YYYY"),
        pay: invoiceCreated.payNow,
        message: "Thanks for shopping with us! here is your invoice",
        address: "",
        email: "admin@mymanager.com",
        logo: organization ? org.logoLink : null,
        invoiceId: invoiceCreated._id.toString(),
        invoiceLink: organization
          ? `https://${org.path}.mymanager.com/invoice-preview/${invoiceCreated._id.toString()}`
          : `https://me.mymanager.com/invoice-preview/${invoiceCreated._id.toString()}`,
      });
      //update guest with invoice
      await Event.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id), "guests.contact": buyer._id },
        {
          $set: {
            "guests.$.invoiceId": invoiceCreated._id,
            ticketAvailableQuantity: event.ticketAvailableQuantity - 1,
          },
        }
      );
      //send invoice
      SendMail({
        from: `via MyManager <hello@mymanager.com>`,
        recipient: buyer.email,
        subject: `Invoice #${invoiceCreated.no} | ${org?.name || ""} `,
        body: emailBody,
        replyTo: "",
      });

      no++;
    }

    return res.status(200).json({ message: "payment updated successfully" });
  } catch (error) {
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});
