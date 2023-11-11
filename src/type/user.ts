import { USER_ROLE, USER_SEX, USER_STATUS } from "@/constant/user";

export interface UserQueryType {
    name?: string;
    status?: number;
    current?: number;
    pageSize?: number;
};
export interface UserType {
    name: string;
    status: 'on' | 'off';
    nickName: string;
    _id?: string;
    sex?: USER_SEX;
    role?: USER_ROLE;
    password: string;
    // status: USER_STATUS;

}
