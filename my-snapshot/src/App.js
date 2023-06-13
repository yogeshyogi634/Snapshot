import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    //method,key,cat/mountain,sorting,perpage-30,format-json/xml,flickr api,
    const params = {
      method: "flickr.photos.search",
      api_key: "9a77bb436fed0aa5c3e998db96cd395c",
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }

    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`;
    axios.get(url).then((resp) => {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgdata) => {
        return fetchFlickrImageUrl(imgdata, 'q')
      });
      setImageData(arr);
    }).catch(() => {

    }).finally(() => {

    })
  }, [searchText])
  const fetchFlickrImageUrl = (photo, size) => {
    //farm66.staticflickr.com/server/id_
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if (size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <>
       <h1>SnapShot</h1>
      <section className='search-image'>
        <section className='search-text'>
        <input onChange={(e) => { searchData.current = e.target.value }} placeholder='Search' />
        <button onClick={() => { setSearchText(searchData.current) }}>Search</button>
        </section>
       
        <section className='btn-image'>
          <button onClick={() => { setSearchText("mountains") }}>Mountains</button>
          <button onClick={() => { setSearchText("beaches") }}>Beaches</button>
          <button onClick={() => { setSearchText("birds") }}>Birds</button>
          <button onClick={() => { setSearchText("food") }}>Food</button>
        </section>
      </section>
      <section className='image-container'>
        {imageData.map((imageurl, key) => {
          return (
            <article className='flickr-image'>
              <img src={imageurl} key={key} />
            </article>
          )
        })}
      </section>
    </>
  );
}

export default App;
