import React from 'react';
import Button from '../share/Button';
import MenuTab from './MenuTab';

const tab_list = ['구독', '개별 구매'];

function Header() {
  return (
    <header className="flex items-center justify-between p-2 border-b border-gray-700">
      <MenuTab tabs={tab_list} />
      <div className="flex items-center space-x-4">
        <Button size="sm">로그인</Button>
        <Button size="sm">회원가입</Button>
      </div>
    </header>
  );
}

export default Header;
