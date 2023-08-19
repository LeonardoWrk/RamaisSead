import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Ramais {
  id: Generated<number>;
  org: string;
  unidade: string;
  setor: string;
  user: string;
  ramal: string;
}

export interface DB {
  Ramais: Ramais;
}
