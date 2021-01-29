import {Sectors} from "@/api/enums";

export interface IStockParams {
  id: string | null,
  name: string,
  sectors: Sectors,
  price: number,
  quantity: number,
}
