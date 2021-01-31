import { Sector } from '@/api/enum';

export interface IStock {
  id?: string,
  name: string,
  sector: Sector,
  price : number,
  quantity: number
}
