export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface Quiz {
  id: string
  slug: string
  title: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  questions: Question[]
  estimatedTime: number
  bannerImage: string
  accentColor: string
  icon: string
  tags?: string[]
}

export const quizzes: Quiz[] = [
  {
    id: "geo-001",
    slug: "geography-advanced-world",
    title: "Advanced World Geography",
    description: "Challenge yourself with difficult geography questions covering physical features, demographics, and geopolitics",
    category: "Geography",
    difficulty: "hard",
    estimatedTime: 15,
    bannerImage: "/advanced-geography-world-map.jpg",
    accentColor: "from-cyan-500 to-blue-700",
    icon: "🗺️",
    tags: ["geography", "advanced", "world", "physical", "political"],
    questions: [
      {
        id: "q1",
        text: "Which of these countries does NOT have a coastline on the Mediterranean Sea?",
        options: ["Albania", "Croatia", "Montenegro", "Serbia"],
        correctAnswer: 3,
        explanation: "Serbia is landlocked and has no coastline on the Mediterranean Sea, unlike its Balkan neighbors Albania, Croatia, and Montenegro.",
      },
      {
        id: "q2",
        text: "What is the only river that flows both north and south of the equator?",
        options: ["Amazon River", "Nile River", "Congo River", "Niger River"],
        correctAnswer: 2,
        explanation: "The Congo River crosses the equator twice, making it the only major river to flow both north and south of the equator.",
      },
      {
        id: "q3",
        text: "Which landlocked country has the longest coastline on the Caspian Sea?",
        options: ["Azerbaijan", "Turkmenistan", "Iran", "Kazakhstan"],
        correctAnswer: 3,
        explanation: "Kazakhstan has approximately 2,320 km of Caspian Sea coastline, the longest among the landlocked countries bordering it.",
      },
      {
        id: "q4",
        text: "The Atacama Desert, one of the driest places on Earth, is located primarily in which country?",
        options: ["Peru", "Chile", "Argentina", "Bolivia"],
        correctAnswer: 1,
        explanation: "The Atacama Desert is located primarily in northern Chile, stretching about 1,000 km along the Pacific coast.",
      },
      {
        id: "q5",
        text: "Which of these cities is closest to the Tropic of Cancer?",
        options: ["Riyadh, Saudi Arabia", "Kolkata, India", "Dhaka, Bangladesh", "Hanoi, Vietnam"],
        correctAnswer: 2,
        explanation: "Dhaka is located at approximately 23.8°N latitude, very close to the Tropic of Cancer which lies at 23.5°N.",
      },
      {
        id: "q6",
        text: "What is the deepest oceanic trench in the world?",
        options: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Tonga Trench"],
        correctAnswer: 2,
        explanation: "The Mariana Trench reaches a maximum depth of about 11,034 meters (36,201 feet) at the Challenger Deep.",
      },
      {
        id: "q7",
        text: "Which country has the most time zones including overseas territories?",
        options: ["Russia", "United States", "France", "United Kingdom"],
        correctAnswer: 2,
        explanation: "France has 12 time zones due to its overseas territories and departments scattered across the world, more than any other country.",
      },
      {
        id: "q8",
        text: "The Palk Strait separates which two countries?",
        options: ["India and Sri Lanka", "India and Bangladesh", "Malaysia and Indonesia", "Iran and Saudi Arabia"],
        correctAnswer: 0,
        explanation: "The Palk Strait is a narrow strip of water separating the southeastern coast of India (Tamil Nadu) from northern Sri Lanka.",
      },
      {
        id: "q9",
        text: "Which African country was formerly known as Abyssinia?",
        options: ["Eritrea", "Somalia", "Ethiopia", "Sudan"],
        correctAnswer: 2,
        explanation: "Ethiopia was historically known as Abyssinia, particularly during the medieval and early modern periods.",
      },
      {
        id: "q10",
        text: "What is the second-longest river in Africa?",
        options: ["Zambezi River", "Niger River", "Congo River", "Orange River"],
        correctAnswer: 2,
        explanation: "The Congo River is the second-longest river in Africa at approximately 4,700 km, after the Nile River.",
      },
      {
        id: "q11",
        text: "Which mountain range forms the natural border between Europe and Asia?",
        options: ["Caucasus Mountains", "Ural Mountains", "Altai Mountains", "Tian Shan Mountains"],
        correctAnswer: 1,
        explanation: "The Ural Mountains extend about 2,500 km from the Arctic Ocean to northern Kazakhstan, forming the conventional boundary between Europe and Asia.",
      },
      {
        id: "q12",
        text: "What is the smallest country in mainland Africa by land area?",
        options: ["Gambia", "Eswatini", "Djibouti", "Rwanda"],
        correctAnswer: 0,
        explanation: "The Gambia is the smallest country in mainland Africa with an area of only 11,295 km², stretching along the Gambia River.",
      },
    ],
  },
  {
    id: "gen-001",
    slug: "general-knowledge-world-capitals",
    title: "World Capitals",
    description: "Test your knowledge of world capitals",
    category: "General Knowledge",
    difficulty: "medium",
    estimatedTime: 5,
    bannerImage: "/world-map-with-capitals.jpg",
    accentColor: "from-blue-500 to-blue-600",
    icon: "🌍",
    tags: ["geography", "capitals", "world"],
    questions: [
      {
        id: "q1",
        text: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: 1,
        explanation: "Paris has been the capital of France since the 12th century.",
      },
      {
        id: "q2",
        text: "Which city is the capital of Japan?",
        options: ["Osaka", "Kyoto", "Tokyo", "Yokohama"],
        correctAnswer: 2,
        explanation: "Tokyo became Japan's capital in 1868 during the Meiji Restoration.",
      },
      {
        id: "q3",
        text: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: 2,
        explanation: "Canberra was purpose-built as the capital city in 1927.",
      },
    ],
  },
  {
    id: "gen-002",
    slug: "general-knowledge-world-landmarks",
    title: "Famous Landmarks",
    description: "Identify famous landmarks from around the world",
    category: "General Knowledge",
    difficulty: "easy",
    estimatedTime: 4,
    bannerImage: "/famous-landmarks-statue-liberty-eiffel-tower.jpg",
    accentColor: "from-amber-500 to-orange-600",
    icon: "🏛️",
    tags: ["landmarks", "travel", "culture"],
    questions: [
      {
        id: "q1",
        text: "The Statue of Liberty is located in which city?",
        options: ["Boston", "Washington DC", "New York", "Philadelphia"],
        correctAnswer: 2,
        explanation: "The Statue of Liberty stands on Liberty Island in New York Harbor.",
      },
      {
        id: "q2",
        text: "Which country is the Great Wall located in?",
        options: ["India", "China", "Japan", "Vietnam"],
        correctAnswer: 1,
        explanation: "The Great Wall of China stretches over 13,000 miles across northern China.",
      },
    ],
  },
  {
    id: "sci-001",
    slug: "science-physics-basics",
    title: "Physics Fundamentals",
    description: "Explore the basics of physics",
    category: "Science",
    difficulty: "medium",
    estimatedTime: 6,
    bannerImage: "/physics-atoms-molecules-energy.jpg",
    accentColor: "from-purple-500 to-pink-600",
    icon: "⚛️",
    tags: ["physics", "science", "energy"],
    questions: [
      {
        id: "q1",
        text: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: 1,
        explanation: "The Newton (N) is the SI unit of force, named after Isaac Newton.",
      },
      {
        id: "q2",
        text: "What is the speed of light in vacuum?",
        options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"],
        correctAnswer: 0,
        explanation: "Light travels at approximately 299,792 km/s in vacuum.",
      },
      {
        id: "q3",
        text: "What does E=mc² represent?",
        options: ["Energy and momentum", "Mass-energy equivalence", "Force and acceleration", "Work and power"],
        correctAnswer: 1,
        explanation: "E=mc² shows the equivalence of mass and energy, proposed by Einstein.",
      },
    ],
  },
  {
    id: "sci-002",
    slug: "science-biology-intro",
    title: "Biology 101",
    description: "Introduction to biology concepts",
    category: "Science",
    difficulty: "easy",
    estimatedTime: 5,
    bannerImage: "/biology-cells-dna-microscope.jpg",
    accentColor: "from-green-500 to-emerald-600",
    icon: "🧬",
    tags: ["biology", "science", "cells"],
    questions: [
      {
        id: "q1",
        text: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        correctAnswer: 1,
        explanation: "The mitochondria produces energy (ATP) for the cell.",
      },
      {
        id: "q2",
        text: "How many chromosomes do humans have?",
        options: ["23", "46", "92", "36"],
        correctAnswer: 1,
        explanation: "Humans have 46 chromosomes (23 pairs).",
      },
    ],
  },
]

export function getQuizBySlug(slug: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.slug === slug)
}

export function getQuizzesByCategory(category: string): Quiz[] {
  return quizzes.filter((quiz) => quiz.category === category)
}

export function getAllCategories(): string[] {
  const categories = new Set(quizzes.map((quiz) => quiz.category))
  return Array.from(categories).sort()
}
