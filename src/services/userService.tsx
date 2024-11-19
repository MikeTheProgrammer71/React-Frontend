// @ts-ignore
import axiosInstance from '../lib/axios';
// @ts-ignore
import handleError from '../utils/apiError';

import {
  fetchAllUsers,
  fetchUserByUsername,
  loginUser,
  deleteUserFromDatabase,
  createUser
} from "../api/userAPI";

interface User {
  userId: number;
  name: string;
  role: string;
  username: string;
  hashedPassword: string;
}

interface UserDTO {
  id: number;
  name: string;
  username: string;
}

interface UserAuthRequest {
  username: string;
  password: string;
}

interface UserAddRequest {
  name: string;
  username: string;
  password: string;
}

export const UserService = {

  async getAllUsers(): Promise<User | null> {
    try {
      const users = await fetchAllUsers();
      return users;
    } catch (error) {
      handleError(error); 
      return null;
    }
  },

  async getUserByUsername(username: string): Promise<UserDTO | null> {
    try {
      const user = await fetchUserByUsername(username);
      return user;
    } catch (error) {
      handleError(error); 
      return null;
    }
  },

  async authenticateUser(request: UserAuthRequest): Promise<{ user: UserDTO, token: string } | null> {
    try {
      const result = await loginUser(request);
  
      if (result) {
        const { user, token } = result;
        return { user, token };
      }
  
      return null;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async addUser(request: UserAddRequest): Promise<string | null> {
    try {
      const userCreated = await createUser(request);
      return userCreated;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async deleteUser(userId: number): Promise<string | null> {
    try {
      const response = await deleteUserFromDatabase(userId);
      return response;
    } catch (error) {
      handleError(error);
      return null;
    }
  },
};
