import express from "express";
import OrdersService from "../services/OrdersService";

export default class OrdersController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id/addBurger/:burgerId", this.addBurger)
      .put("/:id/addItems", this.addItems)
      .put("/:id/removeItems", this.removeItems)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await OrdersService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await OrdersService.findById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let data = await OrdersService.create(req.body);
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async addItems(req, res, next) {
    try {
      let update = {
        burgers: req.body.burgers || [],
        sides: req.body.sides || [],
        combos: req.body.combos || []
      };
      let data = await OrdersService.addToOrder(req.params.id, update);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async addBurger(req, res, next) {
    try {
      let data = await OrdersService.addBurger(
        req.params.id,
        req.params.burgerId
      );
    } catch (error) {}
  }

  async removeItems(req, res, next) {
    try {
      let data = await OrdersService.removeFromOrder(req.params.id, req.body);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      await OrdersService.delete(req.params.id);
      res.send("Delorted");
    } catch (error) {
      next(error);
    }
  }
}
