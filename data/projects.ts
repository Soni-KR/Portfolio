export type PortfolioProject = {
  id: string;
  name: string;
  category: string;
  summary: string;
  technologies: string[];
  highlights: string[];
  repositoryUrl: string;
};

export const projects: PortfolioProject[] = [
  {
    id: "pcdent",
    name: "PCDent",
    category: "Full-Stack AI / Computer Vision",
    summary:
      "A dentist-in-the-loop platform for panoramic dental radiograph analysis and clinical workflows.",
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
    highlights: [
      "Production dental detection and instance segmentation with AI-assisted reporting and dentist validation.",
      "D-MODE research architecture combining DINOv2, RT-DETR, and a mask-prediction head.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/pcdent",
  },
  {
    id: "penalty-kick-ml",
    name: "Penalty Kick ML Learning Path",
    category: "Machine Learning / Educational Project",
    summary:
      "A beginner-friendly machine-learning path built around predicting whether a football penalty is scored or missed.",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Jupyter Notebooks",
    ],
    highlights: [
      "Uses a synthetic dataset to teach the complete workflow step by step.",
      "Covers exploration, preprocessing, feature engineering, comparative modeling, validation, and evaluation.",
    ],
    repositoryUrl:
      "https://github.com/Soni-KR/penalty-kick-ml-learning-path",
  },
  {
    id: "questify-it",
    name: "Questify IT",
    category: "Learning Intelligence / Explainable ML",
    summary:
      "An evidence-first learning intelligence pilot that converts real learner interactions into interpretable concept-mastery and teaching signals.",
    technologies: [
      "Bayesian Knowledge Tracing",
      "TF-IDF",
      "Python",
      "D1",
      "Machine Learning",
    ],
    highlights: [
      "Combines correctness, response time, confidence, explanations, and curriculum structure instead of relying only on scores.",
      "Includes explainable activity ranking, misconception clustering, and a guarded offline risk-model comparison.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/Questify-IT",
  },
  {
    id: "hireai",
    name: "HireAI",
    category: "AI Career Platform / Distributed Systems",
    summary:
      "An explainable AI career platform designed to reduce early rejection and bias by improving resumes, extracting job requirements, and returning actionable fit feedback.",
    technologies: [
      "Spring Boot",
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Keycloak",
      "Docker Compose",
    ],
    highlights: [
      "Uses an API gateway, JWT and Keycloak integration, audit logs, and rate limiting.",
      "Includes resume parsing and ATS scoring, job matching, and an early jobs service.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/CSchallenge",
  },
  {
    id: "esg-lens",
    name: "ESG Lens",
    category: "NLP / Multi-Label Classification",
    summary:
      "An end-to-end system for classifying Environmental, Social, Governance, and non-ESG text.",
    technologies: [
      "DeBERTa V3",
      "FastAPI",
      "React",
      "Vite",
      "Kaggle",
    ],
    highlights: [
      "Uses five-fold stratified training and per-label threshold tuning from out-of-fold predictions.",
      "Connects a reproducible training workflow to an inference API and interactive probability workspace.",
    ],
    repositoryUrl:
      "https://github.com/Soni-KR/Go-Data-Science-5.0-solution-proposal",
  },
  {
    id: "federated-mnist",
    name: "Federated Learning on MNIST",
    category: "Distributed AI / Experimental Study",
    summary:
      "A controlled comparison of centralized learning, FedAvg, and FedProx under IID and extreme non-IID client data.",
    technologies: ["Python", "CNN", "FedAvg", "FedProx", "MNIST"],
    highlights: [
      "FedAvg reached 99.05% under IID data but dropped to 71.50% under the non-IID setup.",
      "The best FedProx configuration reached 85.60%, recovering 14.10 percentage points over non-IID FedAvg.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/federated-learning-mnist",
  },
  {
    id: "are-chatbot",
    name: "ARE AI Chatbot",
    category: "Conversational AI / Knowledge Access",
    summary:
      "An AI chatbot designed and deployed to answer questions about Association Robotique ENSI, including events, membership, activities, and contact information.",
    technologies: ["AI Chatbot", "Jupyter Notebook", "Knowledge Sources"],
    highlights: [
      "Designed around association-specific frequently asked questions.",
      "Structured so its knowledge sources can be adapted to new documents.",
    ],
    repositoryUrl: "https://github.com/Soni-KR/ARE-Chatbot",
  },
];
