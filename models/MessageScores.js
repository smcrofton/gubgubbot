module.exports = (sequelize, DataTypes) => {
	return sequelize.define('messagescores', {
		msg_id: {
			type: DataTypes.STRING
		},
		author_id: {
			type: DataTypes.STRING
		},
		user_id: {
			type: DataTypes.STRING
		},
        score: {
            type: DataTypes.INTEGER
        }
	}, {
		timestamps: false,
	});
};