import { Request, Response } from 'express';
import { Category } from '../../models/category';

export async function createCategory(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    if (!icon || !name) {
      res.status(400).json({
        error: 'Name & Icon are required!',
      });
    }

    const category = await Category.create({
      icon,
      name,
    });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
