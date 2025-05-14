import React, { useState } from 'react';
import Logo from '../assets/Group13.png';

const Navs = () => {
  const [active, setActive] = useState('Beranda');
  const menus = [
    { name: 'Beranda', link: '/' },
    { name: 'Deteksi', link: '/deteksi' },
    { name: 'About Us', link: '/about-us' }
  ];

  return (
    <div className="absolute top-0 w-full bg-transparent z-50 px-10">
      <nav className="flex items-center justify-between py-4">
        <div className="mr-auto">
          <img src={Logo} alt="Logo" className="h-15 w-auto" link= "/" />
        </div>

        <div className="flex space-x-8">
          {menus.map((menu) => (
            <a
              key={menu.name}
              href={menu.link} 
              onClick={() => setActive(menu.name)}
              className={`border-b-2 text-md transition duration-200
                ${active === menu.name
                  ? 'border-orange-500 text-orange-600 font-bold'
                  : 'border-transparent text-black hover:text-orange-600'}
              `}
            >
              {menu.name}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navs;
