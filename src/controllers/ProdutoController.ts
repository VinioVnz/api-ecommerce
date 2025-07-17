import { Request, Response } from "express"
import { ProdutoService } from "../services/ProdutoService"
import { Produto } from "../entities/Produto"

export const ProdutoController = {
    
    async listar(req: Request, res: Response): Promise<void>{
        try{
          const produtos = await ProdutoService.listar()
          res.json(produtos)
        } catch{
          res.status(500).json({erro: "Erro ao criar o recurso"})
        }
    },

     criar: async (req: Request, res: Response): Promise<void> => {
         try{
                
             const produto = await ProdutoService.criar(req.body)
             res.status(201).json(produto)
         } catch(error){
             res.status(500).json({erro: "Erro ao criar o recurso"})
             console.log(error);
             
         }
    },

    async buscar(req: Request, res: Response): Promise<void>{
         const id = Number(req.params.id)
         const produto = await ProdutoService.buscarPorId(id)
         if(!produto) res.status(404).json({erro: "Produto não encontrado"})
          res.status(200).json(produto)
     },

    async atualizar(req: Request, res: Response): Promise<void>{
         const id = Number(req.params.id)
         const atualizado = await ProdutoService.atualizar(id, req.body)
         if(!atualizado) res.status(404).json({erro: "Produto não encontrado"})
          
          res.status(200).json(atualizado)
     },

    async deletar(req: Request, res: Response): Promise<void>{
         const id = Number(req.params.id)
         const removido = await ProdutoService.deletar(id)
         if(!removido) res.status(404).json({erro: "Produto não encontrado"})
         res.status(200).json({status: "Produto removido com sucesso:", produto: removido})
     },
}