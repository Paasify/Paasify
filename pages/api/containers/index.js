import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// POST /api/container
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const {title, content} = req.body;
    const session = await getSession({ req });

    if (session) {
        const result = await prisma.container.create({
            data: {
                title: title,
                content: content,
            },
        })
        res.json(result);
    } else {
        res.status(401).send({ message: "Unauthorized" });
    }
}