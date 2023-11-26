import request from "@/utils/request";
import qs from "qs";

import { BookQueryType, BookType } from "./../type/book.d";

export async function getBookList(params?: BookQueryType) {
  return request.get(`/book/bookList?${qs.stringify(params)}`);
}
export async function bookAdd(params: BookType) {
  return request.post("/book/addBook/", params, {
    headers: {
      'Content-Type': 'application/json',
      'accept': '*/*'
    }
  });
}
export async function bookDelete(id: string) {
  debugger
  return request.get(`/book/deleteBook?id=${encodeURIComponent(id)}`);
}
export async function bookEdit(params: BookType) {
  return request.post("/book/editBook/", params, {
    headers: {
      'Content-Type': 'application/json',
      'accept': '*/*'
    }
  });
}