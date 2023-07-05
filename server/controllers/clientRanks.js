const {
  Progression,
  Contact,
  RanksHistory,
  Category,
  ClientRanks,
} = require("../models/index/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const moment = require("moment");
const asyncHandler = require("express-async-handler");

exports.addClientsInProgression = asyncHandler(async (req, res) => {
  const { contactIds } = req.body;
  const objectIds = contactIds && contactIds.map((id) => ObjectId(id));
  try {
    const clients = await Contact.find({
      _id: { $in: objectIds },
      isDelete: false,
      userId: req.user._id,
    });

    if (clients) {
      const clientData = clients.map((client) => ({
        clientName: client.fullName,
        contactId: client._id,
        userId: req.user._id,
      }));
      const existingClients = await ClientRanks.find({ contactId: { $in: objectIds } });
      const newClients = clientData.filter(
        (client) =>
          !existingClients.some((existingClient) =>
            existingClient.contactId.equals(client.contactId)
          )
      );

      // Update isprogression field for existing clients
      existingClients.forEach((existingClient) => {
        const clientToUpdate = clientData.find((client) =>
          existingClient.contactId.equals(client.contactId)
        );
        if (clientToUpdate) {
          existingClient.isprogression = true;
          existingClient.save();
        }
      });

      if (newClients.length > 0) {
        await ClientRanks.insertMany(newClients);
        return res.send({
          msg: `Added ${newClients.length} new clients to the into progression and  ${existingClients.length} existing clients added into progression by updated their isprogression Field.`,
          success: true,
        });
      }
      return res.send({
        msg: ` ${existingClients.length} existing clients added into pregression.`,
        success: true,
      });
    }
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
});
exports.getClientsRanks = async (req, res) => {
  try {
    const { clientProgressions } = req.body;

    const updatedClientRanks = [];
    for (const clientProg of clientProgressions) {
      const { contactId, progressionId, categoryId } = clientProg;
      const progression = await Progression.findOne({
        _id: progressionId,
        isDeleted: false,
        userId: req.user._id,
      });
      if (!progression) {
        console.log(`Progression with Id ${progressionId} does not exist.`);
      }
      const category = await Category.aggregate([
        {
          $match: {
            _id: ObjectId(categoryId),
            isDeleted: false,
            userId: ObjectId(req.user._id),
          },
        },
        {
          $lookup: {
            from: "rankcategories",
            localField: "_id",
            foreignField: "categoryId",
            as: "ranks",
          },
        },
      ]);
      let clientRank = await ClientRanks.findOne({
        contactId: contactId,
        userId: req.user._id,
        progressionId: progressionId,
        categoryId: categoryId,
      });
      if (clientRank) {
        updatedClientRanks.push(clientRank);
      } else {
        const contact = await Contact.findById(contactId);
        const newContactRank = new ClientRanks({
          ...contact,
          contactId: contact._id,
          contactName: contact.fullName,
          progressionName: progression.progressionName,
          progressionId: progression._id,
          userId: req.user._id,
          categoryName: category[0].categoryName,
          categoryId: category[0]._id,
          nextRankName: category[0].ranks?.length > 0 ? category[0].ranks[0].rankName : "",
          nextRankOrder: category[0].ranks?.length > 0 ? category[0].ranks[0].rankOrder : 0,
          nextRankImage: category[0].ranks?.length > 0 ? category[0].ranks[0].rankImage : "",
          ispromoted: false,
        });
        await newContactRank.save();
        updatedClientRanks.push(newContactRank);
      }
    }
    res.status(200).json({ updatedClientRanks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const historyadd = async (clientRank) => {
  const now = moment();
  const payload = {
    clientId: clientRank.clientId,
    clientName: clientRank.clientName,
    userId: clientRank.userId,
    progressionId: clientRank.progressionId,
    progressionName: clientRank.progressionName,
    categoryId: clientRank.categoryId,
    categoryName: clientRank.categoryName,
    currentRankName: clientRank.currentRankName,
    currentRankOrder: clientRank.currentRankOrder,
    currentRankImage: clientRank.currentRankImage,
    nextRankName: clientRank.nextRankName,
    nextRankOrder: clientRank.nextRankOrder,
    nextRankImage: clientRank.nextRankImage,
    date: now.format("YYYY-MM-DD"),
    time: now.format("HH:mm:ss"),
  };
  const savehistory = new RanksHistory(payload);
  return await savehistory.save();
};

exports.removeClientFromProgression = asyncHandler(async (req, res) => {
  const { contactIds } = req.body;
  const objectIds = contactIds && contactIds.map((id) => ObjectId(id));
  try {
    const clients = await Contact.find({
      _id: { $in: objectIds },
      isDelete: false,
      userId: req.user._id,
    });

    if (clients) {
      const clientData = clients.map((client) => ({
        clientName: client.fullName,
        contactId: client._id,
        userId: req.user._id,
      }));

      const existingClients = await ClientRanks.find({ contactId: { $in: objectIds } });

      const newClients = clientData.filter(
        (client) =>
          !existingClients.some((existingClient) =>
            existingClient.contactId.equals(client.contactId)
          )
      );

      // Update isprogression field for existing clients
      existingClients.forEach((existingClient) => {
        const clientToUpdate = clientData.find((client) =>
          existingClient.contactId.equals(client.contactId)
        );
        if (clientToUpdate) {
          existingClient.isprogression = false;
          existingClient.save();
        }
      });

      // if (newClients.length > 0) {
      //   await ClientRanks.insertMany(newClients);
      //   return res.send({
      //     msg: `Added ${newClients.length} new clients to the into progression and  ${existingClients.length} existing clients added into progression by updated their isprogression Field.`,
      //     success: true,
      //   });
      // }
      return res.send({
        msg: ` client removed from  pregression.`,
        success: true,
      });
    }
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
});

exports.promoteClientRanks = asyncHandler(async (req, res) => {
  try {
    const { clientProgressions } = req.body;

    const updatedClientRanks = [];

    for (const clientProg of clientProgressions) {
      const { contactId, progressionId, categoryId } = clientProg;
      const progression = await Progression.findOne({
        _id: progressionId,
        isDeleted: false,
        userId: req.user._id,
      });
      if (!progression) {
        console.log(`Progression with Id ${progressionId} does not exist.`);
      }
      const category = await Category.aggregate([
        {
          $match: {
            _id: ObjectId(categoryId),
            isDeleted: false,
            userId: ObjectId(req.user._id),
          },
        },
        {
          $lookup: {
            from: "rankcategories",
            localField: "_id",
            foreignField: "categoryId",
            as: "ranks",
          },
        },
      ]);
      let clientRank = await ClientRanks.findOne({ contactId: contactId, userId: req.user._id });
      if (category.length === 0) {
        updatedClientRanks.push({
          msg: `Sorry! No Category or Rank in selected  client ${contactId}`,
        });
      } else if (
        clientRank.currentRankName.length === 0 &&
        clientRank.nextRankName.length === 0 &&
        clientRank.lastPromoteRankName.length === 0 &&
        clientRank.ispromoted == false &&
        category[0].ranks.length
      ) {
        clientRank.progressionId = progressionId;
        clientRank.progressionName = progression.progressionName;
        clientRank.categoryId = categoryId;
        clientRank.categoryName = category[0].categoryName;
        clientRank.currentRankName = category[0].ranks[0].rankName;
        clientRank.currentRankOrder = category[0].ranks[0].rankOrder;
        clientRank.currentRankImage = category[0].ranks[0].rankImage;
        if (category[0].ranks.length > 1) {
          clientRank.nextRankName = category[0].ranks[1].rankName;
          clientRank.nextRankOrder = category[0].ranks[1].rankOrder;
          clientRank.nextRankImage = category[0].ranks[1].rankImage;
        }
        clientRank.ispromoted = true;
        clientRank.isprogression = false;
        const clientRanks = await clientRank.save();
        const history = await historyadd(clientRanks);
        console.log(`Updated clientRank for contactId ${contactId}.`);
        updatedClientRanks.push(clientRanks);
      } else if (
        (clientRank.ispromoted == false &&
          category[0].ranks.length &&
          clientRank.currentRankName.length) ||
        (clientRank.ispromoted == true &&
          category[0].ranks.length &&
          clientRank.nextRankName.length)
      ) {
        const ranks = category[0].ranks;
        const obj = {};
        let currRank;
        let nextRank;
        for (let rank in ranks) {
          if (ranks[rank].rankOrder == clientRank.currentRankOrder) {
            obj.lastPromoteRankOrder = ranks[rank].rankOrder;
            obj.lastPromoteRankImage = ranks[rank].rankImage;
            obj.lastPromoteRankName = ranks[rank].rankName;

            currRank = parseInt(rank) + 1;
            nextRank = parseInt(rank) + 2;
          }
        }
        obj.currentRankOrder = ranks[currRank] == undefined ? 0 : ranks[currRank].rankOrder;
        obj.currentRankImage = ranks[currRank] == undefined ? "" : ranks[currRank].rankImage;
        obj.currentRankName = ranks[currRank] == undefined ? "" : ranks[currRank].rankName;
        obj.nextRankOrder = ranks[nextRank] == undefined ? 0 : ranks[nextRank].rankOrder;
        obj.nextRankImage = ranks[nextRank] == undefined ? "" : ranks[nextRank].rankImage;
        obj.nextRankName = ranks[nextRank] == undefined ? "" : ranks[nextRank].rankName;
        obj.isprogression = false;
        obj.ispromoted = true;
        let update = await ClientRanks.updateOne({ _id: ObjectId(clientRank._id) }, { $set: obj });
        if (update.modifiedCount > 0) {
          updatedClientRanks.push(obj);
          const payload = {
            contactId: contactId,
            clientName: clientRank.clientName,
            userId: req.user._id,
            progressionId: progressionId,
            progressionName: progression.progressionName,
            categoryId: categoryId,
            categoryName: category[0].categoryName,
            currentRankName: obj.currentRankName,
            currentRankOrder: obj.currentRankOrder,
            currentRankImage: obj.currentRankImage,
            nextRankName: obj.nextRankName,
            nextRankOrder: obj.nextRankOrder,
            nextRankImage: obj.nextRankImage,
          };
          const history = await historyadd(payload);
          console.log(`Updated clientRank for contactId ${contactId}.`);
        }
      } else if (
        (clientRank.ispromoted == false &&
          category[0].ranks.length &&
          clientRank.nextRankName.length === 0) ||
        clientRank.lastPromoteRankName.length
      ) {
        clientRank.progressionId = progressionId;
        clientRank.progressionName = progression.progressionName;
        clientRank.categoryId = categoryId;
        clientRank.categoryName = category[0].categoryName;
        clientRank.currentRankName = category[0].ranks[0].rankName;
        clientRank.currentRankOrder = category[0].ranks[0].rankOrder;
        clientRank.currentRankImage = category[0].ranks[0].rankImage;
        clientRank.lastPromoteRankName = "";
        clientRank.lastPromoteRankOrder = 0;
        clientRank.lastPromoteRankImage = "";
        if (category[0].ranks.length > 1) {
          clientRank.nextRankName = category[0].ranks[1].rankName;
          clientRank.nextRankOrder = category[0].ranks[1].rankOrder;
          clientRank.nextRankImage = category[0].ranks[1].rankImage;
        }
        clientRank.ispromoted = true;
        clientRank.isprogression = false;
        const clientRanks = await clientRank.save();
        const history = await historyadd(clientRanks);
        console.log(`Updated clientRank for contactId ${contactId}.`);
        updatedClientRanks.push(clientRanks);
      }
    }
    res.status(200).json({ updatedClientRanks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.promoteClientRanksFromEvent = asyncHandler(async (req, res) => {
  try {
    const { clientProgressions } = req.body;

    const updatedClientRanks = [];
    for (const clientProg of clientProgressions) {
      const { contactId, progressionId, categoryId } = clientProg;
      const progression = await Progression.findOne({
        _id: progressionId,
        isDeleted: false,
        userId: req.user._id,
      });
      if (!progression) {
        console.log(`Progression with Id ${progressionId} does not exist.`);
      }
      const category = await Category.aggregate([
        {
          $match: {
            _id: ObjectId(categoryId),
            isDeleted: false,
            userId: ObjectId(req.user._id),
          },
        },
        {
          $lookup: {
            from: "rankcategories",
            localField: "_id",
            foreignField: "categoryId",
            as: "ranks",
          },
        },
      ]);
      let clientRank = await ClientRanks.findOne({
        contactId: contactId,
        categoryId: categoryId,
        userId: req.user._id,
      });

      if (clientRank) {
        if (
          category[0].ranks.length &&
          clientRank.nextRankName.length > 0 &&
          clientRank.ispromoted == true
        ) {
          const ranks = category[0].ranks;
          const obj = {};
          let currRank;
          let nextRank;
          for (let rank in ranks) {
            if (ranks[rank].rankOrder == clientRank.currentRankOrder) {
              obj.lastPromoteRankOrder = ranks[rank].rankOrder;
              obj.lastPromoteRankImage = ranks[rank].rankImage;
              obj.lastPromoteRankName = ranks[rank].rankName;

              currRank = parseInt(rank) + 1;
              nextRank = parseInt(rank) + 2;
            }
          }
          obj.currentRankOrder = ranks[currRank] == undefined ? 0 : ranks[currRank].rankOrder;
          obj.currentRankImage = ranks[currRank] == undefined ? "" : ranks[currRank].rankImage;
          obj.currentRankName = ranks[currRank] == undefined ? "" : ranks[currRank].rankName;
          obj.nextRankOrder = ranks[nextRank] == undefined ? 0 : ranks[nextRank].rankOrder;
          obj.nextRankImage = ranks[nextRank] == undefined ? "" : ranks[nextRank].rankImage;
          obj.nextRankName = ranks[nextRank] == undefined ? "" : ranks[nextRank].rankName;
          obj.isprogression = false;
          obj.ispromoted = true;
          let update = await ClientRanks.updateOne(
            { _id: ObjectId(clientRank._id) },
            { $set: obj }
          );
          if (update.modifiedCount > 0) {
            updatedClientRanks.push(obj);
            const payload = {
              contactId: contactId,
              clientName: clientRank.clientName,
              userId: req.user._id,
              progressionId: progressionId,
              progressionName: progression.progressionName,
              categoryId: categoryId,
              categoryName: category[0].categoryName,
              currentRankName: obj.currentRankName,
              currentRankOrder: obj.currentRankOrder,
              currentRankImage: obj.currentRankImage,
              nextRankName: obj.nextRankName,
              nextRankOrder: obj.nextRankOrder,
              nextRankImage: obj.nextRankImage,
            };
            const history = await historyadd(payload);
            console.log(`Updated clientRank for contactId ${contactId}.`);
          }
        } else if (
          clientRank.currentRankOrder == 0 &&
          category[0].ranks.length &&
          clientRank.nextRankName.length
        ) {
          const ranks = category[0].ranks;
          const obj = {};
          obj.currentRankOrder = ranks[0] ? ranks[0].rankOrder : 0;
          obj.currentRankImage = ranks[0] ? ranks[0].rankImage : "";
          obj.currentRankName = ranks[0] ? ranks[0].rankName : "";
          obj.nextRankOrder = ranks[1] ? ranks[1].rankOrder : 0;
          obj.nextRankImage = ranks[1] ? ranks[1].rankImage : "";
          obj.nextRankName = ranks[1] ? ranks[1].rankName : "";
          obj.lastRankOrder = 0;
          obj.lastRankImage = "";
          obj.lastRankName = "";
          obj.isprogression = false;
          obj.ispromoted = true;
          let update = await ClientRanks.updateOne(
            { _id: ObjectId(clientRank._id) },
            { $set: obj }
          );
          if (update.modifiedCount > 0) {
            updatedClientRanks.push(obj);
            const payload = {
              contactId: contactId,
              clientName: clientRank.clientName,
              userId: req.user._id,
              progressionId: progressionId,
              progressionName: progression.progressionName,
              categoryId: categoryId,
              categoryName: category[0].categoryName,
              currentRankName: obj.currentRankName,
              currentRankOrder: obj.currentRankOrder,
              currentRankImage: obj.currentRankImage,
              nextRankName: obj.nextRankName,
              nextRankOrder: obj.nextRankOrder,
              nextRankImage: obj.nextRankImage,
              lastRankName: obj.lastRankName,
              lastRankOrder: obj.lastRankOrder,
              lastRankImage: obj.lastRankImage,
            };
            const history = await historyadd(payload);
            console.log(`Updated clientRank for contactId ${contactId}.`);
          }
        } else if (
          clientRank.ispromoted == false &&
          category[0].ranks.length &&
          clientRank.nextRankName.length === 0
        ) {
          updatedClientRanks.push([]);
        }
      } else {
        const contact = await Contact.findOne({ _id: contactId, userId: req.user._id });
        const newContactRank = new ClientRanks({
          ...contact,
          contactId: contact._id,
          contactName: contact.fullName,
          progressionName: progression.progressionName,
          progressionId: progression._id,
          userId: req.user._id,
          categoryName: category[0].categoryName,
          categoryId: category[0]._id,
          nextRankName: category[0].ranks[0].rankName,
          nextRankOrder: category[0].ranks[0].rankOrder,
          nextRankImage: category[0].ranks[0].rankImage,
        });
        await newContactRank.save();
        updatedClientRanks.push(newContacstRank);
      }
    }
    res.status(200).json({ updatedClientRanks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.removePromoted = asyncHandler(async (req, res) => {
  const { clientRankId } = req.body;
  try {
    let update = await ClientRanks.updateOne(
      { _id: ObjectId(clientRankId), userId: req.user._id },
      { ispromoted: false }
    );
    if (update.modifiedCount > 0) {
      return res.send({
        msg: "removed from  promoted ",
        success: true,
      });
    }
    return res.send({
      msg: "not removed ",
      success: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.notPromotedList = asyncHandler(async (req, res) => {
  try {
    let data = await ClientRanks.find({
      userId: req.user._id,
      ispromoted: false,
      isprogression: true,
    });
    if (data) {
      return res.send({
        data: data,
        success: true,
      });
    }
    return res.send({
      msg: "There is not client Ranks in this user",
      success: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.promotedList = asyncHandler(async (req, res) => {
  try {
    let data = await ClientRanks.find({
      userId: ObjectId(req.user._id),
      ispromoted: true,
      // isprogression: false,
    });
    if (data) {
      return res.send({
        data: data,
        success: true,
      });
    }
    return res.send({
      msg: "There is not client Ranks in this user",
      success: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.contactRankList = asyncHandler(async (req, res) => {
  try {
    let data = await ClientRanks.find({
      userId: ObjectId(req.user._id),
    });
    if (data) {
      return res.send({
        data: data,
        success: true,
      });
    }
    return res.send({
      msg: "There is not client Ranks in this user",
      success: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
