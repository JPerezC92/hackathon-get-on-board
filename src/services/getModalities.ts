import axios from "axios";
import { Modalities } from "../models";



export const getModalities = async (perPage?: number, page?:number) => {

    let params = ''
    if(perPage && page) {
      params += `per_page=${perPage}&page=${page}`
    }

    const response = await axios(
      `${import.meta.env.VITE_API_GETONBOARD_MODALITIES}${params}`
    );
  
    const data = await response.data;
  
    const modalities: Modalities = data;
    return modalities;
  };
  
