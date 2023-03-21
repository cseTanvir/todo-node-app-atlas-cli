module.exports = (sequelize, DataTypes) => {

    const todo = sequelize.define("todos", {
    
        title: {
            type: DataTypes.STRING
        },
    
        description: {
            type: DataTypes.TEXT
        },
        completed: {
            type: DataTypes.BOOLEAN
        }
    
    }, {
        timestamps: false // disable timestamps
    })

    return todo
}