import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import EvaluationPage from './pages/EvaluationPage';
import { useLanguage } from './hooks/useLanguage'; // 导入 useLanguage
import './App.css';

// ✅ 第一步：定义模拟数据
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
    name: 'Charlie', 
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
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'algorithm f',
    feedback: 'The class is really fun and I hope that we can have more coding classes like this in the future including projects and selflearning.'
  },
  { 
    id: 8, 
    name: 'Coco', 
    course: 'algorithm f', 
    teacher: '孙老师', 
    gain: '学会了欣赏古典油画的基本技巧', 
    content: '文艺复兴时期油画的特点和欣赏方法', 
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'algorithm f',
    feedback: '课程很有趣，开阔了眼界'
  },
  { 
    id: 9, 
    name: '', 
    course: 'algorithm f', 
    teacher: '孙老师', 
    gain: '学会了欣赏古典油画的基本技巧', 
    content: '文艺复兴时期油画的特点和欣赏方法', 
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'algorithm f',
    feedback: '课程很有趣，开阔了眼界'
  },
  { 
    id: 6, 
    name: '孙八', 
    course: 'algorithm f', 
    teacher: '孙老师', 
    gain: '学会了欣赏古典油画的基本技巧', 
    content: '文艺复兴时期油画的特点和欣赏方法', 
    date: '2024-01-10', 
    rating: 4,
    todayCourse: 'algorithm f',
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
    // ✅ 第二步：合并逻辑 - 先尝试从localStorage加载，如果没有则使用模拟数据
    const savedData = localStorage.getItem('course-evaluations-array');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return parsedData; // 有本地数据就用本地的
      }
    }
    // 没有本地数据或数据为空时，使用模拟数据
    return mockSubmissions;
  });

  const { language } = useLanguage();

  useEffect(() => {
    localStorage.setItem('course-evaluations-array', JSON.stringify(submissions));
  }, [submissions]);

  // ✅ 第四步：保持原有的addSubmission函数不变
  // src/App.jsx 中修改 addSubmission 函数里的课程映射部分
const addSubmission = (newSubmission) => {
  // ✅ 更新课程映射对象，与你的新课程选项保持一致
  const courseNameMap = {
    'coding f': language === 'cn' ? '语法基础' : 'fundamental coding grammar',
    'coding ad': language === 'cn' ? '语法进阶' : 'advanced coding grammar',
    'coding acc': language === 'cn' ? '语法加速' : 'accelerated coding grammar',
    'algorithm f': language === 'cn' ? '算法原理' : 'algorithm principles',
    'algorithm ad': language === 'cn' ? '高阶算法' : 'advanced algorithms',
    'other': language === 'cn' ? '其他课程' : 'Other Course'
  };
  
  const submissionWithMeta = {
    ...newSubmission,
    id: submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1,
    date: new Date().toLocaleDateString('zh-CN'),
    // 使用新的映射转换 todayCourse
    course: courseNameMap[newSubmission.todayCourse] || 
            (language === 'cn' ? '未知课程' : 'Unknown Course')
  };
  
  const updatedSubmissions = [submissionWithMeta, ...submissions];
  setSubmissions(updatedSubmissions);
  
  return submissionWithMeta;
};

  // ✅ 第五步：获取最近评价者（保持原有逻辑）
  const recentNames = [...new Set(submissions.slice(0, 5).map(s => s.name))];

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage submissions={submissions} />} />
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;