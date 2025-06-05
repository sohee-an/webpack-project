import React from 'react';
import Button from '../share/Button';
import MenuTab from './MenuTab';
import Input from '../share/Input';
import { Search } from 'lucide-react';

const tab_list = ['구독', '개별 구매'];

function Header() {
  return (
    <header className="flex items-center justify-between p-2 border-b border-gray-700">
      <MenuTab tabs={tab_list} />
      <div className="flex items-center space-x-4">
        <Input
          placeholder="검색어를 입력하세요"
          icon={<Search className="w-4 h-4 text-white mr-2" />}
        />
        <Button size="sm" variant="ghost">
          로그인
        </Button>
        <Button size="sm">회원가입</Button>
      </div>
    </header>
  );
}

export default Header;
