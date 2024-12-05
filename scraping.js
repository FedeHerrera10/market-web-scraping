import puppeteer from 'puppeteer';

const searchInVea = async (params) => {
 const browser =  await puppeteer.launch({
    headless:'shell',
    slowMo:400
 });
 
 const page = await browser.newPage();
 await page.setViewport({ width: 1200, height: 600 });
 const url=encodeURI(`https://www.vea.com.ar/${params}?_q=${params}`);
 await page.goto(url);

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
      if(divProducts.length == 0) {
         browser.close();
         return data;
      }
   
    data = [...divProducts].map(divP =>{
      const divTitle=divP.querySelector('.vtex-product-summary-2-x-productBrandContainer');
      const title = divTitle.children[0].innerText;

      const divDesc = divP.querySelector('.vtex-product-summary-2-x-productBrand');
      const description = divDesc.innerText;
      const price = divP.querySelectorAll('span')[3].childNodes[0].innerText;
      const imageUrl = divP.querySelector('img').src;
      return {
         market:"vea",
         description,
         price,
         imageUrl
      }
   })
   } catch (error) {
      console.log(error)
      return error;
      
   }
   return data;
 })
 
browser.close();
return result;
}
/** Search in Chango Mas */

const searchInChangoMas = async (params) => {
   const browser =  await puppeteer.launch({
      headless:'shell',
      slowMo:400
   });
   const page = await browser.newPage();
  
   await page.setViewport({ width: 1200, height: 600 });
      const url=encodeURI(`https://www.masonline.com.ar/${params}?_q=${params}`);
      await page.goto(url);
   
      let previousHeight;
      while (true) {
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        const newHeight = await page.evaluate('document.body.scrollHeight');
        if (newHeight === previousHeight) break; 
      }

  
   const result =await page.evaluate(()=>{
      let data= [];
     const divProducts=document.querySelectorAll('.valtech-gdn-product-summary-status-0-x-container');

     if(divProducts.length == 0) {
      browser.close();
      return data;
   }

      data = [...divProducts].map(divP =>{
        const description = divP.childNodes[2].childNodes[0].innerText;
        const price =divP.querySelector('.valtech-gdn-dynamic-product-0-x-dynamicProductPrice').childNodes[0].innerText;
        const imageUrl = divP.querySelector('img').src;
        return {
         market:"masonline",
           description,
          price,
          imageUrl
           
        }
     })
     return data;
   })
   
   
   browser.close();
   return result;
  };

/** Search in Carrefour*/

const searchInCarrefour = async (params) => {
   const browser =  await puppeteer.launch({
      headless:'shell',
      slowMo:400
   });
   const page = await browser.newPage();
  
   await page.setViewport({ width: 1200, height: 600 });
   const url=encodeURI(`https://www.carrefour.com.ar/${params}?_q=${params}`);
      await page.goto(url);
      
   
      let previousHeight;
      while (true) {
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        const newHeight = await page.evaluate('document.body.scrollHeight');
        if (newHeight === previousHeight) break; 
      }

  
   const result =await page.evaluate(()=>{
      let data=[];
     const divProducts=document.querySelectorAll('.valtech-carrefourar-search-result-2-x-galleryItem');
     if(divProducts.length == 0) {
      browser.close();
      return data;
   }
      data = [...divProducts].map(divP =>{
      const description = divP.querySelector('h3').innerText
        const price = divP.querySelector('.valtech-carrefourar-product-price-0-x-currencyContainer').innerText;
        const imageUrl = divP.querySelector('img').src;
        return {
            market:"carrefour",
            description,
            price,
            imageUrl
        }
     })
     return data;
   })
   

   
   browser.close();
   return result;
  };






export {searchInVea,searchInChangoMas,searchInCarrefour};




