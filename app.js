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
  const { name, contact, email, password } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO customer (name, contact, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, contact, email, password]
    );

    const newCustomer = result.rows[0]; 

    return res.status(201).json({
      id: newCustomer.id,
      name: newCustomer.name,
      email: newCustomer.email,
      contact: newCustomer.contact,
      address: newCustomer.address,
      joined: newCustomer.joined, 
      message: 'Customer created successfully.'
    });

  } catch (error) {
    console.error("Error creating customer:", error);
    return res.status(500).json({ message: "Internal server error" });
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
            [newUser.id, newUser.name, newUser.email, newUser.contact, await bcrypt.hash(password, 10), true]
        );

        res.status(201).json({ 
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            contact: newUser.contact,
            message: 'User registered successfully'
        });
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

        return res.status(200).json({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            contact: customer.contact,
            address: customer.address,
            joined: customer.joined,
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


    try {
        const customer = await findById(id);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }


        return res.status(200).json(customer);
    } catch (error) {
        console.error("Error fetching customer: ", error);
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
            `UPDATE customer SET name = $1, contact = $2, email = $3, address = $4, password = $5 WHERE id = $6`,
            [
                data.name, 
                data.contact,
                data.email,
                data.address || customer.address,
                data.password || customer.password,
                id,
            ]
        );

        const updateCustomer = await findById(id);

        return res.status(200).json(updateCustomer);
    } catch (error) {
        console.error("Error updating customer: ", error);
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

