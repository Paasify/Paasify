import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const userId = req.query.id;
    if (req.method === "GET") {
        handleGET(userId, res);
    } else if (req.method === "POST") {
        handlePOST(userId, res, req);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}

// GET /api/user/:id
async function handleGET(userId, res) {
    const user = await prisma.user.findUnique({
        where: {
            id: String(userId),
        },
    });
    res.json(user);
}

// GET /api/user/:id
async function handlePOST(userId, res, req) {
    const user = await prisma.user.update({
        where: {
            id: String(userId),
        },
        data: {...req.body},
    });
    res.json(user);
}

// DELETE api/user/:id
// async function handleDELETE(userId, res) {
//     const user = await prisma.user.delete({
//         where: {
//             id: String(userId),
//         },
//     });
//     res.json(user);
// }