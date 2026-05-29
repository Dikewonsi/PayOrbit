import mockDb from '../models/mockDb.js';

const getAllClients = () => {
    return mockDb.clients; 
};

const getClientById = (id) => {
    const clientId = Number(id);

    // find client where id is equal to the id of the arrow function created
    const client = mockDb.clients.find((client) => client.id === clientId);

    if (!client) {
        const error = new Error('Client not found');
        error.status = 404;
        throw error;
    }

    return client;
}

const createClient = (clientData) => {
    const { name, email, phone, company, address, dateAdded } = clientData;

    // Check for emptiness in forms. later on would make more secure.
    if(!name || !email || !phone || !company || !address || !dateAdded) {
        const error = new Error('All client fields are required');
        error.status = 400;
        throw error;
    }

    // Prepare insert 
    const newClient = {
        id: mockDb.clients.length + 1,
        name,
        email,
        phone,
        company,
        address,
        dateAdded
    }

    // add client to mock DB
    mockDb.clients.push(newClient);

    return newClient;
};

const updateClient = (id, clientData) => {
    const client = getClientById(id);

    client.name = clientData.name ?? client.name;
    client.email = clientData.email ?? client.email;
    client.phone = clientData.phone ?? client.phone;
    client.company = clientData.company ?? client.company;
    client.address = clientData.address ?? client.address;
    client.dateAdded = clientData.dateAdded ?? client.dateAdded;

    return client;
}

const deleteClient = (id) => {
    const clientId = Number(id);

    const clientIndex = mockDb.clients.findIndex((client) => client.id === clientId);

    if(clientIndex === -1) {
        const error = new Error('Client not found');
        error.status = 404;
        throw error;
    }

    const deletedClient = mockDb.clients.splice(clientIndex, 1);

    return deletedClient[0];
};

export default {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
};