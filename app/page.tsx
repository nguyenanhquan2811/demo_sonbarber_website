import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

async function getBranches() {
  const { data } = await supabase.from('branches').select('*').order('created_at');
  return data || [];
}

async function getFeaturedServices() {
  const { data } = await supabase
    .from('services')
    .select('*, service_groups(name)')
    .eq('group_id', (await supabase.from('service_groups').select('id').eq('name', 'Combo').single()).data?.id)
    .order('display_order')
    .limit(3);
  return data || [];
}

export default async function HomePage() {
  const branches = await getBranches();

  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-deco hero-deco-1" />
        <div className="hero-deco hero-deco-2" />
        <div className="hero-content fade-in-up">
          <div className="badge badge-gold" style={{ marginBottom: '16px' }}>
            ✂ Premium Barbershop
          </div>
          <h1>
            <span className="gold-text">SonBarber</span>
            <br />
            Phong Cách Đẳng Cấp
          </h1>
          <p>
            Hệ thống cắt tóc nam cao cấp & đào tạo nghề barber hàng đầu tại TP Vinh.
            Nơi mỗi kiểu tóc là một tác phẩm nghệ thuật.
          </p>
          <div className="hero-buttons">
            {/* <Link href="/barber" className="btn btn-primary btn-lg">
              🏪 Barber Shop
            </Link> */}
            <Link href="/barber" className="btn btn-outline btn-lg">
              💈 Barber Shop 💈
            </Link>
            <Link href="/academy" className="btn btn-outline btn-lg">
              🎓 Academy 🎓
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section section-dark">
        <div className="container">
          <div className="grid grid-4" style={{ textAlign: 'center' }}>
            {[
              { num: '4+', label: 'Cơ sở', icon: '💈' },
              { num: '50+', label: 'Dịch vụ', icon: '✂' },
              { num: '70+', label: 'Sản phẩm', icon: '🧴' },
              { num: '10+', label: 'Năm kinh nghiệm', icon: '💇🏻‍♂️' },
            ].map((stat, i) => (
              <div key={i} className={`fade-in-up delay-${i + 1}`}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
                <div className="gold-text" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700 }}>
                  {stat.num}
                </div>
                <div style={{ color: 'var(--dark-300)', fontSize: '0.95rem', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BARBER SHOP OVERVIEW ===== */}
      <section className="section section-darker" id="barbershop-overview">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-gold">Barber Shop</div>
            <h2 style={{ marginTop: '16px' }}>
              Dịch Vụ <span className="gold-text">Đẳng Cấp</span>
            </h2>
            <div className="gold-line-center" />
            <p>
              Từ combo cơ bản đến dịch vụ VIP, chúng tôi mang đến trải nghiệm chăm sóc
              toàn diện cho quý khách.
            </p>
          </div>

          <div className="grid grid-3">
            {[
              {
                icon: '✂',
                title: 'Combo Cơ Bản',
                desc: 'Cắt tóc, cạo mặt, rửa mặt, tẩy da chết, gội đầu bấm huyệt, tạo kiểu.',
                price: 'Từ 150.000đ',
                duration: '50 phút',
              },
              {
                icon: '👑',
                title: 'Combo VIP',
                desc: 'Full dịch vụ: cắt, cạo, xông hơi, hút mụn, đắp mặt nạ, massage cổ vai gáy.',
                price: 'Từ 210.000đ',
                duration: '70-90 phút',
              },
              {
                icon: '💎',
                title: 'Combo Thương Hiệu',
                desc: 'Combo cao cấp nhất với đầy đủ dịch vụ chăm sóc premium.',
                price: 'Từ 340.000đ',
                duration: '100-120 phút',
              },
            ].map((item, i) => (
              <div key={i} className="card fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="card-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{ marginBottom: '12px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--dark-300)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                  <div className="price" style={{ marginBottom: '8px' }}>{item.price}</div>
                  <div style={{ color: 'var(--dark-400)', fontSize: '0.85rem' }}>⏱ {item.duration}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/barber" className="btn btn-primary btn-lg">
              Xem tất cả dịch vụ →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ACADEMY OVERVIEW ===== */}
      <section className="section section-dark" id="academy-overview">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-gold">Academy</div>
            <h2 style={{ marginTop: '16px' }}>
              Đào Tạo <span className="gold-text">Nghề Barber</span>
            </h2>
            <div className="gold-line-center" />
            <p>
              Trở thành barber chuyên nghiệp với chương trình đào tạo bài bản từ SonBarber Academy số 1 Nghệ An.
            </p>
          </div>

          <div className="card" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <div className="card-body" style={{ padding: '48px 32px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎓</div>
              <h3 style={{ marginBottom: '16px' }}>Sắp ra mắt</h3>
              <p style={{ color: 'var(--dark-300)', marginBottom: '24px' }}>
                Chương trình đào tạo barber chuyên nghiệp đang được hoàn thiện.
                Đăng ký sớm để nhận ưu đãi!
              </p>
              <Link href="/academy" className="btn btn-outline">
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRANCHES ===== */}
      <section className="section section-darker" id="branches">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-gold">Hệ Thống</div>
            <h2 style={{ marginTop: '16px' }}>
              Cơ Sở <span className="gold-text">Của Chúng Tôi</span>
            </h2>
            <div className="gold-line-center" />
          </div>

          <div className="grid grid-2">
            {branches.map((branch, i) => (
              <div key={branch.id} className="branch-card fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                {/* <div className="branch-icon">📍</div> */}
                <div className="branch-name">💈 {branch.name} 💈</div>
                <div className="branch-info">
                  <span>📍 {branch.address}</span>
                  <span>📞 {branch.phone}</span>
                  <span>🕐 {branch.opening_hours}</span>
                </div>
                {branch.map_url && (
                  <a
                    href={branch.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark btn-sm"
                    style={{ marginTop: '16px' }}
                  >
                    Xem bản đồ →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section section-dark" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>
            Sẵn sàng <span className="gold-text">thay đổi phong cách</span>?
          </h2>
          <div className="gold-line-center" />
          <p style={{ color: 'var(--dark-300)', maxWidth: '500px', margin: '16px auto 32px', fontSize: '1.05rem' }}>
            Đặt lịch ngay hôm nay và trải nghiệm dịch vụ đẳng cấp tại SonBarber.
          </p>
          <div className="hero-buttons">
            <Link href="/barber#booking" className="btn btn-primary btn-lg">
              ✂ Đặt lịch ngay
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg">
              📞 Liên hệ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
