"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const produto_routes_1 = __importDefault(require("./routes/produto.routes"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const data_source_1 = require("./database/data-source");
require('dotenv').config();
const cors = require('cors');
data_source_1.AppDataSource.initialize()
    .then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    //o cors deve ser implementado antes de qualquer rota
    const origins = ['http://localhost:4000', "https://dontpad.com"];
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            if (origins.includes(origin)) {
                return callback(null, true);
            }
            else {
                return callback(new Error("Origem não permitida"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.use('/produtos', produto_routes_1.default);
    app.use('/usuarios', usuario_routes_1.default);
    app.use('/login', auth_routes_1.default);
    app.listen(process.env.PORT, () => {
        console.log('Servidor rodando na porta: ', process.env.PORT);
    });
})
    .catch((error) => {
    console.error('Banco de dados não conectado. ', error);
});
