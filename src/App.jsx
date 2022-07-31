import { useState } from 'react'
import './style/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FindFilm from './pages/FindFilm';
import Watchlist from './pages/Watchlist';
import ErrorPage from './pages/ErrorPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FindFilm />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
