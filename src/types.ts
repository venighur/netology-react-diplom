export type ProductProps = {
  id: number;
  title: string;
  category: number;
  price: number;
  images: string[];
  color: string;
  heelSize: string;
  manufacturer: string;
  material: string;
  reason: string;
  season: string;
  sku: string;
  sizes: ProductSizeProps[];
};

export type ProductSizeProps = {
  size: string;
  available: boolean;
}

export type ProductInCartProps = {
  id: number;
  title: string;
  size: string;
  count: number;
  price: number;
}