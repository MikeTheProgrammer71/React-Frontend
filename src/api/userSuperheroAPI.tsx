// @ts-ignore
import axiosInstance from '../lib/axios';

interface Superhero {
  super_id: number;
  name: string;
  realName: string;
  universe: string;
  yearCreated: number;
}

export async function fetchUserSuperheroes(userId: number): Promise<Superhero[] | null> {
  try {
    const response = await axiosInstance.get(`/users/${userId}/superheroes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user superheroes:', error);
    return null;
  }
}

export async function assignSuperheroToUser(userId: number, superheroId: number): Promise<string> {
  try {
    const response = await axiosInstance.post(`/users/${userId}/superheroes/${superheroId}`);
    return response.data; 
  } catch (error) {
    console.error('Unexpected error:', error);
    return 'Error adding superhero to user';
  }
}

export async function unassignSuperheroFromUser(userId: number, superheroId: number): Promise<string> {
  try {
    const response = await axiosInstance.delete(`/users/${userId}/superheroes/${superheroId}`);
    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
    return 'Error removing superhero from user';
  }
}

export async function isUserSuperheroAssociation(userId: number, superheroId: number): Promise<boolean> {
  try {
    const response = await axiosInstance.get(`/users/${userId}/superheroes/${superheroId}/exists`);
    return response.data;
  } catch (error) {
    console.error('Error checking if user has superhero:', error);
    return false;
  }
}




export async function fetchSuperheroById(superId: number): Promise<Superhero[] | null> {
  try {
    const response = await axiosInstance.get(`/superheroes/${superId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user superheroes:', error);
    return null;
  }
}

export async function fetchUserSuperheroesByUniverse(userId: number, universe: string): Promise<Superhero[] | null> {
  try {
    const response = await axiosInstance.get(`/users/${userId}/superheroes/universe`, {
      params: { universe },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching superheroes by universe:', error);
    return null;
  }
}

export async function fetchUserSuperheroesByPower(userId: number, powerId: number): Promise<Superhero[] | null> {
  try {
    const response = await axiosInstance.get(`/users/${userId}/superheroes/power`, {
      params: { powerId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching superheroes by power:', error);
    return null;
  }
}
