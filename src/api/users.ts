import { AxiosResponse } from "axios";

import { instance } from "./index";

export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export const usersApi = {
  async me() {
    const { data } = await instance.get<User>("auth/users/me/");
    return data;
  },
  async login(resData: { username: string; password: string }) {
    const { data } = await instance.post("auth/token/login/", resData);
    return data;
  },
  async register(resData: { email: string; password: string; role: string }) {
    const { data } = await instance.post("auth/users/", resData);
    return data;
  },
  async update(resData: { email: string; password: string; role: string }) {
    const { data } = await instance.post("auth/users/me", resData);
    return data;
  },
  //   async delete(password: string) {
  //     const { data } = await instance.delete("auth/users/me", {
  //       current_password: password,
  //     });
  //     return data;
  //   },
};
