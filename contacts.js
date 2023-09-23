const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);

    const removedContact = contacts.splice(contact, 1);
    const contactsStringify = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsStringify);

    return removedContact;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const isExist = contacts.some((contact) => contact.phone === phone);

    if (isExist) {
      throw new Error("phone exists");
    }
    const id = contacts[contacts.length - 1].id + 1;
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
