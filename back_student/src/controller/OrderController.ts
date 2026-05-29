import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {Order} from '../entity/Order';

class OrderController {
  public static listAll = async (req: Request, res: Response) => {
    const orderRepository = getRepository(Order);
    const orders = await orderRepository.find({relations: ['user', 'product']});
    res.send(orders);
  };

  public static getOneById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const orderRepository = getRepository(Order);
    try {
      const order = await orderRepository.findOneOrFail(id, {relations: ['user', 'product']});
      res.status(200).send(order);
    } catch (error) {
      res.status(404).send('Order not found');
    }
  };

  public static newOrder = async (req: Request, res: Response) => {
    const {userId, productId, quantity} = req.body;
    const order = new Order();
    order.quantity = quantity;
    order.status = 'pending';
    const orderRepository = getRepository(Order);
    try {
      await orderRepository.save(order);
    } catch (e) {
      res.status(409).send('Error creating order');
      return;
    }
    res.status(201).send('Order created');
  };

  public static editOrder = async (req: Request, res: Response) => {
    const id = req.params.id;
    const {status, quantity} = req.body;
    const orderRepository = getRepository(Order);
    let order;
    try {
      order = await orderRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('Order not found');
      return;
    }
    order.status = status;
    order.quantity = quantity;
    await orderRepository.save(order);
    res.status(204).send();
  };

  public static deleteOrder = async (req: Request, res: Response) => {
    const id = req.params.id;
    const orderRepository = getRepository(Order);
    try {
      await orderRepository.findOneOrFail(id);
      await orderRepository.delete(id);
    } catch (error) {
      res.status(404).send('Order not found');
      return;
    }
    res.status(204).send();
  };
}

export default OrderController;
