// src/utils/translations.js
export const labels = {
  cn: {
    appName: '课程评价系统',
    navHome: '首页',
    navHistory: '历史记录',
    navEvaluation: '课程评价',

    
    // 首页
    homeTitle: '评价数据概览',
    totalSubmissions: '总提交数',
    totalDesc: '收集到的所有评价数量',
    averageRating: '平均评分',
    averageDesc: '所有课程的平均满意度',
    courseCount: '课程数量',
    courseDesc: '被评价的不同课程',
    teacherCount: '教师数量',
    teacherDesc: '被评价的不同教师',
    recentSubmissions: '最近提交的评价',
    viewAll: '查看全部记录',
    
    // 表格列名
    tableId: '序号',
    tableEvaluator: '评价者',
    tableCourse: '课程名称',
    tableTeacher: '授课教师',
    tableRating: '评分',
    tableDate: '提交日期',
    tableGain: '本节课收获',
    tableContent: '本节课内容',
    
    // 历史页面
    historyTitle: '历史评价记录',
    searchPlaceholder: '搜索评价者、课程或教师...',
    filterByCourse: '按课程筛选',
    allCourses: '所有课程',
    recordList: '评价记录列表',
    totalRecords: '条记录',
    noRecords: '未找到匹配的评价记录',
    resetFilter: '重置筛选条件',
    
    // 评价页面
    evalTitle: '课程评价表单',
    nameLabel: '您的姓名',
    namePlaceholder: '请输入您的姓名',
    teacherLabel: '授课教师',
    teacherPlaceholder: '请输入教师姓名',
    contentLabel: '本节课的内容',
    contentPlaceholder: '请描述本节课的主要内容...',
    gainLabel: '本节课的收获',
    gainPlaceholder: '请描述您从本节课中学到了什么...',
    ratingLabel: '评分',
    feedbackLabel: '其他反馈与建议',
    feedbackPlaceholder: '请提供其他建议或意见...',
    submitButton: '提交评价',
    resetButton: '重置表单',
    required: '（必填）',
    notRated: '未评分',
    todayCourse: '今天你参加的是什么课程',
    todayCoursePlaceholder: '请选择今天参加的课程',
    // 表单验证
    fillRequired: '请填写所有必填字段！',
    submitSuccess: '评价提交成功！'
  },
  
  en: {
    appName: 'Course Evaluation System',
    navHome: 'Home',
    navHistory: 'History',
    navEvaluation: 'Evaluation',
    
    // 首页
    homeTitle: 'Evaluation Data Overview',
    totalSubmissions: 'Total Submissions',
    totalDesc: 'Total number of evaluations collected',
    averageRating: 'Average Rating',
    averageDesc: 'Average satisfaction across all courses',
    courseCount: 'Courses',
    courseDesc: 'Different courses evaluated',
    teacherCount: 'Teachers',
    teacherDesc: 'Different teachers evaluated',
    recentSubmissions: 'Recent Submissions',
    viewAll: 'View All Records',
    
    // 表格列名
    tableId: 'ID',
    tableEvaluator: 'Evaluator',
    tableCourse: 'Course',
    tableTeacher: 'Teacher',
    tableRating: 'Rating',
    tableDate: 'Date',
    tableGain: 'What I Learned',
    tableContent: 'Lesson Content',
    
    // 历史页面
    historyTitle: 'Evaluation History',
    searchPlaceholder: 'Search evaluator, course or teacher...',
    filterByCourse: 'Filter by Course',
    allCourses: 'All Courses',
    recordList: 'Evaluation Records',
    totalRecords: 'records',
    noRecords: 'No matching records found',
    resetFilter: 'Reset Filters',
    
    // 评价页面
    evalTitle: 'Course Evaluation Form',
    nameLabel: 'Your Name',
    namePlaceholder: 'Please enter your name',
    teacherLabel: 'Instructor',
    teacherPlaceholder: 'Please enter teacher name',
    contentLabel: 'Content of this lesson',
    contentPlaceholder: 'Please describe the main content of this lesson...',
    gainLabel: 'What did you gain from this lesson?',
    gainPlaceholder: 'Please describe what you learned from this lesson...',
    ratingLabel: 'Rating',
    feedbackLabel: 'Additional Feedback',
    feedbackPlaceholder: 'Please provide additional suggestions or comments...',
    submitButton: 'Submit Evaluation',
    resetButton: 'Reset Form',
    required: '(Required)',
    notRated: 'Not rated',
    todayCourse: 'What course did you attend today?',
    todayCoursePlaceholder: 'Please select today\'s course',
    // 表单验证
    fillRequired: 'Please fill in all required fields!',
    submitSuccess: 'Evaluation submitted successfully!'
  }
};

// 获取翻译的辅助函数
export const getTranslation = (language) => {
  return labels[language] || labels.cn;
};