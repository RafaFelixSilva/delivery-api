const express = require('express')
const crypto = require('crypto')
const app = express()
const port = 3000

app.use(express.json());

const clientes = []

app.post('/cliente', (req, res) => {
    const id = crypto.randomUUID();
    const data = req.body;

    const novoCliente = {id, ...data }
    clientes.push(novoCliente)
    
    return res.status(200).json({
        id: id,
        data: data,
        messagem: "Criado com sucesso",
        status: 200
    })
})

app.get('/clientes', (req, res) => {
 return res.status(200).json(clientes)
})

app.get('/cliente/:id', (req, res) => {
    const {id} = req.params;
    const cliente = clientes.find(c => c.id === id)

    if (!cliente) {
        return res.status(404).json({mensagem: "Cliente não encontrado"})
    }

    return res.status(200).json(cliente)
})

app.put('/cliente/:id', (req, res) => {
    const {id} = req.params
    const novoData = req.body

    const index = clientes.findIndex(c => c.id === id)
    if (index === -1) {
        return res.status(404).json({mensagem: "Cliente não encontrado"})
    }

    clientes[index] = {...clientes[index], ...novoData}

    return res.status(200).json({
        mensagem: "Cliente atualizado com sucesso",
        cliente: clientes[index]
    })
})

app.listen(port, () => {
    console.log(`✅ App running at http://localhost:${port}/`);
});