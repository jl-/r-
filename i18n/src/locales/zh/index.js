import Locale from '../Locale';

const zh = new Locale();

zh.set('terms', {
  account: '账号',
  email: '电子邮箱',
  username: '用户名',
  password: '密码',
  passwordConfirmation: '确认密码',
  signup: '加入茜茜',
  login: '登陆',
  logout: '登出',
  nextStep: '下一步',
  parent: '家长',
  expert: '儿童教育专家'
}).set('defs', {
  account: '用户名 | 邮箱 | 手机号码',
  email: ' ',
  username: ' ',
  password: ' '
}).set('phrases', {
  rememberLogin: '记住我.',
  switchToLogin: '已有账号?',
  switchToSignup: '注册账号',
  createAccount: '注册茜茜账号',
  toLogin: '返回登陆',
  isParent: '我是孩子家长',
  isExpert: '我是儿童教育专家'
}).set('app.metas', {
  name: '茜茜儿童家庭学堂',
  slogan: 'Happy Home, Happy Learning!',
  intro: '',
  features: '最专业的儿童家庭教育课程\n最贴近生活的家长交互社区\n专家家庭辅导咨询顾问\n记录分享孩子成长足迹\n专业的儿童发展评测\n...'
}).set('app.sections', {
  index: '茜茜',
  courses: '茜茜课程',
  communities: '社区',
  home: '我的家',
  activities: '茜茜活动',
  about: '关于茜茜'
}).set('app.about', {
  what: '. 了解更多 ...',
  coursesSlogan: '丰富的儿童家庭教育专业课程',
  coursesIntro: '生活、语言、安全、自然认识、智力培养......\n图书教材，场景布置，教具......',
  communitiesIntro: `这里有活跃的社区.
  想要交流育儿经？分享孩子成长缩影？咨询?...`,
  joinSlogan: '加入我们...',
  joinStepOne: '选择账号类型',
  joinStepTwo: '填写账号信息',
  joinStepThree: '设置社区位置',
  parentRoleDescription: '专业课程资源\n社区交流平台\n线下活动管理\n话题式交流分享\n专家咨询',
  expertRoleDescription: '个人工作室\n咨询管理\n社区、家庭顾问'
}).set('errors', {
  USERNAME_INVALID: '用户名不合法',
  EMAIL_INVALID: '邮箱不合法',
  PASSWORD_INVALID: '密码不合法',
  PASSWORD_CONFIRMATION_INVALID: '密码不一致'
});

export const kvs = zh.flatten();
export const json = zh.parse();

export default zh;
