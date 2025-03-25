import { NextRequest, NextResponse } from 'next/server';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  Timestamp,
  db 
} from '../../../lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    if (type === 'payCodes') {
      // Fetch unique pay codes
      const clockingRef = collection(db, 'clocking');
      const q = query(clockingRef);
      
      const querySnapshot = await getDocs(q);
      
      // Extract unique pay codes
      const payCodes = new Set<string>();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.pay_code) {
          payCodes.add(data.pay_code);
        } else {
          // Add default if no pay code exists
          payCodes.add('Regular');
        }
      });

      return NextResponse.json(Array.from(payCodes));
    }

    // Existing time logs fetch logic
    const startDate = searchParams.get('startDate');
    
    if (!startDate) {
      return NextResponse.json(
        { message: 'startDate parameter is required' },
        { status: 400 }
      );
    }
    
    const start = new Date(startDate);
    const end = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : new Date(startDate);
    
    const clockingRef = collection(db, 'clocking');
    const q = query(
      clockingRef,
      where('start', '>=', Timestamp.fromDate(start)),
      where('start', '<=', Timestamp.fromDate(end))
    );
    
    const querySnapshot = await getDocs(q);
    const entries: any[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        id: doc.id,
        ...data,
        start: data.start.toDate(),
        end: data.end.toDate()
      });
    });
    
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error in time-logs API:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}