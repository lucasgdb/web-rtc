import { ButtonVariant } from './types';

export function getButtonVariant(variant: ButtonVariant = 'default') {
  if (variant === 'dark') {
    return 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5';
  }

  if (variant === 'red') {
    return 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5';
  }

  if (variant === 'white') {
    return 'px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700';
  }

  return 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5';
}
