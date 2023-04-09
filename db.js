const mongo=require("mongoose")
const uri="mongodb://localhost:27017/ecommerce"
mongo.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>console.log("success database")).catch((err)=>console.log("not responding..."))
const mySchema=new mongo.Schema({
    id:Number,
    discount:Number,
    price:Number,
    name:String,
    color:String,
    brand:String,
    type:String,
    quantity:Number
})

const mySchemaCode=new mongo.Schema({
    name:String
})

const FeaturedProduct=new mongo.model("FeaturedProduct",mySchema)
const AppleData=new mongo.model("AppleData",mySchema) 
const Product=new mongo.model("Product",mySchema)
const Code=new mongo.model("Code",mySchemaCode)
module.exports={AppleData,Product,FeaturedProduct,Code}


