'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/admin/bookings', icon: '📅', label: 'Đặt lịch' },
  { href: '/admin/registrations', icon: '📝', label: 'Đăng ký học' },
  { href: '/admin/services', icon: '✂', label: 'Dịch vụ' },
  { href: '/admin/products', icon: '🧴', label: 'Sản phẩm' },
  { href: '/admin/courses', icon: '🎓', label: 'Khóa học' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        💈 SonBarber Admin 💈
      </div>
      <ul className="admin-sidebar-nav">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="admin-sidebar-footer">
        <Link href="/" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>
          ← Về trang chủ
        </Link>
      </div>
    </aside>
  );
}
