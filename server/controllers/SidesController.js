import express from "express";
import SidesService from "../services/SidesService";
import CombosService from "../services/CombosService";

export default class SidesController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/combos", this.getCombosBySideId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await SidesService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await SidesService.findById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getCombosBySideId(req, res, next) {
    try {
      let data = await CombosService.getBySideId(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await SidesService.create(req.body);
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await SidesService.update(req.params.id, req.body);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      await SidesService.delete(req.params.id);
      res.send("Delorted");
    } catch (error) {
      next(error);
    }
  }
}
