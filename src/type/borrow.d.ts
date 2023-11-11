import { BookType } from "./book";

export interface BorrowQueryType {
    all?: boolean;
    level?: number;
    name?: string;
    author?: string;
    category?: number;
    current?: number;
    pageSize?: number;
  }
  export interface BorrowType {
    book: BookType;
    borrowAt: number;
    backAt: number;
    // todo user ts
    user: UserType;
  }