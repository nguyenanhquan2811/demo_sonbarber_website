import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AcademyClient from './AcademyClient';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Academy – SonBarber',
  description: 'Đào tạo nghề barber chuyên nghiệp tại SonBarber Academy. Đăng ký ngay!',
};

async function getCourses() {
  const { data } = await supabase.from('courses').select('*').eq('is_active', true);
  return data || [];
}

export default async function AcademyPage() {
  const courses = await getCourses();

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
            <div className="badge badge-gold" style={{ marginBottom: '16px' }}>Academy</div>
            <h1>
              Sơn Barber <span className="gold-text">Academy</span>
            </h1>
            <div className="gold-line-center" />
            <p style={{ color: 'var(--dark-300)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
              Trở thành barber chuyên nghiệp với chương trình đào tạo bài bản,
              thực hành tại salon thật.
            </p>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="section section-dark">
          <div className="container">
            <div className="section-header">
              <h2>Tại Sao Chọn <span className="gold-text">Sơn Barber Academy</span></h2>
              <div className="gold-line-center" />
            </div>

            <div className="grid grid-3">
              {[
                { icon: '🎯', title: 'Thực hành 80%', desc: 'Chương trình tập trung thực hành trên mẫu thật, rèn luyện kỹ năng hàng ngày.' },
                { icon: '👨‍🏫', title: 'Giảng viên giàu kinh nghiệm', desc: 'Đội ngũ barber nhiều năm kinh nghiệm trực tiếp hướng dẫn.' },
                { icon: '💼', title: 'Cơ hội việc làm', desc: 'Học viên xuất sắc được giới thiệu làm việc tại hệ thống Sơn Barber.' },
              ].map((item, i) => (
                <div key={i} className="card">
                  <div className="card-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.icon}</div>
                    <h3 style={{ marginBottom: '12px' }}>{item.title}</h3>
                    <p style={{ color: 'var(--dark-300)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COURSES ===== */}
        <section className="section section-darker" id="courses">
          <div className="container">
            <div className="section-header">
              <h2>Khóa Học <span className="gold-text">Đào Tạo</span></h2>
              <div className="gold-line-center" />
            </div>

            {courses.length > 0 ? (
              <div className="grid grid-3">
                {courses.map((course) => (
                  <div key={course.id} className="card">
                    <div className="card-img" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      background: 'linear-gradient(135deg, var(--dark-800), var(--dark-700))',
                    }}>
                      🎓
                    </div>
                    <div className="card-body">
                      <h3 style={{ marginBottom: '8px' }}>{course.title}</h3>
                      <p style={{ color: 'var(--dark-300)', fontSize: '0.9rem', marginBottom: '16px' }}>
                        {course.description || 'Chương trình đào tạo chuyên nghiệp'}
                      </p>
                      {course.price && <span className="price">{course.price.toLocaleString('vi-VN')}đ</span>}
                      {course.duration && (
                        <span style={{ color: 'var(--dark-400)', fontSize: '0.85rem', marginLeft: '12px' }}>
                          ⏱ {course.duration}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <div className="card-body" style={{ padding: '48px 32px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚧</div>
                  <h3 style={{ marginBottom: '12px' }}>Sắp ra mắt</h3>
                  <p style={{ color: 'var(--dark-300)' }}>
                    Các khóa học đang được hoàn thiện. Đăng ký bên dưới để nhận thông báo sớm nhất!
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===== REGISTRATION ===== */}
        <section className="section section-dark" id="register">
          <div className="container">
            <div className="section-header">
              <h2>Đăng Ký <span className="gold-text">Tư Vấn</span></h2>
              <div className="gold-line-center" />
              <p>Để lại thông tin để được tư vấn miễn phí về khóa học phù hợp.</p>
            </div>
            <AcademyClient courses={courses} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
