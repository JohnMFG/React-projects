import React, { useState, useEffect } from 'react';

export default function StreamingTable() {
    const [streamedData, setStreamedData] = useState([]);

    useEffect(() => {
        const streamingUrl = 'http://localhost/api/streaming.php';

        const eventSource = new EventSource(streamingUrl);

        eventSource.onmessage = (event) => {
            const newData = event.data;
            setStreamedData((prevData) => [...prevData, newData]);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div className="container mt-4">
            <h1>Streaming Data Table</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {streamedData.map((data, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
