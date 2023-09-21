test('retrieves TV info via the API', async () => {

    const expectedTvData = {
      brand: 'LG',
      model: 'LG1',
      resolution: '720',
      price: '200',
    };


    const response = await fetch('http://localhost:8050/tv/1'); 
  

    expect(response.status).toBe(200);
  

    const responseData = await response.json();
    expect(responseData.brand).toBe(expectedTvData.brand);
    expect(responseData.model).toBe(expectedTvData.model);
    expect(responseData.resolution).toBe(expectedTvData.resolution);
    expect(responseData.price).toBe(expectedTvData.price);
  });
  