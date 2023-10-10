import React, { useEffect } from 'react';

function StreamingApp() {
    
    useEffect(() => {
        const eventSource = new EventSource('api/streaming.php');

        eventSource.onmessage = (event) => {
            const message = event.data;
            console.log('Received message:', message);
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
           
        </div>
    );
}

export default StreamingApp;
