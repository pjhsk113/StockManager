import {IStock} from "@/api/types";
import {Sector} from "@/api/enum";

export const defualtStock: IStock = {
  id: '',
  name: '',
  sector: Sector.IT,
  price: 0,
  quantity: 0
}
