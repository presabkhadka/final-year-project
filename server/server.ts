import express from 'express'
const port = 1010;
const app = express()

app.get('/', (req,res)=>{
    res.send("Hi there!")
})

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
    
})