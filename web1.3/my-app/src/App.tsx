import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import ChatApp from "./components/ChatApp";


export default function App() {
  return (
        <Routes>
          <Route path="/*" element={<ChatApp />} />
        </Routes>
  );
}
