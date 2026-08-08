// HM Academy certificate engine
const HMCertificate = {
  create(student, level) {
    const certificate = {
      id: 'HM-' + Date.now(),
      student,
      level,
      issuedAt: new Date().toISOString()
    };

    this.save(certificate);
    return certificate;
  },

  save(certificate){
    const saved = JSON.parse(localStorage.getItem('hm_certificates') || '[]');
    saved.push(certificate);
    localStorage.setItem('hm_certificates', JSON.stringify(saved));
  },

  verify(id){
    const saved = JSON.parse(localStorage.getItem('hm_certificates') || '[]');
    return saved.find(cert => cert.id === id) || null;
  }
};
