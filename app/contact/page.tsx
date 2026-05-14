import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Liên Hệ – SonBarber',
  description: 'Thông tin liên hệ các cơ sở SonBarber tại TP Vinh.',
};

async function getBranches() {
  const { data } = await supabase.from('branches').select('*').order('created_at');
  return data || [];
}

export default async function ContactPage() {
  const branches = await getBranches();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        {/* ===== HERO ===== */}
        <section style={{
          position: 'relative',
          padding: '80px 0',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at center, rgba(212,160,23,0.08), transparent 70%), var(--dark-950)',
        }}>
          <div className="container">
            <div className="badge badge-gold" style={{ marginBottom: '16px' }}>Liên Hệ</div>
            <h1>
              Kết Nối Với <span className="gold-text">Chúng Tôi</span>
            </h1>
            <div className="gold-line-center" />
            <p style={{ color: 'var(--dark-300)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
              Liên hệ trực tiếp hoặc ghé thăm cơ sở gần bạn nhất.
            </p>
          </div>
        </section>

        {/* ===== QUICK CONTACT ===== */}
        <section className="section section-dark">
          <div className="container">
            <div className="grid grid-3">
              <div className="card" style={{ textAlign: 'center' }}>
                {/* <div className="card-body" style={{ padding: '32px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📞</div>
                  <h4 style={{ marginBottom: '8px' }}>Điện thoại</h4>
                  <a href="tel:0985645872" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    0961 202 341
                  </a>
                </div> */}
                <a href="tel:0961202341" className="card-body" style={{ padding: '32px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📞</div>
                  <h4 style={{ marginBottom: '8px' }}>Điện thoại</h4>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    0961 202 341
                  </p>
                </a>
              </div>

              <div className="card" style={{ textAlign: 'center' }}>
                {/* <div className="card-body" style={{ padding: '32px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📘</div>
                  <h4 style={{ marginBottom: '8px' }}>Facebook</h4>
                  <a href="https://www.facebook.com/ThaiSonBarber" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    SonBarber Fanpage
                  </a>
                </div> */}
                <a href="https://www.facebook.com/ThaiSonBarber" target="_blank" rel="noopener noreferrer" className="card-body" style={{ padding: '32px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📘</div>
                  <h4 style={{ marginBottom: '8px' }}>Facebook</h4>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    SonBarber Fanpage
                  </p>
                </a>
              </div>

              <div className="card" style={{ textAlign: 'center' }}>
                <div className="card-body" style={{ padding: '32px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🕐</div>
                  <h4 style={{ marginBottom: '8px' }}>Giờ mở cửa</h4>
                  <p style={{ color: 'var(--gold-400)', fontSize: '1.1rem', fontWeight: 600 }}>
                    08:00 – 19:00
                  </p>
                  <p style={{ color: 'var(--dark-400)', fontSize: '0.85rem' }}>
                    Tất cả các ngày trong tuần
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BRANCHES ===== */}
        <section className="section section-darker">
          <div className="container">
            <div className="section-header">
              <h2>Hệ Thống <span className="gold-text">Cơ Sở</span></h2>
              <div className="gold-line-center" />
            </div>

            <div className="grid grid-2">
              {branches.map((branch, i) => (
                <div key={branch.id} className="branch-card">
                  {/* <div className="branch-icon">📍</div> */}
                  <div className="branch-name">💈 {branch.name} 💈</div>
                  <div className="branch-info">
                    <span>📍 {branch.address}</span>
                    <span>📞 {branch.phone}</span>
                    <span>🕐 {branch.opening_hours}</span>
                  </div>
                  {branch.map_url && (
                    <div style={{ marginTop: '16px' }}>
                      <a
                        href={branch.map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        📍 Xem trên Google Maps
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
