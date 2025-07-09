import ApiError from "@/lib/apiErrors";
import handle, { Controller } from "@/lib/handle";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

class PresentationController implements Controller {
  static async show(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string | undefined;

    const presentation = await prisma.presentation.findUnique({
      where: {
        id,
      },
    });

    if (presentation) {
      res.status(200).json(presentation);
    } else {
      ApiError.notFound(res)
    }
  }

  static async update(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string | undefined;

    const data = req.body

    const presentation = await prisma.presentation.update({
      where: {
        id,
      },
      data
    });

    if (presentation) {
      res.status(200).json(presentation);
    } else {
      ApiError.notFound(res)
    }
  }

  static async delete(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string | undefined;

    const presentation = await prisma.presentation.delete({
      where: {
        id,
      },
    });

    if (presentation) {
      res.status(200).json(presentation);
    } else {
      ApiError.notFound(res)
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  handle(req, res)(PresentationController);
}

