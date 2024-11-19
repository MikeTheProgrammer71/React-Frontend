// @ts-ignore
import { AxiosError } from 'axios';
// @ts-ignore
import axiosInstance from '../lib/axios';

interface SuperheroDTO {
  name: string;
  realName: string;
  universe: string;
  yearCreated: number;
  canDelete: boolean;
  powerIds: number[];
  image: File;
}

interface Superhero {
  super_id: number;
  name: string;
  realName: string;
  universe: string;
  yearCreated: number;
}

export async function fetchAllSuperheroes(): Promise<Superhero[] | null> {
  try {
    const response = await axiosInstance.get('/superheroes/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching Superheroes: ', error);
    return null;
  }
}

export async function createNewSuperhero(userId: number, superheroDTO: SuperheroDTO): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('name', superheroDTO.name);
    formData.append('realName', superheroDTO.realName);
    formData.append('universe', superheroDTO.universe);
    formData.append('yearCreated', superheroDTO.yearCreated.toString());
    formData.append("canDelete", superheroDTO.canDelete.toString());
    formData.append('powerIds', superheroDTO.powerIds.join(','));
    formData.append('image', superheroDTO.image);

    const response = await axiosInstance.post(
      `/superheroes/users/${userId}/superheroes/add`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`API Error: ${error.response?.data || error.message}`);
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
}

export async function fetchAllSuperheroesByPower(powerId: number): Promise<Superhero[] | null> {
  try {
    const response = await axiosInstance.get(`/superheroes/power/${powerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Superheroes: ', error);
    return null;
  }
}

export async function removeCharacterFromDatabase(superId: number): Promise<String | null> {
  try {
    const response = await axiosInstance.delete(`/superheroes/${superId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting character ', error);
    return null;
  }
}
