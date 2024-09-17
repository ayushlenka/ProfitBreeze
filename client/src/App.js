import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/homepage";
import StockX from "./pages/stockx";
import StockXVsGOAT from "./pages/stockxvsgoat";
import GOAT from "./pages/goat";
import Settings from "./pages/settings";
import { ChatbotProvider } from "./components/chatbotcontext";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <ChatbotProvider> 
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/calculators/StockX" element={<StockX />} /> 
              <Route path="/calculators/GOAT" element={<GOAT />} />
              <Route path="/calculators/StockXVsGOAT" element={<StockXVsGOAT />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </ChatbotProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
