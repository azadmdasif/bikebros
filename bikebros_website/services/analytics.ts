// services/analytics.ts
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(action: string, params: Record<string, any> = {}) {
  if (!window.gtag) return;
  window.gtag("event", action, {
    send_to: "G-TCSRH9SVJD",
    ...params,
  });
}
