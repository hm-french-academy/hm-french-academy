const routes = {
  auth: {
    path: '/auth',
    protected: false
  },
  users: {
    path: '/users',
    protected: true,
    roles: ['admin']
  },
  courses: {
    path: '/courses',
    protected: true,
    roles: ['admin', 'teacher']
  },
  lessons: {
    path: '/lessons',
    protected: true,
    roles: ['admin', 'teacher']
  },
  assessments: {
    path: '/assessments',
    protected: true,
    roles: ['admin', 'teacher']
  },
  progress: {
    path: '/progress',
    protected: true,
    roles: ['admin', 'teacher', 'student']
  }
};

module.exports = routes;
