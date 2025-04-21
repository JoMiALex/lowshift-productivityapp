import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // adjust path if needed
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const uid = searchParams.get('uid');
        const completed = searchParams.get('completed');

        if (!uid) {
            return NextResponse.json({ message: 'Missing uid' }, { status: 400 });
        }

        const checklistRef = collection(db, 'checklists', uid, 'tasks');

        const q = completed !== null
            ? query(checklistRef, where('completed', '==', completed === 'true'))
            : query(checklistRef);

        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json(tasks);
    } catch (error: any) {
        console.error('Error fetching checklist:', error);
        return NextResponse.json(
            { message: 'Error fetching tasks', error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { uid, task } = await req.json();

        if (!uid || !task || typeof task.text !== 'string') {
            return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
        }

        const checklistRef = collection(db, 'checklists', uid, 'tasks');
        const docRef = await addDoc(checklistRef, {
            ...task,
            createdAt: new Date(),
        });

        return NextResponse.json({ id: docRef.id });
    } catch (error: any) {
        console.error('Error adding task:', error);
        return NextResponse.json(
            { message: 'Error adding task', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { uid, id } = await req.json();

        if (!uid || !id) {
            return NextResponse.json({ message: 'Missing uid or id' }, { status: 400 });
        }

        const taskRef = doc(db, 'checklists', uid, 'tasks', id);
        await deleteDoc(taskRef);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting task:', error);
        return NextResponse.json(
            { message: 'Error deleting task', error: error.message },
            { status: 500 }
        );
    }
}
