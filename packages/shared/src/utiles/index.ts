import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const toCamel = (str: string) => str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

 const camelizeKeys = (input: unknown): unknown => {
  if (Array.isArray(input)) {
    return input.map(camelizeKeys);
  }

  if (
    input !== null &&
    typeof input === 'object' &&
    !(input instanceof Date) &&
    !(input instanceof Map) &&
    !(input instanceof Set)
  ) {
    return Object.entries(input).reduce((acc, [key, value]) => {
      acc[toCamel(key)] = camelizeKeys(value);
      return acc;
    }, {} as Record<string, unknown>);
  }

  return input;
};

export { camelizeKeys } 