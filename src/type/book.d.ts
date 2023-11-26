export interface BookQueryType {
   name?: string;
   author?: string;
   tag?: string;
}
export interface BookType {
  id: string;
  name: string;
  author: string;
  publisher: string;
  cover: string;
  publishAt: string;
  storeNum: number;
  description: string;
  tag: string;
}
