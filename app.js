const express = require("express");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

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

app.use((req, res, next) => {

    return next(new ApiError(404, "Resource not found"));
});


app.use((err, req, res, next) => {
    
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;