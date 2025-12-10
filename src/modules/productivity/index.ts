import { productivityBank } from "./bank";
import { productivityMeta } from "./meta";
import { type ModuleDefinition } from "../types";

export const productivityModule: ModuleDefinition = {
  meta: productivityMeta,
  bank: productivityBank
};
