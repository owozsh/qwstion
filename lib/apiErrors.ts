import { NextApiResponse } from "next";

const ApiError = {
  notFound(res: NextApiResponse) {
    return res.status(404).json({
      error: "Not Found",
      message: "Not Found",
    });
  }
}

export default ApiError