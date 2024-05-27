const chatModel = require("../Models/chatModel");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const newchat = new chatModel({
      members: [firstId, secondId],
    });

    const response = await newchat.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chat = await chatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
  }
};


const findChats = async (req, res) => {
    const {firstId, secondId} = req.params;
  
    try {
      const chat = await chatModel.findOne({
        members: { $all: [firstId, secondId] },
      });
  
      res.status(200).json(chat);
    } catch (err) {
      console.log(err);
    }
  };

module.exports = {findChats, createChat, findUserChats}