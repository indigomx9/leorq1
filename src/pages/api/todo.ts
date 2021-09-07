import { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "../../models/ITodo";

export default (
    req: NextApiRequest, res: NextApiResponse<ITodo>
): void => {
    res.status(200).json({ id: 1, message: "I am a todo" });
};





