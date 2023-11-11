import {CategotyQueryType} from '@/type';
export interface CategoryQueryType {
    name?: string;
    level?: number;
    current?: number;
    pageSize?: number;
    all?: boolean;
}
export interface CategoryType {
    name: string;
    level: 1 | 2;
    parrent: CategotyType;
    _id?: string;

}
