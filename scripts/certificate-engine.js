// HM Academy certificate engine
const HMCertificate = {
  create(student, level) {
    return {
      id: 'HM-' + Date.now(),
      student,
      level,
      issuedAt: new Date().toISOString()
    };
  }
};
