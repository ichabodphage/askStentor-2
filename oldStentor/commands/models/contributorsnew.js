module.exports = (sequelize, DataTypes) => {
	return sequelize.define('contributorsnew', {
        name: {
			type: DataTypes.STRING,
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