const Cart = require('./cart');
const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    // this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDB();
    //return a promise
    return db.collection('products').insertOne(this);
  }

  edit() {
  }

  static deleteById(id) {
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('products').find().toArray();
  }

  static findById(id) {
    const db = getDB();
    return db.collection('products').find({_id: new mongodb.ObjectID(id)}).next();
    // return db.collection('products').findOne({_id: new mongodb.ObjectID(id)});
  }
};
