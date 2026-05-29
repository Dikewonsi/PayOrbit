import pool from '../config/db.js';

const getAllClients = async () => {
    const result = await pool.query(`
        SELECT
            id,
            name,
            email,
            phone,
            company,
            address,
            TO_CHAR(date_added, 'YYYY-MM-DD') AS "dateAdded"
        FROM clients
        ORDER BY id DESC
    `);

    return result.rows;
};

const getClientById = async (id) => {
    const result = await pool.query(
        `
        SELECT 
            id,
            name,
            email,
            phone,
            company,
            address,
            TO_CHAR(date_added, 'YYYY-MM-DD') AS "dateAdded"
        FROM clients
        WHERE id = $1
        `,
        [id]
    );

    const client = result.rows[0];

    if (!client) {
        const error = new Error('Client not found');
        error.status = 404;
        throw error; 
    }

    return client;
}

const createClient = async (clientData) => {
    const { name, email, phone, company, address, dateAdded } = clientData;

    // Check for emptiness in forms. later on would make more secure.
    if(!name || !email || !phone || !company || !address || !dateAdded) {
        const error = new Error('All client fields are required');
        error.status = 400;
        throw error;
    }

    const result = await pool.query(
        `
            INSERT INTO clients (name, email, phone, company, address, date_added)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING
                id,
                name,
                email,
                phone,
                company,
                address,
                TO_CHAR(date_added, 'YYYY-MM-DD') AS "dateAdded"
        `,
        [name, email, phone, company, address, dateAdded]
    );

    return result.rows[0];
};

const updateClient = async (id, clientData) => {

    const existingClient = await getClientById(id);

    const name = clientData.name ?? existingClient.name;
    const email = clientData.email ?? existingClient.email;
    const phone = clientData.phone ?? existingClient.phone;
    const company = clientData.company ?? existingClient.company;
    const address = clientData.address ?? existingClient.address;
    const dateAdded = clientData.dateAdded ?? existingClient.dateAdded;

    const result = await pool.query(
        `
        UPDATE clients
        SET
            name = $1,
            email = $2,
            phone = $3,
            company = $4,
            address = $5,
            date_added = $6
        WHERE id = $7
        RETURNING 
            id,
            name,
            email,
            phone,
            company,
            address,
            TO_CHAR(date_added, 'YYYY-MM-DD') AS "dateAdded"
        `,
        [name, email, phone, company, address, dateAdded, id]
    )

    return result.rows[0];
}

const deleteClient = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM clients
        WHERE id = $1
        RETURNING
            id,
            email,
            phone,
            company,
            address,
            TO_CHAR(date_added, 'YYYY-MM-DD') AS "dateAdded"
        `,
        [id]
    );

    const deletedClient = result.rows[0];

    if(!deletedClient) {
        const error = new Error('Client not found');
        error.status = 404;
        throw error;
    }

    return deletedClient;
};

export default {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
};