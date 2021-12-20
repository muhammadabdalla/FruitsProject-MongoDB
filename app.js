const { MinKey } = require('mongodb');
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true , useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
name: {
  type:String,
 required: true
},
rating:{
  type:Number,
  min:1,
  max:10
},
review:String

})

const Fruit = mongoose.model("Fruit",fruitSchema)

const fruit = new Fruit ({
  name:"watermelon",
  rating:2,
  review:"big one"


})
fruit.save()

const pineapple=new Fruit ({
  name:"pineapple",
  rating:3,
  review:"pretty pineapple"


})


Fruit.find(function(err,fruits){
if(err){

  console.log(err);
}else{
  mongoose.connection.close()
  fruits.forEach(element => console.log(element.name));

  
}


})



const personSchema = new mongoose.Schema({
  name: String,
  age:Number,
  favoritefruit:fruitSchema
  })
const Person = mongoose.model("Person",personSchema)

const person = new Person ({
  name: "Amy",
  age:12,
favoritefruit:pineapple
})

Person.updateOne({_id:"61151a7cec89ae1c304bdcd1"},{favoritefruit:fruit},function(err){
if(err){
console.log(err);
}else{

console.log("John updated");
}

})


  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(fruits)
      callback(fruits);
    });
  }