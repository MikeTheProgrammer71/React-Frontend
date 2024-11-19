import { Routes, Route } from 'react-router-dom';

import Add from '../views/Add.jsx';
import CharacterPage from '../views/CharacterPage.jsx';
import HomePage from '../views/HomePage.jsx';
import Powers from '../views/Powers.jsx';
import Register from '../views/Register.jsx';
import SignIn from '../views/SignIn.jsx';
import Team from '../views/Team.jsx';
import AdminDashboard from '../views/AdminDashboard.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/Powers" element={<Powers />} />
      <Route path="/Team" element={<Team />} />
      <Route path="/Add" element={<Add />} />
      <Route path="/Character" element={<CharacterPage />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRouter;