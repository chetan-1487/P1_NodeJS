import { Sequelize } from 'sequelize';

const DATABASE_URL=process.env.DATABASE_CONNECTION;

const sequelize = new Sequelize(DATABASE_URL,{
    logging: false,
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})


try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

sequelize.sync({force: false})

export default sequelize;