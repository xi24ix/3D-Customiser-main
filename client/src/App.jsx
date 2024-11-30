import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return(
    <Router>
      <main className="app transition-all ease-in">
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Canvas />
              <Customizer />
            </>
          } />
          <Route path="/customizer" element={
            <>
              <Canvas />
              <Customizer />
            </>
          } />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
