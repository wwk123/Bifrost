// Toast通知类型定义

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export interface ToastOptions {
  title: string;
  message?: string;
  duration?: number;
  type?: ToastType;
}
