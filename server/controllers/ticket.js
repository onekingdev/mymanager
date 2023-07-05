const Ticket = require("../models/Ticket");
const sgMail = require("@sendgrid/mail");
const { socket_connections } = require("../service/socket-sender");
const { SendMail } = require("../service/sendMail");
const {
  adminSockets,
  clientSockets,
  socket2adminId,
  socket2clientId,
} = require("../routes/socket");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { ticketMailTemplate } = require("../constants/emailTemplates");

exports.createTicket = async (req, res) => {
  try {
    const newTicket = new Ticket({ ...req.body });
    const response = await newTicket.save();
    SendMail({
      recipient: req.body.reqEmail,
      from: `admin+${response._id}@mymanager.com`,
      replyTo: `admin+${response._id}@mymanager.com`,
      subject: req.body.ticketName,
      text: req.body.messages[req.body.messages.length - 1].msg,
      reqName: response.reqName,
      body: ticketMailTemplate(
        response.reqName,
        req.body.messages[req.body.messages.length - 1].msg
      ),
    });

    return res.json(response);
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
    console.log(err.message);
  }
};

exports.getAllTicketsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const tickets = await Ticket.find({ userId });
    const openTicketCount = tickets.filter(
      (ticket) => ticket.status.toLowerCase() === "open"
    ).length;
    const pendingTicketCount = tickets.filter(
      (ticket) => ticket.status.toLowerCase() === "pending"
    ).length;
    const spamTicketCount = tickets.filter(
      (ticket) => ticket.status.toLowerCase() === "spam"
    ).length;
    const closedTicketCount = tickets.filter(
      (ticket) => ticket.status.toLowerCase() === "completed"
    ).length;
    const trashTicketCount = tickets.filter(
      (ticket) => ticket.status.toLowerCase() === "trash"
    ).length;

    res.json({
      tickets: tickets,
      ticketsMeta: {
        open: openTicketCount,
        pending: pendingTicketCount,
        spam: spamTicketCount,
        completed: closedTicketCount,
        trash: trashTicketCount,
      },
    });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
};

exports.getTicketsByStatus = async (req, res) => {
  const { userId, ticketStatus } = req.params;
  try {
    const tickets = await Ticket.find({ userId, status: ticketStatus });
    res.json(tickets);
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
};

exports.getTicketById = async (req, res) => {
  const { ticketId } = req.params;
  try {
    const ticket = await Ticket.findById(ticketId);
    res.json(ticket);
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
};

// TODO: update ticket message

exports.updateTicketMessage = async (req, res) => {};

exports.deleteTicketMessage = async (req, res) => {
  const { ticketId } = req.params;
  try {
    await Ticket.findByIdAndDelete(ticketId);
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
};

exports.addNewMessage = async (req, res) => {
  const { ticketId, message, status, sender } = req.body;

  try {
    const oldTicket = await Ticket.findById(ticketId);

    let newStatus = status;
    if (oldTicket.status !== "spam" && !status) {
      if (sender == "agent_msg") {
        newStatus = "pending";
      }
      if (sender == "requester_msg") {
        newStatus = "open";
      }
    }
    let newTicketStatus = newStatus;
    if (oldTicket.status === newTicketStatus) newTicketStatus = "";
    await Ticket.findByIdAndUpdate(ticketId, {
      $push: {
        messages: {
          sender: sender,
          msg: message,
          newTicketStatus,
        },
      },
    });

    console.log("Update account");

    const updatedTicket = await Ticket.findById(ticketId);

    SendMail({
      recipient: updatedTicket.reqEmail,
      from: `admin+${updatedTicket._id}@mymanager.com`,
      replyTo: `admin+${updatedTicket._id}@mymanager.com`,
      subject: updatedTicket.ticketName,
      text: updatedTicket.messages[updatedTicket.messages.length - 1].msg,
      reqName: updatedTicket.reqName,
      body: ticketMailTemplate(
        updatedTicket.reqName,
        updatedTicket.messages[updatedTicket.messages.length - 1].msg
      ),
    });
    return res.json(updatedTicket);
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
};

exports.replyMessage = async (req, res, { notifyEmail }) => {
  const { from, to, subject, body, date } = req.body;
  // Parse toEmail to get UserId
  const ticketId = to.split("@")[0].substring(6);

  var io = req.app.get("socketio");

  const sentences = body.split("\n");
  let resMessage = "";
  for (let i = 0; i < sentences.length; i++) {
    if (
      sentences[i].includes("On") &&
      sentences[i].includes("wrote:") &&
      sentences[i].includes("@")
    )
      break;
    if (
      sentences[i].includes("On") &&
      sentences[i + 1].includes("wrote:") &&
      sentences[i + 1].includes("@")
    ) {
      break;
    }
    resMessage = resMessage.concat(sentences[i]);
  }

  const result = await Ticket.findByIdAndUpdate(ticketId, {
    $push: {
      messages: {
        sender: "requester_msg",
        msg: resMessage,
      },
    },
  });

  if (socket_connections.filter((connection) => connection.adminId === result.userId).length > 0) {
    socket_connections
      .filter((connection) => connection.adminId === result.userId)
      .forEach((connection) => {
        console.log("emit socket connections are", connection.socket.id);
        connection.socket.emit("newEmail", {
          reqName: result.reqName,
          message: resMessage,
        });
      });
  }

  res.json(result);
};

exports.updateBulkTickets = async (req, res) => {
  const { ticketIds, dataToUpdate } = req.body;
  const result = ticketIds.map(async (ticketId) => {
    return await Ticket.findByIdAndUpdate(ticketId, dataToUpdate);
  });

  return res.json(result);
};
