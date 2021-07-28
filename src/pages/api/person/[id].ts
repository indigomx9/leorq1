import { NextApiRequest, NextApiResponse } from "next";
import { IPerson } from "../../../models/IPerson";

export default (
    req: NextApiRequest,
    res: NextApiResponse<IPerson | Error>
): void => {
    const {
        query: { id },
    } = req;

    if (typeof id === "string") {
        console.log(`getting person by id: ${id}`);
        res.status(200).json({ id, name: "Kola Franklin", age: 16 });
    } else {
        res.status(500).json(new Error("id is NOT of correct type!"));
    }
};




