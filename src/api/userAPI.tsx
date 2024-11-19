// @ts-ignore
import axiosInstance from '../lib/axios.js';

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
  role: string;
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

export async function fetchAllUsers(): Promise<User | null> {
  try {
    const response = await axiosInstance.get(`/api/users/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}

export async function fetchUserByUsername(username: string): Promise<UserDTO | null> {
  try {
    const response = await axiosInstance.get(`/api/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function loginUser(request: UserAuthRequest): Promise<{ user: UserDTO, token: string } | null> {
  try {
    const response = await axiosInstance.post('/api/users/authenticate', request);

    const { jwtToken: token, user } = response.data;

    return { user, token };
  } catch (error) {
    console.error('Authentication failed:', error);
    return null;
  }
}

export async function deleteUserFromDatabase(userId: number): Promise<string | null> {
  try {
    const response = await axiosInstance.delete(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
}

export async function createUser(request: UserAddRequest): Promise<string | null> {
  try {
    const response = await axiosInstance.post('/api/users/create', request);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
}