const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');
const { error } = require('console');


const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

// 🔹 Cria novo cliente
app.post('/customer', async (req, res) => {
    const id = crypto.randomUUID();
    const {name, email,contact, password} = req.body;
    
    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO customer (id, name, email, contact, password, active) VALUES ($1, $2, $3, $4, $5, $6)`,
            [id, name, email, contact, hashedPassword, true] // 🔸 Ajuste conforme os campos reais da tabela
        );

        //TODO Precisa retornar os dados que foram inseridos
        return res.status(201).json({
            id,
            name,
            email,
            contact,
            message: "Customer successfully created.",
        });
    } catch (error) {
        console.error("Error creating customer:", error);
        return res.status(500).json({ message: "Failed to create customer" });
    }
});

// rota de cadastro
app.post('/signup', async (req, res) => {
    const {name, email, contact, password} = req.body;

    if (!name || !email || !contact || !password) {
        return res.status(400).json({ error: 'Missing required fields'});
    }

    try {
        const existingUser = await pool.query(
            'SELECT * FROM customer WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'Email already registered'});
        }

        const newUser = {
            id: uuidv4(),
            name,
            email,
            contact,
            password,
            active: true,
        };

        await pool.query(
            `INSERT INTO customer (id, name, email, contact, password, active) VALUES ($1, $2, $3, $4, $5, $6)`,
            [newUser.id, newUser.name, newUser.email, newUser.contact, newUser.password, newUser.active]
        );

        res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
        console.error('Signup error: ', error);
        res.status(500).json({ error: 'Internal server error'});
    }
});

// 🔹 Login do cliente
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const { rows } = await pool.query('SELECT * FROM customer WHERE email = $1 ' , [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const customer = rows[0];

        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // TODO: You can add JWT token here later if needed
        return res.status(200).json({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            message: "Login successful.",
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// atualiza o perfil do cliente
app.put('/customer/profile/:id', async (req, res) => {
    const {id} = req.params;
    const {name, email, contact, password} = req.body;

    try {
        const customer = await findById(id);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found"});
        }

        let hashedPassword = customer.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        await pool.query(
            `UPDATE customer SET name = $1, email= $2, contact = $3, password = $4 WHERE id = $5`, [name, email, contact, hashedPassword, id]
        );

        return res.status(200).json({message: "Profile updated successfully"});
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({message: "Internal server error"});
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

