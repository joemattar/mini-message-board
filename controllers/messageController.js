const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.message_create_get = (req, res, next) => {
  res.render("new_message_form", {
    title: "New Message - Mini Messageboard",
    title_section: "New Message",
  });
};

exports.message_create_post = [
  // Validate and sanitize the name field.
  body("user", "User name required").trim().isLength({ min: 1 }),
  body("text", "Message text required").trim().isLength({ min: 1 }),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a message object with trimmed data.
    const message = new Message({
      user: req.body.user,
      text: req.body.text,
      timestamp: new Date(),
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("new_message_form", {
        title: "New Message - Mini Messageboard",
        title_section: "New Message",
        message,
        errors: errors.array(),
      });
      return;
    } else {
      message.save((err) => {
        if (err) {
          return next(err);
        }
        // Genre saved. Redirect to genre detail page.
        res.redirect("/");
      });
    }
  },
];
