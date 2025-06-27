const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.post('/cliente', (req, res) => {
    const id = crypto.randomUUID();
    const data = req.body;
    
    return res.status(200).json({
        id: id,
        data: data,
        message: "Criado com sucesso",
        status: 200
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`✅ App running at http://localhost:${port}/`);
});