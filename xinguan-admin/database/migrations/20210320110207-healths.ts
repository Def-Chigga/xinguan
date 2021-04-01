module.exports = {
  // 在执行数据库升级时调用的函数，创建 healths 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BOOLEAN } = Sequelize;
    await queryInterface.createTable('healths', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      healths_name: {
        type: STRING(255),
        allowNull: false,
      },
      healths_sex: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      healths_job: {
        type: STRING(255),
        allowNull: false,
      },
      healths_heat: {
        type: STRING(255),
        allowNull: false,
      },
      healths_state: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: DATE,
      },
      updated_at: {
        type: DATE,
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 healths 表
  down: async queryInterface => {
    await queryInterface.dropTable('healths');
  },
};
