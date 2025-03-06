interface Benefit {
    id: string;
    label: string;
    icon: React.ReactNode;
}

export const benefits: Benefit[] = [
    { id: "remote", label: "Remote", icon: <span className="text-green-500">🌐</span> },
    { id: "flexible-schedule", label: "Flexible Schedule", icon: <span className="text-green-500">📅</span> },
    { id: "work-from-home", label: "Work From Home", icon: <span className="text-green-500">🏠</span> },
    { id: "on-site", label: "On Site", icon: <span className="text-green-500">🏢</span> },
    { id: "telecommuting", label: "Telecommuting", icon: <span className="text-green-500">💻</span> },
    { id: "no-commute", label: "No Commute", icon: <span className="text-green-500">🚗</span> },
    { id: "child-care", label: "Child Care", icon: <span className="text-green-500">👶</span> },
    { id: "pet-friendly", label: "Pet Friendly", icon: <span className="text-green-500">🐶</span> },
    { id: "health-insurance", label: "Health Insurance", icon: <span className="text-green-500">💉</span> },
    { id: "vision-insurance", label: "Vision Insurance", icon: <span className="text-green-500">🌃</span> },
    { id: "life-insurance", label: "Life Insurance", icon: <span className="text-green-500">💛</span> },
    { id: "disability-insurance", label: "Disability Insurance", icon: <span className="text-green-500">🎩</span> },
    { id: "paid-time-off", label: "Paid Time Off", icon: <span className="text-green-500">🏃‍♀️</span> },
    { id: "retirement-plan", label: "Retirement Plan", icon: <span className="text-green-500">💰</span> },
    { id: "401k", label: "401k", icon: <span className="text-green-500">💰</span> },
    { id: "medical-insurance", label: "Medical Insurance", icon: <span className="text-green-500">🏥</span> },
    { id: "dental-insurance", label: "Dental Insurance", icon: <span className="text-green-500">💊</span> }
]