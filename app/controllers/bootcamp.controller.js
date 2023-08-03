import db from '../models/index.js';
const { users: User, bootcamps: Bootcamp } = db;

//Crear y guardar un nuevo bootcamp
export const createBootcamp = async (bootcamp) => {
  try {
        const newBootcamp = await Bootcamp.create({
            title: bootcamp.title,
            cue: bootcamp.cue,
            description: bootcamp.description
        });
        console.log(`Creado el bootcamp: ${JSON.stringify(newBootcamp, null, 4)}`);
        return newBootcamp;
    } catch (err) {
        console.log(`Error al crear el bootcamp: ${err}`);
  }
}

// Agregar un usuario a un bootcamp
export const addUser = async (userId, bootcampId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            console.log(`No se encontró el usuario con id=${userId}.`);
            return;
        }
  
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) {
            console.log(`No se encontró el bootcamp con id=${bootcampId}.`);
            return;
        }
  
        await user.addBootcamp(bootcamp);
        console.log(`Se agregó el usuario con id=${userId} al bootcamp con id=${bootcampId}.`);
        } catch (err) {
        console.log(`Error al agregar el usuario al bootcamp: ${err}`);
    }
  }

// Encontrar un bootcamp por su ID e incluir sus usuarios
export const findBootcampById = async (bootcampId) => {
    try {
      const bootcamp = await Bootcamp.findByPk(bootcampId, {
        include: [{
          model: User,
          as: 'users',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: {
            attributes: [],
          }
        }],
      });
      if (!bootcamp) {
        console.log(`No se encontró el bootcamp con id=${bootcampId}.`);
        return;
      }
      console.log(`Se encontró el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`);
      return bootcamp;
    } catch (err) {
      console.log(`Error al encontrar el bootcamp: ${err}`);
    }
}

// Encontrar todos los bootcamps e incluir sus usuarios
export const findAllBootcamps = async () => {
    try {
      const bootcamps = await Bootcamp.findAll({
        include: [{
          model: User,
          as: 'users',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: {
            attributes: [],
          }
        }],
      });
      console.log(`Se encontraron los bootcamp: ${JSON.stringify(bootcamps, null, 4)}`);
      return bootcamps;
    } catch (err) {
      console.log(`Error al encontrar los bootcamps: ${err}`);
    }
  }
  