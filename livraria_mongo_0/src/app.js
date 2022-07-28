import express, { response } from "express";
import db from "./dbConect.js";
import livros from "./models/Livro.js";
import autores from "./models/autor.js";

db.on("error", console.log.bind(console, 'Erro de conexão'))

db.once("open", () => {
    console.log('Banco de dados conectado com sucesso!')
})


const app = express();

app.use(express.json());

/*
const livros = [
    {id: 1, "titulo": "Harry Potter", "editora": "Editora Abril"},
    {id: 2, "titulo": "Game of Thrones", "editora": "Editora Maio"}
];
*/

app.get('/', (req, res) => {
    res.status(200).send("Home Livraria");
});

// End-points para os livros

app.get('/livros', (req, res) => {
    livros.find((err, livros) => {
        res.status(200).json(livros)
    })
});

app.get('/livros/:id', (req, res) =>{
    const id = req.params.id;

    livros.findById(id, (err, livros) => {
        res.status(200).json(livros)
    })

    /*
    let index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
    */
});

app.post('/livros', (req, res) => { 
    let livro = new livros(req.body);

    livro.save((err) => {
        if(err){
            res.status(500).send({mensagem: `${err.message} falha ao cadastrar o livro`})
        }else{
            res.status(201).send(livro.toJSON());
        }
    })
    /*
    let livro = new livros(req.body);
    livros.push(req.body);
    res.status(201).json(livros);
    */
});

app.put('/livros/:id', (req, res) =>{
    const id = req.params.id;

    livros.findByIdAndUpdate(id, {$set: req.body} , (err) => {
        if(err){res.status(500).send({message: err.message})
        }else{
            res.status(200).send({message: "Livro alterado com sucesso"})
        }
    })
    /*
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    livros[index].editora = req.body.editora;
    res.status(200).json(livros);
    */
});

app.delete('/livros/:id', (req, res) =>{
    const id = req.params.id;

    livros.findByIdAndDelete(id, (err) => {
        if(err){res.status(500).send({message: err.message})
        }else{
            res.status(200).send({message: "Livro removido com sucesso"})
        }
    })
    /*
    let index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    
    res.send(`Livro ${index} removivdo com sucesso`);
    */
});
/*
function buscaLivro(id){
    return livros.findIndex(livros => livros.id == id);
}
*/

//End-pints para os autores

app.get('/autores', (req, res) => {
    autores.find((err, autores) => {
        res.status(200).json(autores)
    })
});

app.get('/autores/:id', (req, res) =>{
    const id = req.params.id;

    autores.findById(id, (err, autores) => {
        res.status(200).json(autores)
    })
});

app.post('/autores', (req, res) => { 
    let autor = new autores(req.body);

    autor.save((err) => {
        if(err){
            res.status(500).send({mensagem: `${err.message} falha ao cadastrar o autor`})
        }else{
            res.status(201).send(autor.toJSON());
        }
    })
});

app.put('/autores/:id', (req, res) =>{
    const id = req.params.id;

    autores.findByIdAndUpdate(id, {$set: req.body} , (err) => {
        if(err){res.status(500).send({message: err.message})
        }else{
            res.status(200).send({message: "Autor alterado com sucesso"})
        }
    })
});

app.delete('/autores/:id', (req, res) =>{
    const id = req.params.id;

    autores.findByIdAndDelete(id, (err) => {
        if(err){res.status(500).send({message: err.message})
        }else{
            res.status(200).send({message: "autor removido com sucesso"})
        }
    })
});

export default app;
