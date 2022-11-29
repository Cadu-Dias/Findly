const express = require("express")
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())
const db = require('./config/db');




//Usuario
app.get('/usuarios', async (req, res) => {
    let response = await db.query('SELECT * FROM usuario')
    res.json(response)
})

app.post('/usuarios', async (req, res) => {
    let datas = {
        "nome": req.body.nome,
        "email": req.body.email,
        "senha": req.body.senha
    }

    try{
        let response = await db.query('INSERT INTO usuario SET ?', [datas])
        res.json(response)
    }
    catch (error){
        console.log(error)
    }
});

//Pergunta
app.get('/perguntar', async (req, res) => {
    let response = await db.query('SELECT * FROM pergunta')
    res.json(response)
})

app.post('/perguntar', async (req, res) => {
    let datas = {
        "nome_usuario": req.body.nome,
        "materia": req.body.materia,
        "titulo": req.body.titulo,
        "descricao": req.body.descricao ,
        "contador": req.body.contador
    }

    try{
        let response = await db.query('INSERT INTO pergunta SET ?', [datas])
        res.json(response)
    }
    catch (error){
        console.log(error)
    }
});

//Disciplinas
app.get('/disciplinas', async (req, res) => {
    let response = await db.query('SELECT * FROM pergunta ORDER BY contador DESC')
    res.json(response)
})
app.put('/disciplinas', async (req, res) => {
    
    let id = req.body.id
    let contadores = req.body.contadores
    
    try{
        let response = await db.query('UPDATE pergunta SET contador = ? WHERE id = ?', [contadores, id])
        res.json(response)
    }
    catch (error){
        console.log(error)
    }
})

app.post('/pergunta_contador', async (req, res) => {
    
    nome_usuario = req.body.nome_usuario

    let response = await db.query('SELECT * FROM pergunta_contador WHERE nome = ?', [nome_usuario])
    res.json(response)
})
app.post('/pergunta_contador2', async(req, res) => {

    let data = {
        "id_pergunta": req.body.id_pergunta,
        "nome": req.body.nome,
        "tipo_curtida": req.body.tipo_curtida
    }
    try {
        let response = await db.query('INSERT INTO pergunta_contador SET ?', [data])
        res.json(response)
    }
    catch (error) {
        console.log(error)
    }
})
app.put('/pergunta_contador', async(req, res) => {

    let tipo_curtida = req.body.tipo_curtida
    let id_pergunta = req.body.id_pergunta
    let nome = req.body.nome

    try {
        let response = await db.query('UPDATE pergunta_contador SET tipo_curtida = ? WHERE id_pergunta = ? and nome = ?' , [tipo_curtida, id_pergunta, nome])
        res.json(response)
    } catch(error){
        console.log(error)
    }
    
})
app.post('/resposta', async(req, res) => {

    let nome_usuario = req.body.nome_usuario

    let response = await db.query('SELECT * FROM resposta_curtida WHERE nome = ?', [nome_usuario])
    res.json(response)
})
app.put('/resposta', async(req, res) => {
    
    let curtida = req.body.curtida
    let id_resposta = req.body.id_resposta
    let nome = req.body.nome

    try {
        let response = await db.query('UPDATE resposta_curtida SET curtida = ? WHERE id_resposta = ? and nome = ?' , [curtida, id_resposta, nome])
        res.json(response)
    } catch(error){
        console.log(error)
    }
})
app.post('/resposta2', async(req, res) => {
    let data = {
        "id_resposta": req.body.id_resposta,
        "nome": req.body.nome,
        "curtida": req.body.curtida
    }
    try {
        let response = await db.query('INSERT INTO resposta_curtida SET ?', [data])
        res.json(response)
    }
    catch (error) {
        console.log(error)
    }
})
//Pergunta Especifica
app.post('/perguntaEspecifica1', async (req, res) => {
    id_pergunta = req.body.id_pergunta

    let response = await db.query('SELECT * FROM pergunta, resposta WHERE id_pergunta = ? and pergunta.id = id_pergunta', [id_pergunta])
    res.json(response)
})

app.post('/perguntaEspecifica', async (req, res) => {
    let datas = {
        id_pergunta: req.body.id_pergunta,
        nome: req.body.nome, 
        resposta: req.body.resposta,
        curtidas: req.body.curtidas
    }
    try{
        let response = await db.query('INSERT INTO resposta SET ?', [datas])
        res.json(response)
    }
    catch (error){
        console.log(error)
    }
})
app.put('/perguntaEspecifica', async (req, res) => {

    let curtidas = req.body.curtidas
    let id = req.body.id

    let response = await db.query('UPDATE resposta SET curtidas = ? WHERE id = ?', [curtidas, id])
    res.json(response)
})
//Perfil
// Nesse caso o post esta sendo colocado no lugar do get, uma vez que o comando não estava devolvendo o resultado esperado
app.post('/perfilPergunta', async (req, res) => {

    let response = await db.query('SELECT * FROM pergunta WHERE nome_usuario = ? ORDER BY contador DESC limit 1', [req.body.nome_usuario])
    res.json(response[0])
  
})
// Nesse caso o post esta sendo colocado no lugar do get, uma vez que o comando não estava devolvendo o resultado esperado
app.post('/perfilResposta', async (req, res) => {

    let nome_usuario = req.body.nome_usuario

    let response = await db.query('SELECT * FROM resposta WHERE nome = ? ORDER BY curtidas DESC limit 1', [nome_usuario])
    res.json(response[0])
})

//Porta que o servidor funcionará
app.listen(3000, () => {
    try {
        console.log("Funcionando")
    }
    catch (e) {
        console.log('Erro', e)
    }
})