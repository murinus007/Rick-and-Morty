
import './App.css';
import Characters from './components/Characters/Characters';
import DrawerMenu from './components/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Episodes from './components/Episodes/Episodes';
import Locations from './components/Locations/Locations';
import WatchList from './components/WatchList/WatchList';

function App() {
  return (
    <div className="App">
    <Router>
        <DrawerMenu />
        <Switch>
          <Route path="/Characters">
            <Characters />
          </Route>
          <Route path="/Episodes">
            <Episodes />
          </Route>
          <Route path="/Locations">
            <Locations />
          </Route>
          <Route path="/My watch list">
            <WatchList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
