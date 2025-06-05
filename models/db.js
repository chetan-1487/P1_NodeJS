import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL=process.env.DATABASE_CONNECTION;

const sequelize = new Sequelize(DATABASE_URL,{
    logging: false,
})


try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

sequelize.sync({force: false})

export default sequelize;