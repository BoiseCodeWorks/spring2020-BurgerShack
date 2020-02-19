import express from "express";
import BurgersService from "../services/BurgersService";
import CombosService from "../services/CombosService";

export default class BurgersController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      //get child by parent id, goes in the parent collection
      // api/burgers/BURGERID/combos
      .get("/:id/combos", this.getCombosByBurgerId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await BurgersService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await BurgersService.findById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getCombosByBurgerId(req, res, next) {
    try {
      let data = await CombosService.getByBurgerId(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let data = await BurgersService.create(req.body);
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await BurgersService.update(req.params.id, req.body);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      await BurgersService.delete(req.params.id);
      res.send("Delorted");
    } catch (error) {
      next(error);
    }
  }
}
