 import { searchInAllStores} from "./scraping.js";


import express  from 'express';
import cors from 'cors';
import {  fusionData } from "./util.js";
import { flattenClusters, groupBySimilarity } from "./orderData.js";
const app = express();

app.use(cors())

app.get('/:producto',async(req,res)=>{
  try {
     const params = req.params;
     console.time('searchInAllStores');
     const data = await searchInAllStores(params.producto);
     console.timeEnd('searchInAllStores');
     const groupedProducts = groupBySimilarity(data, 10);
     const sortedProducts = flattenClusters(groupedProducts);
     res.send(sortedProducts); 
  
  } catch (error) {
    res.send([])
  }
})

app.get('/vea/:producto',async(req,res)=>{
  try {
    const params = req.params;
    const data = await searchInVea(params.producto);
    res.send(data); 
  } catch (error) {
    res.send({})
  }
})

app.get('/mas-online/:producto',async(req,res)=>{
  try {
    const params = req.params;
      const data = await searchInChangoMas(params.producto);
      res.send(data); 
  } catch (error) {
   res.send({});
  }
})

app.get('/carrefour/:producto',async(req,res)=>{
  try {
    const params = req.params;
    const data = await searchInCarrefour(params.producto);
     res.send(data); 
  } catch (error) {
   res.send({}); 
  }
})


app.listen(5000,()=>console.log('corriendo'));





