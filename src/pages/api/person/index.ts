import { NextApiRequest, NextApiResponse } from "next";
import { IPerson } from "../../../models/IPerson";

export default (
    req: NextApiRequest, 
    res: NextApiResponse<IPerson>
): void => {
    console.log("getting person");
    res.status(200)
    .json({
        id: "1", 
        name: "Henry Quartermain", 
        age: 18,
    });
};





