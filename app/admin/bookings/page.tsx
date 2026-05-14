'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';
import '../admin.css';

interface Booking {
  id: string;
  customer_name: string;
  phone: string;
  branch_id: string;
  service_id: string;
  booking_date: string | null;
  booking_time: string | null;
  note: string | null;
  status: string;
  created_at: string;
  branches?: { name: string };
  services?: { name: string };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchBookings = async () => {
    setLoading(true);
    let query = supabase
      .from('bookings')
      .select('*, branches(name), services(name)')
      .order('created_at', { ascending: false });

    if (filterStatus !== 'all') {
      query = query.eq('status', filterStatus);
    }

    const { data } = await query;
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, [filterStatus]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    fetchBookings();
  };

  const deleteBooking = async (id: string) => {
    if (confirm('Xác nhận xóa đặt lịch này?')) {
      await supabase.from('bookings').delete().eq('id', id);
      fetchBookings();
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>📅 Quản lý Đặt lịch</h1>
          <span style={{ color: '#94a3b8' }}>{bookings.length} đặt lịch</span>
        </div>

        <div className="admin-filters">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
            <button
              key={s}
              className={`admin-btn ${filterStatus === s ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
              onClick={() => setFilterStatus(s)}
            >
              {s === 'all' ? 'Tất cả' : s === 'pending' ? 'Chờ' : s === 'confirmed' ? 'Đã xác nhận' : s === 'completed' ? 'Hoàn thành' : 'Hủy'}
            </button>
          ))}
        </div>

        <div className="admin-card">
          <div className="admin-card-body" style={{ padding: 0 }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>⏳ Đang tải...</div>
            ) : bookings.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Không có dữ liệu</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Khách hàng</th>
                      <th>SĐT</th>
                      <th>Cơ sở</th>
                      <th>Dịch vụ</th>
                      <th>Ngày giờ</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 500 }}>{b.customer_name}</td>
                        <td>{b.phone}</td>
                        <td>{b.branches?.name || '-'}</td>
                        <td>{b.services?.name || '-'}</td>
                        <td style={{ fontSize: '0.85rem' }}>
                          {b.booking_date || '-'} {b.booking_time || ''}
                        </td>
                        <td>
                          <select
                            className="admin-select"
                            style={{ width: 'auto', minWidth: '120px', fontSize: '0.8rem' }}
                            value={b.status}
                            onChange={(e) => updateStatus(b.id, e.target.value)}
                          >
                            <option value="pending">Chờ</option>
                            <option value="confirmed">Đã xác nhận</option>
                            <option value="completed">Hoàn thành</option>
                            <option value="cancelled">Hủy</option>
                          </select>
                        </td>
                        <td>
                          <button className="admin-btn admin-btn-danger" onClick={() => deleteBooking(b.id)}>
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
