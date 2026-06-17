const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).send({
        message: "Title required",
      });
    }

    const note = await Note.create({
      title,
      content,
    });

    res.status(201).send(note);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({
      updatedAt: -1,
    });

    res.send(notes);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send({
        message: "Note not found",
      });
    }

    res.send(note);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    res.send(note);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);

    res.send({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    const q = req.query.q;

    const notes = await Note.find({
      $or: [
        {
          title: {
            $regex: q,
            $options: "i",
          },
        },

        {
          content: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    });

    res.send(notes);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
