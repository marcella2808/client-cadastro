import React, { useState } from "react";
import styles from "./ClienteForm.module.css"

function ClienteForm({ onAddCliente }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCliente({ nome, email, telefone });
        setNome("");
        setEmail("");
        setTelefone("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
            />
            <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(XX) XXXX-XXXX"
            />
            <button type="submit">Adicionar Cliente</button>
        </form>
    );
}

export default ClienteForm;
