import React, { useState, useEffect } from "react";
import mock from "./mock";
import {format} from "date-fns";

export default function App() {
  console.log("mock", mock.hits);

  //useState
  const [data, setData] = useState(mock.hits);
  const [searchBar, setSearchBar] = useState("");
  const [numItems, setNumItems] = useState(5);

  

  //useEffect to get the data from API. [] means at the end is trigger this once and that is all.
  useEffect(() => {
    getData();
  }, []);

  //useEffect to search inside the API. Here we are adding [searchBar] at the end and defining this useEffect in the return to set it whenever there is a search, it will be triggered.
  useEffect(() => {
    getSearchData();
  }, [searchBar]);

  //we are defining the function that we put in the first useEffect above.
  //Also the API is added.
  const getData = () => {
    fetch("https://hn.algolia.com/api/v1/search?query=...#")
      .then((respond) => respond.json())
      .then((data) => setData(data.hits))
      .catch((err) => console.log(err));
  };

  //Where it says foo in the example of the link, we added ${searchBar} to make that data dynamic for any keywords that is entered in the searchbar.
  const getSearchData = () => {
    fetch(`http://hn.algolia.com/api/v1/search?query=${searchBar}&tags=story`)
      .then((respond) => respond.json())
      .then((data) => setData(data.hits))
      .catch((err) => console.log(err));
  };

  

  return (
    <div className="app">
      <div>
        <ul className="nav-bar">
          <li>
          <img className='img' src='https://hn.algolia.com/packs/media/images/logo-hn-search-a822432b.png'></img>Hacker Clone
          </li>
          <li>
            <a href="./new">new</a>
          </li>
          <li>
            <a href="./past">past</a>
          </li>
          <li>
            <a href="./comment">comments</a>
          </li>
          <li>
            <a href="./ask">ask</a>
          </li>
          <li>
            <a href="./show">show</a>
          </li>
          <li>
            <a href="./jobs">jobs</a>
          </li>
          <li>
            <a href="./submit">submit</a>
          </li>
          <li>
            <a href="./login">login</a>
          </li>
        </ul>
      </div>
      
      <section className="section">
      <div className="news">
        <form>
        <div className="search" >
        <p id="Search-text">Search:</p>
          <input
            type="text"
            placeholder="Enter Topic"
            onChange={(event) => {
              setSearchBar(event.target.value);
            }}
          />

        </div>
        </form>
        
        <article className="cards">
          {!data ? <div className="spinner"></div> : data.slice(0, numItems).map((ele) => <div className="section">
            <h2>{ele.title}</h2> 
            <ul>
            <li>Author:&nbsp;{ele.author}</li>
            <li><p>posted:&nbsp;{format(new Date(ele.created_at), 'MMMM dd yyyy')}</p></li>
            <li><a href={ele.url} target="_blank" rel="noreffer">Read Artical</a></li>
          </ul>
          
            
            </div>  )}
        </article>
      </div>
      </section>
      <button onClick={() => setNumItems(numItems + 5)}>Load More</button>
      <span className="horizontalLine"></span>

      <div className="bottom">
        <div>
          <p id="bottomp">Applications are open for YC Summer 2023</p>
        </div>

        <div className="aboutUs nav-bar" id="aboutUs">
          <ul>
            <li>
              <a href="./guidelines">Guidelines</a>
            </li>
            <li>
              <a href="./faq">FAQ</a>
            </li>
            <li>
              <a href="./lists">Lists</a>
            </li>
            <li>
              <a href="./api">API</a>
            </li>
            <li>
              <a href="./security">Security</a>
            </li>
            <li>
              <a href="./legal">Legal</a>
            </li>
            <li>
              <a href="./apply">Apply to YC</a>
            </li>
            <li>
              <a href="./contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}