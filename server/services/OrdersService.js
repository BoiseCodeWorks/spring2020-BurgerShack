import mongoose from "mongoose";
import Order from "../models/Order";

//NOTE the repository is the connection to your DB at that collection
const _repository = mongoose.model("Order", Order);
// const _burgerRepository = mongoose.model("Burger", Burger);

class OrdersService {
  async getAll() {
    return await _repository.find({});
  }

  async findById(id) {
    return await _repository.findById(id);
  }
  async create(rawData) {
    return await _repository.create(rawData);
  }

  async addToOrder(id, update) {
    // let order = await _repository.findById(id);
    // order.burgers = [...order.burgers, ...update.burgers]
    // update.sides.forEach(b => {
    //   order.sides.push(b);
    // });
    // update.combos.forEach(b => {
    //   order.combos.push(b);
    // });
    // await order.save()

    let order = await _repository.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          burgers: { $each: update.burgers },
          sides: { $each: update.sides },
          combos: { $each: update.combos }
        }
      },
      { new: true }
    );
    return order;
  }

  async addBurger(id, burgerId) {
    // let order = await _repository.findById(id);
    // let burger = await _burgerRepository.findById(burgerId);
    // order.burgers.push(burgerId);
    // order.subtotal += burger.price
    // await order.save();

    let order = await _repository.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          burgers: burgerId
        }
      },
      { new: true }
    );
  }

  async removeFromOrder(id, update) {
    // update.sides.forEach(b => {
    //   order.sides.splice(orders.sides.indexOf(b),1);
    // });
    // update.combos.forEach(b => {
    //   order.combos.pull(b);
    // });

    let order = await _repository.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          burgers: { $each: update.burgers },
          sides: { $each: update.sides },
          combos: { $each: update.combos }
        }
      },
      { new: true }
    );
    return order;
  }

  async delete(id) {
    await _repository.findByIdAndDelete(id);
  }
}

const ordersService = new OrdersService();
export default ordersService;
