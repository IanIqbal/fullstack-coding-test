'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NodeLabel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NodeLabel.belongsTo(models.OrganizationNode)
    }
  }
  NodeLabel.init({
    label: DataTypes.INTEGER,
    parent: DataTypes.INTEGER,
    OrganizationNodeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NodeLabel',
  });
  return NodeLabel;
};