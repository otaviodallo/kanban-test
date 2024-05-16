import { db } from '../../../db/index';
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const { title, description, listId, finishUntil } = (await req.json()) as {
            title: string;
            description: string;
            listId: number,
            finishUntil: Date
        };
        console.log(title, description, finishUntil)
        const task = await db.task.create({
            data: {
                title,
                description,
                listId,
                finishUntil
            }
        })
        return NextResponse.json({
            task: {
                name: task.title,
                email: task.description,
                listId: task.listId,
                finishUntil: task.finishUntil
            },
        });
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

export async function PUT(
    req: Request
) {
    try {
        const { id, title, description, listId, finishUntil } = (await req.json()) as {
            id: number;
            title: string;
            description: string;
            listId: number;
            finishUntil: Date
        };
        console.log(title, description, listId, finishUntil)
        const task = await db.task.update({
            where: { id },
            data: {
                title,
                description,
                listId,
                finishUntil
            }
        });

        if (!task) {
            return new NextResponse(
                JSON.stringify({
                    status: "error",
                    message: "Task not found",
                }),
                { status: 404 }
            );
        }

        return NextResponse.json({
            task: {
                name: task.title,
                email: task.description,
                listId: task.listId,
                finish: task.finishUntil
            },
        });
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

export async function GET(req: any) {
    try {
        const urlParams = new URLSearchParams(req.url.split('?')[1]);
        const id = urlParams.get('listId');
        if (!id) {
            throw new Error('ID não fornecido na rota.');
        }
        const parsedId = parseInt(id);
        const tasks = await db.task.findMany({
            where: { listId: parsedId }
        });
        return NextResponse.json(tasks);
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

export async function DELETE(req: any) {
    try {
        const { id } = (await req.json()) as {
            id: number;
        };
        await db.task.delete({
            where: {
                id: id
            }
        })
        console.log(id)
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