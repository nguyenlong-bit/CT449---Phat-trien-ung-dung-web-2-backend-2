const { ObjectId } = require('mongodb');

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");
    }

    extractContactData(payload) { 
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite === true, 
        };

        Object.keys(contact).forEach((key) => contact[key] === undefined && delete contact[key]); 
        return contact;
    }

    async create(payload) {
        const contact = this.extractContactData(payload);
        const res = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite } },
            { returnDocument: "after", upsert: true }
        );
        return res.value; 
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name, "i") }, 
        });
    }

    async findById(id) {
        if (!ObjectId.isValid(id)) {
            return null; 
        }
        return await this.Contact.findOne({ _id: new ObjectId(id) });
    }

    async update(id, payload) {
        if (!ObjectId.isValid(id)) {
            return null; 
        }
        const filter = { _id: new ObjectId(id) };
        const update = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value; 
    }

    async delete(id) {
        if (!ObjectId.isValid(id)) {
            return null; 
        }
        const result = await this.Contact.findOneAndDelete({
            _id: new ObjectId(id),
        });
        return result.value; 
    }

    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount; 
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }
}

module.exports = ContactService;
