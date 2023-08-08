import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: number } }) {

    const accessToken = req.headers.get("authorization");

    if(!accessToken || !verifyJwt(accessToken)){
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    try {

        const userPosts = await prisma.post.findMany({
            where: {
                authorId: +params.id
            },
            include: {
                author: {
                    select: {
                        email: true,
                        name: true,
                    }
                }
            }
        })

        return NextResponse.json(userPosts)
    } catch (error) {
        console.log('[USER_ID]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}