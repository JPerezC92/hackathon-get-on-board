
export interface Perks {
    data: Data[];
}

interface Attributes {
   
    name: string;
    description: string;
}   

interface Data {
    id: string;
    type: string;
    attributes: Attributes;
}