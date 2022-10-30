import axios from "axios";
import { Search } from "../models";


export const getSearch = async (query: string, perPage: number, page:number, company: string | string[], country_code: string, remote: boolean | string) => {
    const response = await axios(
      `${import.meta.env.VITE_API_GETONBOARD_SEARCH}query=${query}&per_page=${perPage}&page=${page}&expand=${company}&country_code=${country_code}&remote=${remote}`
    );
  
    const data = await response.data;
  
    const search: Search = data;
    return search;
  };
  