import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './views/Home';
import { Detail } from './views/Detail';
import { Capter } from './views/Capter';
import { NoMatch } from './views/NoMatch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Learn React
      </header>
      <Router>
        <Routes>
          <Route path='' element={<Home/>} />
          <Route path="detail" element={<Detail />} />
          <Route path="capter" element={<Capter />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
