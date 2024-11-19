// @ts-ignore
import axiosInstance from '../lib/axios';
// @ts-ignore
import handleError from '../utils/apiError';


import {
  fetchUserSuperheroes,
  assignSuperheroToUser,
  unassignSuperheroFromUser,
  isUserSuperheroAssociation,
  fetchSuperheroById,
  fetchUserSuperheroesByUniverse,
  fetchUserSuperheroesByPower
} from "../api/userSuperheroAPI";


interface Superhero {
  super_id: number;
  name: string;
  realName: string;
  universe: string;
  yearCreated: number;
}

export const UserSuperheroService = {
  
  async getUserSuperheroes(userId: number): Promise<Superhero[] | null> {
    try {
      const userSuperheroes = await fetchUserSuperheroes(userId);
      return userSuperheroes;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async addSuperheroToUser(userId: number, superheroId: number): Promise<string | null>  {
    try {
      const responseMsg = await assignSuperheroToUser(userId, superheroId);
      return responseMsg;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async removeSuperheroFromUser(userId: number, superheroId: number): Promise<string | null> {
    try {
      const responseMsg = await unassignSuperheroFromUser(userId, superheroId);
      return responseMsg;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async isUserSuperhero(userId: number, superheroId: number): Promise<boolean | null> {
    try {
      const userHasSuperhero = await isUserSuperheroAssociation(userId, superheroId);
      return userHasSuperhero;
    } catch (error) {
      handleError(error);
      return null;
    }
  },
  
  async getSuperheroById(superId: number): Promise<Superhero[] | null> {
    try {
      const superhero = await fetchSuperheroById(superId);
      return superhero;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async getUserSuperheroesByUniverse(userId: number, universe: string): Promise<Superhero[] | null> {
    try {
      const superherosInUniverse = await fetchUserSuperheroesByUniverse(userId, universe);
      return superherosInUniverse;
    } catch (error) {
      handleError(error); 
      return null;
    }
  },

  async getUserSuperheroesByPower(userId: number, powerId: number): Promise<Superhero[] | null> {
    try {
      const superheroesWithPower = await fetchUserSuperheroesByPower(userId, powerId);
      return superheroesWithPower;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

};
