import axios from "axios";
import { Seniorities } from "../models";

export const getSeniorities = async (perPage?: number, page?:number) => {

  let params = ''
  if(perPage && page) {
    params += `per_page=${perPage}&page=${page}`
  }

    const response = await axios(
      `${import.meta.env.VITE_API_GETONBOARD_SENIORITIES}${params}`
    );
  
    const data = await response.data;
  
    const seniorities: Seniorities = data;
    return seniorities;
  };
  