import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const camelizeKeys = <T = unknown>(input: unknown): T => {
  const toCamel = (s: string) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

  const walk = (val: unknown): unknown => {
    if (Array.isArray(val)) return val.map(walk);
    if (
      val !== null &&
      typeof val === 'object' &&
      !(val instanceof Date) &&
      !(val instanceof Map) &&
      !(val instanceof Set)
    ) {
      return Object.entries(val).reduce(
        (acc, [k, v]) => {
          (acc as any)[toCamel(k)] = walk(v);
          return acc;
        },
        {} as Record<string, unknown>,
      );
    }
    return val;
  };

  return walk(input) as T;
};

// const camelizeKeys = (input: unknown): unknown => {
//   if (Array.isArray(input)) {
//     return input.map(camelizeKeys);
//   }

//   if (
//     input !== null &&
//     typeof input === 'object' &&
//     !(input instanceof Date) &&
//     !(input instanceof Map) &&
//     !(input instanceof Set)
//   ) {
//     return Object.entries(input).reduce(
//       (acc, [key, value]) => {
//         acc[toCamel(key)] = camelizeKeys(value);
//         return acc;
//       },
//       {} as Record<string, unknown>,
//     );
//   }

//   return input;
// };

// export { camelizeKeys };
