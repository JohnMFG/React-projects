test('deletes a TV record via the API', async () => {
    const tvIdToDelete = 2;
  
    const response = await fetch(`http://localhost:8050/tv/${tvIdToDelete}`, {
      method: 'DELETE',
    });

    expect(response.status).toBe(200);
  });
  