import { NextResponse } from "next/server";


interface RequestBody {
    title: string;
    file: string;
}

export async function POST(req: Request) {
    try {
        

    } catch (error) {
        console.error('[UPLOAD] Error:', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}