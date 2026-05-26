import { atom, selector } from "recoil";
import { localStorageEffect } from "./recoidleffect";

export const ProductsStates = atom({
  key: "ProductsKey",
  default: [],
});

export const ProductCategoryStates = atom({
  key: "ProductCategoryKey",
  default: [],
  effects_UNSTABLE: [localStorageEffect("ProductCategoryKey")],
});

export const HomeBannerStates = atom({
  key: "HomeBannerKey",
  default: [],
  effects_UNSTABLE: [localStorageEffect("HomeBannerKey")],
});

export const BlogsListStates = atom({
  key: "BlogListKey",
  default: [],
  effects_UNSTABLE: [localStorageEffect("BlogListKey")],
});

export const surgicalGownsSelector = selector({
  key: "surgicalGownsSelector",
  get: ({ get }) => {
    const cats = get(ProductCategoryStates);
    return cats.find((c) => c.AMD_CatTitle === "Surgical Gowns") || null;
  },
});