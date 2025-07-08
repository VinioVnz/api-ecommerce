"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoService = void 0;
const data_source_1 = require("../database/data-source");
const Produto_1 = require("../entities/Produto");
const repo = data_source_1.AppDataSource.getRepository(Produto_1.Produto);
exports.ProdutoService = {
    async criar(data) {
        const produto = repo.create(data);
        let result = await repo.save(produto);
        console.log(result);
        return produto;
    },
    async listar() {
        return await repo.find();
    }
};
