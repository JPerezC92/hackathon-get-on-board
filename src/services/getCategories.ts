import axios from "axios";
import { Categories } from "../models";


export const getCategories = async (perPage?: number, page?:number) => {

    let params = ''
    if(perPage && page) {
      params += `per_page=${perPage}&page=${page}`
    }

    const response = await axios(
      `${import.meta.env.VITE_API_GETONBOARD_CATEGORIES}${params}`
    );
  
    const data = await response.data;
  
    const categories: Categories = data;
    return categories;
  };
  