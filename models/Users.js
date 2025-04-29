module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		user_id: {
			type: DataTypes.STRING
		},
        username: {
            type: DataTypes.STRING
        }
	}, {
		timestamps: false,
	});
};