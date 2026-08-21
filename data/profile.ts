export const profile = {
  name: "Mourad Kraiem",
  role: "Computer Science Engineering Student",
  specialization: "Artificial Intelligence & Machine Learning",
  summary:
    "Final-year Computer Science Engineering student at ENSI working across artificial intelligence, machine learning, computer vision, distributed AI, and full-stack systems.",
  location: "Tunisia",
  availability: "Seeking an end-of-study internship starting February 2027",
  links: {
    email: "mailto:mourad.kraiem@ensi-uma.tn",
    linkedin: "https://linkedin.com/in/mourad-kraiem-99a0952a1",
    github: "https://github.com/Soni-KR",
  },
} as const;

export const socials = [
  { id: "email", label: "Email", href: profile.links.email },
  { id: "github", label: "GitHub", href: profile.links.github },
  { id: "linkedin", label: "LinkedIn", href: profile.links.linkedin },
] as const;
