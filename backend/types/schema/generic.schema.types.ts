import { Date } from 'mongoose';

export type TSchema<T = unknown> = {
  createdAt: Date;
  updatedAt: Date;
} & T;

export type TOmitSchemaDefault<T extends TSchema> = Omit<T, 'createdAt' | 'updatedAt'>;
