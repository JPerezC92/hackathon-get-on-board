import axios from "axios";
import { Search } from "../models";


export const getSearch = async (query: string, perPage: number, page:number) => {
    const response = await axios(
      `${import.meta.env.VITE_API_GETONBOARD_SEARCH}query=${query}&per_page=${perPage}&page=${page}&expand=["company"]`
    );

    const data = await response.data;
  
    const search: Search = data;
    return search;
  };
  