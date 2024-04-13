export default interface Item {
  id: string;
  name: string;
  price: number;
  consignerCost: number;
  description: string;
  imageUrls: string[];
  soldAt: Date | null;
  boothId: string;
  categories: string[];
}
