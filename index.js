const express=require("express")
const app=express()
const {AppleData,Product,FeaturedProduct,Code}=require("./db")
const cors=require("cors")
const bodyParser=require("body-parser")
const { response } = require("express")
const port = process.env.PORT || 5000;
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};



/*app.delete("/",async(req,res)=>
{
    await Product.deleteMany({})
})*/
/*app.delete("/AppleData",async(req,res)=>
{
    await AppleData.deleteMany({})
})*/
app.post("/AppleData",(req,res)=>
{
   const arr =req.body.appledata
   arr.map(async(item)=>
   {
    try{
        const result=new AppleData(item)   
           await AppleData.insertMany([result])
           console.log(result)
       }
       catch(err)
       {
           console.log(err)
       }
   })
})
app.get("/AppleData",async(req,res)=>
{
    const result=await AppleData.find({})
    res.send(result)
})
app.post("/Product",(req,res)=>
{
   const arr=req.body.products
    arr.map(async(item)=>
        {
           const result=new Product(item)
           try{
               await Product.insertMany([item])
           }
           catch(err)
           {
               console.log(err)
           }
        })
})
app.get("/products",async(req,res)=>
{
   const result=await Product.find({})
   res.send(result)
})

app.post("/FeaturedProducts",(req,res)=>
{
    const arr=req.body.fpp
    arr.map(async(item)=>
    {
        try{
        const result=new  FeaturedProduct(item)
        await FeaturedProduct.insertMany([result])
        }
        catch(err)
        {
            console.log(err)
        }
    })
})

app.get("/FeaturedProducts",async(req,res)=>
{
   const result=await FeaturedProduct.find({})
   res.send(result)
})

app.post("/code",async(req,res)=>
{
    try{
        const c1=new Code({name:req.body.c1})
        const c2=new Code({name:req.body.c2})
        await Code.insertMany([c1,c2])
    }
    catch(err)
    {
        console.log(err)
    }
})

app.get("/code",async(req,res)=>
{
    const result=await Code.find({})
    res.send(result)
})

app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});
app.listen(port,()=>
{
    console.log("success")
})