import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'

const app = express();
app.use(express.json());
app.use(cors());
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  ingirdients: {
    type: String,
    required: false,
  },
  isDeletetd: {
    type: Boolean,
    default: false,
  },
});

const Products = mongoose.model("Products", productSchema);

app.get("/api/products", async (req, res) => {
    const response = await Products.find()
    res.send(response)})


app.post("/api/products", async (req, res) => {
    const { title, price, image } = req.body
    const newProd = new Products({ title: title, price: price, image: image })
    await newProd.save()
    res.status(201).send("item created")
})

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params
    await Products.findByIdAndDelete(id)
    const items = await Products.find()
    res.send(items)
})

app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params
    const { title, price, image } = req.body
    await Products.findByIdAndUpdate(id, { ...req.body })
    const items = await Products.find()
    res.send(items)
})

mongoose.connect(process.env.CONNECTION_STRING).then((res) => {
  console.log("DB connected")
})
.catch(err=>console.log("Not connected"))


app.listen(process.env.PORT, (req, res) => {
  console.log("Port 3000 listening");
})
