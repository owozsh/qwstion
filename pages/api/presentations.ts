import handle, { Controller } from "@/lib/handle";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

class PresentationsController implements Controller {
  static async show(_req: NextApiRequest, res: NextApiResponse) {
    const presentations = await prisma.presentation.findMany();

    res.status(200).json(presentations);
  }

  static async create(req: NextApiRequest, res: NextApiResponse) {
    const { title } = req.body;

    const presentation = await prisma.presentation.create({
      data: {
        title,
        slides: [],
      },
    });

    res.status(201).json(presentation);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  handle(req, res)(PresentationsController);
}

