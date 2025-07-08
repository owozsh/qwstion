import { NextApiRequest, NextApiResponse } from "next";

type Action = (req: NextApiRequest, res: NextApiResponse) => void;

export interface Controller {
  show?: Action;
  create?: Action;
  update?: Action;
  delete?: Action;
}

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  return (controller: Controller) => {
    try {
      switch (req.method) {
        case "GET":
          return controller.show?.(req, res);
        case "POST":
          return controller.create?.(req, res);
        case "PUT":
          return controller.update?.(req, res);
        case "DELETE":
          return controller.delete?.(req, res);
        default:
          res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
          return res.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      console.error("API Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
