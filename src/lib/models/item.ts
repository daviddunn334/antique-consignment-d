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

export const getDefaultImage = () => {
  return rand([
      "https://www.franciscosegarra.com/wp-content/uploads/2019/11/antique-decorative-items-francisco-segarra.jpg",
      "https://cf.ltkcdn.net/antiques/images/std-xs/265273-340x219-antique-clock.jpg",
      "https://extramile.thehartford.com/wp-content/uploads/2019/11/Most-Valuable-Antiques.jpg",
      "https://www.japanese-vintage.org/images/DSC05757.jpeg",
      "https://shibui.com/cdn/shop/files/shibuikotto_159219410_488920118783238_8217517288162059787_n.jpg?v=1615937264",
      "https://www.trocadero.com/stores/101antiques/items/1470541/catphoto.jpg",
  ]);
}

function rand<T>(items: T[]): T {
  // "~~" for a closest "int"
  return items[~~(items.length * Math.random())];
}