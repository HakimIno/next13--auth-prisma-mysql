import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: Request) {

    try {
        const body: RequestBody = await req.json();

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: await bcrypt.hash(body.password, 10)
            }
        })

        const { password, ...result } = user;



        return NextResponse.json(result);

    } catch (error) {
        console.log('[SIGNUP]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}