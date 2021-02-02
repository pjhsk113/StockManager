import { Sector } from '@/api/enum';

export interface IStock {
  id?: number,
  name: string,
  sector: Sector,
  price : number,
  quantity: number,
  ratio: number
}
