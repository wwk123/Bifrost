import { Inter } from 'next/font/google';

import { AppProvider } from '@/providers/app-provider';
import { Navbar, Footer } from '@/components/layout';
import { ToastContainer } from '@/components/toast';

import './globals.css';

import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Bifrost 社交化收益竞赛平台',
  description: '结合收益排行榜、成就系统与社交分享的液态质押体验。',
  keywords: ['Bifrost', 'Polkadot', 'Liquid Staking', 'Social DeFi', '收益竞赛']
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} min-h-screen bg-surface-primary`}>
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-bifrost-primary opacity-30 blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_at_top,#e6007a1a,transparent_60%)]" />
          <AppProvider>
            <Navbar />
            <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col gap-12 px-6 pb-20 pt-12 md:px-12 lg:px-16">
              {children}
            </main>
            <Footer />
            <ToastContainer />
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
