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
    category: "Machine Learning Sup'Com",
    detail:
      "Built deep-learning pipelines for monocular dense-depth prediction, including preprocessing, inference, evaluation, and an interactive application.",
    metric: "2nd place",
    url: "https://github.com/Soni-KR/AIGOAT1.0-Task2-Monocular-Depth-Estimation-from-Single-RGB-Images-solution",
    prominence: "primary",
  },
  {
    id: "orbyx-first-place",
    title: "1st Place - ORBYX ML Challenge",
    category: "Orbyx ENSI Club",
    detail:
      "Won the machine-learning challenge with a two-person team; the retained notebook covers Kepler exoplanet discovery.",
    metric: "1st place",
    prominence: "primary",
  },
  {
    id: "are-project-of-year",
    title: "Project of the Year",
    category: "Association Robotique ENSI",
    detail:
      "Recognized for the ARE AI Chatbot, designed to answer association questions and support adaptable knowledge sources.",
    metric: "Project of the Year",
    url: "https://github.com/Soni-KR/ARE-Chatbot",
    prominence: "primary",
  },
  {
    id: "dataleaders-first-place",
    title: "1st Place - DataLeaders 1.0",
    category: "IEEE ENSI Student Branch",
    detail:
      "Developed a CatBoost voting-behavior solution using demographic feature engineering and a reproducible notebook workflow.",
    metric: "1st place // notebook score 0.88397",
    prominence: "primary",
  },
  {
    id: "syp-seven-first-place",
    title: "1st Place - SYP 7.0",
    category: "IEEE ENSI Student Branch",
    detail:
      "Awarded first place in the seventh edition of the IEEE ENSI Student Branch SYP competition.",
    metric: "1st place",
    prominence: "primary",
  },
  {
    id: "embs-mental-health-third",
    title: "3rd Place - EMBS Challenge",
    category: "TSYP 12.0",
    detail:
      "Placed third in the AI for Mental Health Advancement challenge at TSYP 12.0.",
    metric: "3rd place",
    prominence: "primary",
  },
  {
    id: "codeforces-specialist",
    title: "Codeforces Specialist",
    category: "Competitive Programming",
    detail:
      "Reached the Specialist rank on Codeforces through competitive programming contests.",
    metric: "Specialist",
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
    prominence: "secondary",
  },
  {
    id: "dataleaders-problem-setter",
    title: "Problem Setter - DataLeaders 2.0",
    category: "Competition Design",
    detail:
      "Designed the penalty-kick ML challenge, synthetic dataset, task formulation, baseline, evaluation metric, and Kaggle setup.",
    metric: "70 entrants // 28 teams // 314 submissions",
    url: "https://www.linkedin.com/posts/mourad-kraiem-99a0952a1_dataleaders-ieee-kaggle-activity-7421179494717132801-fCIl",
    prominence: "secondary",
  },
  {
    id: "gods-technical-manager",
    title: "Technical Manager - GODS 5.0",
    category: "Technical Leadership",
    detail:
      "Managed the technical side of a multi-label ESG text-classification competition and developed an end-to-end transformer solution.",
    metric: "350 participants",
    url: "https://github.com/Soni-KR/Go-Data-Science-5.0-solution-proposal",
    prominence: "secondary",
  },
  {
    id: "ieee-cps-leadership",
    title: "IEEE & CPS ENSI Leadership",
    category: "Leadership",
    detail:
      "Vice Chair of the IEEE ENSI CIS Student Branch Chapter and Treasurer of CPS ENSI.",
    prominence: "secondary",
  },
  {
    id: "go-data-science-four",
    title: "GO DATA SCIENCE 4.0 - Mental Health Challenge",
    category: "Zindi Competition",
    detail:
      "Competed as Team PowerPointPoys in the mental-health classification challenge.",
    metric: "Top 25% // rank 22 of 120",
    prominence: "secondary",
  },
  {
    id: "ieeextreme-18",
    title: "IEEEXtreme 18.0",
    category: "Programming Competition",
    detail:
      "Participated with team UwU in the global IEEE programming competition hosted for more than 19,000 participants.",
    prominence: "secondary",
  },
];
