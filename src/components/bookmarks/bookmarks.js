import React, { useState, useEffect } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { format } from "date-fns";
import "./bookmarks.css";
function Bookmarks() {
  const [bookmark, setDeleteBookMark] = useState([]);
  useEffect(() => {
    let bookmarks = JSON.parse(localStorage.getItem("data")) || [];
    setDeleteBookMark(bookmarks);
  }, []);

  return (
    <React.Fragment>
      <div className="data-cards">
        {bookmark.length === 0 ? (
          <div>
            <h1>No bookmark</h1>
          </div>
        ) : (
          <Card.Group centered>
            {bookmark.map((item, index) => (
              <Card key={index}>
                <Image
                  src={
                    item.urlToImage ||
                    "https://www.linkpicture.com/q/absolutvision-WYd_PkCa1BY-unsplash.jpg"
                  }
                  style={{ width: "auto", height: "180px" }}
                />
                <Card.Content>
                  <Card.Header textAlign="left">{item.title}</Card.Header>
                  <Card.Meta textAlign="left">
                    {format(new Date(item.publishedAt), "dd-MMM-yy")}
                  </Card.Meta>
                  <Card.Description textAlign="left">
                    {item.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="newspaper outline" />
                  <strong>{item.source.name}</strong>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )}
      </div>
    </React.Fragment>
  );
}

export default Bookmarks;
