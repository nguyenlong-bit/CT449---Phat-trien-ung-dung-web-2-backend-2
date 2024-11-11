const ContactService = require('../services/contact.service.js');
const MongoDB = require('../utils/mongodb.util.js');
const ApiError = require('../api-error.js');

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const doc = await contactService.create(req.body);
        res.json(doc);
    } catch (err) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
};

exports.findAll = async (req, res, next) => {
    let docs = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) docs = await contactService.findByName(name);
        else docs = await contactService.find({});
        res.json(docs);
    } catch (err) {
        return next(new ApiError(500, "An error occurred while retrieving contacts"));
    }
};

exports.findOne = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) return next(new ApiError(400, "Id is not valid"));
        const contactService = new ContactService(MongoDB.client);
        const doc = await contactService.findById(id);
        if (!doc) return next(new ApiError(404, "Contact not found"));
        res.json(doc);
    } catch (err) {
        return next(new ApiError(500, `Error retrieving contact with id = ${id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);

        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }

        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) return next(new ApiError(400, "Id is not valid"));
        const contactService = new ContactService(MongoDB.client);
        const doc = await contactService.delete(id);
        if (!doc) return next(new ApiError(404, "Contact not found"));
        res.json(doc);
    } catch (err) {
        return next(new ApiError(500, `Could not delete contact with id=${id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};

exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving favorite contacts")
        );
    }
};
