require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/test-ai",async(req,res)=>{
    const prompt = req.query?.prompt;
if(!prompt){
    res.send({message:"please provide a promot in query"})
    return
}
const result = await model.generateContent(prompt);
console.log(result.response.text());
res.send({answer:result.response.text()})
})
app.get("/",(req,res)=>{
    res.send('AI Server is running')
})

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
    
})