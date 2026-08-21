export type ProjectTier = "featured" | "domain" | "archive";

export type PortfolioProject = {
  id: string;
  name: string;
  tier: ProjectTier;
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
    tier: "featured",
    kind: "AI product",
    domains: ["Computer Vision", "Full-Stack Systems"],
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
      "A D-MODE research architecture combining DINOv2, RT-DETR, and a mask-prediction head.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/pcdent",
  },
  {
    id: "graph-rag-arabic-medical-qa",
    name: "Explainable Graph-RAG for Arabic Medical QA",
    tier: "featured",
    kind: "Research system",
    domains: ["Graph-RAG", "Arabic NLP", "Knowledge Graphs"],
    summary:
      "An explainable Arabic medical QA system built around traceable hybrid retrieval and evidence provenance.",
    technologies: ["Neo4j", "Multilingual Embeddings", "Hybrid Retrieval", "RAG"],
    built: [
      "Combined lexical, vector, and graph retrieval.",
      "Selected evidence with provenance for more explainable answers.",
    ],
    researchId: "graph-rag-arabic-medical-qa",
  },
  {
    id: "multi-agent-news-prediction",
    name: "Improving News Prediction through Multi-Agent Systems",
    tier: "featured",
    kind: "Published research",
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
  {
    id: "edge-fog-cloud-digital-twin",
    name: "Edge-Fog-Cloud Digital Twin & Federated Learning",
    tier: "featured",
    kind: "Research system",
    domains: ["Federated Learning", "Distributed AI", "Smart Agriculture"],
    summary:
      "A distributed architecture for federated yield prediction across fog nodes and a coordinating cloud layer.",
    technologies: ["Federated Learning", "Edge/Fog/Cloud", "Digital Twins"],
    built: [
      "Federated training across distributed fog nodes.",
      "Cloud aggregation and model redistribution inside a digital-twin architecture.",
    ],
    researchId: "edge-fog-cloud-digital-twin",
  },
  {
    id: "penalty-kick-ml",
    name: "Penalty Kick ML Learning Path",
    tier: "featured",
    kind: "Educational ML system",
    domains: ["Machine Learning", "Education"],
    summary:
      "A beginner-friendly machine-learning path built around predicting whether a football penalty is scored or missed.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter"],
    built: [
      "A synthetic dataset and progressive notebook-based learning path.",
      "EDA, preprocessing, feature engineering, comparative modeling, validation, and evaluation exercises.",
    ],
    repositoryUrl:
      "https://github.com/Soni-KR/penalty-kick-ml-learning-path",
  },
  {
    id: "questify-it",
    name: "Questify IT",
    tier: "domain",
    kind: "Learning intelligence",
    domains: ["Explainable ML", "Education"],
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
    id: "hireai",
    name: "HireAI",
    tier: "domain",
    kind: "Distributed platform",
    domains: ["Applied AI", "Distributed Systems"],
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
    id: "esg-lens",
    name: "ESG Lens",
    tier: "domain",
    kind: "NLP system",
    domains: ["Natural Language Processing", "Classification"],
    summary:
      "An end-to-end system for classifying Environmental, Social, Governance, and non-ESG text.",
    technologies: ["DeBERTa V3", "FastAPI", "React", "Kaggle"],
    built: [
      "Five-fold stratified training and per-label threshold tuning.",
      "A reproducible training workflow, inference API, and probability workspace.",
    ],
    repositoryUrl:
      "https://github.com/Soni-KR/Go-Data-Science-5.0-solution-proposal",
  },
  {
    id: "federated-mnist",
    name: "Federated Learning on MNIST",
    tier: "domain",
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
    id: "are-chatbot",
    name: "ARE AI Chatbot",
    tier: "domain",
    kind: "Knowledge-access system",
    domains: ["Conversational AI", "Knowledge Systems"],
    summary:
      "An association-specific chatbot for events, membership, activities, and contact questions.",
    technologies: ["AI Chatbot", "Jupyter", "Curated Knowledge Sources"],
    built: [
      "Frequently asked-question coverage for Association Robotique ENSI.",
      "Adaptable knowledge-source organization.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/ARE-Chatbot",
  },
  {
    id: "ai-goat-depth",
    name: "AI GOAT Monocular Depth Solution",
    tier: "archive",
    kind: "Competition artifact",
    domains: ["Computer Vision", "Deep Learning"],
    summary:
      "A monocular dense-depth prediction solution developed during the AI GOAT 1.0 competition.",
    technologies: ["Deep Learning", "Computer Vision", "ONNX", "FastAPI", "React"],
    built: ["Preprocessing, model inference, evaluation, and an interactive application."],
    result: "Competition result: 2nd place.",
    repositoryUrl:
      "https://github.com/Soni-KR/AIGOAT1.0-Task2-Monocular-Depth-Estimation-from-Single-RGB-Images-solution",
  },
];

export const projectFolders = [
  { id: "featured", label: "Featured Systems", description: "Resume-led work" },
  { id: "all", label: "All Systems", description: "Complete project index" },
  { id: "Computer Vision", label: "Computer Vision", description: "Visual intelligence" },
  { id: "Arabic NLP", label: "NLP & Knowledge", description: "Language and retrieval" },
  { id: "Distributed AI", label: "Distributed AI", description: "Federated and multi-node systems" },
  { id: "Education", label: "Learning Systems", description: "Teaching and learner intelligence" },
  { id: "archive", label: "Archive", description: "Supporting artifacts" },
] as const;

export function getProjectsForFolder(folderId: string) {
  if (folderId === "all") {
    return projects;
  }

  if (folderId === "featured" || folderId === "archive") {
    return projects.filter((project) => project.tier === folderId);
  }

  return projects.filter((project) => project.domains.includes(folderId));
}

export function getFolderForProject(project: PortfolioProject) {
  if (project.tier === "featured" || project.tier === "archive") {
    return project.tier;
  }

  return (
    projectFolders.find((folder) => project.domains.includes(folder.id))?.id ??
    "all"
  );
}
