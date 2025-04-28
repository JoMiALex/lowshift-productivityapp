import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/../lib/firebase';
import { collection, getDocs, doc, updateDoc, query, addDoc, deleteDoc } from 'firebase/firestore';

const TASKS_COLLECTION = 'tasks'; // Shared collection for all users

export async function GET(req: NextRequest) {
    try {
        const tasksRef = collection(db, TASKS_COLLECTION);
        const querySnapshot = await getDocs(query(tasksRef));
        const tasks = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json(tasks);
    } catch (error: any) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json(
            { message: 'Error fetching tasks', error: error.message },
            { status: 400 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { id, updates } = await req.json();

        if (!id || typeof updates !== 'object') {
            return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
        }

        const taskRef = doc(db, TASKS_COLLECTION, id);
        await updateDoc(taskRef, updates);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error updating task:', error);
        return NextResponse.json(
            { message: 'Error updating task', error: error.message },
            { status: 400 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { task } = await req.json();

        if (!task || typeof task.text !== 'string' || typeof task.completed !== 'boolean') {
            return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
        }

        const tasksRef = collection(db, TASKS_COLLECTION);
        const docRef = await addDoc(tasksRef, {
            ...task,
            createdAt: new Date(),
        });

        return NextResponse.json({ id: docRef.id });
    } catch (error: any) {
        console.error('Error adding task:', error);
        return NextResponse.json(
            { message: 'Error adding task', error: error.message },
            { status: 400 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: 'Missing task ID' }, { status: 400 });
        }

        const taskRef = doc(db, TASKS_COLLECTION, id);
        await deleteDoc(taskRef);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting task:', error);
        return NextResponse.json(
            { message: 'Error deleting task', error: error.message },
            { status: 400 }
        );
    }
}