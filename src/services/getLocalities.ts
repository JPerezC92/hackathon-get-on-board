import axios from "axios";
import { Localities } from "../models";


export const getLocalities = async (perPage?: number, page?:number) => {

    let params = ''
    if(perPage && page) {
      params += `per_page=${perPage}&page=${page}`
    }

    const response = await axios(
      `${import.meta.env.VITE_API_GETONBOARD_LOCALITIES}${params}`
    );
  
    const data = await response.data;
  
    const localities: Localities = data;
    return localities;
  };
  