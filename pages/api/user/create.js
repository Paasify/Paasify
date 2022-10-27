import prisma from "../../../lib/prisma";
import sha256 from "crypto-js/sha256";

export default async function handle(req, res) {
    if (req.method === "POST") {
        await handlePOST(res, req)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}

const hashPassword = (password) => {
    return sha256(password).toString();
}

// POST /api/user
async function handlePOST(res, req) {
    const userCount = await prisma.user.count();
    if (userCount !== 1) {
        res.status(403).json({ message: "Only one user can be created" });
        return;
    }
    const user = await prisma.user.create({
        data: {...req.body, password: hashPassword(req.body.password)},
    });
    res.json(user);
}