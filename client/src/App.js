import React, { useEffect, useState } from "react";
import ClienteForm from "./ClienteForm";
import './App.css';

function App() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/clientes")
            .then((res) => res.json())
            .then((data) => setClientes(data));
    }, []);

    const addCliente = (cliente) => {
        fetch("http://localhost:5000/api/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        })
            .then((res) => res.json())
            .then((newCliente) => setClientes((prev) => [...prev, newCliente]));
    };

    const deleteCliente = (id) => {
        fetch(`http://localhost:5000/api/clientes/${id}`, {
            method: "DELETE",
        }).then(() => setClientes((prev) => prev.filter((c) => c._id !== id)));
    };

    return (
        <div className="container">
            <section>
              <h2>Cadastro de clientes</h2>
              <ClienteForm onAddCliente={addCliente} />
            </section>
            <section>
              <h2>Clientes cadastrados</h2>
              <ul>
                  {clientes.map((cliente) => (
                      <li key={cliente._id}>
                          {cliente.nome} - {cliente.email} - {cliente.telefone}
                          <button onClick={() => deleteCliente(cliente._id)}>
                              Excluir
                          </button>
                      </li>
                  ))}
              </ul>
            </section>
        </div>
    );
}

export default App;
