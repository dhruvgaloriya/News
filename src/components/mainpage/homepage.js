import React, { useState, useEffect } from "react";
import { Dropdown, Card, Image, Icon } from "semantic-ui-react";
import axios from "axios";
import { format } from "date-fns";
import "./homepage.css";
import country from "../constants/countries";
import category from "../constants/categories";
function HomePage() {
  const [changeCountry, selctionChangeCountry] = useState("in");
  const [changeCategory, selctionchangeCategory] = useState("sports");
  const [loading, setLoading] = useState(true);
  const [data, handleData] = useState([]);
  const dimmerArr = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://newsapi.org/v2/top-headlines", {
        headers: {
          "X-Api-Key": "0ec2115b7e844a1f9c67e638e01f6460",
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          country: changeCountry,
          category: changeCategory,
        },
      })
      .then(({ data }) => {
        handleData(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [changeCountry, changeCategory]);

  const handleChange = (value, action) => {
    switch (action) {
      case "country":
        selctionChangeCountry(value);
        break;
      case "category":
        selctionchangeCategory(value);
        break;
      default:
        selctionChangeCountry(value);
        break;
    }
  };

  const bookmark = (index) => {
    const marknews = [data[index]];
    if (localStorage.getItem("data")) {
      let arr = JSON.parse(localStorage.getItem("data"));
      arr = arr.filter((i) => i.title !== marknews[0]["title"]);
      const newarr = [...arr, data[index]];
      localStorage.setItem("data", JSON.stringify(newarr));
    } else {
      localStorage.setItem("data", JSON.stringify(marknews));
    }
  };

  return (
    <React.Fragment>
      <div className="filters">
        <div className="inside-filter">
          <span>
            <strong>Select country</strong>
          </span>
          <Dropdown
            placeholder="Select Country"
            search
            selection
            options={country}
            onChange={(event, data) => handleChange(data.value, "country")}
            defaultValue={country[23].value}
          />
        </div>
        <div className="inside-filter">
          <span>
            <strong>Select category</strong>
          </span>
          <Dropdown
            placeholder="Select Category"
            search
            selection
            options={category}
            onChange={(event, data) => handleChange(data.value, "category")}
            defaultValue={category[5].value}
          />
        </div>
      </div>
      <div className="data-cards">
        {loading ? (
          <Card.Group centered>
            {dimmerArr.map((item, index) => (
              <Card key={index}>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png"></Image>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <Image
                      size="medium"
                      src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                    />
                  </Card.Header>
                  <Card.Description textAlign="left">
                    <Image
                      size="medium"
                      src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                    />
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="newspaper outline" />
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        ) : (
          <Card.Group centered>
            {data.map((item, index) => (
              <Card key={index}>
                <Image
                  src={
                    item.urlToImage ||
                    "https://www.linkpicture.com/q/absolutvision-WYd_PkCa1BY-unsplash.jpg"
                  }
                  style={{ width: "auto", height: "180px" }}
                />
                <Card.Content>
                  <Card.Header textAlign="left">
                    <span onClick={() => bookmark(index)}>{item.title}</span>
                  </Card.Header>
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

export default HomePage;
