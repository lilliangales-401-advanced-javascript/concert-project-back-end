'use strict';

class DataModel {
  constructor(schema){
    this.schema = schema;
  }

  get(id) {
    let query = id ? { _id: id } : {};
    return this.schema.find(query);
  }

  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  put(id, record) {
    const filter = { _id: id };
    const update = record;

    return this.schema.findOneAndUpdate(filter, update);
  }

  delete(id) {
    const filter = { _id: id };
    return this.schema.findOneAndDelete(filter);
  }
}

module.exports = DataModel;
