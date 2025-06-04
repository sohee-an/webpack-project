import React from 'react';
import Button from '../share/Button';

function Header() {
  return (
    <header className="w-full h-16 text-red-100 flex justify-between items-center px-4 bg-black border-b border-white">
      <nav className="flex items-center gap-4">
        <button>구독</button>
        <button>개별 구매</button>
      </nav>
      <div className="flex items-center gap-4">
        <input />

        <Button variant="ghost">로그인</Button>
        <Button variant="primary">회원가입</Button>
      </div>
    </header>
  );
}

export default Header;
