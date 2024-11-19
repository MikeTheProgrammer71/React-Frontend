// @ts-ignore
import axiosInstance from '../lib/axios';
// @ts-ignore
import handleError from '../utils/apiError';

import {
  fetchAllSuperheroes,
  createNewSuperhero,
  fetchAllSuperheroesByPower,
  removeCharacterFromDatabase
} from "../api/superheroAPI";

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

export const SuperheroService = {

  async getAllSuperheroes(): Promise<Superhero[] | null> {
    try {
      const superheroes = await fetchAllSuperheroes();
      return superheroes;
    } catch (error) {
      handleError(error);
      return null;
    }
  },
  
  async addNewSuperhero(userId: number, superheroDTO: SuperheroDTO): Promise<any> {
    try {
      const superheroCreated = await createNewSuperhero(userId, superheroDTO);
      return superheroCreated;
    } catch (error) {
      throw error; 
    }
  },

  async getAllSuperheroesByPower(powerId: number): Promise<Superhero[] | null> {
    try {
      const superheroesWithPower = await fetchAllSuperheroesByPower(powerId);
      return superheroesWithPower;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async deleteCharacterFromDatabase(superId: number): Promise<String | null> {
    try {
      const responseMsg = await removeCharacterFromDatabase(superId)
      return responseMsg;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

};
