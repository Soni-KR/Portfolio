export type ResearchRecord = {
  id: string;
  title: string;
  organization: string;
  period: string;
  status: "Published" | "Research project";
  overview: string;
  methodology: string[];
  result?: string;
  projectId: string;
  repositoryUrl?: string;
  publicationUrl?: string;
};

export const research: ResearchRecord[] = [
  {
    id: "multi-agent-news-prediction",
    title: "Improving News Prediction through Multi-Agent Systems",
    organization: "LARODEC Laboratory",
    period: "07/2025 - 08/2025",
    status: "Published",
    overview:
      "Arabic health-news analysis and prediction using a multi-agent pipeline that connects language-model extraction with symbolic and graph-based reasoning.",
    methodology: [
      "LLM-based information extraction",
      "Entity normalization and symbolic graph reasoning",
      "Graph convolutional network link prediction",
    ],
    result: "Reported F1 score: 0.9848",
    projectId: "multi-agent-news-prediction",
    repositoryUrl:
      "https://github.com/Soni-KR/Improving-News-Prediction-through-Multi-Agent-Systems",
    publicationUrl:
      "https://www.sciencedirect.com/science/article/abs/pii/S0169023X26000832",
  },
  {
    id: "graph-rag-arabic-medical-qa",
    title: "Explainable Graph-RAG for Arabic Medical QA",
    organization: "LARODEC Laboratory",
    period: "07/2026 - 08/2026",
    status: "Research project",
    overview:
      "An explainable Arabic medical question-answering system focused on traceable retrieval and evidence provenance.",
    methodology: [
      "Knowledge-graph retrieval",
      "Multilingual embeddings",
      "Hybrid lexical, vector, and graph search",
    ],
    projectId: "graph-rag-arabic-medical-qa",
  },
  {
    id: "edge-fog-cloud-digital-twin",
    title: "Edge-Fog-Cloud Digital Twin and Federated Learning",
    organization: "Research Internship in Smart Agriculture",
    period: "07/2026 - 08/2026",
    status: "Research project",
    overview:
      "A distributed smart-agriculture architecture for federated yield prediction across fog nodes and a coordinating cloud layer.",
    methodology: [
      "Federated learning across distributed fog nodes",
      "Cloud aggregation and model redistribution",
      "Digital-twin architecture",
    ],
    projectId: "edge-fog-cloud-digital-twin",
  },
];
