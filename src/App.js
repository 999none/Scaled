import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ChatPage from "@/pages/ChatPage";
import DownloadPage from "@/pages/DownloadPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
