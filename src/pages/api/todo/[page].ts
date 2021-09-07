import { NextApiRequest, NextApiResponse } from "next";
import { IPaginated } from "../../../models/IPaginated";
import { ITodo } from "../../../models/ITodo";

export default (
    req: NextApiRequest, 
    res: NextApiResponse<IPaginated | Error>
): void => {
    const {query: { page }} = req;
    if (typeof page === "string") {
        console.log(`getting page number: ${page}`);
        const returnTodos: ITodo[] = [];
        const nums = parseInt(page) * 5;
        for (let i = nums; i < nums + 5; i += 1) {
            const returnTodo: ITodo = {
                id: i,
                message: `Todo number: ${i}`,
            };
            returnTodos.push(returnTodo);
        };
        res.status(200).json({todos: returnTodos, hasMore: page !== "4"});
    } else {
        res.status(500).json(new Error("ID is the wrong type!"))
    }
};





