import { create } from "zustand";

type Store = {
  CreateBlogModalOpened: boolean;
  setCreateBlogModalOpened: (val: boolean) => void;
};
export const useModalVisibilityStore = create<Store>((set) => ({
  CreateBlogModalOpened: false,
  setCreateBlogModalOpened: (val: boolean) =>
    set({ CreateBlogModalOpened: val }),
}));
