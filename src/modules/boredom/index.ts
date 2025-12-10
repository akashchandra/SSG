import { boredomBank } from "./bank";
import { boredomMeta } from "./meta";
import { type ModuleDefinition } from "../types";

export const boredomModule: ModuleDefinition = {
  meta: boredomMeta,
  bank: boredomBank
};
