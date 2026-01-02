
import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { labels } from '../utils/translations';

const EvaluationPage = ({ addSubmission = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    gain: '',
    content: '',
    teacher: '',
    rating: 0,
    feedback: '',
    todayCourse: '' // 新增：今天参加的课程
  });

  const [hoverRating, setHoverRating] = useState(0);
  const { language } = useLanguage();
  const t = labels[language];

  // 课程选项（可根据需要调整）
  const courseOptions = [
    { value: 'coding f', label: language === 'cn' ? '语法基础' : 'fundamental coding grammar' },
    { value: 'coding ad', label: language === 'cn' ? '语法进阶' : 'advanced coding grammar' },
    { value: 'coding acc', label: language === 'cn' ? '语法加速' : 'accelerated coding grammar' },
    { value: 'algorithm f', label: language === 'cn' ? '算法原理' : 'algorithm principles' },
    { value: 'algorithm ad', label: language === 'cn' ? '高阶算法' : 'advanced algorithms' },
    { value: 'other', label: language === 'cn' ? '其他课程' : 'Other Course' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 验证必填字段（新增todayCourse验证）
    if (!formData.name || !formData.teacher || !formData.content || !formData.gain || !formData.todayCourse) {
      alert(t.fillRequired);
      return;
    }
    
    // 调用父组件的添加函数
    addSubmission(formData);
    
    alert(t.submitSuccess);
    
    // 重置表单（保留todayCourse选项）
    setFormData({
      name: formData.name,
      gain: '',
      content: '',
      teacher: '',
      rating: 0,
      feedback: '',
      todayCourse: formData.todayCourse // 保留课程选择，方便连续评价同一课程
    });
    setHoverRating(0);
  };

  return (
    <div className="card">
      <h1 style={{ margin: '0 0 1rem 0', color: '#444' }}>{t.evalTitle}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div className="form-group">
            <label className="form-label">
              {t.nameLabel} <span style={{ color: '#ff4757' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder={t.namePlaceholder}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {t.teacherLabel} <span style={{ color: '#ff4757' }}>*</span>
            </label>
            <input
              type="text"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              className="form-control"
              placeholder={t.teacherPlaceholder}
              required
            />
          </div>
        </div>

        {/* 新增：今天参加的课程选择题 */}
        <div className="form-group">
          <label className="form-label">
            {t.todayCourse} <span style={{ color: '#ff4757' }}>*</span>
          </label>
          <select
            name="todayCourse"
            value={formData.todayCourse}
            onChange={handleChange}
            className="form-control"
            required
            style={{ height: '45px' }}
          >
            <option value="">{t.todayCoursePlaceholder}</option>
            {courseOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 评分部分 */}
        <div className="form-group">
          <label className="form-label">{t.ratingLabel}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || formData.rating) ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ cursor: 'pointer', fontSize: '2rem' }}
                >
                  ★
                </span>
              ))}
            </div>
            <span style={{ color: '#666' }}>
              ({formData.rating === 0 ? t.notRated : `${formData.rating}.0`})
            </span>
          </div>
        </div>

        {/* 内容、收获、反馈字段 */}
        <div className="form-group">
          <label className="form-label">
            {t.contentLabel} <span style={{ color: '#ff4757' }}>*</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-control"
            placeholder={t.contentPlaceholder}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            {t.gainLabel} <span style={{ color: '#ff4757' }}>*</span>
          </label>
          <textarea
            name="gain"
            value={formData.gain}
            onChange={handleChange}
            className="form-control"
            placeholder={t.gainPlaceholder}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t.feedbackLabel}</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="form-control"
            placeholder={t.feedbackPlaceholder}
            rows="3"
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: '',
                  gain: '',
                  content: '',
                  teacher: '',
                  rating: 0,
                  feedback: '',
                  todayCourse: ''
                });
                setHoverRating(0);
              }}
              style={{
                padding: '0.75rem 1.5rem',
                border: '2px solid #667eea',
                background: 'transparent',
                color: '#667eea',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {t.resetButton}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              {t.submitButton}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EvaluationPage;