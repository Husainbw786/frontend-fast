import { JobDescription } from '../types';

export const jobDescriptions: JobDescription[] = [
  {
    id: '1',
    title: 'AI Engineer',
    company: 'NHS Digital',
    location: 'London, UK',
    salary: '£80,000 - £120,000',
    type: 'Full time',
    level: 'Senior',
    visaStatus: 'Visa Sponsorship',
    description: "Architect & Deploy AI Models: Lead the end-to-end development of LLM- and RAG-based systems to ingest NHS data sources, generate accurate responses, and power both chatbot and voice agent interactions.\nPrompt & Voice Agent Engineering: Craft, iterate and optimise prompts—and design voice-agent dialogue flows—to maximise response relevance, reduce latency and ensure clinical safety across text and voice channels.\nCross-Functional Collaboration: Partner with frontend (Next.js, React) and backend (NestJS, Python) teams to integrate AI and voice agent components into our Azure-hosted microservices architecture.\nPerformance Monitoring & Optimisation: Instrument AI and voice-agent pipelines, analyze logs and user feedback, troubleshoot edge cases, and implement continuous-learning improvements.\nInnovation & R&D: Stay abreast of the latest advances in LLMs, RAG, conversational AI frameworks, and NHS-specific compliance (GDPR, DTAC) to inform our technical roadmap.\nTesting & Validation: Define and execute rigorous test plans in collaboration with QA to validate model accuracy, voice-agent performance and compliance with healthcare standards.\nTechnical Leadership: Mentor junior engineers, advocate for best practices in MLOps, prompt engineering, voice-agent design, and model governance, and contribute to architecture reviews."
  },
  {
    id: '2',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc',
    location: 'San Francisco, CA',
    salary: '$150,000 - $200,000',
    type: 'Full time',
    level: 'Senior',
    visaStatus: 'H1B',
    description: "Design and develop scalable web applications using React, Node.js, and Python. Lead architectural decisions for microservices infrastructure on AWS. Collaborate with product teams to deliver high-quality features. Implement CI/CD pipelines and DevOps best practices. Mentor junior developers and conduct code reviews. Work with PostgreSQL, MongoDB, and Redis for data management. Ensure application security and performance optimization."
  },
  {
    id: '3',
    title: 'Python Developer',
    company: 'Data Solutions Corp',
    location: 'New York, NY',
    salary: '$120,000 - $160,000',
    type: 'Full time',
    level: 'Mid-Senior',
    visaStatus: 'H1B',
    description: "Develop and maintain Python applications using Django and Flask frameworks. Build RESTful APIs for data processing and analytics. Work with large datasets using Pandas, NumPy, and PySpark. Implement ETL pipelines and data transformations. Collaborate with data science teams to deploy machine learning models. Write clean, testable code following best practices. Experience with SQL databases and cloud platforms (AWS/Azure) required."
  },
  {
    id: '4',
    title: 'React Native Developer',
    company: 'Mobile First Solutions',
    location: 'Austin, TX',
    salary: '$110,000 - $150,000',
    type: 'Full time',
    level: 'Mid-level',
    visaStatus: 'H1B',
    description: "Build cross-platform mobile applications using React Native. Implement responsive UI components and smooth animations. Integrate with REST APIs and GraphQL endpoints. Handle state management using Redux or Context API. Work closely with designers to implement pixel-perfect interfaces. Optimize app performance and handle offline functionality. Debug and fix issues across iOS and Android platforms. Experience with native modules and third-party integrations."
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Cloud Infrastructure LLC',
    location: 'Seattle, WA',
    salary: '$130,000 - $170,000',
    type: 'Full time',
    level: 'Senior',
    visaStatus: 'Visa Sponsorship',
    description: "Design and maintain CI/CD pipelines using Jenkins, GitHub Actions, and GitLab. Manage infrastructure as code using Terraform and CloudFormation. Deploy and orchestrate containers using Docker and Kubernetes. Monitor system performance and implement logging solutions. Automate deployment processes and improve system reliability. Work with AWS, Azure, or GCP cloud platforms. Implement security best practices and compliance requirements. Collaborate with development teams to optimize application deployment."
  },
  {
    id: '6',
    title: 'Data Engineer',
    company: 'Analytics Pro',
    location: 'Chicago, IL',
    salary: '$125,000 - $165,000',
    type: 'Full time',
    level: 'Mid-Senior',
    visaStatus: 'H1B',
    description: "Design and build data pipelines for large-scale data processing. Work with big data technologies like Apache Spark, Kafka, and Airflow. Develop ETL processes for data warehousing solutions. Optimize database performance and query efficiency. Implement data quality checks and monitoring. Work with both SQL and NoSQL databases. Collaborate with data scientists and analysts. Experience with AWS data services (Redshift, Glue, EMR) or equivalent cloud platforms."
  },
  {
    id: '7',
    title: 'Software Engineer',
    company: 'Revolut',
    location: 'New York, NY',
    salary: '$110,000 - $135,000',
    type: 'Full time',
    level: 'Mid-Senior',
    visaStatus: 'H1B',
    description: "Develop scalable backend services using Java, Python, or Node.js. Design and implement RESTful APIs and microservices architecture. Write clean, maintainable code with comprehensive test coverage. Participate in code reviews and technical discussions. Work in an Agile environment with cross-functional teams. Optimize application performance and database queries. Deploy applications using modern DevOps practices. Troubleshoot production issues and implement monitoring solutions."
  }
];
