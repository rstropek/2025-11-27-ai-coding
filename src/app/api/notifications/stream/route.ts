import { NextRequest } from 'next/server';

// In-memory set to track all connected SSE clients
const clients = new Set<ReadableStreamDefaultController>();

// Function to broadcast a notification to all connected clients
export function broadcastNotification(notification: { title: string; text: string; icon: string }) {
  const data = `data: ${JSON.stringify(notification)}\n\n`;
  
  clients.forEach((controller) => {
    try {
      controller.enqueue(new TextEncoder().encode(data));
    } catch (error) {
      // Client might be disconnected, remove it
      clients.delete(controller);
    }
  });
}

export async function GET(request: NextRequest) {
  // Create a readable stream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Add this client to the set
      clients.add(controller);

      // Send initial comment to establish connection
      controller.enqueue(new TextEncoder().encode(': connected\n\n'));

      // Clean up when connection closes
      request.signal.addEventListener('abort', () => {
        clients.delete(controller);
        try {
          controller.close();
        } catch (e) {
          // Controller might already be closed
        }
      });
    },
    cancel() {
      // Clean up when stream is cancelled
      clients.delete(this as any);
    }
  });

  // Return SSE response
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

