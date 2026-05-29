import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {Product} from '../entity/Product';

class ProductController {
 public static listAll = async (req: Request, res: Response) => {
   const productRepository = getRepository(Product);
   const products = await productRepository.find();
   res.send(products);
 };

 public static getOneById = async (req: Request, res: Response) => {
   const id: number = parseInt(req.params.id, 10);
   const productRepository = getRepository(Product);
   try {
     const product = await productRepository.findOneOrFail(id);
     res.status(200).send(product);
   } catch (error) {
     res.status(404).send('Product not found');
   }
 };

 public static newProduct = async (req: Request, res: Response) => {
   const {name, description, price, stock} = req.body;
   const product = new Product();
   product.name = name;
   product.description = description;
   product.price = price;
   product.stock = stock;
   const productRepository = getRepository(Product);
   try {
     await productRepository.save(product);
   } catch (e) {
     res.status(409).send('Error creating product');
     return;
   }
   res.status(201).send('Product created');
 };

 public static editProduct = async (req: Request, res: Response) => {
   const id = req.params.id;
   const {name, description, price, stock} = req.body;
   const productRepository = getRepository(Product);
   let product;
   try {
     product = await productRepository.findOneOrFail(id);
   } catch (error) {
     res.status(404).send('Product not found');
     return;
   }
   product.name = name;
   product.description = description;
   product.price = price;
   product.stock = stock;
   await productRepository.save(product);
   res.status(204).send();
 };

 public static deleteProduct = async (req: Request, res: Response) => {
   const id = req.params.id;
   const productRepository = getRepository(Product);
   try {
     await productRepository.findOneOrFail(id);
     await productRepository.delete(id);
   } catch (error) {
     res.status(404).send('Product not found');
     return;
   }
   res.status(204).send();
 };
}

export default ProductController;
