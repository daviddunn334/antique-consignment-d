export default interface Item {
  id: string;
  name: string;
  price: number | null;
  consignerCost: number | null;
  description: string | null;
  imageUrl: string | null;
  sold: boolean;
  boothId: string | null;
  categories: string[];
}

export const defaultItemImageUrl = "https://www.franciscosegarra.com/wp-content/uploads/2019/11/antique-decorative-items-francisco-segarra.jpg"