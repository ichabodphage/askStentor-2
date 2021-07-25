module.exports = (sequelize, DataTypes) => {
	return sequelize.define('contributorsOld', {
        name: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		memberID: {
			type: DataTypes.STRING,
		},
		role:{
			type: DataTypes.STRING
		}
	}, {
		timestamps: false,
	});
};