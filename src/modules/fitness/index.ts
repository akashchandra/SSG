import { fitnessBank } from "./bank";
import { fitnessMeta } from "./meta";
import { type ModuleDefinition } from "../types";

export const fitnessModule: ModuleDefinition = {
  meta: fitnessMeta,
  bank: fitnessBank
};
