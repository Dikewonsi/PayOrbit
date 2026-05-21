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
            title: 'Website Design',
            amount: 250000,
            status: 'unpaid',
            issueDate: '2026-05-16',
            dueDate: '2026-05-30'
        },
        {
            id: 2,
            clientId: 1,
            invoiceNumber: 'INV-002',
            title: 'Website Development',
            amount: 190000,
            status: 'paid',
            issueDate: '2026-05-19',
            dueDate: '2026-06-01'
        },
        {
            id: 3,
            clientId: 2,
            invoiceNumber: 'INV-003',
            title: 'Mobile App UI Design',
            amount: 320000,
            status: 'paid',
            issueDate: '2026-05-22',
            dueDate: '2026-06-05'
        },
        {
            id: 4,
            clientId: 3,
            invoiceNumber: 'INV-004',
            title: 'E-commerce Integration',
            amount: 450000,
            status: 'overdue',
            issueDate: '2026-05-10',
            dueDate: '2026-05-24'
        },
        {
            id: 5,
            clientId: 2,
            invoiceNumber: 'INV-005',
            title: 'SEO Optimization',
            amount: 120000,
            status: 'unpaid',
            issueDate: '2026-05-28',
            dueDate: '2026-06-12'
        },
        {
            id: 6,
            clientId: 4,
            invoiceNumber: 'INV-006',
            title: 'Brand Identity Package',
            amount: 275000,
            status: 'paid',
            issueDate: '2026-06-02',
            dueDate: '2026-06-16'
        }
    ]
};

export default mockDb;

