export const fusionData =(dataVea,dataMasOnline,dataCarrefour)=>{
    const concatenated = [...(dataVea.length ? dataVea : []), ...(dataMasOnline.length ? dataMasOnline : []), ...(dataCarrefour.length ? dataCarrefour : [])];
    return concatenated
}

