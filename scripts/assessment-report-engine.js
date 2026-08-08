// HM Academy assessment report engine
const HMReport = {
  generate(score, skills = {}) {
    let level = 'A1';
    if (score >= 90) level = 'C1';
    else if (score >= 80) level = 'B2';
    else if (score >= 70) level = 'B1';
    else if (score >= 50) level = 'A2';

    const entries = Object.entries(skills);
    const strongest = entries.length ? entries.sort((a,b)=>b[1]-a[1])[0][0] : null;
    const weakest = entries.length ? entries.sort((a,b)=>a[1]-b[1])[0][0] : null;

    return {
      score,
      level,
      strongest,
      weakest,
      recommendations: weakest ? ['تطوير مهارة '+weakest, 'متابعة دروس المستوى '+level] : []
    };
  }
};
