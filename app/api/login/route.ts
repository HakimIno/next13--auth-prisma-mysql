import { signJwtAccessToken } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

interface RequestBody {
    username: string;
    password: string;
}


export async function POST(req: Request) {

    try {
        const body: RequestBody = await req.json();

        const user = await prisma.user.findFirst({
            where: {
                email: body.username,
            }
        })

        if (user && (await bcrypt.compare(body.password, user.password))) {
            const { password, ...userWithoutPass } = user;

            const accessToken = signJwtAccessToken(userWithoutPass);

            const result = {
                ...userWithoutPass,
                accessToken
            }

            return NextResponse.json(result);

        } else return NextResponse.json(null);

    } catch (error) {
        console.log('[SIGNIN]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}