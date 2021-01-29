import React, {useState} from "react";
import "./App.css"
import {Form, Button} from "react-bootstrap"
const youtubeChannelId = require('get-youtube-channel-id');

function App() {
  
  const [url, setUrl] = useState(null);
  const [subs, setSubs] = useState(null);
  const [videos, setVideos] = useState(null);
  const [views, setViews] = useState(null);

  const API_KEY = "AIzaSyApxW7LuupLTV2y4W-pbZLEx1lawonvFqY";

  const inputChange= (e)=>{
    console.log(e.target.value);
    setUrl(e.target.value);
  }

  async function submit(e) {
     e.preventDefault();

     const res = await youtubeChannelId(url);
     console.log(res.id);

     fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${res.id}&key=${API_KEY}`)
     .then((data) => data.json())
     .then((res) =>{
       console.log(res)
       setSubs(res.items[0].statistics.subscriberCount);
       setVideos(res.items[0].statistics.videoCount);
       setViews(res.items[0].statistics.viewCount);
     })
  }
  
  return (
    <div className="App">
     <Form onSubmit={submit}>
        <Form.Group controlId="channelUrl">
          <Form.Label>Enter Channel URL:</Form.Label>
          <Form.Control type="text" name="url"
          onChange={inputChange} value={url} required placeholder="Enter Channel URL" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Get stats
        </Button>
      </Form>
      <br />
      <br />
      <hr />
     <p>This channel have:- <b> {subs} </b>Subscribers..</p> 
     <p> This channel have:- <b> {views} </b> Views..</p>
      <p> This channel have:- <b> {videos} </b> Videos..</p> 
    </div>
  );
}

export default App;
