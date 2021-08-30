module.exports = (sequelize, DataTypes) => {
	return sequelize.define('words', {
		name: {
			type: DataTypes.TEXT,
		},
		coiner:{
			type: DataTypes.TEXT
		},
		shortDef: {
			type: DataTypes.TEXT
		},
		longDef:{
			type: DataTypes.TEXT
		},
		category:{
			type: DataTypes.TEXT
		},
		index:{
			type: DataTypes.INTEGER
		}
	}, {
		timestamps: false,
	});
};