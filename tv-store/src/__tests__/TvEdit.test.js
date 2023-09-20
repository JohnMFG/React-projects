test('edits a TV via the API with validation', async () => {
    const updatedTv = {
      id: 1,
      brand: 'LG',
      model: 'LG1',
      resolution: '720', 
      price: '200',
    };

    if (updatedTv.brand.trim() === "") {
      throw new Error("(EDIT) Brand is required");
    }
  
    if (updatedTv.model.trim() === "") {
      throw new Error("(EDIT) Model is required");
    }
  
    const parsedResolution = parseFloat(updatedTv.resolution);
    if (isNaN(parsedResolution) || parsedResolution <= 0) {
      throw new Error("(EDIT) Resolution must be a positive number");
    }
  
    const parsedPrice = parseFloat(updatedTv.price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      throw new Error("(EDIT) Price must be a positive number");
    }
  

    const response = await fetch(`http://localhost:8050/tv/${updatedTv.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTv),
    });
  
    console.log('(EDIT) Updated TV Data:', updatedTv);

    expect(response.status).toBe(200);
  

    const responseData = await response.json();
    expect(responseData.brand).toBe(updatedTv.brand);
    expect(responseData.model).toBe(updatedTv.model);
  });
  