import { Route, Switch } from "react-router-dom";
import UserPage from "./components/UserPage/UserPage";
import UserListPage from "./components/UserListPage/UserListPage";
import "./App.scss";

function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={UserListPage} key="home" />
        <Route path="/:user" component={UserPage} key="user" />
      </Switch>
    </div>
  );
}

export default App;
