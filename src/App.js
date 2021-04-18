import "./App.css";
import Header from "./components/header/header";
import HomePage from "./components/mainpage/homepage";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Bookmarks from "./components/bookmarks/bookmarks";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/bookmarks">
            <Bookmarks />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
