import { Meta } from "./meta.model";

export interface Technologies {
    data: Data[];
    meta: Meta;
}

interface Attributes {
    name: string;
    keywords: string;
}   

interface Data {
    id: string;
    type: string;
    attributes: Attributes;
}