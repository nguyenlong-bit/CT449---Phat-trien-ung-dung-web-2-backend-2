const express = require("express");
const contactsRouter = require("./app/routes/contact.route");

const router = express.Router();

router.route("/")
  .get(contacts.findAll)
  .post(contacts.create)
  .delete(contacts.deleteAll);

router.route("/favorite")
  .get(contacts.findAllFavorite);

router.route("/:id")
  .get(contacts.findOne)
  .put(contacts.update)
  .delete(contacts.delete);

  app.use("/api/contacts", contactsRouter);
module.exports = router;
