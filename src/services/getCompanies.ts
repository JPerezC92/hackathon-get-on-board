import axios from "axios";
import { Companies } from "../models";

export const getCompanies = async (perPage?: number, page?:number) => {

    let params = ''
    if(perPage && page) {
      params += `per_page=${perPage}&page=${page}`
    }

    const response = await axios(
      `${import.meta.env.VITE_API_GETONBOARD_COMPANIES}${params}`
    );
  
    const data = await response.data;
  
    const companies: Companies = data;
    return companies;
  };
  
