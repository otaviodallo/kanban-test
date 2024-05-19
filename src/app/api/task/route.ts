import { NextResponse } from 'next/server';
import { db } from '../../../db/index';

export async function POST(req: Request) {
    try {
        const { title, listId, finishUntil } = (await req.json()) as {
            title: string;
            listId: number;
            finishUntil: Date;
        };
        const task = await db.task.create({
            data: {
                title,
                listId,
                finishUntil,
            },
        });
        return NextResponse.json({
            task: {
                name: task.title,
                listId: task.listId,
                finishUntil: task.finishUntil,
            },
        });
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: 'error',
                message: e.message,
            }),
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const { id, title, listId, finishUntil, completedAt } =
            (await req.json()) as {
                id: number;
                title: string;
                listId: number;
                finishUntil: Date;
                completedAt: Date;
            };
        const task = await db.task.update({
            where: { id },
            data: {
                title,
                listId,
                finishUntil,
                completedAt,
            },
        });

        if (!task) {
            return new NextResponse(
                JSON.stringify({
                    status: 'error',
                    message: 'Task not found',
                }),
                { status: 404 }
            );
        }

        return NextResponse.json({
            task: {
                name: task.title,
                listId: task.listId,
                finish: task.finishUntil,
            },
        });
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: 'error',
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
            where: { listId: parsedId },
        });
        return NextResponse.json(tasks);
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: 'error',
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
        const task = await db.task.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json(task);
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: 'error',
                message: e.message,
            }),
            { status: 500 }
        );
    }
}
