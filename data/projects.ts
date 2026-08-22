export type ProjectFolderId =
  | "featured"
  | "ai-software"
  | "federated-distributed"
  | "competitions-kaggle"
  | "research-linked";

export type ProjectResource = {
  label: string;
  url: string;
  kind: "notebook" | "certificate" | "profile";
  download?: boolean;
};

export type PortfolioProject = {
  id: string;
  name: string;
  folder: ProjectFolderId;
  kind: string;
  domains: string[];
  summary: string;
  technologies: string[];
  built: string[];
  rank?: string;
  result?: string;
  resources?: ProjectResource[];
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
    resources: [
      {
        label: "Read project story",
        url: "https://www.linkedin.com/posts/mourad-kraiem-99a0952a1_pcd-activity-7468410905576542208-TkpY",
        kind: "profile",
      },
    ],
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
    domains: ["Computer Vision", "Hyperspectral Imaging", "Deep Learning"],
    summary:
      "A dual computer-vision competition build spanning hyperspectral reconstruction and monocular dense-depth prediction.",
    technologies: ["Deep Learning", "Computer Vision", "ONNX", "FastAPI", "React"],
    built: [
      "A 29-channel hyperspectral-image reconstruction pipeline for the CASSI inverse problem.",
      "Monocular dense-depth prediction from a single RGB image, evaluated under an efficiency-oriented ONNX deployment constraint.",
      "A Top 5 pitch that moved the team from third on the leaderboard to second overall.",
    ],
    rank: "2nd",
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
    id: "kepler-exoplanet-orbyx",
    name: "Kepler Exoplanet Discovery ML Challenge / ORBYX",
    folder: "competitions-kaggle",
    kind: "Winning competition notebook",
    domains: ["Astronomy", "Classification", "Tabular ML"],
    summary:
      "A machine-learning notebook for identifying exoplanet candidates from Kepler observations, built for the first ORBYX ML Challenge.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    built: [
      "A reproducible data-preparation, modeling, evaluation, and prediction workflow.",
      "The winning entry developed with Amine Fathallah for the inaugural ORBYX challenge.",
    ],
    rank: "1 / 7",
    result: "1st of 7 teams - ORBYX ML Challenge.",
    resources: [
      {
        label: "Download notebook",
        url: "/evidence/notebooks/kepler-exoplanet-orbyx.ipynb",
        kind: "notebook",
        download: true,
      },
    ],
  },
  {
    id: "global-temperature-forecasting",
    name: "Global Temperature Forecasting (1961–2030)",
    folder: "competitions-kaggle",
    kind: "Winning forecasting notebook",
    domains: ["Time Series", "Climate Data", "Forecasting"],
    summary:
      "A notebook-driven forecasting workflow for modeling global temperature behavior across historical and future periods.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    built: [
      "Exploratory analysis and preprocessing for long-horizon temperature data.",
      "A complete training, validation, forecasting, and submission workflow.",
    ],
    rank: "1 / 8",
    result: "1st of 8 competitors.",
    resources: [
      {
        label: "Download notebook",
        url: "/evidence/notebooks/global-temperature-forecasting.ipynb",
        kind: "notebook",
        download: true,
      },
    ],
  },
  {
    id: "real-estate-price-tunisia",
    name: "Real Estate Price Prediction in Tunisia",
    folder: "competitions-kaggle",
    kind: "Winning regression notebook",
    domains: ["Regression", "Tunisia", "Tabular ML"],
    summary:
      "A Tunisia-focused regression workflow for predicting real-estate prices from structured property data.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    built: [
      "Data inspection, cleaning, feature preparation, and regression experiments.",
      "An evaluated prediction and submission pipeline retained as a reproducible notebook.",
    ],
    rank: "1 / 15",
    result: "1st of 15 competitors.",
    resources: [
      {
        label: "Download notebook",
        url: "/evidence/notebooks/real-estate-price-tunisia.ipynb",
        kind: "notebook",
        download: true,
      },
    ],
  },
  {
    id: "democracy-in-data",
    name: "Democracy in Data: Predict Voting Behavior",
    folder: "competitions-kaggle",
    kind: "Competition notebook",
    domains: ["CatBoost", "Feature Engineering", "Classification"],
    summary:
      "A voting-behavior classification solution developed for DataLeaders 1.0 using demographic signals and engineered features.",
    technologies: ["CatBoost", "Python", "Pandas", "Jupyter"],
    built: [
      "A reproducible preprocessing and demographic feature-engineering pipeline.",
      "CatBoost training, evaluation, and competition submission generation.",
    ],
    rank: "2 / 24",
    result: "2nd of 24 competitors - notebook score 0.88397.",
    resources: [
      {
        label: "Download notebook",
        url: "/evidence/notebooks/democracy-in-data-voting.ipynb",
        kind: "notebook",
        download: true,
      },
    ],
  },
  {
    id: "bank-churn-classification",
    name: "Binary Classification with a Bank Churn Dataset #1",
    folder: "competitions-kaggle",
    kind: "Competition notebook",
    domains: ["Classification", "Customer Analytics", "Tabular ML"],
    summary:
      "A binary-classification notebook for predicting customer churn from structured banking data.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    built: [
      "A complete exploration, preprocessing, model-comparison, and validation workflow.",
      "Prediction and submission steps preserved in an inspectable notebook.",
    ],
    rank: "3 / 32",
    result: "3rd of 32 competitors.",
    resources: [
      {
        label: "Download notebook",
        url: "/evidence/notebooks/bank-churn-classification.ipynb",
        kind: "notebook",
        download: true,
      },
    ],
  },
  {
    id: "datacamp-rating-prediction",
    name: "DataCamp Courses Rating Prediction",
    folder: "competitions-kaggle",
    kind: "Competition notebook",
    domains: ["Regression", "Education Data", "Tabular ML"],
    summary:
      "A notebook workflow for predicting course ratings from structured DataCamp course information.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    built: [
      "Exploratory analysis and feature preparation around course metadata.",
      "Model training, comparison, evaluation, and prediction generation.",
    ],
    rank: "5 / 11",
    result: "5th of 11 competitors.",
    resources: [
      {
        label: "Download notebook",
        url: "/evidence/notebooks/datacamp-courses-rating.ipynb",
        kind: "notebook",
        download: true,
      },
    ],
  },
  {
    id: "dataquest-2025-sboui",
    name: "DataQuest 2025: Sboui Special Challenge",
    folder: "competitions-kaggle",
    kind: "Competition notebook",
    domains: ["Data Science", "Modeling", "Kaggle"],
    summary:
      "A compact competition notebook created for the DataQuest 2025 Sboui Special Challenge.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    built: [
      "A focused end-to-end workflow from input data to evaluated predictions.",
      "A submission-ready notebook retained as part of the competition archive.",
    ],
    rank: "9 / 26",
    result: "9th of 26 competitors.",
    resources: [
      {
        label: "Download notebook",
        url: "/evidence/notebooks/dataquest-2025-sboui.ipynb",
        kind: "notebook",
        download: true,
      },
    ],
  },
  {
    id: "go-data-science-4",
    name: "Go Data Science 4.0",
    folder: "competitions-kaggle",
    kind: "Mental-health ML challenge",
    domains: ["Mental Health", "Classification", "Zindi"],
    summary:
      "A mental-health classification challenge entry completed as Team PowerPointPoys.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter", "Zindi"],
    built: [
      "A notebook covering data exploration, preprocessing, modeling, and prediction generation.",
      "A competition submission that finished inside the certified top 25 percent.",
    ],
    rank: "22 / 120",
    result: "22nd of 120 competitors - certified top 25%.",
    resources: [
      {
        label: "Download notebook",
        url: "/evidence/notebooks/go-data-science-4.ipynb",
        kind: "notebook",
        download: true,
      },
      {
        label: "View rank certificate",
        url: "/evidence/certificates/go-data-science-4-zindi.png",
        kind: "certificate",
      },
    ],
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
  return projects
    .filter((project) => project.folder === folderId)
    .sort((first, second) => Number(Boolean(second.rank)) - Number(Boolean(first.rank)));
}

export function getFolderForProject(project: PortfolioProject) {
  return project.folder;
}
