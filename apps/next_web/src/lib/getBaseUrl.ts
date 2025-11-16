export function getBaseUrl() {
  if (typeof window === 'undefined') {
    return process.env.PUBLIC_API_URL || 'http://localhost:3000';
  }

  return '';
}
