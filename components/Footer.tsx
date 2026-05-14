import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">✂ SONBARBER</div>
            <p className="footer-desc">
              Hệ thống cắt tóc nam cao cấp tại TP Vinh. Mang đến trải nghiệm
              dịch vụ đẳng cấp với đội ngũ barber chuyên nghiệp.
            </p>
          </div>

          <div>
            <h4>Dịch vụ</h4>
            <ul className="footer-links">
              <li><Link href="/barber">Barber Shop</Link></li>
              <li><Link href="/barber#services">Bảng giá</Link></li>
              <li><Link href="/barber#products">Sản phẩm</Link></li>
              <li><Link href="/barber#booking">Đặt lịch</Link></li>
            </ul>
          </div>

          <div>
            <h4>Đào tạo</h4>
            <ul className="footer-links">
              <li><Link href="/academy">Academy</Link></li>
              <li><Link href="/academy#courses">Khóa học</Link></li>
              <li><Link href="/academy#register">Đăng ký</Link></li>
            </ul>
          </div>

          <div>
            <h4>Liên hệ</h4>
            <ul className="footer-links">
              <li><Link href="/contact">Thông tin</Link></li>
              <li><a href="tel:0985645872">0985 645 872</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} SonBarber. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
