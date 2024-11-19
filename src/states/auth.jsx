import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearTeam } from '../states/team';

const AuthContext = createContext(null);

export const AuthProvider = ({ children = null }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser
      ? JSON.parse(storedUser)
      : {
          username: null,
          name: null,
          userId: null,
          superheroes: [],
        };
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (userData, token) => {
    setUser({
      ...userData,
      superheroes: [],
    });

    localStorage.setItem('token', token); 

    dispatch(clearTeam());
  };

  const logout = () => {
    setUser({
      username: null,
      name: null,
      userId: null,
      superheroes: [],
    });

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const setSuperheroes = (superheroes) => {
    setUser((prevUser) => ({
      ...prevUser,
      superheroes,
    }));
  };

  const getSuperheroes = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser).superheroes : [];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setSuperheroes, getSuperheroes }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
