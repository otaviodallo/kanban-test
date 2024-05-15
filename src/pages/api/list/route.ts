import { db } from '../../../db/index';

export async function POST(title: string, description: string) {
    return db.list.create({
        data: {
            title,
            description,
        },
    });
}

export async function updateList(
    id: number,
    title: string,
    description: string
) {
    db.list.update({
        where: {
            id: id,
        },
        data: {
            title,
            description,
        },
    });
}

export async function findAllList() {
    return db.list.findMany({});
}

