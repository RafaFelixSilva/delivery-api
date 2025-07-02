const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;
const pool = require('./db');

app.use(express.json());

// 🔹 Cria novo cliente
app.post('/customer', async (req, res) => {
    const id = crypto.randomUUID();
    const data = req.body;

    try {
        await pool.query(
            `INSERT INTO customer (id, name, contact, active) VALUES ($1, $2, $3, $4)`,
            [id, data.name, data.contact, data.active] // 🔸 Ajuste conforme os campos reais da tabela
        );

        //TODO Precisa retornar os dados que foram inseridos
        return res.status(201).json({
            id,
            message: "Cliente criado com sucesso",
            data
        });
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        return res.status(500).json({ message: "Erro ao criar cliente" });
    }
});

// 🔹 Lista todos os clientes
app.get('/customers', async (req, res) => {

    //TODO parametro (Query Param) que retorna o status 

    try {
        const { rows } = await pool.query('SELECT * FROM customer');
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        return res.status(500).json({ message: "Erro interno" });
    }
});

// 🔹 Busca cliente por ID
app.get('/customer/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await findById(id);

        if (!customer) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        return res.status(200).json(customer);
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        return res.status(500).json({ message: "Erro interno" });
    }
});

// 🔹 Atualiza cliente
app.put('/customer/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const customer = await findById(id);

        if (!customer) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        await pool.query(
            `UPDATE customer SET name = $1, contact = $2 WHERE id = $3`,
            [data.name, data.contact, id]
        );

        return res.status(200).json({ message: "Cliente atualizado com sucesso", data });
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        return res.status(500).json({ message: "Erro interno" });
    }
});

// 🔹 Função auxiliar para buscar cliente
async function findById(id) {
    const { rows } = await pool.query(`SELECT * FROM customer WHERE id = $1`, [id]);
    return rows.length > 0 ? rows[0] : null;
}

// TODO Criar um PUT para atualização do status (Ativo e Inativo)

// 🔹 Inicializa o servidor
app.listen(port, () => {
    console.log(`✅ App running at http://localhost:${port}/`);
});