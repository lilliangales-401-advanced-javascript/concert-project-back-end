'use strict';

class DataModel {
  constructor(schema){
    this.schema = schema;
  }

  get(id) {
    let query = id ? { id: id } : {};
    return this.schema.find(query);
  }

  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  put(id, record) {
    const filter = { id: id };
    const update = record;
    console.log(filter, update, '!!!!!!!!!!!!!!!!!');
    return this.schema.findOneAndUpdate(filter, update);
  }

  delete(id) {
    const filter = { id: id };
    return this.schema.findOneAndDelete(filter);
  }
}

module.exports = DataModel;
