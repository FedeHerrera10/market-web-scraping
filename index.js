 import { searchInCarrefour, searchInChangoMas, searchInVea } from "./scraping.js";


import express  from 'express';
import cors from 'cors';
const app = express();

app.use(cors())

app.get('/vea',async(req,res)=>{
  try {
    const data = await searchInVea();
   if(data.length > 0 ) res.send(data); 
  } catch (error) {
   console.log(error); 
  }
})

app.get('/mas-online',async(req,res)=>{
  try {
    const data = await searchInChangoMas();
   if(data.length > 0 ) res.send(data); 
  } catch (error) {
   console.log(error); 
  }
})

app.get('/carrefour',async(req,res)=>{
  try {
    const data = await searchInCarrefour();
   if(data.length > 0 ) res.send(data); 
  } catch (error) {
   console.log(error); 
  }
})


app.listen(5000,()=>console.log('corriendo'));





