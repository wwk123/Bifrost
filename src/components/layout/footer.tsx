'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-20 border-t border-surface-elevated bg-surface-primary/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* 关于 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text-primary">关于平台</h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              Bifrost 社交化收益竞赛平台,结合液态质押、竞技化交互与社交传播,打造全新的 DeFi 体验。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text-primary">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#leaderboard" className="text-text-secondary transition-colors hover:text-arena-purple">
                  排行榜
                </a>
              </li>
              <li>
                <a href="#achievements" className="text-text-secondary transition-colors hover:text-arena-purple">
                  成就系统
                </a>
              </li>
              <li>
                <a href="#strategies" className="text-text-secondary transition-colors hover:text-arena-purple">
                  策略广场
                </a>
              </li>
              <li>
                <a href="#teams" className="text-text-secondary transition-colors hover:text-arena-purple">
                  战队竞赛
                </a>
              </li>
            </ul>
          </div>

          {/* 资源 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text-primary">资源</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://docs.bifrost.finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-arena-purple"
                >
                  文档中心
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bifrost-finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-arena-purple"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://bifrost.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-arena-purple"
                >
                  Bifrost App
                </a>
              </li>
              <li>
                <a
                  href="https://wiki.polkadot.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-arena-purple"
                >
                  Polkadot Wiki
                </a>
              </li>
            </ul>
          </div>

          {/* 社区 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text-primary">社区</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://twitter.com/bifrost_finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-arena-purple"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/bifrost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-arena-purple"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/bifrost_finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-arena-purple"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/bifrost-finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-arena-purple"
                >
                  Medium
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="mt-12 border-t border-surface-elevated pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-text-tertiary">
              © {currentYear} Bifrost Arena. Built for Road to sub0 Hackathon.
            </p>
            <div className="flex items-center gap-4 text-sm text-text-tertiary">
              <span>Powered by</span>
              <a
                href="https://polkadot.network"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-text-secondary transition-colors hover:text-arena-purple"
              >
                Polkadot
              </a>
              <span>·</span>
              <a
                href="https://bifrost.finance"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-text-secondary transition-colors hover:text-bifrost-pink"
              >
                Bifrost
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
