const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        static associate(models){

        }
    }

    Profile.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        profile:{
            type: DataTypes.STRING,
            allowNull : false
        }
    },{
        sequelize,
        modelName: 'Profile',
        tableName: 'profiles',
        timestamps: true
    });

    return Profile;

}