/**
 * Next.js Instrumentation - runs before server initialization
 * Used to polyfill browser globals for SSR
 */

export async function register() {
  if (typeof window === 'undefined') {
    // Polyfill window object for SSR
    (global as any).window = {
      ethereum: undefined,
      injectedWeb3: undefined,
      // Add minimal window properties to prevent errors
      addEventListener: () => {},
      removeEventListener: () => {},
      matchMedia: () => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {}
      }),
      innerWidth: 1024,
      innerHeight: 768
    };

    // Polyfill document
    (global as any).document = {
      createElement: () => ({}),
      getElementsByTagName: () => [],
      addEventListener: () => {},
      removeEventListener: () => {}
    };
  }
}
