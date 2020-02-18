import mongoose from "mongoose";
import Burger from "../models/Burger";

//NOTE the repository is the connection to your DB at that collection
const _repository = mongoose.model("Burger", Burger);
class BurgersService {
  async getAll() {
    // let data = await _repository.find({});
    // return data
    return await _repository.find({});
  }

  async findById(id) {
    return await _repository.findById(id);
  }
  async create(rawData) {
    return await _repository.create(rawData);
  }

  async update(id, update) {
    //NOTE {new: true} insures I get the object back after the change
    return await _repository.findByIdAndUpdate(id, update, { new: true });
  }

  async delete(id) {
    await _repository.findByIdAndDelete(id);
  }
}

const burgersService = new BurgersService();
export default burgersService;
