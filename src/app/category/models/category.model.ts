export interface Category {
    id: string;
    name: string;
    description?: string;
  }

export interface CategoryRegisterDTO {
  name: string;
  description: string;
}