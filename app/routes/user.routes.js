import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.js';
import { emailExists } from '../middleware/verifySignUp.js';

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { email } = req.body;
    if (await emailExists(email)) {
      res.status(400).json({ message: 'El email ya existe' });
      return;
    }
    console.log('Calling createUser with data:', req.body);
    const newUser = await userController.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userController.authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get('/user/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userController.findUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `Usuario con id ${userId} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user', verifyToken, async (req, res) => {
  try {
    const users = await userController.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/user/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    console.log('Calling updateUserById with data:', req.body);
    await userController.updateUserById(userId, userData);
    res.status(200).json({ message: `Usuario con id ${userId} actualizado exitosamente` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/user/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    await userController.deleteUser(userId);
    res.status(200).json({ message: `Usuario con id ${userId} eliminado exitosamente` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;