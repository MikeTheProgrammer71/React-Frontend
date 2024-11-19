// @ts-ignore
import axiosInstance from '../lib/axios';
// @ts-ignore
import handleError from '../utils/apiError';


import {
  uploadImageAWS,
  fetchImageBySuperheroId
} from "../api/s3imageAPI";


export const ImageService = {

  async uploadImage(superId: number, file: File): Promise<string | null> {
    try {
      const responseMsg = await uploadImageAWS(superId, file);
      return responseMsg;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async getImageBySuperheroId(superId: number): Promise<string | null> {
    try {
      const storedFilename = await fetchImageBySuperheroId(superId);
      return storedFilename;
    } catch (error) {
      handleError(error);
      return null;
    }
  },
};
