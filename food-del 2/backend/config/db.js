import mongoose from "mongoose";


export const  connectDB = async () =>{
   await mongoose.connect('mongodb+srv://pavansaipendry2002:pavan846490@cluster0.bwaklvs.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}
