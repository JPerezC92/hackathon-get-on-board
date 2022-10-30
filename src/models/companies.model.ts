import { Meta } from "./meta.model";

export interface Companies {
    data: Data[];
    meta: Meta;
}

interface Attributes {
    name: string;
    description: string;
    long_description: string;
    projects:string; 
    benefits:string; 
    web: string;
    twitter: string; 
    github: string; 
    facebook: string; 
    angellist: string; 
    country: string; 
    response_time_in_days: {
        min: null | number;
        max: null | number;
    },
    logo: string;

}   

interface Data {
    id: string;
    type: string;
    attributes: Attributes;
}



