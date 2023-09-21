
class TvDataService {
  async createTv(brand, model, resolution, price) {
    try {
      const response = await fetch("http://localhost:8050/tv", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ brand, model, resolution, price }),
      });

      if (!response.ok) {
        throw new Error("Failed to create TV");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }
}

export default TvDataService;