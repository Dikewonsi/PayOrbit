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
            name: 'Jeffrey Isibor',
            email: 'pixsoft@gmail.com',
            phone: '08034909154',
            company: 'Pixsoft Software Solutions',
            address: 'Abuja, FCT',
            dateAdded: '19-05-2025'
        },
        {
            id: 2,
            name: 'Ruth Garuba',
            email: 'ruth@gmail.com',
            phone: '08144529391',
            company: 'University of Salford',
            address: 'Salford, Manchster',
            dateAdded: '11-09-2025'
        },
        {
            id: 3,
            name: 'Michael Adeyemi',
            email: 'michael@bluewave.com',
            phone: '08061122334',
            company: 'BlueWave Technologies',
            address: 'Lagos, Nigeria',
            dateAdded: '03-01-2026'
        },
        {
            id: 4,
            name: 'Sarah Johnson',
            email: 'sarah@primeholdings.com',
            phone: '+44 7712 345678',
            company: 'Prime Holdings Ltd',
            address: 'London, United Kingdom',
            dateAdded: '15-02-2026'
        },
        {
            id: 5,
            name: 'David Okafor',
            email: 'david@ecowise.com',
            phone: '08133445566',
            company: 'EcoWise Energy',
            address: 'Port Harcourt, Rivers',
            dateAdded: '28-02-2026'
        },
        {
            id: 6,
            name: 'Amanda Lewis',
            email: 'amanda@brightmedia.com',
            phone: '+1 202 555 0198',
            company: 'Bright Media Group',
            address: 'Washington DC, USA',
            dateAdded: '10-03-2026'
        },
        {
            id: 7,
            name: 'Chinedu Eze',
            email: 'chinedu@naijafix.com',
            phone: '08098765432',
            company: 'NaijaFix Services',
            address: 'Enugu, Nigeria',
            dateAdded: '24-03-2026'
        },
        {
            id: 8,
            name: 'Fatima Bello',
            email: 'fatima@veltomarkets.com',
            phone: '07012345678',
            company: 'Velto Markets',
            address: 'Kano, Nigeria',
            dateAdded: '12-04-2026'
        },
        {
            id: 9,
            name: 'James Carter',
            email: 'james@auravitale.com',
            phone: '+1 425 555 0147',
            company: 'Aura Vitale PLLC',
            address: 'Seattle, Washington, USA',
            dateAdded: '02-05-2026'
        },
        {
            id: 10,
            name: 'Blessing Nwosu',
            email: 'blessing@creativehub.ng',
            phone: '08155667788',
            company: 'Creative Hub Africa',
            address: 'Owerri, Imo State',
            dateAdded: '18-05-2026'
        },
        {
            id: 11,
            name: 'Samuel Ojo',
            email: 'samuel@nextgenlogistics.com',
            phone: '08022334455',
            company: 'NextGen Logistics',
            address: 'Ibadan, Oyo State',
            dateAdded: '01-06-2026'
        },
        {
            id: 12,
            name: 'Grace Williams',
            email: 'grace@fintrust.com',
            phone: '+44 7911 223344',
            company: 'FinTrust Advisory',
            address: 'Birmingham, United Kingdom',
            dateAdded: '05-06-2026'
        },
        {
            id: 13,
            name: 'Ahmed Musa',
            email: 'ahmed@smartfarm.ng',
            phone: '07044556677',
            company: 'SmartFarm Technologies',
            address: 'Kaduna, Nigeria',
            dateAdded: '09-06-2026'
        },
        {
            id: 14,
            name: 'Jessica Brown',
            email: 'jessica@cloudpeak.io',
            phone: '+1 415 555 0176',
            company: 'CloudPeak Solutions',
            address: 'San Francisco, California, USA',
            dateAdded: '14-06-2026'
        },
        {
            id: 15,
            name: 'Emeka Nnadi',
            email: 'emeka@digitallink.africa',
            phone: '08177889900',
            company: 'DigitalLink Africa',
            address: 'Awka, Anambra State',
            dateAdded: '20-06-2026'
        }
    ],
    invoices: [
        {
            id: 1,
            clientId: 1,
            invoiceNumber: 'INV-001',
            title: 'Website Design',
            amount: 250000,
            status: 'paid',
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
            status: 'unpaid',
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

