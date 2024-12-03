const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Banco de dados
mongoose.connect("mongodb://localhost/clientDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Modelo
const clienteSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
});

const Cliente = mongoose.model("Cliente", clienteSchema);

// Rotas
app.post("/api/clientes", async (req, res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.json(cliente);
});

app.get("/api/clientes", async (req, res) => {
    const clientes = await Cliente.find();
    res.json(clientes);
});

app.delete("/api/clientes/:id", async (req, res) => {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: "Cliente deletado" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
