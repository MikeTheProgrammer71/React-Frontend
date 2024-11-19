// @ts-ignore
import axiosInstance from '../lib/axios';

interface Power {
  power_id: number;
  name: string;
}

export async function fetchAllPowers(): Promise<Power[] | null> {
  try {
    const response = await axiosInstance.get('/powers');
    return response.data;
  } catch (error) {
    console.error('Error fetching powers:', error);
    return null;
  }
}

export async function fetchPowersBySuperhero(superId: number): Promise<Power[] | null> {
  try {
    const response = await axiosInstance.get(`/superhero/${superId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching powers by superhero:', error);
    return null;
  }
}

export async function fetchPowerIdByName(name: string): Promise<number | null> {
  try {
    const response = await axiosInstance.get('/powers/id', {
      params: { name },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching power ID by name:', error);
    return null;
  }
}

export async function fetchPowerNameById(powerId: number): Promise<string | null> {
  try {
    const response = await axiosInstance.get(`/powers/${powerId}/name`);
    return response.data;
  } catch (error) {
    console.error('Error fetching power name by ID:', error);
    return null;
  }
}