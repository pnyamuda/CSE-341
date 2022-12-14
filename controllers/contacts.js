let Contact = require("../models/contact");


//get all contact documents
module.exports.getAllContacts = async function(req, res) {
    let allContacts = await Contact.find({});
    return res.json(allContacts);
}

//get contact by id
module.exports.getContactById = async function(req, res) {
    let id = req.params.id;
    let contact = await Contact.findById(id);
    return res.json(contact);
}


//post a new contact

module.exports.addNewContact = function(req, res) {

    Contact.create(req.body)
        .then(val => {
            res.statusCode = 201;
            return res.json(val["_id"]);
        }).catch(err => {
            res.statusCode = 500;
            return res.json(err);
        })

}

//update a contact
module.exports.updateContact = function(req, res) {
    let data = req.body;
    Contact.findByIdAndUpdate(req.params.id, data)
        .then(val => {
            res.statusCode = 204;
            return res.json({ "message": "The contact was successfully updated." });
        })
        .catch(err => {
            res.statusCode = 500;
            return res.json(err)
        })
}


//delete a contact
module.exports.deleteContact = function(req, res) {
    Contact.findByIdAndRemove(req.params.id)
        .then(val => res.json({ "message": "The contact was successfully deleted." }))
        .catch(err => res.json(err))
}