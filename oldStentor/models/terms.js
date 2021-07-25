module.exports = (sequelize, DataTypes) => {
	return sequelize.define('terms', {
		name: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		coiner:{
			type: DataTypes.STRING
		},
		shortDef: {
			type: DataTypes.TEXT
		},
		longDef:{
			type: DataTypes.TEXT
		},
		category:{
			type: DataTypes.STRING
		}
	}, {
		timestamps: false,
	});
};