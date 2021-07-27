import { NextApiRequest, NextApiResponse } from "next";
import { IPerson } from "../../../models/IPerson";

export default (
    req: NextApiRequest, 
    res: NextApiResponse<IPerson>
): void => {
    res.status(200)
    .json({
        id: "1", 
        name: "Kola Franklin", 
        age: 16,
    });
};





