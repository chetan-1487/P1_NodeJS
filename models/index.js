const {Sequelize}= require("sequelize")

const sequelize = new Sequelize('postgres://postgres:chetan@127.0.0.1:5432/User_blog',{
    logging: false,
})

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

sequelize.sync({force: false})

module.exports= sequelize