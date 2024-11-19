import { useLocation } from 'react-router-dom';
import NavBar from './NavBar.jsx';

const Layout = ({ children }) => {
  const location = useLocation();

  const noNavBarRoutes = ["/", "/Register", "/Register/"];

  return (
    <>
      {!noNavBarRoutes.includes(location.pathname) && <NavBar />}
      
      {children}
    </>
  );
};

export default Layout;