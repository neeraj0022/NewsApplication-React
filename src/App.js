
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';


import {
  BrowserRouter as Router,
  Routes,
  Route
  // Link,
} from "react-router-dom";

function App() 
{
  // // document.body.style.backgroundColor='#36314a';
  document.body.style.backgroundColor='skyblue';
  
  const apiKey =process.env.REACT_APP_NEWS_API;

return (
<>

  <Router>
      <Navbar/>

      <Routes>

        <Route exact path="/" element={<News key="general" apiKey={apiKey}  category="general" />}></Route>
        <Route exact path="/business" element={<News key="business" apiKey={apiKey}   category="business" />}></Route>
        <Route exact path="/entertainment" element={<News key="entertainment" apiKey={apiKey}  category="entertainment" />}></Route>
        <Route exact path="/health" element={<News key="health" apiKey={apiKey}  category="health" />}></Route>
        <Route exact path="/science" element={<News key="science" apiKey={apiKey}  category="science" />}></Route>
        <Route exact path="/sports" element={<News key="sports" apiKey={apiKey}  category="sports" />}></Route>
        <Route exact path="/technology"  element={<News key="technology" apiKey={apiKey}   category="technology" />}></Route>

      </Routes> 

  </Router>
</>
  );
}

export default App;
