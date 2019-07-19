import React from 'react';
import { HomeView, BoardView, UserView } from './pages';
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={UserView} />
        <Route path="/:userName" exact component={HomeView} />
        <Route path="/:userName/board/:id" component={BoardView} />
      </div>
    </BrowserRouter>
  );
}

export default App;
