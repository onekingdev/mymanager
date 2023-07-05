const { ContactType, Contact } = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const initialContactTypes = [
  {
    name: "Client",
    icon: "mark1",
    order: 1,
    type: "client",
  },
  {
    name: "Employee",
    icon: "mark2",
    order: 2,
    type: "employee",
  },
  {
    name: "Lead",
    icon: "mark3",
    order: 3,
    type: "lead",
  },
  {
    name: "Relationship",
    icon: "mark4",
    order: 4,
    type: "relationship",
  },
  {
    name: "Vendor",
    icon: "mark5",
    order: 5,
    type: "vendor",
  },
];

/**
 * Method to add contact-type
 * @method  POST
 * @param   {Object} data  Object of the contact-type
 * @return  {JSON}         status message
 */
exports.addContactType = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = req.user;
  const { organization } = req.headers;
  const data = req.body;
  let orgId;
  if (req.body.organizationId) {
    orgId = mongoose.Types.ObjectId(req.body.organizationId);
  } else {
    orgId = organization ? mongoose.Types.ObjectId(organization) : null;
  }
  const payload = {
    userId: userId,
    organizationId: orgId,
    creatorType: organization
      ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
      : user.userType,
    ...data,
  };
  let ContactTypeObj = new ContactType(payload);
  ContactTypeObj.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: false,
        message: "error",
        error: err,
      });
    }
    res.send({ status: true, message: "success", data: data });
  });
});

/**
 * Method to get contact-type by userId
 * @method  GET
 * @return  status message
 */
exports.getContactTypes = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = req.user;
  const { organization } = req.headers;
  try {
    if (organization) {
      // ** Code for users who belongs to organization.
      const contactType = await ContactType.find({
        //userType: req.user.userType,
        organizationId: mongoose.Types.ObjectId(organization),

        isDelete: false,
      }).sort({ icon: 1 });

      if (contactType.length > 0) {
        return res.status(200).json(contactType);
      } else {
        if (
          user.organizations.find((x) => x.organizationId.toString() === organization).userType ===
          "admin"
        ) {
          const formatedContactTypeData = initialContactTypes.map((x) => ({
            ...x,
            userId: mongoose.Types.ObjectId(user._id),
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: user.organizations.find(
              (x) => x.organizationId.toString() === organization
            ).userType,
          }));
          ContactType.insertMany(formatedContactTypeData)
            .then((resAll) => {
              return res.status(200).send(resAll);
            })
            .catch((err) => {
              // console.log(err);
              return res.status(500).json({
                errors: {
                  common: { msg: err.message },
                },
              });
            });
        }
      }
    } else {
      const contactType = await ContactType.find({
        creatorType: user.userType,
        userId: mongoose.Types.ObjectId(userId),
        organizationId: null,
        isDelete: false,
      }).sort({ icon: 1 });

      if (contactType.length > 0) {
        return res.status(200).json(contactType);
      } else {
        const formatedContactTypeData = initialContactTypes.map((x) => ({
          ...x,
          userId,
          creatorType: user.userType,
          isDelete: false,
        }));
        ContactType.insertMany(formatedContactTypeData)
          .then((resAll) => {
            return res.status(200).send(resAll);
          })
          .catch((err) => {
            // console.log(err);
            return res.status(500).json({
              errors: {
                common: { msg: err.message },
              },
            });
          });
      }
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

exports.getRolesByIdArr = asyncHandler(async (req, res) => {
  const { typeIdArr } = req.body;
  try {
    const contactTypes = await ContactType.find({ _id: { $in: typeIdArr } });
    return res.status(200).json({ data: contactTypes });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

exports.getContactTypeByOrgId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    let contactType = await ContactType.find({
      organizationId: mongoose.Types.ObjectId(id),
    });
    if (contactType.length > 0) {
      return res.status(200).json(contactType);
    } else {
      const formatedContactTypeData = initialContactTypes.map((x) => ({
        ...x,
        userId: mongoose.Types.ObjectId(user._id),
        organizationId: mongoose.Types.ObjectId(id),
        creatorType: user.userType,
      }));
      await ContactType.insertMany(formatedContactTypeData)
        .then((resAll) => {
          return res.status(200).send(resAll);
        })
        .catch((err) => {
          // console.log(err);
          return res.status(500).json({
            errors: {
              common: { msg: err.message },
            },
          });
        });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

/**
 * Method to get contact-type
 * @method  POST
 * @param   {String}  name  contact-type name
 * @param   {String}  icon  contact-type icon
 * @param   {String}  creatorType  the type of creator
 * @return  {JSON}  status message
 */
exports.updateContactTypeById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, order } = req.body;
    const contactType = await ContactType.findOne({ _id: mongoose.Types.ObjectId(id) });
    originalContactType = contactType;
    originalContactType.name = name ? name : originalContactType.name;
    originalContactType.icon = icon ? icon : originalContactType.icon;
    originalContactType.order = order ? order : originalContactType.order;
    originalContactType.save((err, data) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: "error",
          error: err,
        });
      }
      res.send({
        status: true,
        message: "success",
        data: data,
      });
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

/**
 * Method to get contact-type
 * @method  POST
 * @param   {ObjectId}  id  the type of creator
 * @return  {JSON}  status message
 */
exports.delContactType = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { organizationId, userId } = req.body;
    const client = ContactType.findOne({
      type: "client",
      userId: mongoose.Types.ObjectId(userId),
      organizationId: mongoose.Types.ObjectId(organizationId),
    });
    await Contact.updateMany(
      {
        userId: mongoose.Types.ObjectId(userId),
        organizationId: mongoose.Types.ObjectId(organizationId),
      },
      {
        $pullAll: {
          contactType: [mongoose.Types.ObjectId(id)],
        },
      }
    );
    await Contact.updateMany(
      {
        userId: mongoose.Types.ObjectId(userId),
        organizationId: mongoose.Types.ObjectId(organizationId),
        contactType: { $ne: client._id },
      },
      {
        $push: {
          contactType: client._id,
        },
      }
    );
    await ContactType.findOneAndDelete({
      _id: mongoose.Types.ObjectId(id),
    });
    res.send({
      msg: "ContactType deleted succesfully",
      success: true,
    });
  } catch (err) {
    res.send({
      msg: err.message.replace(/\"/g, ""),
      success: false,
    });
  }
});
