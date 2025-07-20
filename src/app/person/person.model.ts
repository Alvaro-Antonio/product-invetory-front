export interface Person {
    
    id: number;
    name: string;

    phone: string;

    email?: string;

    address?: string;

    createdAt: Date;
    
    updatedAt?: Date | null;

}

export interface PersonCreate {
    
    name: string;

    phone: string;

    email?: string;

    address?: string;

}