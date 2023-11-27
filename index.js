import express from "express";
const app = express();
app.use(express.json());


const items = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Notebook", category: "Stationery" },
  { id: 3, name: "Sunglasses", category: "Fashion" },
];

app.get("/", function (req, res) {
  res.send("API request");
});

app.get("/api/search", function (req, res) {
  res.send("API Search");
});

app.get("/api/items", function (req, res) {
  res.send(items);
});

app.get("/api/items/:id", function (req, res) {
  const item = items.find((item) => item.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("Item not found");
  res.send(item);
});

app.put("/api/items/:id", function (req, res) {
  const item = items.find((item) => item.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("Item not found");

  item.name = req.body.name || item.name;
  item.category = req.body.category || item.category;

  res.send(item);
});

app.delete("/api/items/:id", function (req, res) {
  const index = items.findIndex((item) => item.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Item not found");

  items.splice(index, 1);
  res.send(items);
});

app.post("/api/items", function (req, res) {
  if (!req.body.name || !req.body.category) {
    return res.status(400).send("Item name and category are required");
  }

  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    category: req.body.category,
  };

  items.push(newItem);
  res.send(items);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});