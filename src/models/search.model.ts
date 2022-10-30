
import { Meta } from "./meta.model";

export interface Search {
    data: Data[];
    meta: Meta;
}

interface Attributes {
    title: string;
    description_headline: string;
    functions_headline: string;
    functions:string; 
    benefits_headline:string; 
    benefits:string; 
    desirable_headline:string; 
    desirable: string;
    remote: string; 
    remote_modality: string; 
    remote_zone: string; 
    country: string; 
    category_name: string; 
    perks: string[],
    min_salary: string;
    max_salary: string;
    modality: string;
    seniority: string;
    published_at: number;
    company: {

        data: {
            id: string;
            type: string;
            attributes: {
                name: string;
                description: string;
                long_description: string;
                projects: string;
                benefits: string;
                web: string;
                twitter: string;
                github: string;
                facebook: string;
                angellist: string;
                logo: {
                    url: string;
                    thumb: {
                        url:string;
                    };
                }
            },
            country: string;
        },
        relationships: {}
    }

}   

interface Data {
    id: string;
    type: string;
    attributes: Attributes;
    links: {
        public_url: string;
      }
}
