import puppeteer from 'puppeteer';

const searchInVea = async () => {
 const browser =  await puppeteer.launch({
    headless:'shell',
    slowMo:400
 });
 const page = await browser.newPage();
 
 await page.setViewport({ width: 1200, height: 600 });
 await page.goto('https://www.vea.com.ar/cerveza?_q=cerveza&order=OrderByNameASC');

 let previousHeight;
while (true) {
  previousHeight = await page.evaluate('document.body.scrollHeight');
  await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
  const newHeight = await page.evaluate('document.body.scrollHeight');
  if (newHeight === previousHeight) break; 
}
 
 const result =await page.evaluate(()=>{
   let data=[];
   try {
      const divProducts=document.querySelectorAll('.vtex-search-result-3-x-galleryItem')
    
   
    data = [...divProducts].map(divP =>{
      const divTitle=divP.querySelector('.vtex-product-summary-2-x-productBrandContainer');
      const title = divTitle.children[0].innerText;

      const divDesc = divP.querySelector('.vtex-product-summary-2-x-productBrand');
      const descripcion = divDesc.innerText;
      const price = divP.querySelectorAll('span')[3].childNodes[0].innerText;
      return {
         title,
         descripcion,
         price
      }
   })
   } catch (error) {
      return error;
   }
   return data;
 })
 
browser.close();
return result;
}
/** Search in Chango Mas */

const searchInChangoMas = async () => {
   const browser =  await puppeteer.launch({
      headless:'shell',
      slowMo:400
   });
   const page = await browser.newPage();
  
   await page.setViewport({ width: 1200, height: 600 });
   
      await page.goto('https://www.masonline.com.ar/cerveza?_q=cerveza&order=OrderByNameASC');
   
      let previousHeight;
      while (true) {
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        const newHeight = await page.evaluate('document.body.scrollHeight');
        if (newHeight === previousHeight) break; 
      }

  
   const result =await page.evaluate(()=>{
     const divProducts=document.querySelectorAll('.valtech-gdn-product-summary-status-0-x-container');
     const data = [...divProducts].map(divP =>{
        const descripcion = divP.childNodes[2].childNodes[0].innerText;
        const price =divP.querySelector('.valtech-gdn-dynamic-product-0-x-dynamicProductPrice').childNodes[0].innerText;
  
        return {
           descripcion,
          price
           
        }
     })
     return data;
   })
   
   
   browser.close();
   return result;
  };

/** Search in Carrefour*/

const searchInCarrefour = async () => {
   const browser =  await puppeteer.launch({
      headless:true,
      slowMo:400
   });
   const page = await browser.newPage();
  
   await page.setViewport({ width: 1200, height: 600 });
   
      await page.goto('https://www.carrefour.com.ar/cerveza?_q=cerveza');
   
      let previousHeight;
      while (true) {
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        const newHeight = await page.evaluate('document.body.scrollHeight');
        if (newHeight === previousHeight) break; 
      }

  
   const result =await page.evaluate(()=>{
     const divProducts=document.querySelectorAll('.valtech-carrefourar-search-result-2-x-galleryItem');
     const data = [...divProducts].map(divP =>{
      const descripcion = divP.querySelector('h3').innerText
        const price = divP.querySelector('.valtech-carrefourar-product-price-0-x-currencyContainer').innerText;
        
        return {
            descripcion,
            price
        }
     })
     return data;
   })
   

   
   browser.close();
   return result;
  };






export {searchInVea,searchInChangoMas,searchInCarrefour};




