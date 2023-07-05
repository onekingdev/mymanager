const { RanksHistory, Progression, Contact } = require("../models/index/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const moment = require("moment");

const clientRanksHistory = async (req, res) => {
  const { clientId } = req.params;
  const { progressionId, categoryId } = req.body;
  try {
    if (progressionId && categoryId) {
      const history = await RanksHistory.find({
        clientId: ObjectId(clientId),
        userId: req.user._id,
        progressionId: progressionId,
        categoryId: categoryId,
      });
      if (history.length) {
        return res.send({ data: history, success: true });
      }
      return res.send({ msg: "There is no history for this client", success: false });
    } else if (progressionId) {
      const history = await RanksHistory.find({
        clientId: ObjectId(clientId),
        userId: req.user._id,
        progressionId: progressionId,
      });
      if (history.length) {
        return res.send({ data: history, success: true });
      }
      return res.send({ msg: "There is no history for this client", success: false });
    } else {
      const history = await RanksHistory.find({
        clientId: ObjectId(clientId),
        userId: req.user._id,
      });
      if (history.length) {
        return res.send({ data: history, success: true });
      }
      return res.send({ msg: "There is no history for this client", success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const clientRanksHistoryAll = async (req, res) => {
  const { progressionId, categoryId } = req.body;
  try {
    if (progressionId && categoryId) {
      const history = await RanksHistory.find({
        userId: req.user._id,
        progressionId: progressionId,
        categoryId: categoryId,
      });
      if (history.length) {
        return res.send({ data: history, success: true });
      }
      return res.send({ msg: "There is no history for this user", success: false });
    } else if (progressionId) {
      const history = await RanksHistory.find({
        userId: req.user._id,
        progressionId: progressionId,
      });
      if (history.length) {
        return res.send({ data: history, success: true });
      }
      return res.send({ msg: "There is no history for this user", success: false });
    } else {
      const history = await RanksHistory.find({
        userId: req.user._id,
      });
      if (history.length) {
        return res.send({ data: history, success: true });
      }
      return res.send({ msg: "There is no history for this user", success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRankHistory = async (req, res) => {
  const { rankHistoryId } = req.params;
  const { progressionId, categoryId, rankName } = req.body;
  try {
    const progression = await Progression.aggregate([
      {
        $match: {
          _id: ObjectId(progressionId),
          isDeleted: false,
          userId: ObjectId(req.user._id),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categories",
        },
      },
      { $unwind: "$categories" },
      {
        $match: {
          "categories._id": ObjectId(categoryId),
          "categories.isDeleted": false,
        },
      },
      {
        $lookup: {
          from: "rankcategories",
          localField: "categories._id",
          foreignField: "categoryId",
          as: "ranks",
        },
      },
      { $unwind: "$ranks" },
      {
        $match: {
          "ranks.isDeleted": false,
        },
      },
    ]);
    for (let i = 0; i < progression.length; i++) {
      if (progression[i].ranks.rankName === rankName) {
        const update = await RanksHistory.updateOne(
          { _id: ObjectId(rankHistoryId) },
          {
            $set: {
              progressionId: progression[i]._id,
              progressionName: progression[i].progressionName,
              categoryId: progression[i].categories._id,
              categoryName: progression[i].categories.categoryName,
              currentRankName: rankName,
              currentRankOrder: progression[i].ranks.rankOrder,
              currentRankImage: progression[i].ranks.rankImage
                ? progression[i].ranks.rankImage
                : "",
              nextRankName: progression[i + 1].ranks.rankName,
              nextRankOrder: progression[i + 1].ranks.rankOrder,
              nextRankImage: progression[i + 1].ranks.rankImage
                ? progression[i + 1].ranks.rankImage
                : "",
            },
          }
        );
        if (update.modifiedCount > 0) {
          return res.send({ msg: "rank history updated", success: true });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addClientHistory = async (req, res) => {
  const { clientId } = req.params;
  const { progressionId, categoryId, rankID } = req.body;
  try {
    const isExist = await Contact.findOne({ _id: clientId });
    if (isExist.fullName) {
      const progression = await Progression.aggregate([
        {
          $match: {
            _id: ObjectId(progressionId),
            isDeleted: false,
            userId: ObjectId(req.user._id),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "categories",
          },
        },
        { $unwind: "$categories" },
        {
          $match: {
            "categories._id": ObjectId(categoryId),
            "categories.isDeleted": false,
          },
        },
        {
          $lookup: {
            from: "rankcategories",
            localField: "categories._id",
            foreignField: "categoryId",
            as: "ranks",
          },
        },
        { $unwind: "$ranks" },
        {
          $match: {
            "ranks.isDeleted": false,
          },
        },
      ]);
      for (let i = 0; i < progression.length; i++) {
        if (progression[i].ranks._id == rankID) {
          const now = moment();
          const payload = {
            progressionId: progression[i]._id,
            clientId: clientId,
            clientName: isExist.fullName,
            userId: req.user._id,
            progressionName: progression[i].progressionName,
            categoryId: progression[i].categories._id,
            categoryName: progression[i].categories.categoryName,
            currentRankName: progression[i].ranks.rankName,
            currentRankOrder: progression[i].ranks.rankOrder,
            currentRankImage: progression[i].ranks.rankImage ? progression[i].ranks.rankImage : " ",
            nextRankName:
              progression[i + 1] && progression[i + 1].ranks && progression[i + 1].ranks.rankName
                ? progression[i + 1].ranks.rankName
                : " ",
            nextRankOrder:
              progression[i + 1] && progression[i + 1].ranks && progression[i + 1].ranks.rankOrder
                ? progression[i + 1].ranks.rankOrder
                : 0,
            nextRankImage:
              progression[i + 1] && progression[i + 1].ranks && progression[i + 1].ranks.rankImage
                ? progression[i + 1].ranks.rankImage
                : " ",
            date: now.format("YYYY-MM-DD"),
            time: now.format("HH:mm:ss"),
          };
          const history = new RanksHistory(payload);
          const data = await history.save();
          if (data) {
            return res.send({
              msg: "rank history created successfully for client",
              success: true,
              data: data,
            });
          }
          return res.send({ msg: "unable to create history for client", successs: false });
        }
      }
    } else {
      return res.send({ msg: "client not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRankHistory = async (req, res) => {
  const { rankHistoryId } = req.params;
  try {
    RanksHistory.deleteOne({ _id: ObjectId(rankHistoryId) }, (err, result) => {
      if (err) return res.send(err);
      return res.send({ msg: "rank history removed", success: true });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  clientRanksHistory,
  updateRankHistory,
  deleteRankHistory,
  clientRanksHistoryAll,
  addClientHistory,
};
