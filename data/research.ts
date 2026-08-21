export type ResearchRecord = {
  id: string;
  title: string;
  organization: string;
  period: string;
  status: "Published" | "Ongoing research";
  overview: string;
  methodology: string[];
  result?: string;
  projectId?: string;
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
    id: "mg-retriever",
    title: "MG-Retriever",
    organization: "LARODEC Laboratory",
    period: "07/2026 - 08/2026",
    status: "Ongoing research",
    overview:
      "An explainable Graph-RAG retrieval system for Arabic medical question answering, designed around traceable evidence and provenance.",
    methodology: [
      "Knowledge-graph retrieval",
      "Multilingual embeddings",
      "Hybrid lexical, vector, and graph search",
    ],
  },
  {
    id: "d-mode",
    title: "D-MODE",
    organization: "PCDent research track",
    period: "Ongoing",
    status: "Ongoing research",
    overview:
      "A dental-image analysis architecture combining foundation-model features, object detection, and mask prediction inside the PCDent research track.",
    methodology: [
      "DINOv2 visual feature extraction",
      "RT-DETR object detection",
      "Dedicated mask-prediction head",
    ],
    projectId: "pcdent",
  },
  {
    id: "federated-edge-fog-cloud",
    title: "Federated Learning / Edge-Fog-Cloud Research",
    organization: "Smart-agriculture research internship",
    period: "07/2026 - 08/2026",
    status: "Ongoing research",
    overview:
      "A distributed smart-agriculture architecture for federated yield prediction across edge and fog nodes with cloud coordination and digital-twin modeling.",
    methodology: [
      "Federated learning across distributed fog nodes",
      "Cloud aggregation and model redistribution",
      "Edge-fog-cloud digital-twin architecture",
    ],
  },
];
