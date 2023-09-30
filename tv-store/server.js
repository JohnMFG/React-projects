const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8090;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// JSON-RPC endpoint
app.post("/rpc", (req, res) => {
  const { method, params, id } = req.body;

  // Implement your JSON-RPC methods here
  if (method === "add") {
    const result = params[0] + params[1];
    res.json({ jsonrpc: "2.0", result, id });
  } else if (method === "subtract") {
    const result = params[0] - params[1];
    res.json({ jsonrpc: "2.0", result, id });
  } else {
    res.status(404).json({ error: "Method not found", id });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
