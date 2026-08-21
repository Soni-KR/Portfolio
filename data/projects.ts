export type ProjectFolderId =
  | "featured"
  | "ai-software"
  | "federated-distributed"
  | "competitions-kaggle"
  | "research-linked";

export type PortfolioProject = {
  id: string;
  name: string;
  folder: ProjectFolderId;
  kind: string;
  domains: string[];
  summary: string;
  technologies: string[];
  built: string[];
  result?: string;
  repositoryUrl?: string;
  publicationUrl?: string;
  researchId?: string;
};

export const projects: PortfolioProject[] = [
  {
    id: "pcdent",
    name: "PCDent",
    folder: "featured",
    kind: "AI product",
    domains: ["Computer Vision", "Full-Stack Systems", "Medical AI"],
    summary:
      "A dentist-in-the-loop platform for panoramic dental-radiograph analysis and clinical workflows.",
    technologies: [
      "React",
      "TypeScript",
      "Django REST Framework",
      "PostgreSQL",
      "Redis/Celery",
      "WebSockets",
      "Docker",
      "YOLOv8m-seg",
    ],
    built: [
      "AI-assisted detection and instance segmentation with dentist validation.",
      "Clinical reporting workflows connected to a full-stack application.",
      "D-MODE: a research architecture combining DINOv2, RT-DETR, and a mask-prediction head.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/pcdent",
    researchId: "d-mode",
  },
  {
    id: "penalty-kick-ml",
    name: "Penalty Kick ML Learning Path",
    folder: "featured",
    kind: "Educational ML system",
    domains: ["Machine Learning", "Education", "Football"],
    summary:
      "A beginner-friendly machine-learning path built around predicting whether a football penalty is scored or missed.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter"],
    built: [
      "A synthetic dataset and progressive notebook-based learning path.",
      "EDA, preprocessing, feature engineering, comparative modeling, validation, and evaluation exercises.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/penalty-kick-ml-learning-path",
  },
  {
    id: "hireai",
    name: "HireAI",
    folder: "ai-software",
    kind: "Distributed AI platform",
    domains: ["Applied AI", "Distributed Systems", "Career Technology"],
    summary:
      "An explainable AI career platform for resume feedback, job-requirement extraction, and actionable fit analysis.",
    technologies: [
      "Spring Boot",
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Keycloak",
    ],
    built: [
      "API gateway, identity integration, audit logs, and rate limiting.",
      "Resume parsing, ATS feedback, job matching, and an early jobs service.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/CSchallenge",
  },
  {
    id: "questify",
    name: "Questify",
    folder: "ai-software",
    kind: "Gamified learning platform",
    domains: ["Education", "Interactive Systems", "Game Design"],
    summary:
      "A gamified education platform where teenagers complete interactive quests covering business, AI, engineering, and physics.",
    technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
    built: [
      "Four interactive learning scenarios spanning entrepreneurship, gradient descent, gear ratios, and projectile motion.",
      "A persistent reward system, animated mascot reactions, and judge-ready demo flow.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/Questify",
  },
  {
    id: "questify-it",
    name: "Questify-IT",
    folder: "ai-software",
    kind: "Learning intelligence",
    domains: ["Explainable ML", "Education", "Learning Analytics"],
    summary:
      "An evidence-first learning intelligence pilot that converts learner interactions into interpretable mastery and teaching signals.",
    technologies: ["Bayesian Knowledge Tracing", "TF-IDF", "Python", "D1"],
    built: [
      "Explainable activity ranking and misconception clustering.",
      "A guarded offline risk-model comparison using multiple learner signals.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/Questify-IT",
  },
  {
    id: "are-chatbot",
    name: "ARE AI Chatbot",
    folder: "ai-software",
    kind: "Knowledge-access system",
    domains: ["Conversational AI", "Knowledge Systems"],
    summary:
      "An association-specific chatbot for events, membership, activities, and contact questions.",
    technologies: ["AI Chatbot", "Jupyter", "Curated Knowledge Sources"],
    built: [
      "Frequently asked-question coverage for Association Robotique ENSI.",
      "Adaptable knowledge-source organization.",
    ],
    result: "Project of the Year - Association Robotique ENSI.",
    repositoryUrl: "https://github.com/Soni-KR/ARE-Chatbot",
  },
  {
    id: "federated-mnist",
    name: "Federated Learning on MNIST",
    folder: "federated-distributed",
    kind: "Experimental study",
    domains: ["Federated Learning", "Distributed AI"],
    summary:
      "A controlled comparison of centralized learning, FedAvg, and FedProx under IID and extreme non-IID client data.",
    technologies: ["Python", "CNN", "FedAvg", "FedProx", "MNIST"],
    built: [
      "A reproducible comparison across centralized, IID, and non-IID settings.",
      "A FedProx configuration study under heterogeneous client data.",
    ],
    result:
      "FedAvg: 99.05% IID and 71.50% non-IID; best FedProx result: 85.60%.",
    repositoryUrl: "https://github.com/Soni-KR/federated-learning-mnist",
  },
  {
    id: "flower-federated-mnist",
    name: "Flower Federated Learning on MNIST",
    folder: "federated-distributed",
    kind: "Federated simulation",
    domains: ["Flower", "Federated Learning", "Distributed AI"],
    summary:
      "A Flower-based MNIST experiment separating dataset, client, model, simulation, and evaluation responsibilities.",
    technologies: ["Flower", "Python", "PyTorch", "MNIST"],
    built: [
      "Federated client and simulation components around an MNIST classifier.",
      "A reproducible repository structure with stored experiment results.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/flower-federated-learning-mnist",
  },
  {
    id: "go-data-science-5",
    name: "Go Data Science 5.0",
    folder: "competitions-kaggle",
    kind: "Competition leadership & solution",
    domains: ["NLP", "Transformers", "Technical Leadership"],
    summary:
      "Technical management for the competition plus ESG Lens, an end-to-end multi-label ESG text-classification solution.",
    technologies: ["DeBERTa V3", "FastAPI", "React", "Kaggle", "Stratified CV"],
    built: [
      "Technical Manager for Go Data Science 5.0 and its competition workflow.",
      "An ESG solution proposal with five-fold training, threshold tuning, an inference API, and a responsive probability workspace.",
    ],
    result: "Competition organized for 350 participants.",
    repositoryUrl: "https://github.com/Soni-KR/Go-Data-Science-5.0-solution-proposal",
  },
  {
    id: "ai-goat-depth",
    name: "AI GOAT 1.0",
    folder: "competitions-kaggle",
    kind: "Winning competition solution",
    domains: ["Computer Vision", "Deep Learning"],
    summary:
      "A monocular dense-depth prediction solution developed during the AI GOAT 1.0 competition.",
    technologies: ["Deep Learning", "Computer Vision", "ONNX", "FastAPI", "React"],
    built: [
      "Preprocessing, model inference, evaluation, and an interactive application.",
      "A complete solution for monocular depth estimation from a single RGB image.",
    ],
    result: "2nd Place - AI GOAT 1.0, Machine Learning Sup'Com.",
    repositoryUrl:
      "https://github.com/Soni-KR/AIGOAT1.0-Task2-Monocular-Depth-Estimation-from-Single-RGB-Images-solution",
  },
  {
    id: "ieee-cis-starter-notebook",
    name: "IEEE CIS Starter Preprocessing Notebook",
    folder: "competitions-kaggle",
    kind: "Teaching notebook",
    domains: ["Data Preparation", "Mentoring", "IEEE CIS"],
    summary:
      "A beginner-oriented guide for IEEE ENSI CIS members learning how to work with notebooks, datasets, and preprocessing workflows.",
    technologies: ["Jupyter", "Pandas", "Google Colab", "Kaggle"],
    built: [
      "A guided notebook with approachable examples and datasets.",
      "Setup instructions for Colab, Kaggle, VS Code, and classic Jupyter workflows.",
    ],
    repositoryUrl:
      "https://github.com/Soni-KR/starter-preprocessing-notebook-ieee-cis-2025",
  },
  {
    id: "winning-notebooks",
    name: "Other Winning Notebooks",
    folder: "competitions-kaggle",
    kind: "Competition notebook archive",
    domains: ["Tabular ML", "Feature Engineering", "Astronomy"],
    summary:
      "Selected notebook work from winning DataLeaders 1.0 and ORBYX ML Challenge entries.",
    technologies: ["CatBoost", "Scikit-learn", "Pandas", "Jupyter"],
    built: [
      "A DataLeaders 1.0 voting-behavior solution using CatBoost and engineered demographic features.",
      "A Kepler exoplanet-discovery notebook prepared for the ORBYX ML Challenge.",
    ],
    result:
      "1st Place - DataLeaders 1.0; 1st Place - ORBYX ML Challenge.",
  },
  {
    id: "kaggle-competition-work",
    name: "Other Kaggle & Competition Work",
    folder: "competitions-kaggle",
    kind: "Notebook collection",
    domains: ["Kaggle", "Tabular ML", "Forecasting", "NLP"],
    summary:
      "A broader notebook collection covering real-estate pricing in Tunisia, temperature forecasting, course-rating prediction, bank churn, DataQuest 2025, and mental-health classification.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter", "Kaggle"],
    built: [
      "Exploratory analysis, preprocessing, modeling, evaluation, and submission workflows across varied datasets.",
      "GO DATA SCIENCE 4.0 mental-health challenge entry certified 22nd of 120 competitors.",
    ],
    result: "GO DATA SCIENCE 4.0: top 25% - rank 22/120.",
  },
  {
    id: "multi-agent-news-prediction",
    name: "Improving News Prediction through Multi-Agent Systems",
    folder: "research-linked",
    kind: "Published research build",
    domains: ["Multi-Agent Systems", "Arabic NLP", "Graph ML"],
    summary:
      "A multi-agent Arabic health-news pipeline connecting language-model extraction, symbolic reasoning, and graph learning.",
    technologies: ["LLMs", "Graph Reasoning", "GCN", "Arabic NLP"],
    built: [
      "Information extraction and entity-normalization agents.",
      "Symbolic graph reasoning and GCN-based link prediction.",
    ],
    result: "Reported F1 score: 0.9848",
    repositoryUrl:
      "https://github.com/Soni-KR/Improving-News-Prediction-through-Multi-Agent-Systems",
    publicationUrl:
      "https://www.sciencedirect.com/science/article/abs/pii/S0169023X26000832",
    researchId: "multi-agent-news-prediction",
  },
];

export const projectFolders: ReadonlyArray<{
  id: ProjectFolderId;
  label: string;
  description: string;
}> = [
  { id: "featured", label: "Featured", description: "PCDent + football ML" },
  { id: "ai-software", label: "AI & Software Systems", description: "Products and learning systems" },
  { id: "federated-distributed", label: "Federated & Distributed AI", description: "Multi-client experiments" },
  { id: "competitions-kaggle", label: "Competitions & Kaggle", description: "Leadership and notebook work" },
  { id: "research-linked", label: "Research-linked Builds", description: "Open in Research Archive" },
];

export function getProjectsForFolder(folderId: string) {
  return projects.filter((project) => project.folder === folderId);
}

export function getFolderForProject(project: PortfolioProject) {
  return project.folder;
}
