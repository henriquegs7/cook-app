import * as recipes from "./recipes";
import * as ingredients from "./ingredients";
import * as preparations from "./preparations";

export const services = {
  recipes,
  ingredients,
  preparations,

  storage: {
    imagePath: "https://htbaucsuepougjrbiygw.supabase.co/storage/v1/object/public/ingredients",
  },
};
