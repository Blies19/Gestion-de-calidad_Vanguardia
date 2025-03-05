import express from 'express';
import prisma from '../../config/db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { name, url, projectId } = req.body;
  const document = await prisma.document.create({ data: { name, url, projectId } });
  res.json(document);
});

router.get('/:projectId', verifyToken, async (req, res) => {
  const documents = await prisma.document.findMany({ where: { projectId: req.params.projectId } });
  res.json(documents);
});

export default router;
