import axios from "axios";
import { Perks } from "../models";


export const getPerks = async () => {
    const response = await axios(
      `${import.meta.env.VITE_API_GETONBOARD_PERKS}`
    );
  
    const data = await response.data;
  
    const perks: Perks = data;
    return perks;
  };
  