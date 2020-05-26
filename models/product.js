const Cart = require('./cart');
const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

module.exports = class Product {
  constructor(title, imageUrl, description, price, userId) {
    // this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.userId = userId;
  }

  save() {
    const db = getDB();
    //return a promise
    return db
      .collection('products')
      .insertOne(this); //"this" refers to the Product object
  }

  edit(id) {
    const db = getDB();
    return db.collection('products').updateOne({_id: new mongodb.ObjectID(id)}, {$set: this});
  }

  static deleteById(id) {
    const db = getDB();
    return db
      .collection('products')
      .deleteOne({_id: new mongodb.ObjectID(id)});
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection('products')
      .find()
      .toArray();
  }

  static findById(id) {
    const db = getDB();
    return db
      .collection('products')
      .find({_id: new mongodb.ObjectID(id)})
      .next();
    // return db.collection('products').findOne({_id: new mongodb.ObjectID(id)});
  }
};
