import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Service from "./components/Service";
import Header from "./components/ui/Header";



function App() {
  return (
   <BrowserRouter>
   <Header />
   <Switch>
    <Route exact path = '/service' component = { ()=> (<div>Service</div>)} />
   <Route exact path = '/about' component = {About}/>
   </Switch>
   </BrowserRouter>
  );
}

export default App;
