interface Benefit {
    id: string;
    label: string;
    icon: React.ReactNode;
  }
  
  export const benefits: Benefit[] = [
    { id: "remote", label: "Remote Work", icon: <span className="text-green-500">🌐</span> },
    { id: "hybrid", label: "Hybrid Work", icon: <span className="text-green-500">🏠</span> },
    { id: "bpjs-health", label: "BPJS Kesehatan", icon: <span className="text-green-500">🏥</span> },
    { id: "bpjs-employment", label: "BPJS Ketenagakerjaan", icon: <span className="text-green-500">🛡️</span> },
    { id: "insurance-private", label: "Asuransi Swasta", icon: <span className="text-green-500">💉</span> },
    { id: "thr", label: "THR (Tunjangan Hari Raya)", icon: <span className="text-green-500">🎁</span> },
    { id: "bonus", label: "Bonus Kinerja", icon: <span className="text-green-500">💰</span> },
    { id: "paid-leave", label: "Cuti Tahunan", icon: <span className="text-green-500">🏖️</span> },
    { id: "career-path", label: "Jenjang Karir", icon: <span className="text-green-500">🚀</span> },
    { id: "training", label: "Pelatihan dan Kursus", icon: <span className="text-green-500">🎓</span> },
    { id: "transport-allowance", label: "Tunjangan Transportasi", icon: <span className="text-green-500">🚗</span> },
    { id: "meal-allowance", label: "Tunjangan Makan", icon: <span className="text-green-500">🍱</span> },
    { id: "laptop", label: "Fasilitas Laptop", icon: <span className="text-green-500">💻</span> },
    { id: "overtime-pay", label: "Uang Lembur", icon: <span className="text-green-500">⏰</span> },
    { id: "maternity-leave", label: "Cuti Melahirkan", icon: <span className="text-green-500">👶</span> },
  ];
  