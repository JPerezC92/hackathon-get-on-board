import { Meta } from "./meta.model";

export interface Localities {
    data: Data[];
    meta: Meta;
}

interface Attributes {
    name: string;
}   

interface Data {
    id: string;
    type: string;
    attributes: Attributes;
}