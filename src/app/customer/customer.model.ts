import { Person } from "../person/person.model";

export interface Customer {
    id: number;
    vip: boolean;
    person:Person;
}