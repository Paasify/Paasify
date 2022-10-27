import prisma from "../../../lib/prisma";
import sha256 from "crypto-js/sha256";
import { omit } from "lodash";

export default async function handle(req, res) {
    if (req.method === "POST") {
        await handlePOST(res, req);
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
    const user = await prisma.user.findUnique({
        where: {email: req.body.email},
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        },
    });
    if (user && user.password === hashPassword(req.body.password)) {
        res.json(omit(user, ["password"]));
    } else {
        res.status(401).end("Invalid credentials");
    }
}