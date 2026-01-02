import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { labels } from '../utils/translations';

const HistoryPage = ({ submissions }) => {
  const [filter, setFilter] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const { language } = useLanguage();
  const t = labels[language];

  const uniqueCourses = ['all', ...new Set(submissions.map(sub => sub.todayCourse || '未选择'))];
  
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(filter.toLowerCase()) ||
      sub.teacher.toLowerCase().includes(filter.toLowerCase()) ||
      (sub.todayCourse && sub.todayCourse.toLowerCase().includes(filter.toLowerCase()));
    
    const matchesCourse = selectedCourse === 'all' || (sub.todayCourse || '未选择') === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#444' }}>📋 {t.historyTitle}</h1>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          alignItems: 'end'
        }}>
          <div className="form-group">
            <label className="form-label">{t.searchPlaceholder}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t.searchPlaceholder}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">{language === 'cn' ? '按今日课程筛选' : 'Filter by Today\'s Course'}</label>
            <select
              className="form-control"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {uniqueCourses.map(course => (
                <option key={course} value={course}>
                  {course === 'all' ? t.allCourses : course}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h2 style={{ margin: 0 }}>{t.recordList}</h2>
          <div style={{ color: '#666' }}>
            {filteredSubmissions.length} {t.totalRecords}
          </div>
        </div>
        
        {filteredSubmissions.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#999'
          }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📭</p>
            <p>{t.noRecords}</p>
            <button 
              onClick={() => { setFilter(''); setSelectedCourse('all'); }}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              {t.resetFilter}
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t.tableId}</th>
                  <th>{t.tableEvaluator}</th>
                  <th>{language === 'cn' ? '今日课程' : 'Today\'s Course'}</th> {/* 删除 course 列，只保留 today's course */}
                  <th>{t.tableTeacher}</th>
                  <th>{t.tableGain}</th>
                  <th>{t.tableContent}</th>
                  <th>{t.tableRating}</th>
                  <th>{t.tableDate}</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id}>
                    <td>{sub.id}</td>
                    <td><strong>{sub.name}</strong></td>
                    <td>{sub.todayCourse || '-'}</td> {/* 只显示 todayCourse */}
                    <td>{sub.teacher}</td>
                    <td style={{ maxWidth: '200px' }}>{sub.gain}</td>
                    <td style={{ maxWidth: '200px' }}>{sub.content}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ 
                              color: i < sub.rating ? '#ffd700' : '#ddd',
                              fontSize: '1rem'
                            }}>★</span>
                          ))}
                        </div>
                        <span>({sub.rating}.0)</span>
                      </div>
                    </td>
                    <td>{sub.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;