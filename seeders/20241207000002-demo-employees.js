module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "employees",
      [
        // HR Department (id: 1)
        {
          name: "Sarah Johnson",
          email: "sarah.johnson@company.com",
          salary: 75000.0,
          department_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Michael Brown",
          email: "michael.brown@company.com",
          salary: 68000.0,
          department_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Engineering Department (id: 2)
        {
          name: "David Wilson",
          email: "david.wilson@company.com",
          salary: 95000.0,
          department_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Emily Davis",
          email: "emily.davis@company.com",
          salary: 88000.0,
          department_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "James Miller",
          email: "james.miller@company.com",
          salary: 92000.0,
          department_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Lisa Anderson",
          email: "lisa.anderson@company.com",
          salary: 85000.0,
          department_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Marketing Department (id: 3)
        {
          name: "Robert Taylor",
          email: "robert.taylor@company.com",
          salary: 72000.0,
          department_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Jennifer White",
          email: "jennifer.white@company.com",
          salary: 69000.0,
          department_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Christopher Lee",
          email: "christopher.lee@company.com",
          salary: 74000.0,
          department_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Sales Department (id: 4)
        {
          name: "Amanda Garcia",
          email: "amanda.garcia@company.com",
          salary: 78000.0,
          department_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Daniel Martinez",
          email: "daniel.martinez@company.com",
          salary: 76000.0,
          department_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Jessica Rodriguez",
          email: "jessica.rodriguez@company.com",
          salary: 73000.0,
          department_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Finance Department (id: 5)
        {
          name: "Matthew Thompson",
          email: "matthew.thompson@company.com",
          salary: 82000.0,
          department_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ashley Clark",
          email: "ashley.clark@company.com",
          salary: 79000.0,
          department_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Operations Department (id: 6)
        {
          name: "Kevin Lewis",
          email: "kevin.lewis@company.com",
          salary: 71000.0,
          department_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Michelle Walker",
          email: "michelle.walker@company.com",
          salary: 67000.0,
          department_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employees", null, {})
  },
}
