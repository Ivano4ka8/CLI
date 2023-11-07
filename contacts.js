const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

class CLI {
  constructor(path) {
    this.path = contactsPath;
  }

  listContacts = async () => {
    const contacts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(contacts);
  };

  getContactById = async (contactId) => {
    const contacts = await this.listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      console.log("Contact not found");
      return null;
    }
    return contacts[idx];
  };

  removeContact = async (contactId) => {
    const contacts = await this.listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      console.log("Contact not found");
      return null;
    }
    contacts.splice(idx, 1);
    await fs.writeFile(this.path, JSON.stringify(contacts, null, 2));
    return contacts[idx];
  };

  addContact = async ({ name, email, phone }) => {
    const contacts = await this.listContacts();
    const newContact = {
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(this.path, JSON.stringify(contacts, null, 2));
    return newContact;
  };
}

module.exports = CLI;
