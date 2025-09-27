export const sampleSlides = {
  slides: [
    {
      id: "slide-1",
      title: "Welcome",
      content: "This is the intro slide.",
      enableQuiz: false,
    },
    {
      id: "slide-2",
      title: "Math Basics",
      content: "Let's test your arithmetic skills.",
      enableQuiz: true,
      quiz: {
        question: "What is 10 / 2?",
        options: [{ value: "3" }, { value: "5" }, { value: "10" }],
        correctAnswer: 1,
        answer: 1, // user answered "5"
      },
    },
    {
      id: "slide-3",
      title: "Science",
      content: "Water freezes at what temperature?",
      enableQuiz: true,
      quiz: {
        question: "At what temperature does water freeze?",
        options: [{ value: "0°C" }, { value: "100°C" }, { value: "32°C" }],
        correctAnswer: 0,
      },
      quizCache: {
        question: "At what temperature does water freeze?",
        options: [{ value: "0°C" }, { value: "100°C" }, { value: "32°C" }],
        correctAnswer: 0,
      },
    },
  ],
};
