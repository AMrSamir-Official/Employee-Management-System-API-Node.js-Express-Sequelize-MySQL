module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("departments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    })

    // Add index for better query performance
    await queryInterface.addIndex("departments", ["name"], {
      name: "idx_departments_name",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("departments")
  },
}
