import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import MenuTab, { type MenuTabItem } from './MenuTab';
import { Input } from '../share/Input';
import { LinkButton } from '../share/LinkButton';

export type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export type HeaderProps = {
  LinkComponent: React.ComponentType<LinkProps>;
  tabs: MenuTabItem[];
  currentPath?: string;

  loginHref?: string;
  signupHref?: string;

  makeSearchHref?: (q: string) => string;
  defaultQuery?: string;

  /**  포커스 시 라우팅을 앱에서 수행 */
  onSearchFocus?: () => void;
};

export default function Header({
  LinkComponent,
  tabs,
  currentPath = '/',
  loginHref = '/login',
  signupHref = '/signup',

  defaultQuery = '',
  onSearchFocus,
}: HeaderProps) {
  const [q, setQ] = React.useState(defaultQuery);

  return (
    <header className="flex items-center justify-between p-2 border-b border-gray-700 bg-black text-white">
      <MenuTab tabs={tabs} currentPath={currentPath} LinkComponent={LinkComponent} />

      <div className="flex gap-2">
        <form action="/search" method="GET" className="flex items-center gap-3">
          <div className="flex items-center rounded px-2">
            <Input
              name="query"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="검색어를 입력하세요"
              onFocus={onSearchFocus}
              icon={<SearchIcon className="w-4 h-4 text-white mr-2" />}
            />
            <input type="hidden" name="domain" value="all" />
          </div>
        </form>

        <LinkButton
          LinkComponent={LinkComponent}
          href={loginHref}
          variant="ghost"
          size="sm"
          className="hover:bg-white/10"
        >
          로그인
        </LinkButton>

        <LinkButton
          LinkComponent={LinkComponent}
          href={signupHref}
          variant="primary"
          size="sm"
          className="bg-white/10 hover:bg-white/20"
        >
          회원가입
        </LinkButton>
      </div>
    </header>
  );
}
