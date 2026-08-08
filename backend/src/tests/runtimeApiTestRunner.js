// HM Academy Beta Runtime API Test Runner Foundation

const scenarios = [
  { area: 'Course', checks: ['create', 'update', 'access', 'permissions'] },
  { area: 'Lesson', checks: ['create', 'retrieve', 'course relation'] },
  { area: 'Assessment', checks: ['create', 'submit', 'score validation'] },
  { area: 'Progress', checks: ['update', 'completion', 'ownership'] }
];

function getRuntimeScenarios() {
  return scenarios;
}

module.exports = { getRuntimeScenarios };
