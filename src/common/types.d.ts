import { ReactHTML } from 'react';

export type HTMLParams<T extends keyof ReactHTML> = NonNullable<Parameters<ReactHTML[T]>[0]>;
