import React from 'react';
import { useRouter } from 'next/router';
import { Header, type MenuTabItem } from '@packages/shared';
import LinkAdapter from './LinkAdapter';

const TABS: MenuTabItem[] = [
  { key: 0, name: '구독', link: '/' },
  { key: 1, name: '개별 구매', link: '/' },
];

export default function HeaderAdapter() {
  const router = useRouter();
  const { asPath } = router;
  const currentPath = React.useMemo(() => asPath.split('?')[0], [asPath]);
  const handleSearchFocus = React.useCallback(() => {
    router.push('/search');
  }, [router]);
  return (
    <Header
      LinkComponent={LinkAdapter}
      tabs={TABS}
      currentPath={currentPath}
      loginHref="/login"
      signupHref="/signup"
      onSearchFocus={handleSearchFocus}
    />
  );
}
