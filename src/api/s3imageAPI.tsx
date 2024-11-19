// @ts-ignore
import axiosInstance from '../lib/axios';


export async function uploadImageAWS(superId: number, file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('superId', superId.toString());
    formData.append('file', file);

    const response = await axiosInstance.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}


export async function fetchImageBySuperheroId(superId: number): Promise<string | null> {
  try {
    const response = await axiosInstance.get(`/images/${superId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}