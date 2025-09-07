import React, { FormEventHandler } from 'react';
import MenuTab from './MenuTab';
import { Search } from 'lucide-react';
import { Input } from '../share/Input';
import { Button } from '../share/Button';

const TAB_LIST = [
  { key: 0, name: '구독', link: '/' },
  { key: 1, name: '개별 구매', link: '/' },
];

function Header() {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  // const navigate = useNavigate();

  const handleSearch = () => {
    // navigate('/search');
    searchInputRef.current?.focus();
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const inputValue = searchInputRef.current?.value || '';
    if (inputValue.trim()) {
      // navigate(`/search?query=${encodeURIComponent(inputValue)}&domain=all`);
    }
  };

  return (
    <header className=" flex items-center justify-between p-2 border-b border-gray-700">
      <MenuTab tabs={TAB_LIST} />
      <div className="flex gap-2">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <Input
            ref={searchInputRef}
            onFocus={handleSearch}
            placeholder="검색어를 입력하세요"
            icon={<Search className="w-4 h-4 text-white mr-2" />}
          />
        </form>

        <Button size="sm" variant="ghost">
          로그인
        </Button>
        <Button size="sm">회원가입</Button>
      </div>
    </header>
  );
}

export default Header;
