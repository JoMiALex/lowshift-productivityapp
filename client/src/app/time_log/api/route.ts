import { NextRequest, NextResponse } from "next/server";
import {
    collection,
    query,
    where,
    getDocs,
    Timestamp,
    QueryDocumentSnapshot,
    DocumentData,
    orderBy
} from 'firebase/firestore';
import {  db } from '../../../../lib/firebase';
import { TimeLogEntry } from "../TimeLog";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get('type');
        const employ_id = searchParams.get('employ_id');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        console.log('API Request params:', { type, employ_id, startDate, endDate });

        if(type === 'payCodes') {
            //fetching paycodes
            const clockingRef = collection(db, 'clocking');
            const q = query(clockingRef);

            const querySnapshot = await getDocs(q);

            //getting specific paycodes
            const payCodes = new Set<string>();
            querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                const data = doc.data();
                if (data.pay_code) {
                    payCodes.add(data.pay_code);
                } else {
                    payCodes.add('Regular');
                }
            });

            return NextResponse.json(Array.from(payCodes));
        }

        if (!employ_id) {
            console.error('Missing employ_id parameter');
            return NextResponse.json(
                { message: 'employ_id parameter is required'},
                { status: 400 }
            );
        }
 
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();

        console.log('Query parameters:', {
            employ_id,
            start: start.toISOString(),
            end: end.toISOString()
        });

        

        const clockingRef = collection(db, 'clocking');
        try {
            const q = query(
                clockingRef,
                where('employ_id', '==', employ_id)
            );

            console.log('Executing Firestoe query...');
            const querySnapshot = await getDocs(q);
            console.log('Query completed, found documents:', querySnapshot.size);

            const entries: TimeLogEntry[] = [];

            querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                const data = doc.data();
                const entryStart = data.start.toDate();
                
                if (entryStart >= start && entryStart <= end) {
                    entries.push({
                        id: doc.id,
                        employ_id:  data.employ_id,
                        start: entryStart,
                        end: data.end.toDate(),
                        hours: data.hours || 0,
                        pay_code: data.pay_code || 'Regular',
                        comments: data.comments || ''
                    });
                }
            });

        entries.sort((a, b) => a.start.getTime() - b.start.getTime());

        console.log('Returning filtered and sorted entries:', entries.length);
        return NextResponse.json(entries);
    } catch (error: any) {
        console.error('Firestore query error:', error);
        return NextResponse.json(
            {
                message: 'Error fetching time logs',
                error: error.message
            },
            { status: 500 }
        );
    }
    } catch (error: any) {
        console.error('Error in time-logs API', error);
        return NextResponse.json(
            {
                message: 'Internal server error',
                error: error.message
            },
            { status: 500 }
        );
    }
}
       