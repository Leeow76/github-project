import { Route, Switch } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import UserPage from "./components/UserPage/UserPage";
import "./App.scss";

function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={UserList} key="home" />
        <Route path="/:user" component={UserPage} key="user" />
      </Switch>
    </div>
  );
}

export default App;
