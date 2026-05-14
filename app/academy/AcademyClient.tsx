'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Course {
  id: string;
  title: string;
}

export default function AcademyClient({ courses }: { courses: Course[] }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    course_id: '',
    note: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase.from('registrations').insert([{
      ...form,
      course_id: form.course_id || null,
    }]);
    
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', phone: '', course_id: '', note: '' });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} className="card" style={{ padding: '32px' }}>
        <div className="form-group">
          <label className="form-label">Họ tên *</label>
          <input
            type="text"
            className="form-input"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nhập họ tên"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Số điện thoại *</label>
          <input
            type="tel"
            className="form-input"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="0xxx xxx xxx"
          />
        </div>

        {courses.length > 0 && (
          <div className="form-group">
            <label className="form-label">Khóa học quan tâm</label>
            <select
              className="form-select"
              value={form.course_id}
              onChange={(e) => setForm({ ...form, course_id: e.target.value })}
            >
              <option value="">Chọn khóa học</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Ghi chú / Câu hỏi</label>
          <textarea
            className="form-textarea"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Bạn muốn hỏi thêm điều gì?"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          style={{ width: '100%' }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '⏳ Đang gửi...' : '🎓 Đăng ký tư vấn'}
        </button>

        {status === 'success' && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--success)',
            textAlign: 'center',
          }}>
            ✅ Đăng ký thành công! Chúng tôi sẽ liên hệ tư vấn sớm nhất.
          </div>
        )}

        {status === 'error' && (
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
  );
}
