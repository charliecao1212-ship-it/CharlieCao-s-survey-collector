import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import EvaluationPage from './pages/EvaluationPage';
import './App.css';

// 模拟数据
const mockSubmissions = [
];

function App() {
  const [submissions, setSubmissions] = useState(() => {
    // 从localStorage加载数据，如果没有则使用模拟数据
    const savedData = localStorage.getItem('course-evaluations-array');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return parsedData;
      }
    }
    return mockSubmissions;
  });

  // 保存数据到localStorage
  useEffect(() => {
    localStorage.setItem('course-evaluations-array', JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = (newSubmission) => {
    // 获取课程名称
    const courseOptions = {
      'math': '高等数学',
      'english': '大学英语', 
      'physics': '大学物理',
      'computer': '计算机科学',
      'chemistry': '化学原理',
      'other': '其他课程'
    };
    
    const submissionWithMeta = {
      ...newSubmission,
      id: submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1,
      date: new Date().toLocaleDateString('zh-CN'),
      course: courseOptions[newSubmission.todayCourse] || '未知课程' // 将选项值转换为课程名称
    };
    
    const updatedSubmissions = [submissionWithMeta, ...submissions];
    setSubmissions(updatedSubmissions);
    
    return submissionWithMeta;
  };

  // 获取最近评价者姓名
  // const recentNames = [...new Set(submissions.slice(0, 5).map(s => s.name))];

  return (
<Router>
      <Layout>
        <Routes>
          {/* 添加重定向：根路径自动跳转到首页 */}
          <Route path="/" element={<HomePage submissions={submissions} />} />
          <Route path="/home" element={<Navigate to="/" replace />} /> {/* 可选：重定向/home到/ */}
          <Route path="/history" element={<HistoryPage submissions={submissions} />} />
          <Route path="/evaluation" element={
            <EvaluationPage 
              addSubmission={addSubmission}
              // recentNames={recentNames}
            />
          } />
          {/* 可选：添加404页面处理 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;