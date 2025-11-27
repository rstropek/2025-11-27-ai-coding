import { NextRequest, NextResponse } from 'next/server';
import { broadcastNotification } from './stream/route';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the notification structure
    if (!body.title || !body.text || !body.icon) {
      return NextResponse.json(
        { error: 'Missing required fields: title, text, and icon are required' },
        { status: 400 }
      );
    }

    const notification = {
      title: body.title,
      text: body.text,
      icon: body.icon,
    };

    // Broadcast to all connected SSE clients
    broadcastNotification(notification);

    return NextResponse.json({ success: true, notification }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}

