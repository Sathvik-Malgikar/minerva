
import './App.css';
import Form from "./Form.js"
import Articles from "./Articles.js"
import { useEffect, useState } from 'react';
import app from "./Firebaseclient"
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
function App() {
  const logo = require("./logo.png")
  const bgimg = require("./bgimg.jpg")
  const nboard = require("./noticeboard.png")
  const [page, setpage] = useState(0);


  useEffect(() => {
    document.title = "Submit your article today!"

    const db = getFirestore(app)
    const storage = getStorage(app)
    console.log(storage)
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <div id='logoContainer' className='round-cut' >

          <img src={logo} alt='logo' ></img>
        </div>

      </header>
      {page == 0 ? <Form setpage={setpage} ></Form> : <Articles></Articles>}
      <span id="nboard" onClick={() => { setpage(1) }} >
        <img src={nboard} width={200} ></img>
        <h4>View all articles here</h4>
      </span>
      <span id="homebtn" onClick={() => { setpage(0) }} >
        <img src="https://png.pngitem.com/pimgs/s/78-780842_back-button-white-icon-png-transparent-png.png" width={140} ></img>
        <h4>Home page</h4>
      </span>
    </div>
  );
}

export default App;
