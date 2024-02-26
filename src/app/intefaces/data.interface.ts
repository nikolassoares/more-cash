// data.interface.ts
export interface Data {
    id: number;
    name: string;
    value: number; //valor
    instalments: number; //parcelas
    fees: number; //juros
    valueInstalment: number; //valor por prestacao
    total: number;
}