'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';
import '../admin.css';

interface Stats {
  totalBookings: number;
  totalRegistrations: number;
  totalServices: number;
  totalProducts: number;
  pendingBookings: number;
  latestBookings: Array<{
    id: string;
    customer_name: string;
    phone: string;
    status: string;
    created_at: string;
  }>;
  latestRegistrations: Array<{
    id: string;
    name: string;
    phone: string;
    status: string;
    created_at: string;
  }>;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [bookings, registrations, services, products, pendingBookings, latestBookings, latestRegistrations] =
        await Promise.all([
          supabase.from('bookings').select('id', { count: 'exact', head: true }),
          supabase.from('registrations').select('id', { count: 'exact', head: true }),
          supabase.from('services').select('id', { count: 'exact', head: true }),
          supabase.from('products').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('registrations').select('*').order('created_at', { ascending: false }).limit(5),
        ]);

      setStats({
        totalBookings: bookings.count || 0,
        totalRegistrations: registrations.count || 0,
        totalServices: services.count || 0,
        totalProducts: products.count || 0,
        pendingBookings: pendingBookings.count || 0,
        latestBookings: latestBookings.data || [],
        latestRegistrations: latestRegistrations.data || [],
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>📊 Dashboard</h1>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>⏳ Đang tải...</div>
        ) : stats && (
          <>
            {/* KPI Cards */}
            <div className="admin-grid admin-grid-4" style={{ marginBottom: '32px' }}>
              <div className="admin-stat">
                <div className="admin-stat-icon" style={{ background: '#dbeafe' }}>📅</div>
                <div className="admin-stat-value">{stats.totalBookings}</div>
                <div className="admin-stat-label">Tổng đặt lịch</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-icon" style={{ background: '#fef3c7' }}>⏳</div>
                <div className="admin-stat-value">{stats.pendingBookings}</div>
                <div className="admin-stat-label">Chờ xác nhận</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-icon" style={{ background: '#d1fae5' }}>📝</div>
                <div className="admin-stat-value">{stats.totalRegistrations}</div>
                <div className="admin-stat-label">Đăng ký học</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-icon" style={{ background: '#ede9fe' }}>🧴</div>
                <div className="admin-stat-value">{stats.totalProducts}</div>
                <div className="admin-stat-label">Sản phẩm</div>
              </div>
            </div>

            {/* Latest Activity */}
            <div className="admin-grid admin-grid-2">
              {/* Latest Bookings */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <span>📅 Đặt lịch gần đây</span>
                  <a href="/admin/bookings" style={{ color: '#2563eb', fontSize: '0.85rem' }}>Xem tất cả →</a>
                </div>
                <div className="admin-card-body" style={{ padding: 0 }}>
                  {stats.latestBookings.length > 0 ? (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Khách hàng</th>
                          <th>SĐT</th>
                          <th>Trạng thái</th>
                          <th>Ngày</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.latestBookings.map((b) => (
                          <tr key={b.id}>
                            <td style={{ fontWeight: 500 }}>{b.customer_name}</td>
                            <td>{b.phone}</td>
                            <td>
                              <span className={`admin-badge admin-badge-${b.status}`}>
                                {b.status === 'pending' ? 'Chờ' : b.status === 'confirmed' ? 'Đã xác nhận' : b.status === 'completed' ? 'Hoàn thành' : 'Hủy'}
                              </span>
                            </td>
                            <td style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{formatDate(b.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                      Chưa có đặt lịch nào
                    </div>
                  )}
                </div>
              </div>

              {/* Latest Registrations */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <span>📝 Đăng ký học gần đây</span>
                  <a href="/admin/registrations" style={{ color: '#2563eb', fontSize: '0.85rem' }}>Xem tất cả →</a>
                </div>
                <div className="admin-card-body" style={{ padding: 0 }}>
                  {stats.latestRegistrations.length > 0 ? (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Học viên</th>
                          <th>SĐT</th>
                          <th>Trạng thái</th>
                          <th>Ngày</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.latestRegistrations.map((r) => (
                          <tr key={r.id}>
                            <td style={{ fontWeight: 500 }}>{r.name}</td>
                            <td>{r.phone}</td>
                            <td>
                              <span className={`admin-badge admin-badge-${r.status}`}>
                                {r.status === 'pending' ? 'Chờ' : r.status === 'confirmed' ? 'Đã xác nhận' : 'Hoàn thành'}
                              </span>
                            </td>
                            <td style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{formatDate(r.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                      Chưa có đăng ký nào
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
