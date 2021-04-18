import { React } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
//import "./ header.css";

function TopMenu() {
  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");
  return (
    <div>
      <Menu size="massive">
        <Menu.Item header as={Link} to={"/"}>
          <Icon name="newspaper" />
          News App
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item as={Link} to={"/"} active={splitLocation[1] === ""}>
            <Icon name="fire" />
            Headlines
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={"/bookmarks"}
            active={splitLocation[1] === "bookmarks"}
          >
            <Icon name="bookmark" />
            BookMarks
          </Menu.Item>
          {/* <Menu.Item as="a">
            <Icon name="microphone" />
            Sources
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="theme" />
            Dark Mode
          </Menu.Item> */}
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default TopMenu;
