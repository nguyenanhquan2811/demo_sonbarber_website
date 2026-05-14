'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';
import '../admin.css';

interface Product {
  id: string;
  name: string;
  price: number;
  volume: string | null;
  unit: string | null;
  origin: string | null;
  is_active: boolean;
  product_groups?: { name: string };
}

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*, product_groups(name)')
      .order('display_order');
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const deleteItem = async (id: string) => {
    if (confirm('Xác nhận xóa sản phẩm này?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchData();
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await supabase.from('products').update({ is_active: !isActive }).eq('id', id);
    fetchData();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>🧴 Quản lý Sản phẩm</h1>
          <span style={{ color: '#94a3b8' }}>{products.length} sản phẩm</span>
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
                      <th>Sản phẩm</th>
                      <th>Nhóm</th>
                      <th>Giá</th>
                      <th>Dung tích</th>
                      <th>Xuất xứ</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 500 }}>{p.name}</td>
                        <td>
                          <span className="admin-badge admin-badge-confirmed">
                            {p.product_groups?.name || '-'}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600, color: '#2563eb' }}>
                          {formatPrice(p.price)}
                        </td>
                        <td>
                          {p.volume && p.unit ? `${p.volume} ${p.unit}` : '-'}
                        </td>
                        <td>{p.origin || '-'}</td>
                        <td>
                          <button
                            className={`admin-btn ${p.is_active ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => toggleActive(p.id, p.is_active)}
                          >
                            {p.is_active ? '✅ Active' : '⏸ Inactive'}
                          </button>
                        </td>
                        <td>
                          <button className="admin-btn admin-btn-danger" onClick={() => deleteItem(p.id)}>
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
