import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

const API_KEY = "AIzaSyApxW7LuupLTV2y4W-pbZLEx1lawonvFqY";

export default function App() {
  const [channels, setChannels] = useState([]);
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChannels([]);

    const fetchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURI(
      url
    )}&type=channel&key=${API_KEY}`;

    const data = await fetch(fetchUrl);
    const result = await data.json();
    console.log({ result });

    const items = result.items.map(async (item) => {
      const channelId = item.id.channelId;
      const channelTitle = item.snippet.channelTitle;
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`
      );
      const res = await data.json();
      return { ...res.items[0], title: channelTitle };
    });

    const channelList = await Promise.all(items);
    setChannels(channelList);
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="App">
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="channelUrl">
          <Form.Label>Channel URL:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            onChange={handleChange}
            value={url}
            required
            placeholder="Enter Channel URL"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <li>
        {channels.map((channel) => {
          return (
            <div key={channel.id}>
              <h2>{channel.title}</h2>
              You have {channel.statistics.subscriberCount} subscribers
              <br />
              You have {channel.statistics.viewCount} Videos
              <br />
              You have {channel.statistics.videoCount} Views
            </div>
          );
        })}
      </li>
    </div>
  );
}
