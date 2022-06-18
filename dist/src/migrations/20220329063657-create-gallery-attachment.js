'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GalleryAttachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gallery_id: {
        type: Sequelize.INTEGER
      },
      attachment_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      attachment_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_image: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      mongo_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      video_link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GalleryAttachments');
  }
};