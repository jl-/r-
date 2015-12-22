import ERROR_TYPES from './error-types';
const schema = {
  term: [
    'home', 'course', 'activity', 'community',
    'account', 'email', 'username', 'password', 'passwordConfirmation',
    'signup', 'login', 'logout', 'nextStep',
    'parent', 'expert'
  ],
  defs: ['account', 'email', 'username', 'password', 'parent', 'expert'],
  phrases: ['rememberLogin', 'switchToLogin', 'switchToSignup', 'createAccount', 'toLogin', 'weProvide'],
  app: {
    metas: ['name', 'slogan', 'intro', 'features'],
    sections: ['index', 'courses', 'communities', 'home', 'activities', 'about'],
    about: ['what', 'coursesSlogan', 'coursesIntro', 'communitiesSlogan', 'communitiesIntro',
      'joinSlogan', 'joinStepOne', 'joinStepTwo', 'joinStepThree'
    ]
  },
  errors: ERROR_TYPES
};

export default schema;
