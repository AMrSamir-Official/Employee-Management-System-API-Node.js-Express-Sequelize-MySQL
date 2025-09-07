module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      salary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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

    // Add indexes for better query performance
    await queryInterface.addIndex("employees", ["email"], {
      name: "idx_employees_email",
    })

    await queryInterface.addIndex("employees", ["department_id"], {
      name: "idx_employees_department_id",
    })

    await queryInterface.addIndex("employees", ["name"], {
      name: "idx_employees_name",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employees")
  },
}
