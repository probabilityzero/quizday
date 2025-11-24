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
