import React from 'react';
import MenuTab from './MenuTab';
import { Search } from 'lucide-react';
import Input from '@/stories/Input';
import Button from '@/stories/Button';

const TAB_LIST = ['구독', '개별 구매'];

function Header() {
  return (
    <header className="flex items-center justify-between p-2 border-b border-gray-700">
      <MenuTab tabs={TAB_LIST} />
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
