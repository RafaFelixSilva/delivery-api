const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;
const pool = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// 🔹 Cria novo cliente
app.post('/customer', async (req, res) => {
    const id = crypto.randomUUID();
    const data = req.body;
    
    try {
        await pool.query(
            `INSERT INTO customer (id, name, contact, active, email) VALUES ($1, $2, $3, $4, $5)`,
            [id, data.fullname, data.phone, true, data.email] // 🔸 Ajuste conforme os campos reais da tabela
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
    const {active} = req.query;

   try {
    let result;

    if (active === 'true' || active === 'false') {
        result = await pool.query(
            'SELECT * FROM customer WHERE active = $1',
            [active === 'true']
        );
    }else {
        result = await pool.query('SELECT * FROM customer');
    }

    return res.status(200).json(result.rows);
   }catch (error) {
    console.error("error search customers: ", error);
    return res.status(500).json({message: "internal error"});
   }
});

// 🔹 Busca cliente por ID
app.get('/customer/:id', async (req, res) => {
    const { id } = req.params;
    const {active} = req.body;

    if (typeof active !== "boolean") {
        return res.status(400).json({message: "Field 'active' must be boolean (true or false)"});
    }

    try {
        const customer = await findById(id);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        await pool.query(
            `UPDATE customer SET active = $1 WHERE id = $2`,
            [active, id]
        );

        return res.status(200).json({message: "Status updated successfuly", active});
    } catch (error) {
        console.error("Error search customer: ", error);
        return res.status(500).json({ message: "Internal error" });
    }
});

// 🔹 Atualiza cliente
app.put('/customer/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const customer = await findById(id);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        await pool.query(
            `UPDATE customer SET name = $1, contact = $2 WHERE id = $3`,
            [data.name, data.contact, id]
        );

        return res.status(200).json({ message: "Customer updated successfuly", data });
    } catch (error) {
        console.error("Error search customer: ", error);
        return res.status(500).json({ message: "Internal error" });
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