export type ProductCategory =
  | "Blind Flange"
  | "Weld Neck Flange"
  | "Slip On Flange"
  | "Socket Weld Flange"
  | "Threaded Flange"
  | "Lap Joint Flange"
  | "Elbow"
  | "Tee"
  | "Reducer"
  | "Ball Valve";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  material: string;
  standard: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
};

export type ArticleCategory =
  | "Flange Guide"
  | "Standards"
  | "Material Science"
  | "Pipe Schedule"
  | "Valves"
  | "Quality & Traceability"
  | "Maintenance";

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: ArticleCategory;
  author: string;
  publishedDate: string; // ISO string
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
  body: string; // markdown
};

export type Download = {
  id: string;
  title: string;
  category: "Dimensions" | "Pressure Rating" | "Materials" | "Inspection" | "Standards";
  description: string;
  url: string;
};

