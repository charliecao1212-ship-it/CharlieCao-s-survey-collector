import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // 确保导入 Navigate
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import EvaluationPage from './pages/EvaluationPage';
import './App.css';

// 在组件外部定义课程映射表（避免重复创建）
const COURSE_NAME_MAP = {
  cn: {
    'coding f': '语法基础',
    'coding ad': '语法进阶', 
    'coding acc': '语法加速',
    'algorithm f': '算法原理',
    'algorithm ad': '高阶算法',
    'other': '其他课程',
    'unknown': '未知课程'
  },
  en: {
    'coding f': 'fundamental coding grammar',
    'coding ad': 'advanced coding grammar', 
    'coding acc': 'accelerated coding grammar',
    'algorithm f': 'algorithm principles',
    'algorithm ad': 'advanced algorithms',
    'other': 'Other Course',
    'unknown': 'Unknown Course'
  }
};
const mockSubmissions = [
  { 
    id: 1, 
    name: 'Jonus', 
    course: 'algorithm f', 
    teacher: 'Mr. Smith', 
    gain: 'Through this session, I understood the definetion of algorithms and the basic ways to apply them in coding.', 
    content: 'We covered sorting algorithms like bubble sort and quicksort, along with searching algorithms such as binary search.', 
    date: '2025-12-28', 
    rating: 4,
    todayCourse: 'algorithm f',
    feedback: 'I think that the examples could be more specific to real-world applications.'
  },
  { 
    id: 2, 
    name: 'Leo', 
    course: 'algorithm f', 
    teacher: 'Mr. Smith', 
    gain: 'In the class I learned a lot about the ways to sort out the different elements in an array efficiently.', 
    content: 'We mainly learned about different sorting algorithms including merge sort and bubble sort.', 
    date: '2025-12-28', 
    rating: 5,
    todayCourse: 'algorithm f',
    feedback: 'I think the teacher already explained the concepts very clearly.'
  },
  { 
    id: 3, 
    name: 'Justin', 
    course: 'algorithm f', 
    teacher: 'Mr. Smith', 
    gain: 'In the class, I learned the importance of algorithms in computer science and how they can solve problems.', 
    content: 'The teacher explained to us the algorithms and we used a few basic sorting algorithms as examples and did som small projects by sorting a list of book names using coding.', 
    date: '2025-12-28', 
    rating: 4,
    todayCourse: 'algorithm f',
    feedback: 'I hope that we can learn more advanced algorithms in the future.'
  },
  { 
    id: 4, 
    name: 'Russell', 
    course: 'algorithm f', 
    teacher: 'Mr. Smith', 
    gain: 'I learned about the fundamental concepts of algorithms and their applications in programming while doing sorting works like the results searched on a web page.', 
    content: 'Mr. Smith taught us about various algorithms, focusing on sorting and searching techniques, and we practiced implementing them in small projects.', 
    date:'2025-12-28',
    rating: 4,
    todayCourse: 'algorithm f',
    feedback: 'I really appriciate that the teacher listened to our opinions and feebacks last week to include more practical examples and coding projects in the class.'
  },
  { 
    id: 5, 
    name: 'Baily', 
    course: 'algorithm f', 
    teacher: 'Mr. Smith', 
    gain: 'I learned a lot of fun sorting algorithms and how to implement them in code during real uses.', 
    content: 'Teacher Smith explained various sorting algorithms such as quicksort, bubble sort, and mergesort, and we practiced coding them using C++ code.', 
    date: '2025-12-28', 
    rating: 5,
    todayCourse: 'algorithm f',
    feedback: 'Mr. Smith is a great teacher who makes complex topics like sorting the easy to understand. I think that the projects Mr. Smith added in the class really helped me to understand the algorithms better.'
  },
  { 
    id: 6, 
    name: 'Ethan', 
    course: 'algorithm f', 
    teacher: 'Mr. Smith', 
    gain: 'I learned that the coding algorithms can be used in many places like in web pages and in apps to sort things out and it also have a lot of other functions.', 
    content: 'The class in mainly about the basic sorting methods like the bubble sort and the quick sork method.', 
    date: '2025-12-28', 
    rating: 4,
    todayCourse: 'algorithm f',
    feedback: 'I really like the teaching style of Mr. Smith and he is very patient to answer our questions. I am really surprised that people in teh past can invent these wise ways to just sort things out.'
  },
  { 
    id: 7, 
    name: 'Jonson', 
    course: 'algorithm f', 
    teacher: 'Mr. Smith', 
    gain: 'I really think that the class is a fun one and I gained experiences working with the coding languages like C++ and Python. I realy think that the algorithms that we have iscussed int eh classes are really useful and effective for their uses.', 
    content: 'In the class we mainly learned about the sorting algorithms like the bubble sort and the quick sort methods and searched for some other methods by ourselves.', 
    date: '2025-12-23', 
    rating: 4,
    todayCourse: 'algorithm f',
    feedback: 'The class is really fun and I hope that we can have more coding classes like this in the future including projects and selflearning.'
  },
  { 
    id: 8, 
    name: 'Coco', 
    course: 'algorithm f', 
    teacher: 'Mr. Smith', 
    gain: 'I learned a lot about the sorting methods designed by people in the past and I think that these methods are really useful in real life applications when functioning in an app or on a website.', 
    content: 'The class taught us the methods like bubble sort and quick sort and we also did some small projects by ourselves to practice these algorithms.', 
    date: '2025-12-23', 
    rating: 4,
    todayCourse: 'algorithm f',
    feedback: 'I think that the course is really well designed for me and I learned a lot from the projects Mr. Smith provides'
  },
  { 
    id: 9, 
    name: 'Harry Tang', 
    course: 'algorithm ad', 
    teacher: 'Dr. Lee', 
    gain: 'In the class, I learned about some more difficult algorithms about searching, and it is really a great way to use recursive function to keep on searching and trying in different parts of a shape.', 
    content: 'We learned BFS and DFS, and made a simulation of a man that is using the way of DFS to search for gold in a river bank.', 
    date: '2025-12-23', 
    rating: 5,
    todayCourse: 'algorithm ad',
    feedback: 'I think that the class provides a lot of chances for us to practice coding and I really like the projects that Dr. Lee designed for us. These animations are really a fun way to learn better and deeper about searching methods'
  },
  { 
    id: 10, 
    name: 'Charlie Sun', 
    course: 'algorithm ad', 
    teacher: 'Dr. Lee', 
    gain: 'The class keeps on learning about searching methods that are more advanced and I learned a lot about how these searching methods work in real life applications and I finally understsnds how a machine can work to find things.', 
    content: 'We learned BFS and DFS, and made a simulation using a data collected by a scientific team of a riverbank.', 
    date: '2025-12-23', 
    rating: 5,
    todayCourse: 'algorithm ad',
    feedback: 'I think tha the class inserted with projects is really helpful for us to understand the searching methods better and I really like the way Dr. Lee teaches us these difficult concepts.'
  },
  { 
    id: 6, 
    name: '孙八', 
    course: '艺术鉴赏', 
    teacher: '孙老师', 
    gain: '学会了欣赏古典油画的基本技巧', 
    content: '文艺复兴时期油画的特点和欣赏方法', 
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'other',
    feedback: '课程很有趣，开阔了眼界'
  },
  { 
    id: 6, 
    name: '孙八', 
    course: '艺术鉴赏', 
    teacher: '孙老师', 
    gain: '学会了欣赏古典油画的基本技巧', 
    content: '文艺复兴时期油画的特点和欣赏方法', 
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'other',
    feedback: '课程很有趣，开阔了眼界'
  },
  { 
    id: 6, 
    name: '孙八', 
    course: '艺术鉴赏', 
    teacher: '孙老师', 
    gain: '学会了欣赏古典油画的基本技巧', 
    content: '文艺复兴时期油画的特点和欣赏方法', 
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'other',
    feedback: '课程很有趣，开阔了眼界'
  },
  { 
    id: 6, 
    name: '孙八', 
    course: '艺术鉴赏', 
    teacher: '孙老师', 
    gain: '学会了欣赏古典油画的基本技巧', 
    content: '文艺复兴时期油画的特点和欣赏方法', 
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'other',
    feedback: '课程很有趣，开阔了眼界'
  },
  { 
    id: 6, 
    name: '孙八', 
    course: '艺术鉴赏', 
    teacher: '孙老师', 
    gain: '学会了欣赏古典油画的基本技巧', 
    content: '文艺复兴时期油画的特点和欣赏方法', 
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'other',
    feedback: '课程很有趣，开阔了眼界'
  },
  { 
    id: 6, 
    name: '孙八', 
    course: '艺术鉴赏', 
    teacher: '孙老师', 
    gain: '学会了欣赏古典油画的基本技巧', 
    content: '文艺复兴时期油画的特点和欣赏方法', 
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'other',
    feedback: '课程很有趣，开阔了眼界'
  },
  { 
    id: 6, 
    name: '孙八', 
    course: '艺术鉴赏', 
    teacher: '孙老师', 
    gain: '学会了欣赏古典油画的基本技巧', 
    content: '文艺复兴时期油画的特点和欣赏方法', 
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'other',
    feedback: '课程很有趣，开阔了眼界'
  }
];

function App() {
  const [submissions, setSubmissions] = useState(() => {
    const savedData = localStorage.getItem('course-evaluations-array');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return parsedData;
      }
    }
    return mockSubmissions;
  });

  useEffect(() => {
    localStorage.setItem('course-evaluations-array', JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = (newSubmission) => {
    const currentLanguage = localStorage.getItem('app-language') === 'en' ? 'en' : 'cn';
    
    const submissionWithMeta = {
      ...newSubmission,
      id: submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1,
      date: new Date().toLocaleDateString('zh-CN'),
      course: COURSE_NAME_MAP[currentLanguage][newSubmission.todayCourse] || 
              COURSE_NAME_MAP[currentLanguage]['unknown']
    };
    
    const updatedSubmissions = [submissionWithMeta, ...submissions];
    setSubmissions(updatedSubmissions);
    
    return submissionWithMeta;
  };

  const recentNames = [...new Set(submissions.slice(0, 5).map(s => s.name))];

  return (
    <Router>
      <Layout>
        <Routes>
          {/* 关键修改：添加重定向，确保根路径显示首页 */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage submissions={submissions} />} />
          <Route path="/history" element={<HistoryPage submissions={submissions} />} />
          <Route 
            path="/evaluation" 
            element={
              <EvaluationPage 
                addSubmission={addSubmission}
                recentNames={recentNames}
              />
            } 
          />
          {/* 可选：处理404，重定向到首页 */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;