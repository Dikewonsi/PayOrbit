const mockDb = {
    admins: [
        {
            id: 1,
            name: 'Admin User',
            email: 'admin@payorbit.com',
            passwordHash: '$2b$10$7d13aQqGQP0mbjRtA2MDPeKIbIK4VFLtX6ukFwx1uDJWcDj7yoB8m',
            role: 'admin'
        }
    ],

    clients: [
        {
            id: 1,
            name: 'Pixsoft Solutions',
            address: 'Abuja',
            date: '19-05-1997'
        }
    ],

    invoices: [
        {
         id: 1,
         clientId: 1,
         invoiceNumber: 'INV-001',
         title: 'Website design',
         amount: 250000,
         status: 'unpaid',
         issueDate: '2026-05-16',
         dueDate: '2026-05-30'   
        },
        {
         id: 2,
         clientId: 1,
         invoiceNumber: 'INV-002',
         title: 'Website development',
         amount: 190000,
         status: 'paid',
         issueDate: '2026-05-19',
         dueDate: '2026-06-01'   
        }
    ]
};

export default mockDb;

