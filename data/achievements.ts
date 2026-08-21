export type Achievement = {
  id: string;
  title: string;
  category: string;
  detail: string;
  metric?: string;
  url?: string;
  prominence: "primary" | "secondary";
};

export const achievements: Achievement[] = [
  {
    id: "ai-goat-second-place",
    title: "2nd Place - AI GOAT 1.0",
    category: "National AI Competition",
    detail:
      "Worked on deep-learning pipelines for hyperspectral image reconstruction and monocular dense-depth prediction, including preprocessing, training, and metric-based evaluation.",
    metric: "2nd place",
    url: "https://github.com/Soni-KR/AIGOAT1.0-Task2-Monocular-Depth-Estimation-from-Single-RGB-Images-solution",
    prominence: "primary",
  },
  {
    id: "are-project-of-year",
    title: "Project of the Year - Association Robotique ENSI",
    category: "Project Award",
    detail:
      "Recognized for the ARE AI Chatbot, designed to answer association questions and support adaptable knowledge sources.",
    metric: "Project of the Year",
    url: "https://github.com/Soni-KR/ARE-Chatbot",
    prominence: "primary",
  },
  {
    id: "dataleaders-problem-setter",
    title: "Problem Setter - DataLeaders 2.0",
    category: "Competition Design",
    detail:
      "Designed the penalty-kick ML challenge, synthetic dataset, task formulation, baseline, evaluation metric, and Kaggle setup.",
    metric: "70 entrants // 28 teams // 314 submissions",
    url: "https://www.linkedin.com/posts/mourad-kraiem-99a0952a1_dataleaders-ieee-kaggle-activity-7421179494717132801-fCIl",
    prominence: "primary",
  },
  {
    id: "gods-technical-manager",
    title: "Technical Manager - GODS 5.0",
    category: "Technical Leadership",
    detail:
      "Managed the technical side of a multi-label ESG text-classification competition and later developed an end-to-end transformer solution.",
    metric: "350 participants",
    url: "https://github.com/Soni-KR/Go-Data-Science-5.0-solution-proposal",
    prominence: "primary",
  },
  {
    id: "dke-publication",
    title: "Data & Knowledge Engineering Publication",
    category: "Research Publication",
    detail:
      "Co-authored work on Arabic health-news analysis using LLM extraction, symbolic reasoning, and graph convolutional networks.",
    metric: "F1 0.9848",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0169023X26000832",
    prominence: "primary",
  },
  {
    id: "ieee-cps-codeforces",
    title: "IEEE and Competitive Programming Leadership",
    category: "Leadership",
    detail:
      "Vice Chair of the IEEE ENSI CIS Student Branch Chapter, Treasurer of CPS ENSI, and Codeforces Specialist.",
    prominence: "primary",
  },
  {
    id: "orbyx-first-place",
    title: "1st Place - ORBYX ML Challenge",
    category: "Competition",
    detail:
      "Won the inaugural ORBYX Machine Learning Challenge as part of a two-person team.",
    metric: "1st place",
    prominence: "secondary",
  },
  {
    id: "epc-first-solve",
    title: "First Solve - EPC 5.0",
    category: "Competitive Programming",
    detail:
      "Part of the first team to solve the competition's opening problem.",
    metric: "First solve",
    prominence: "secondary",
  },
];
