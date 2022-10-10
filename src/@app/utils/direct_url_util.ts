export const getDirectUrl=(curLat:any,curLong:any,dirLat:any,dirLong:any)=>{
    console.log(`https://www.google.com/maps/dir/${curLat},${curLong}/${dirLat},${dirLong}`)
    return `https://www.google.com/maps/dir/${curLat},${curLong}/${dirLat},${dirLong}`;
}