'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';
import '../admin.css';

interface Service {
  id: string;
  name: string;
  price_min: number;
  price_max: number | null;
  note: string | null;
  is_active: boolean;
  group_id: string;
  service_groups?: { name: string };
}

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('services')
      .select('*, service_groups(name)')
      .order('display_order');
    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const deleteItem = async (id: string) => {
    if (confirm('Xác nhận xóa dịch vụ này?')) {
      await supabase.from('services').delete().eq('id', id);
      fetchData();
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await supabase.from('services').update({ is_active: !isActive }).eq('id', id);
    fetchData();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>✂ Quản lý Dịch vụ</h1>
          <span style={{ color: '#94a3b8' }}>{services.length} dịch vụ</span>
        </div>

        <div className="admin-card">
          <div className="admin-card-body" style={{ padding: 0 }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>⏳ Đang tải...</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Dịch vụ</th>
                      <th>Nhóm</th>
                      <th>Giá</th>
                      <th>Ghi chú</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s) => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 500 }}>{s.name}</td>
                        <td>
                          <span className="admin-badge admin-badge-confirmed">
                            {s.service_groups?.name || '-'}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600, color: '#2563eb' }}>
                          {formatPrice(s.price_min)}
                          {s.price_max && ` - ${formatPrice(s.price_max)}`}
                        </td>
                        <td style={{ fontSize: '0.85rem', color: '#64748b' }}>{s.note || '-'}</td>
                        <td>
                          <button
                            className={`admin-btn ${s.is_active ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => toggleActive(s.id, s.is_active)}
                          >
                            {s.is_active ? '✅ Active' : '⏸ Inactive'}
                          </button>
                        </td>
                        <td>
                          <button className="admin-btn admin-btn-danger" onClick={() => deleteItem(s.id)}>
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
