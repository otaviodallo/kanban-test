import { db } from '../../../db/index';

export async function create(
    title: string,
    description: string,
    listId: number
) {
    return await db.task.create({
        data: {
            title,
            description,
            listId,
        },
    });
}

export async function update(
    id: number,
    title: string,
    description: string,
    listId: number
) {
    return await db.task.update({
        where: {
            id,
        },
        data: {
            title,
            description,
            listId,
        },
    });
}

export async function findAll() {
    return await db.task.findMany({});
}
