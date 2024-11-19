// @ts-ignore
import axiosInstance from '../lib/axios';
// @ts-ignore
import handleError from '../utils/apiError';

import {
  fetchAllPowers,
  fetchPowersBySuperhero,
  fetchPowerIdByName,
  fetchPowerNameById
} from "../api/powerAPI";

interface Power {
  power_id: number;
  name: string;
}

export const PowerService = {
  async getAllPowers(): Promise<Power[] | null> {
    try {
      const powers = await fetchAllPowers();
      return powers;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async getPowersBySuperhero(superId: number): Promise<Power[] | null> {
    try {
      const superheroPowers = await fetchPowersBySuperhero(superId);
      return superheroPowers;
    } catch (error) {
      handleError(error);
      return null;
    }
  },


  async getPowerIdByName(name: string): Promise<number | null> {
    try {
      const powerId = await fetchPowerIdByName(name);
      return powerId;
    } catch (error) {
      handleError(error);
      return null;
    }
  },


  async getPowerNameById(powerId: number): Promise<string | null> {
    try {
      const powerName = await fetchPowerNameById(powerId);
      return powerName;
    } catch (error) {
      handleError(error);
      return null;
    }
  },
};
