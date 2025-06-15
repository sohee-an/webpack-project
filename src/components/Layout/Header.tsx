import React, { useState } from 'react';
import MenuTab from './MenuTab';
import { Search } from 'lucide-react';
import { Input } from '../share/Input';
import { Button } from '../share/Button';
import { useNavigate } from 'react-router-dom';

const TAB_LIST = [
  { name: '구독', link: '/' },
  { name: '개별 구매', link: '/' },
];

function Header() {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState('');

  const handleSearch = () => {
    navigate('/search');
    searchInputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지
    if (keywords.trim()) {
      // 빈 검색어 방지
      navigate(`/search?query=${encodeURIComponent(keywords)}&domain=all`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  return (
    <header className="flex items-center justify-between p-2 border-b border-gray-700">
      <MenuTab tabs={TAB_LIST} />
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <Input
          ref={searchInputRef}
          value={keywords}
          onChange={handleInputChange} // onChange 핸들러 추가
          onFocus={handleSearch}
          placeholder="검색어를 입력하세요"
          icon={<Search className="w-4 h-4 text-white mr-2" />}
        />
        <Button size="sm" variant="ghost">
          로그인
        </Button>
        <Button size="sm">회원가입</Button>
      </form>
    </header>
  );
}

export default Header;
