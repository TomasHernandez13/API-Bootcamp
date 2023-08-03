import db from '../models/index.js';
const { users: User, bootcamps: Bootcamp } = db;
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { secret } from '../config/auth.config.js';

// Crear y Guardar Usuarios
export const createUser = async (user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword
        });
        console.log(`Se ha creado el usuario: ${JSON.stringify(newUser, null, 4)}`);
        return newUser;
    } catch (err) {
        console.log(`Error al crear el usuario ${err}`);
    }
}

export const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw error;
  }
}

// obtener los bootcamps de un usuario
export const findUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            include: [{
                model: Bootcamp,
                as: "bootcamps",
                attributes: ["id", "title"],
                through: {
                    attributes: [],
                }
            }],
        });
        console.log(`Se encontró el usuario con id: ${userId} ${JSON.stringify(user, null, 4)}`);
        return user;
    } catch (err) {
        console.log(`>> Error mientras se encontraba el usuario: ${err}`);
    }
}

//obtener todos los usuarios incluyendo los bootcamps
export const findAll = async () => {
    try {
        const users = await User.findAll({
            include: [{
                model: Bootcamp,
                as: "bootcamps",
                attributes: ["id", "title"],
                through: {
                    attributes: [],
                }
            }],
        });
        console.log(`Se encontraron los usuarios: ${JSON.stringify(users, null, 4)}`);
        return users;
    } catch (err) {
        console.log(`Error mientras se encontraban los usuarios: ${err}`);
    }
}

//actualizar usuario por id
export const updateUserById = async (userId, userData) => {
    try {
        const user = await User.update(userData, {
            where: { id: userId }
        });
        if (user[0] === 1) {
            console.log(`Se ha actualizado el usuario con id=${userId}.`);
        } else {
            console.log(`No se pudo actualizar el usuario con id=${userId}.`);
        }
    } catch (err) {
        console.log(`Error al actualizar el usuario ${err}`);
    }
}

//eliminar usuario por id
export const deleteUser = async (userId) => {
    try {
        const user = await User.destroy({
            where: { id: userId }
        });
        if (user === 1) {
            console.log(`Se ha eliminado el usuario con id=${userId}.`);
        } else {
            console.log(`No se pudo eliminar el usuario con id=${userId}.`);
        }
    } catch (err) {
        console.log(`Error al eliminar el usuario ${err}`);
    }
}