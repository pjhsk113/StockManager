import { IStock } from '@/components/stock/types'
import { Sector } from '@/components/stock/enum'

export const defualtStock: IStock = {
  id: '',
  name: '',
  sector: Sector.IT,
  price: 0,
  quantity: 0,
  ratio: 0
}