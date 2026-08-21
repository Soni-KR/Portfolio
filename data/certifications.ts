export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  category: "AI & ML" | "Data Engineering" | "Software Delivery" | "Participation";
};

export const certifications: Certification[] = [
  {
    id: "graph-rag-langchain-neo4j",
    title: "Graph RAG with LangChain and Neo4j",
    issuer: "DataCamp",
    issued: "Jul 2026",
    category: "AI & ML",
  },
  {
    id: "deploying-ai-fastapi",
    title: "Deploying AI into Production with FastAPI",
    issuer: "DataCamp",
    issued: "Jul 2026",
    category: "Software Delivery",
  },
  {
    id: "git-fundamentals",
    title: "Git Fundamentals",
    issuer: "DataCamp",
    issued: "Jul 2026",
    category: "Software Delivery",
  },
  {
    id: "apache-kafka",
    title: "Introduction to Apache Kafka",
    issuer: "DataCamp",
    issued: "Jun 2026",
    category: "Data Engineering",
  },
  {
    id: "deep-learning-images-pytorch",
    title: "Deep Learning for Images with PyTorch",
    issuer: "DataCamp",
    issued: "Feb 2026",
    category: "AI & ML",
  },
  {
    id: "transformer-models-pytorch",
    title: "Transformer Models with PyTorch",
    issuer: "DataCamp",
    issued: "Feb 2026",
    category: "AI & ML",
  },
  {
    id: "introduction-docker",
    title: "Introduction to Docker",
    issuer: "DataCamp",
    issued: "Jan 2026",
    category: "Software Delivery",
  },
  {
    id: "cloud-computing",
    title: "Understanding Cloud Computing",
    issuer: "DataCamp",
    issued: "Dec 2025",
    category: "Software Delivery",
  },
  {
    id: "preprocessing-ml-python",
    title: "Preprocessing for Machine Learning in Python",
    issuer: "DataCamp",
    issued: "Nov 2025",
    category: "AI & ML",
  },
  {
    id: "introduction-git",
    title: "Introduction to Git",
    issuer: "DataCamp",
    issued: "Nov 2025",
    category: "Software Delivery",
  },
  {
    id: "llm-concepts",
    title: "Large Language Models (LLMs) Concepts",
    issuer: "DataCamp",
    issued: "Aug 2025",
    category: "AI & ML",
  },
  {
    id: "introduction-ai-agents",
    title: "Introduction to AI Agents",
    issuer: "DataCamp",
    issued: "Jul 2025",
    category: "AI & ML",
  },
  {
    id: "nvidia-deep-learning",
    title: "Fundamentals of Deep Learning",
    issuer: "NVIDIA",
    issued: "Feb 2025",
    category: "AI & ML",
  },
  {
    id: "supervised-machine-learning",
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI & Stanford University / Coursera",
    issued: "Jan 2025",
    category: "AI & ML",
  },
  {
    id: "esyp-participation",
    title: "ESYP Internal Competition",
    issuer: "IEEE ENSI IAS Chapter",
    issued: "Nov 2024",
    category: "Participation",
  },
  {
    id: "ieeextreme-18-participation",
    title: "IEEEXtreme 18.0 Programming Competition",
    issuer: "IEEE",
    issued: "Oct 2024",
    category: "Participation",
  },
];

export const certificationsVisible = true;
