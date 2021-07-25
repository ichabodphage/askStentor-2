module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.removeConstraint('words', 'PRIMARY');
    }
  };
  