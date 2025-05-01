export function getIcon(id: string) {
  const icon = benefits.find((benefit) => (benefit.id === id));

  return icon?.icon || "";
}

export const benefits = [
  { id: "remote", label: "Remote Work", icon: "🌐" },
  { id: "hybrid", label: "Hybrid Work", icon: "🏠" },
  { id: "bpjs-health", label: "BPJS Kesehatan", icon: "🏥" },
  { id: "bpjs-employment", label: "BPJS Ketenagakerjaan", icon: "🛡️" },
  { id: "insurance-private", label: "Asuransi Swasta", icon: "💉" },
  { id: "thr", label: "THR (Tunjangan Hari Raya)", icon: "🎁" },
  { id: "bonus", label: "Bonus Kinerja", icon: "💰" },
  { id: "paid-leave", label: "Cuti Tahunan", icon: "🏖️" },
  { id: "career-path", label: "Jenjang Karir", icon: "🚀" },
  { id: "training", label: "Pelatihan dan Kursus", icon: "🎓" },
  { id: "transport-allowance", label: "Tunjangan Transportasi", icon: "🚗" },
  { id: "meal-allowance", label: "Tunjangan Makan", icon: "🍱" },
  { id: "laptop", label: "Fasilitas Laptop", icon: "💻" },
  { id: "overtime-pay", label: "Uang Lembur", icon: "⏰" },
  { id: "maternity-leave", label: "Cuti Melahirkan", icon: "👶" },
];  