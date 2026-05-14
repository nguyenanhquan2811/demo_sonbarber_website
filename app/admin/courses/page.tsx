'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';
import '../admin.css';

interface Course {
  id: string;
  title: string;
  price: number | null;
  description: string | null;
  duration: string | null;
  is_active: boolean;
  created_at: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    setCourses(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const deleteItem = async (id: string) => {
    if (confirm('Xác nhận xóa khóa học này?')) {
      await supabase.from('courses').delete().eq('id', id);
      fetchData();
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>🎓 Quản lý Khóa học</h1>
          <span style={{ color: '#94a3b8' }}>{courses.length} khóa học</span>
        </div>

        <div className="admin-card">
          <div className="admin-card-body" style={{ padding: 0 }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>⏳ Đang tải...</div>
            ) : courses.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎓</div>
                <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>Chưa có khóa học nào</h3>
                <p style={{ color: '#94a3b8' }}>
                  Thêm khóa học để hiển thị trên trang Academy.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Khóa học</th>
                      <th>Giá</th>
                      <th>Thời lượng</th>
                      <th>Mô tả</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: 500 }}>{c.title}</td>
                        <td style={{ fontWeight: 600, color: '#2563eb' }}>
                          {c.price ? c.price.toLocaleString('vi-VN') + 'đ' : '-'}
                        </td>
                        <td>{c.duration || '-'}</td>
                        <td style={{ maxWidth: '250px', fontSize: '0.85rem', color: '#64748b' }}>
                          {c.description || '-'}
                        </td>
                        <td>
                          <span className={`admin-badge ${c.is_active ? 'admin-badge-completed' : 'admin-badge-cancelled'}`}>
                            {c.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button className="admin-btn admin-btn-danger" onClick={() => deleteItem(c.id)}>
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
