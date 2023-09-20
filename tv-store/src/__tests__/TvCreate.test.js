test('creates a new TV via the API with validation', async () => {

  const newTv = {
    brand: 'Samsung',
    model: 'Bravia',
    resolution: '1080',
    price: '799',
  };

  if (newTv.brand.trim() === "") {
    throw new Error("(CREATE) Brand is required")
  }

  if (newTv.model.trim() === "") {
    throw new Error("(CREATE) Model is required")
  }

  const parsedResolution = parseFloat(newTv.resolution);
  if (isNaN(parsedResolution) || parsedResolution <= 0) {
    throw new Error("(CREATE) Resolution must be a positive number")
  }

  const parsedPrice = parseFloat(newTv.price);
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    throw new Error("(CREATE) Price must be a positive number")
  }


  const response = await fetch('http://localhost:8050/tv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTv),
  });

  console.log('(CREATE) New TV Data:', newTv);

  expect(response.status).toBe(201);

  const responseData = await response.json();
  expect(responseData.brand).toBe(newTv.brand);
  expect(responseData.model).toBe(newTv.model);
});
