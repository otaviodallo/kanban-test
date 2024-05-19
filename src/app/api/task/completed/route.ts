import { NextResponse } from 'next/server';
import { db } from '../../../../db/index';

export async function GET(req: Request) {
    try {
        console.log(req);
        const urlParams = new URLSearchParams(req.url.split('?')[1]);
        const id = urlParams.get('id');
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
