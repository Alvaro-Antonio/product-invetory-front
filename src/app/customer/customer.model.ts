import { Person } from "../person/person.model";

export interface Customer {
    id: number;
    vip: boolean;
    person:Person;
}

export interface Pagination<T> {
  data: T[]; // Lista de itens paginados
  total: number; // Total de itens disponíveis
  currentPage: number; // Página atual
  totalPages: number; // Total de páginas
}