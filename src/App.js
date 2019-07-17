import React from 'react';
import { HomeView, BoardView } from './pages';
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={HomeView} />
        <Route path="/board" component={BoardView} />
      </div>
    </BrowserRouter>
  );
}

export default App;
