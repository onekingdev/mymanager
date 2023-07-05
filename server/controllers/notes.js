const { Notes, User, Contact } = require("../models/index/index");
const mongoose = require("mongoose");

exports.createNote = async (req, res) => {
  const payload = req.body;
  const createNotePayload = payload;
  const { contactId } = req.params;
  try {
    const isExist = await Contact.findOne({
      _id: contactId,
      userId: req.user._id,
    });
    if (isExist) {
      createNotePayload.clientName = isExist.fullName;
      createNotePayload.contactId = isExist._id;
      createNotePayload.userId = mongoose.Types.ObjectId(req.user._id);
      createNotePayload.time = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const createdNote = await Notes.create(createNotePayload);
      if (createdNote) {
        return res.send({
          success: true,
          msg: "note created successfully",
        });
      } else {
        return res.send({
          success: false,
          msg: "Error while creating the note",
        });
      }
    }

    return res.send({ msg: "client not found", success: false });
  } catch (err) {
    res.send({ error: err.message.replace(/"/g, ""), success: false });
  }
};

exports.getNotesByContactId = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  try {
    const filter = {
      userId: userId,
      contactId: contactId,
      isDeleted: false,
    };
    const notes = await Notes.find(filter);
    if (!notes) {
      return res.send({
        success: true,
        msg: "Data not exists for this query!!",
      });
    }
    return res.send({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
};
exports.getAllNotes = async (req, res) => {
  const userId = req.user._id;
  try {
    const filter = {
      userId: userId,
      isDeleted: false,
    };
    const notes = await Notes.find(filter);
    if (!notes) {
      return res.send({
        success: true,
        msg: "Data not exists for this query!!",
      });
    }
    return res.send({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
};

exports.updateNote = async (req, res) => {
  const { noteId } = req.params;
  const updateNotePayload = req.body;
  try {
    const updateNote = await Notes.updateOne(
      { _id: noteId, userId: req.user._id },
      { $set: updateNotePayload }
    );
    if (updateNote.modifiedCount > 0) {
      res.send({
        success: true,
        msg: "note updated successfully",
      });
    } else {
      res.send({
        success: false,
        msg: "Error while updating the note",
      });
    }
  } catch (err) {
    res.send({ message: err.message.replace(/"/g, ""), success: false });
  }
};

exports.removeNote = async (req, res) => {
  const userId = req.user._id;
  const noteId = req.params.noteId;
  try {
    const removeNote = await Notes.updateOne({ _id: noteId, userId: userId }, { isDeleted: true });
    if (removeNote.modifiedCount > 0) {
      return res.send({ msg: "note remove successfully", success: true });
    }
    return res.send({ msg: "note not able to remove", success: false });
  } catch (error) {
    res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
};
