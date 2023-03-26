'use strict';
const bcrypt = require("bcryptjs")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let users = [
      {
        name:"ian",
        username:"ian",
        password:bcrypt.hashSync("12345")
      },
      {
        name:"user1",
        username:"user1",
        password:bcrypt.hashSync("12345")
      },
      {
        name:"user2",
        username:"user2",
        password:bcrypt.hashSync("12345")
      }
    ]
    await queryInterface.bulkInsert('Users',users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
