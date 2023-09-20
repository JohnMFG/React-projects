class TvDataService {
    fetchDataById(id) {
      return fetch(`http://localhost:8050/tv/${id}`)
        .then((res) => res.json())
        .catch((err) => {
          console.error(err.message);
          throw err;
        });
    }
  }

  export default TvDataService;
  