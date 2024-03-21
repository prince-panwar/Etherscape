import prisma from "../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const json = (param: any): any => {
    return JSON.stringify(
      param,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
};

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId, candidate } = req.body;

        // Check if userId or candidate is undefined or null
        if (!userId || !candidate) {
            return res.status(400).json({ error: "UserId and candidate are required" });
        }

        // Create a new vote
        const result = await prisma.vote.create({
            data: {
                userId: userId,
                candidate: candidate
            },
        });

        res.status(200).send(json(result));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}