
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

class PresentationController {
  static async show(_req: NextApiRequest, res: NextApiResponse) {
    const presentations = await prisma.presentation.findMany();

    return res.status(200).json(presentations);
  }

  static async create(req: NextApiRequest, res: NextApiResponse) {
    const { title } = req.body

    const presentation = await prisma.presentation
      .create({
        data: {
          title,
          slides: [],
        },
      })

    return res.status(201).json(presentation);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        return await PresentationController.show(req, res);
      case 'POST':
        return await PresentationController.create(req, res);
      case 'PUT':
      case 'DELETE':
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}