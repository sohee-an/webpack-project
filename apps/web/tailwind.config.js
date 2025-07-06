/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';

module.exports = {
  content: [
    './packages/app/src/**/*.{js,ts,jsx,tsx}',
    './packages/shared/src/**/*.{js,ts,jsx,tsx}',
    '../../shared/src/**/*.{js,ts,jsx,tsx}',
    '../shared/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  safelist: [
    'bg-red-500',
    'hover:bg-red-600',
    'bg-transparent',
    'hover:bg-gray-100',
    'text-white',
    'h-8',
    'px-3',
    'text-sm',
    'h-10',
    'px-4',
    'text-base',
    'h-12',
    'px-6',
    'text-lg',
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded',
    'font-medium',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'mr-2',
    'h-4',
    'w-4',
    'space-x-4',
  ],
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
};

// import animatePlugin from 'tailwindcss-animate';

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
//   theme: {
//     container: {
//       center: true,
//       padding: '2rem',
//     },
//     extend: {
//       colors: {
//         border: 'hsl(var(--border))',
//         input: 'hsl(var(--input))',
//         ring: 'hsl(var(--ring))',
//         background: 'hsl(var(--background))',
//         foreground: 'hsl(var(--foreground))',
//         primary: {
//           DEFAULT: 'hsl(var(--primary))',
//           foreground: 'hsl(var(--primary-foreground))',
//         },
//         secondary: {
//           DEFAULT: 'hsl(var(--secondary))',
//           foreground: 'hsl(var(--secondary-foreground))',
//         },
//         destructive: {
//           DEFAULT: 'hsl(var(--destructive))',
//           foreground: 'hsl(var(--destructive-foreground))',
//         },
//         muted: {
//           DEFAULT: 'hsl(var(--muted))',
//           foreground: 'hsl(var(--muted-foreground))',
//         },
//         accent: {
//           DEFAULT: 'hsl(var(--accent))',
//           foreground: 'hsl(var(--accent-foreground))',
//         },
//         popover: {
//           DEFAULT: 'hsl(var(--popover))',
//           foreground: 'hsl(var(--popover-foreground))',
//         },
//         card: {
//           DEFAULT: 'hsl(var(--card))',
//           foreground: 'hsl(var(--card-foreground))',
//         },
//       },
//       borderRadius: {
//         lg: 'var(--radius)',
//         md: 'calc(var(--radius) - 2px)',
//         sm: 'calc(var(--radius) - 4px)',
//       },
//       keyframes: {
//         'accordion-down': {
//           from: { height: '0' },
//           to: { height: 'var(--radix-accordion-content-height)' },
//         },
//         'accordion-up': {
//           from: { height: 'var(--radix-accordion-content-height)' },
//           to: { height: '0' },
//         },
//       },
//       animation: {
//         'accordion-down': 'accordion-down 0.2s ease-out',
//         'accordion-up': 'accordion-up 0.2s ease-out',
//       },
//     },
//   },
//   plugins: [animatePlugin],
// };
