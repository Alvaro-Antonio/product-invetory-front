export interface Balance {
    id?: number; // O id é opcional, pois pode ser gerado pelo banco de dados
        
    year: number;    
       
    totalSpent : number;
 
    totalInvested : number;    
    
    profit : number;
}