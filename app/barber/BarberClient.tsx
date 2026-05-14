'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Service {
  id: string;
  name: string;
  price_min: number;
  price_max: number | null;
  original_price: number | null;
  description: string | null;
  duration: string | null;
  note: string | null;
  display_order: number;
}

interface ServiceGroup {
  id: string;
  name: string;
  services: Service[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  volume: string | null;
  unit: string | null;
  origin: string | null;
  display_order: number;
}

interface ProductGroup {
  id: string;
  name: string;
  products: Product[];
}

interface Branch {
  id: string;
  name: string;
}

interface BookingService {
  id: string;
  name: string;
  price_min: number;
}

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

export default function BarberClient({
  serviceGroups,
  productGroups,
  branches,
  services,
}: {
  serviceGroups: ServiceGroup[];
  productGroups: ProductGroup[];
  branches: Branch[];
  services: BookingService[];
}) {
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    customer_name: '',
    phone: '',
    branch_id: '',
    service_id: '',
    booking_date: '',
    booking_time: '',
    note: '',
  });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('loading');

    const { error } = await supabase.from('bookings').insert([bookingForm]);
    if (error) {
      setBookingStatus('error');
    } else {
      setBookingStatus('success');
      setBookingForm({
        customer_name: '',
        phone: '',
        branch_id: '',
        service_id: '',
        booking_date: '',
        booking_time: '',
        note: '',
      });
    }
  };

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* ===== HERO BANNER ===== */}
      <section style={{
        position: 'relative',
        padding: '80px 0',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at center, rgba(212,160,23,0.08), transparent 70%), var(--dark-950)',
      }}>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: '16px' }}>Barber Shop</div>
          <h1>
            Sơn Barber <span className="gold-text">Shop</span>
          </h1>
          <div className="gold-line-center" />
          <p style={{ color: 'var(--dark-300)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Khám phá bảng giá dịch vụ, sản phẩm chăm sóc tóc chính hãng, và đặt lịch cắt tóc nhanh chóng.
          </p>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section section-dark" id="services">
        <div className="container">
          <div className="section-header">
            <h2>Bảng Giá <span className="gold-text">Dịch Vụ</span></h2>
            <div className="gold-line-center" />
          </div>

          <div className="tabs">
            {serviceGroups.map((group, i) => (
              <button
                key={group.id}
                className={`tab ${activeServiceTab === i ? 'active' : ''}`}
                onClick={() => setActiveServiceTab(i)}
              >
                {group.name}
              </button>
            ))}
          </div>

          {serviceGroups[activeServiceTab] && (
            <div style={{ overflowX: 'auto' }}>
              <table className="service-table">
                <thead>
                  <tr>
                    <th>Dịch vụ</th>
                    <th>Giá</th>
                    {serviceGroups[activeServiceTab].name === 'Combo' && <th>Thời gian</th>}
                  </tr>
                </thead>
                <tbody>
                  {serviceGroups[activeServiceTab].services?.map((service) => (
                    <tr key={service.id}>
                      <td style={{ fontWeight: 500 }}>{service.name}</td>
                      <td>
                        <span className="price">{formatPrice(service.price_min)}</span>
                        {service.price_max && (
                          <span style={{ color: 'var(--dark-400)' }}> - {formatPrice(service.price_max)}</span>
                        )}
                      </td>
                      {serviceGroups[activeServiceTab].name === 'Combo' && (
                        <td style={{ color: 'var(--dark-300)' }}>
                          {service.duration || '-'}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="section section-darker" id="products">
        <div className="container">
          <div className="section-header">
            <h2>Sản Phẩm <span className="gold-text">Chính Hãng</span></h2>
            <div className="gold-line-center" />
            <p>Sản phẩm chăm sóc tóc chất lượng từ các thương hiệu hàng đầu.</p>
          </div>

          <div className="tabs">
            {productGroups.map((group, i) => (
              <button
                key={group.id}
                className={`tab ${activeProductTab === i ? 'active' : ''}`}
                onClick={() => setActiveProductTab(i)}
              >
                {group.name}
              </button>
            ))}
          </div>

          {productGroups[activeProductTab] && (
            <div className="grid grid-3">
              {productGroups[activeProductTab].products?.map((product) => (
                <div key={product.id} className="card">
                  <div className="card-img" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    background: 'linear-gradient(135deg, var(--dark-800), var(--dark-700))',
                  }}>
                    🧴
                  </div>
                  <div className="card-body">
                    <h4 style={{ marginBottom: '8px', fontSize: '1rem' }}>{product.name}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="price">{formatPrice(product.price)}</span>
                      <span style={{ color: 'var(--dark-400)', fontSize: '0.85rem' }}>
                        {product.volume && product.unit ? `${product.volume}${product.unit}` : ''}
                      </span>
                    </div>
                    {/* {product.origin && (
                      <div className="badge badge-gold" style={{ marginTop: '8px', fontSize: '0.7rem' }}>
                        {product.origin}
                      </div>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== BOOKING ===== */}
      <section className="section section-dark" id="booking">
        <div className="container">
          <div className="section-header">
            <h2>Đặt Lịch <span className="gold-text">Cắt Tóc</span></h2>
            <div className="gold-line-center" />
            <p>Chọn cơ sở, dịch vụ và đặt lịch nhanh chóng.</p>
          </div>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleBookingSubmit} className="card" style={{ padding: '32px' }}>
              <div className="form-group">
                <label className="form-label">Họ tên *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={bookingForm.customer_name}
                  onChange={(e) => setBookingForm({ ...bookingForm, customer_name: e.target.value })}
                  placeholder="Nhập họ tên"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Số điện thoại *</label>
                <input
                  type="tel"
                  className="form-input"
                  required
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  placeholder="0xxx xxx xxx"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Cơ sở *</label>
                  <select
                    className="form-select"
                    required
                    value={bookingForm.branch_id}
                    onChange={(e) => setBookingForm({ ...bookingForm, branch_id: e.target.value })}
                  >
                    <option value="">Chọn cơ sở</option>
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Dịch vụ *</label>
                  <select
                    className="form-select"
                    required
                    value={bookingForm.service_id}
                    onChange={(e) => setBookingForm({ ...bookingForm, service_id: e.target.value })}
                  >
                    <option value="">Chọn dịch vụ</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} - {formatPrice(s.price_min)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Ngày</label>
                  <input
                    type="date"
                    className="form-input"
                    value={bookingForm.booking_date}
                    onChange={(e) => setBookingForm({ ...bookingForm, booking_date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Giờ</label>
                  <select
                    className="form-select"
                    value={bookingForm.booking_time}
                    onChange={(e) => setBookingForm({ ...bookingForm, booking_time: e.target.value })}
                  >
                    <option value="">Chọn giờ</option>
                    {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
                      '17:00', '17:30', '18:00', '18:30'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ghi chú</label>
                <textarea
                  className="form-textarea"
                  value={bookingForm.note}
                  onChange={(e) => setBookingForm({ ...bookingForm, note: e.target.value })}
                  placeholder="Yêu cầu thêm..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                disabled={bookingStatus === 'loading'}
              >
                {bookingStatus === 'loading' ? '⏳ Đang gửi...' : '✂ Đặt lịch ngay'}
              </button>

              {bookingStatus === 'success' && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--success)',
                  textAlign: 'center',
                }}>
                  ✅ Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận.
                </div>
              )}

              {bookingStatus === 'error' && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--error)',
                  textAlign: 'center',
                }}>
                  ❌ Có lỗi xảy ra. Vui lòng thử lại!
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
