import { useEffect, useState } from "react";
import "./formstyles.css";
import app from "./Firebaseclient"
import { getFirestore, collection, getDocs ,addDoc} from 'firebase/firestore/lite';
import { getStorage ,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
export default function Form({setpage}){

const [title, settitle] = useState("")
const [author, setauthor] = useState("")
const [genre, setgenre] = useState("Fantasy")
const [content, setcontent] = useState("")
const [img, setimg] = useState("")

function handleimg(event) {
    setimg(event.target.files[0]);
    }

    function handleUpload() {
        let  storage  = getStorage(app);
        if (!img) {
        alert("Please choose a file first!")
        return null
        }
        
        const storageRef = ref(storage, `/files/${img.name}`)
        const uploadTask = uploadBytesResumable(storageRef, img);
        return img.name
        }
    async function setpaged(){
        if (title==''||genre==''||content==''||author=='')
        {
            alert("Fill all the required fields!")
            return
        }
        // add data d to db
        let imgname=null;
        if(img!="")
        imgname = handleUpload()

        console.log("recieved from handleUpload",imgname)
        let obj = { "Title" :  title , "Author" : author, "Genre" : genre, "Content" : content, "File" : imgname};
        let  db  = getFirestore(app);
        
       
        // console.log(db)
        let colref = await collection(db,"articles")
        await addDoc(colref,obj)

        setauthor("")
        settitle("")
        setcontent("")
        setgenre("Fantasy")
        setimg("")
        if(imgname==null){
            setpage(1)
        }else{

            setTimeout(() => {
                
                setpage(1)
            }, 3500);
            alert("uploading media, please wait! you will be redirected to articles page once it's done")
        }
    }
    return <>
    <h2>"Submit your article today!"</h2> 
  
        <div id="formContainer" >
        
       <form>
       <h4>Title of the Article:</h4>
            <input required name="Title" onChange={(e)=>{settitle((e.target.value))}}></input>
        <h4>Genre:</h4>
            <select required name="Genre" onChange={(e)=>{setgenre((e.target.value))}}>
                <option>
                    Fantasy
                </option>
                <option>
                    Crime
                </option>
                <option>
                    Current Affairs
                </option>
                <option>
                    Comedy
                </option>
                <option>
                    Sports
                </option>
                <option>
                    Fitness/Health
                </option>
            </select>
            <h4>Author:</h4>
            <input required name="Author" onChange={(e)=>{setauthor((e.target.value))}} ></input>
            <h4>Content of article:</h4>
            <textarea required placeholder="Content" onChange={(e)=>{setcontent((e.target.value))}}  ></textarea>
            <h4>Upload image source (optional):</h4>
            <input type="file" accept="image/*" name="image" onChange={handleimg}  ></input>
            <br></br>
            <br></br>
            <div id="submit" onClick={setpaged}  >Submit 
            </div>

       </form>


    </div>
    </>
}