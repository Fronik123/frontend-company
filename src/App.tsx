import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./page/Dashboard";
import UserDetails from "./page/UserDetails";
import UsersProvider from "./context/UsersProvider";

function App() {
  return (
    <UsersProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/details/:id" element={<UserDetails />} />
        </Routes>
      </Router>
    </UsersProvider>
  );
}

export default App;
