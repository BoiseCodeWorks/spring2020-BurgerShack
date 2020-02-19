import mongoose from "mongoose";
import Combo from "../models/Combo";

//NOTE the repository is the connection to your DB at that collection
const _repository = mongoose.model("Combo", Combo);
class CombosService {
  async getAll() {
    // let data = await _repository.find({});
    // return data
    return await _repository
      .find({})
      .populate("burgerId", "title") //NOTE populate fetches another object from the property name of the first argument, and will selectively keep or remove properties based on the second review: https://mongoosejs.com/docs/populate.html
      .populate("sideId", "title");
  }

  async findById(id) {
    return await _repository.findById(id);
  }
  async getByBurgerId(id) {
    return await _repository.find({ burgerId: id });
  }

  async getBySideId(id) {
    return await _repository.find({ sideId: id });
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

const combosService = new CombosService();
export default combosService;
