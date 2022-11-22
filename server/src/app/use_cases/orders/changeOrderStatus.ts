import { Request, Response } from 'express';
import { Order } from '../../models/order';

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const statusArray = ['WAITING', 'IN_PRODUCTION', 'DONE'];

    if (!statusArray.includes(status)) {
      return res.status(400).json({
        error: 'Status should be WAITING, IN_PRODUCTION or DONE',
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
