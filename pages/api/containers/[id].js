import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// DELETE /api/containers/:id
export default async function handle(req, res) {
    const containerId = req.query.id;
    const session = await getSession({ req });

    if (req.method === "DELETE") {
        if (session) {
            const container = await prisma.container.delete({
                where: { id: Number(containerId) },
            });
            res.json(contaienr)
        } else {
            res.status(401).send({ message: "Unauthorized" });
        }
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}