import mongoose from "mongoose";
import Side from "../models/Side";

//NOTE the repository is the connection to your DB at that collection
const _repository = mongoose.model("Side", Side);
class SidesService {
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

const sidesService = new SidesService();
export default sidesService;
