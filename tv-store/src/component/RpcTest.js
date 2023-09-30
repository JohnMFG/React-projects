import React, { useState } from "react";
import axios from "axios";

const RpcTest = () => {
  const [result, setResult] = useState(null);

  const handleAdd = () => {
    const request = {
      jsonrpc: "2.0",
      method: "add",
      params: {
        brand: "Samsung",
        model: "Bravia",
        resolution: "4200",
        price: "799",
      },
      id: 1,
    };

    axios.post("http://localhost:8050/tv", request)
      .then((response) => {
        if (response.data && response.data.result !== undefined) {
          setResult(response.data.result);
        }
      })
      .catch((error) => {
        console.error("JSON-RPC Error:", error);
      });
  };

  const handleSubtract = () => {
    const request = {
      jsonrpc: "2.0",
      method: "subtract",
      params: {
        brand: "Sony",
        model: "Xperia",
        resolution: "1080",
        price: "599",
      },
      id: 2,
    };

    axios.post("http://localhost:8050/tv", request)
      .then((response) => {
        if (response.data && response.data.result !== undefined) {
          setResult(response.data.result);
        }
      })
      .catch((error) => {
        console.error("JSON-RPC Error:", error);
      });
  };

  return (
    <div>
      <button onClick={handleAdd}>Add TV (Samsung)</button>
      <button onClick={handleSubtract}>Add TV (Sony)</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
};

export default RpcTest;
