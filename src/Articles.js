import { useEffect, useState } from "react";
import "./articles_styles.css";

import app from "./Firebaseclient"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export default function Articles(){
const [articles, setarticles] = useState([])
let db;
async function updatedata(){
let colref = await collection(db,"articles")
let snapshot = await getDocs(colref)
let arr_temp  = snapshot.docs.map((e,i)=>{
    return e.data()
})
console.log(arr_temp)
setarticles(arr_temp)
}

useEffect(() => {
document.title= "View all articles"

db = getFirestore(app);

updatedata()

}, [])

async function getimg(name){
    if (name==null)
     return ''
  
    const storage = await getStorage(app)
    let fresult =  await getDownloadURL(ref(storage, 'files/'+name)).then(url=>{
        
        return url
    }).catch(err=>{
        console.error(err)
    })
    console.log(fresult)
    return fresult
}


    return <>
    <h2>"All articles"</h2>
       <div id="art_container" >
        {articles.map((e,i)=>{
            return<div key={i} className="article" >
            <h2>{e.Title}</h2>
            <h5>{e.Genre}</h5>
           -By <h4 style={{display:"inline-block"}} >{e.Author}</h4>
            <p style={{fontSize: 30 }} >
{e.Content}
            </p>
          
            {/* {e.File!=null? getimg(e.File).then(url=><img src={url} ></img>) :<></>} */}
            <a><h4>Click here to go to full article</h4></a>
            </div>
        })}
       </div>
    </>
}