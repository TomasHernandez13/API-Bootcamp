import express from 'express'
import userRoutes from './app/routes/user.routes.js'
import bootcampRoutes from './app/routes/bootcamp.routes.js'

const app = express();
app.use(express.json());
app.use(userRoutes)
app.use(bootcampRoutes)

app.listen(3000, () => {
  console.log('API abierta en el port 3000');
});

//sincronizar tablas y columnas de la base de datos

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Sobreescribiendo y sincronizando la base de datos.');
// });