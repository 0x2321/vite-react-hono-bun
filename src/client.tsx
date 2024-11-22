import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {Home, NotFound} from "./views";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<div>Hello dashboard!</div>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);