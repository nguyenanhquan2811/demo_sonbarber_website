'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';
import '../admin.css';

interface Registration {
  id: string;
  name: string;
  phone: string;
  course_id: string | null;
  note: string | null;
  status: string;
  created_at: string;
  courses?: { title: string };
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('registrations')
      .select('*, courses(title)')
      .order('created_at', { ascending: false });
    setRegistrations(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('registrations').update({ status }).eq('id', id);
    fetchData();
  };

  const deleteItem = async (id: string) => {
    if (confirm('Xác nhận xóa?')) {
      await supabase.from('registrations').delete().eq('id', id);
      fetchData();
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>📝 Quản lý Đăng ký học</h1>
          <span style={{ color: '#94a3b8' }}>{registrations.length} đăng ký</span>
        </div>

        <div className="admin-card">
          <div className="admin-card-body" style={{ padding: 0 }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>⏳ Đang tải...</div>
            ) : registrations.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Không có dữ liệu</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Học viên</th>
                      <th>SĐT</th>
                      <th>Khóa học</th>
                      <th>Ghi chú</th>
                      <th>Trạng thái</th>
                      <th>Ngày đăng ký</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((r) => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 500 }}>{r.name}</td>
                        <td>{r.phone}</td>
                        <td>{r.courses?.title || '-'}</td>
                        <td style={{ maxWidth: '200px', fontSize: '0.85rem', color: '#64748b' }}>
                          {r.note || '-'}
                        </td>
                        <td>
                          <select
                            className="admin-select"
                            style={{ width: 'auto', minWidth: '120px', fontSize: '0.8rem' }}
                            value={r.status}
                            onChange={(e) => updateStatus(r.id, e.target.value)}
                          >
                            <option value="pending">Chờ</option>
                            <option value="confirmed">Đã xác nhận</option>
                            <option value="completed">Hoàn thành</option>
                            <option value="cancelled">Hủy</option>
                          </select>
                        </td>
                        <td style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                          {new Date(r.created_at).toLocaleDateString('vi-VN')}
                        </td>
                        <td>
                          <button className="admin-btn admin-btn-danger" onClick={() => deleteItem(r.id)}>
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
