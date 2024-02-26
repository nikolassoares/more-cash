// data.class.ts

import { Data } from "../intefaces/data.interface";

export class DataClass{
    id: number;
    name: string;
    value: number;
    instalments: number;
    fees: number;
    valueInstalment: number;
    total: number;

    constructor(data: Data) {
        this.id = data.id;
        this.name = data.name;
        this.value = data.value;
        this.instalments = data.instalments;
        this.fees = data.fees;
        this.valueInstalment = data.valueInstalment;
        this.total = data.total;
    }
}
