import { boredomModule } from "./boredom";
import { fitnessModule } from "./fitness";
import { productivityModule } from "./productivity";
import { type ModuleDefinition } from "./types";

export const moduleRegistry: ModuleDefinition[] = [
  productivityModule,
  fitnessModule,
  boredomModule
];
