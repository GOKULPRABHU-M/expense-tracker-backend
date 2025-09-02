const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())
mongoose.connect("mongodb+srv://kavigokul22_db_user:tjYsDptYgPIBZls2@cluster0.6cvgci3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 ")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        rquired: true
    },
    date:{type:String,required:true}
});

const expense = mongoose.model("expense", expenseSchema);

app.post("/add", async (req, res) => {

    const {
        title,
        amount
    } = req.body;
    const date=new Date().toLocaleDateString();
    console.log(date);
    try {
        const newexpense = new expense({
            title,
            amount,date
        });
        await newexpense.save();
        res.send("added")
    } catch (err) {
        res.send(err);
    }
})
app.get("/getallexpense", async (req, res) => {

    try {
        const data = await expense.find();
        res.send(data);
    } catch (err) {
        res.send(err);
    }
})
app.delete("/deleteexpense", async (req, res) => {

    const {
        _id
    } = req.body
    try {
        await expense.deleteOne({
            _id
        })

        res.send()
    } catch (err) {
        res.send(err)
    }
})
app.put("/editexpense", async (req, res) => {

    const {
        _id,
        title,
        amount
    } = req.body
    try {
        await expense.updateOne({
            _id: _id
        }, {
            $set: {
                title: title,
                amount: amount
            }
        })

        res.send()
    } catch (err) {
        res.send(err)
    }
})
app.listen(7000);