import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.j4oft.mongodb.net/livraria')

let db = mongoose.connection;

export default db