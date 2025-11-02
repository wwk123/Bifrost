'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, BookOpen, Swords, Shield, Home } from 'lucide-react';

import { WalletButton } from '@/components/wallet';

interface PortalLink {
  href: string;
  label: string;
  emoji: string;
  icon: React.ElementType;
  activeColor: string;
}

const portalLinks: PortalLink[] = [
  {
    href: '/arena',
    label: '战绩大厅',
    emoji: '📊',
    icon: Home,
    activeColor: 'text-success'
  },
  {
    href: '/leaderboard',
    label: '荣耀榜',
    emoji: '🏆',
    icon: Trophy,
    activeColor: 'text-yellow-500'
  },
  {
    href: '/strategies',
    label: '策略图书馆',
    emoji: '📚',
    icon: BookOpen,
    activeColor: 'text-bifrost-pink'
  },
  {
    href: '/challenges',
    label: '挑战塔',
    emoji: '⚔️',
    icon: Swords,
    activeColor: 'text-warning'
  },
  {
    href: '/teams',
    label: '战队营地',
    emoji: '🛡️',
    icon: Shield,
    activeColor: 'text-info'
  }
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/arena') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-surface-elevated bg-surface-primary/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-arena-purple to-bifrost-pink shadow-lg">
            <span className="text-xl font-bold text-white">🏟️</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-text-primary">Bifrost Arena</h1>
            <p className="text-xs text-text-secondary">社交化收益竞技平台</p>
          </div>
        </Link>

        {/* Portal Links (传送门) */}
        <div className="hidden items-center gap-2 lg:flex">
          {portalLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? `${link.activeColor} bg-white/10 shadow-lg`
                    : 'text-text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                {/* Emoji */}
                <span className="text-base transition-transform group-hover:scale-125">
                  {link.emoji}
                </span>

                {/* Label */}
                <span className="hidden xl:inline">{link.label}</span>

                {/* Active Indicator */}
                {active && (
                  <div className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-current" />
                )}

                {/* Hover Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-lg transition-opacity group-hover:opacity-20">
                  <div className={`h-full w-full ${link.activeColor.replace('text', 'bg')}`} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Dropdown (可以后续添加) */}
        <div className="flex lg:hidden">
          <select
            className="rounded-lg border border-white/10 bg-surface-secondary px-3 py-2 text-sm text-white"
            value={pathname || '/arena'}
            onChange={(e) => {
              window.location.href = e.target.value;
            }}
          >
            <option value="/">🏟️ 主页</option>
            {portalLinks.map((link) => (
              <option key={link.href} value={link.href}>
                {link.emoji} {link.label}
              </option>
            ))}
          </select>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-text-secondary transition-all hover:bg-surface-secondary hover:text-text-primary hover:scale-110">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute right-1 top-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
          </button>

          <WalletButton />
        </div>
      </div>
    </nav>
  );
}
