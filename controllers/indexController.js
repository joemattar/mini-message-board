const Message = require("../models/message");

exports.messages_list = function (req, res, next) {
  Message.find()
    .sort({ timestamp: -1 })
    .exec(function (err, list_messages) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("index", {
        title: "Mini Messageboard",
        messages: list_messages,
      });
    });
};
