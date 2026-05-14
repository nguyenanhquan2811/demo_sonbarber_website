'use client';

import { useState, useEffect } from 'react'; 
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link href="/" className="navbar-brand">
          ✂ SONBARBER
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <li><Link href="/" onClick={() => setMobileOpen(false)}>Trang chủ</Link></li>
          <li><Link href="/barber" onClick={() => setMobileOpen(false)}>Barber Shop</Link></li>
          <li><Link href="/academy" onClick={() => setMobileOpen(false)}>Academy</Link></li>
          <li><Link href="/contact" onClick={() => setMobileOpen(false)}>Liên hệ</Link></li>
          <li>
            <Link href="https://booking.easysalon.vn/son-barbershop" onClick={() => setMobileOpen(false)}>
              Đặt lịch
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
