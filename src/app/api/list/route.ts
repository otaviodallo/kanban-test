import { NextResponse } from 'next/server';
import { db } from '../../../db/index';

export async function POST(req: Request) {
    try {
        const { title, description } = (await req.json()) as {
            title: string;
            description: string;
        };
        
        const newList = await db.list.create({
            data: {
                title,
                description,
            },
        });
        
        return NextResponse.json(newList);
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: e.message,
            }),
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const { id, title, description } = (await req.json()) as {
            id: number;
            title: string;
            description: string | null;
        };
        
        const updatedList = await db.list.update({
            where: {
                id,
            },
            data: {
                title,
                description,
            },
        });

        if (!updatedList) {
            return new NextResponse(
                JSON.stringify({
                    status: "error",
                    message: "List not found",
                }),
                { status: 404 }
            );
        }

        return NextResponse.json(updatedList);
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: e.message,
            }),
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const lists = await db.list.findMany({
            include: {
                tasks: true
            }
        });
        return NextResponse.json(lists);
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: e.message,
            }),
            { status: 500 }
        );
    }
}

// export async function DELETE(req: any) {
//     try {
//         const urlParams = new URLSearchParams(req.url.split('?')[1]);
//         const id = urlParams.get('listId');
//         const parsedId = parseInt(id);
//         const list = await db.list.delete({
//             where: {
//                 id: id
//             }
//         })
//     }
// }