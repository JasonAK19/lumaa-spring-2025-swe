import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req: any, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

router.post('/', async (req: any, res) => {
  try {
    const { title, description } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.id,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
});

router.put('/:id', async (req: any, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const task = await prisma.task.update({
      where: { id: Number(id), userId: req.user.id },
      data: { title, description, isComplete },
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task' });
  }
});

router.delete('/:id', async (req: any, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: Number(id), userId: req.user.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task' });
  }
});

export default router;