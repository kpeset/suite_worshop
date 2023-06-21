import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <Router>
      <div className='app'>
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/users' element={<Users />} />
          <Route exact path='/logout' element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;