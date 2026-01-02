import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { labels } from '../utils/translations';

const HomePage = ({ submissions }) => {
  const { language } = useLanguage();
  const t = labels[language];
  
  // 新增：按今天课程统计
  const todayCourseStats = submissions.reduce((stats, sub) => {
    if (sub.todayCourse) {
      stats[sub.todayCourse] = (stats[sub.todayCourse] || 0) + 1;
    }
    return stats;
  }, {});

  const stats = {
    totalSubmissions: submissions.length,
    averageRating: submissions.length > 0 
      ? (submissions.reduce((sum, sub) => sum + sub.rating, 0) / submissions.length).toFixed(1)
      : '0.0',
    uniqueCourses: [...new Set(submissions.map(sub => sub.course))].length,
    uniqueTeachers: [...new Set(submissions.map(sub => sub.teacher))].length,
    todayCourseCount: Object.keys(todayCourseStats).length // 新增：今天课程种类数
  };

  const recentSubmissions = submissions.slice(0, 5);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#444' }}>📊 {t.homeTitle}</h1>
      
      <div className="stats-grid">
        <div className="card stat-card">
          <h3>{t.totalSubmissions}</h3>
          <div className="stat-number">{stats.totalSubmissions}</div>
          <p>{t.totalDesc}</p>
        </div>
        
        <div className="card stat-card">
          <h3>{t.averageRating}</h3>
          <div className="stat-number">{stats.averageRating}/5.0</div>
          <p>{t.averageDesc}</p>
        </div>
        
        <div className="card stat-card">
          <h3>{t.courseCount}</h3>
          <div className="stat-number">{stats.uniqueCourses}</div>
          <p>{t.courseDesc}</p>
        </div>
        
        <div className="card stat-card">
          <h3>{language === 'cn' ? '今日课程种类' : 'Today\'s Courses'}</h3>
          <div className="stat-number">{stats.todayCourseCount}</div>
          <p>{language === 'cn' ? '不同课程数量' : 'Different courses today'}</p>
        </div>
      </div>

      {/* 新增：今日课程分布 */}
      {Object.keys(todayCourseStats).length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3>{language === 'cn' ? '今日课程分布' : 'Today\'s Course Distribution'}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {Object.entries(todayCourseStats).map(([course, count]) => (
              <div 
                key={course}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '5px',
                  fontSize: '0.9rem'
                }}
              >
                {course}: {count}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h2>{t.recentSubmissions}</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.tableId}</th>
                <th>{t.tableEvaluator}</th>
                <th>{language === 'cn' ? '今日课程' : 'Today\'s Course'}</th> {/* 修改这里 */}
                <th>{t.tableTeacher}</th>
                <th>{t.tableRating}</th>
                <th>{t.tableDate}</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map(sub => (
                <tr key={sub.id}>
                  <td>{sub.id}</td>
                  <td>{sub.name}</td>
                  <td>{sub.todayCourse || '-'}</td> {/* 修改这里 */}
                  <td>{sub.teacher}</td>
                  <td>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < sub.rating ? 'active' : ''}`}>★</span>
                      ))}
                    </div>
                  </td>
                  <td>{sub.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {submissions.length > 5 && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <a href="/history" className="btn btn-primary">
              {t.viewAll} ({submissions.length})
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;