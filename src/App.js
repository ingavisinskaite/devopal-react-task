import React from "react";
import "./App.css";
import Select from "./components/select";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home";

function App() {
 const [singleSelection, setSingleSelection] = React.useState("");
 const [tagsSelection, setTagsSelection] = React.useState([]);

 return (
   <BrowserRouter>
     <Switch>
       <Route
         exact
         path="/"
         render={props => (
           <Home
             singleSelection={singleSelection}
             tagsSelection={tagsSelection}
           />
         )}
       />
       <Route
         path="/single-select"
         render={props => (
           <Select
             {...props}
             mode="single"
             setSingleSelection={setSingleSelection}
           />
         )}
       />
       <Route
         path="/tags-select"
         render={props => (
           <Select
             {...props}
             mode="tags"
             setTagsSelection={setTagsSelection}
           />
         )}
       />
     </Switch>
   </BrowserRouter>
 );
}
export default App;


