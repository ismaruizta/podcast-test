import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './views/Home/Home';
import { Detail } from './views/Podcast/Podcast';
import { NoMatch } from './views/NoMatch';
import { Header } from './components/Header/Header';
import { Episode } from './views/Episode/Episode';

function App() {
  return (

      <div className="App">
        <Router>
          <Header />

          <div className="content container">
            <Routes>
              <Route path='' element={<Home />} />
              <Route path="podcast/:idpod" element={<Detail />} />
              <Route path="podcast/:idpod/episode/:idep" element={<Episode />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </Router>
      </div>

  );
}

export default App;
