import { useEffect, useState } from "react";
import "./articles_styles.css";

import app from "./Firebaseclient";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

export default function Articles() {
  const [articles, setarticles] = useState([]);

  let db;
  async function updatedata() {
    let colref = await collection(db, "articles");
    let snapshot = await getDocs(colref);
    let arr_temp = snapshot.docs.map((e, i) => {
      return e.data();
    });
    console.log(arr_temp);
    setarticles(arr_temp);
  }

  useEffect(() => {
    document.title = "View all articles";

    db = getFirestore(app);

    updatedata();
  }, []);

  function getimg(i) {
    let name = articles[i]["File"];
    if (name == null||name.startsWith("http")) return;

    const storage = getStorage(app);
    getDownloadURL(ref(storage, "files/" + name))
      .then((url) => {
        let copy2 = articles;

        copy2[i]["File"] = url;

        setarticles(copy2);
        console.log("AFTER COPY", articles);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <h2>"All articles"</h2>
      <div id="art_container">
        {articles.map((e, i) => {
          getimg(i);
          console.log("REQFOR", e.File, "at", i);

          return (
            <div key={i} className="article">
              <h2>{e.Title}</h2>
              <h5>{e.Genre}</h5>
              -By <h4 style={{ display: "inline-block" }}>{e.Author}</h4>
              <p style={{ fontSize: 30 }}>{e.Content}</p>
              {e.File != null ? <img key={i} src={e.File} style={{width:"70%"}}  ></img> : <></>}
              <a>
                <h4>Click here to go to full article</h4>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
