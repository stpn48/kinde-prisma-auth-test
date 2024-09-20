import { create } from "zustand";

type Store = {
  createBlogModalOpened: boolean;
  setCreateBlogModalOpened: (val: boolean) => void;

  blogDetailsModalOpened: boolean;
  setBlogDetailsModalOpened: (val: boolean) => void;
};
export const useModalVisibilityStore = create<Store>((set) => ({
  createBlogModalOpened: false,
  setCreateBlogModalOpened: (val: boolean) =>
    set({ createBlogModalOpened: val }),

  blogDetailsModalOpened: false,
  setBlogDetailsModalOpened: (val: boolean) =>
    set({ blogDetailsModalOpened: val }),
}));
