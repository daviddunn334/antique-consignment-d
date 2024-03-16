export default interface Item {
  id: string;
  name: string;
  price: number;
  consignerCost: number;
  description: string;
  imageUrl: string;
  sold: boolean;
  boothId: string;
  categories: string[];
}