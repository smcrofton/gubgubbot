module.exports = (sequelize, DataTypes) => {
	return sequelize.define('messages', {
		msg_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
        author_id: {
            type: DataTypes.STRING
        },
		content: {
			type: DataTypes.STRING
		}
	}, {
		timestamps: false,
	});
};