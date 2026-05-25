export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  videoUrl?: string;
  features: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'education';
  role: string;
  company: string;
  location: string;
  period: string;
  details: string[];
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const statsData: Stat[] = [
  { id: '1', value: 5, suffix: '+', label: 'Years Coding' },
  { id: '2', value: 15, suffix: '+', label: 'AI Models Deployed' },
  { id: '3', value: 40, suffix: '+', label: 'Full Stack Systems' },
  { id: '4', value: 8, suffix: '', label: 'Hackathons Won' },
];

export const skillsData: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: "Brain",
    skills: [
      { name: "PyTorch & TensorFlow", level: 92 },
      { name: "Computer Vision (YOLO, OpenCV)", level: 90 },
      { name: "NLP & LLM Fine-tuning", level: 88 },
      { name: "Diffusers & GANs", level: 82 },
      { name: "Model Quantization & TensorRT", level: 80 }
    ]
  },
  {
    title: "Frontend Engineering",
    icon: "Layout",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 94 },
      { name: "Tailwind CSS", level: 96 },
      { name: "Three.js / React Three Fiber", level: 85 },
      { name: "GSAP & Framer Motion", level: 90 }
    ]
  },
  {
    title: "Backend & Systems",
    icon: "Database",
    skills: [
      { name: "Node.js & Express", level: 90 },
      { name: "Python / FastAPI", level: 92 },
      { name: "PostgreSQL & MongoDB", level: 88 },
      { name: "GraphQL", level: 84 },
      { name: "Redis & RabbitMQ", level: 80 }
    ]
  },
  {
    title: "Robotics & IoT",
    icon: "Cpu",
    skills: [
      { name: "ROS2 (Robot Operating System)", level: 85 },
      { name: "Arduino & Raspberry Pi", level: 90 },
      { name: "SLAM & Navigation Stack", level: 80 },
      { name: "Firmware Development (C++)", level: 82 }
    ]
  },
  {
    title: "Tools & DevOps",
    icon: "Wrench",
    skills: [
      { name: "Docker & Kubernetes", level: 86 },
      { name: "AWS (S3, EC2, SageMaker)", level: 85 },
      { name: "Git & CI/CD Pipelines", level: 92 },
      { name: "Linux Administration", level: 88 }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "medisight",
    title: "MediSight AI",
    description: "Deep learning assistant for radiology scanning and clinical decision support.",
    longDescription: "MediSight AI is a cloud-based deep learning platform tailored for clinical environments. Utilizing custom fine-tuned vision-transformer models, it highlights lesions, calculates anatomical indices, and flags anomalies from Chest X-Rays, Brain CTs, and MRI scans in under 3 seconds, reducing diagnostic review latency by 40%.",
    category: "Medical AI Systems",
    tech: ["React", "FastAPI", "PyTorch", "Tailwind CSS", "Docker", "AWS"],
    github: "https://github.com/rakesh-yadav/medisight-ai",
    demo: "https://medisight-ai.demo",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
    features: [
      "Real-time vision transformer scans processing.",
      "Interactive bounding-box highlighting for radiological anomalies.",
      "HIPAA-compliant, encrypted, web-sockets-driven clinical dashboard.",
      "High-accuracy reporting generation module utilizing customized LLMs."
    ],
    metrics: [
      { label: "Accuracy", value: "98.4%" },
      { label: "Latency", value: "2.1s" },
      { label: "HIPAA Compliant", value: "100%" }
    ]
  },
  {
    id: "solar-tracker",
    title: "Robo-Solar Adapt",
    description: "Autonomous dual-axis solar tracker utilizing real-time AI weather tracking.",
    longDescription: "An end-to-end cyber-physical robotics project. It features active astronomical tracking combined with a lightweight computer vision model that determines sky clarity. In cloudy weather, the system rotates solar panels toward indirect diffused light pockets, optimizing energy yield by 37% over traditional static mounts.",
    category: "Robotics & Innovation",
    tech: ["ROS2", "Python", "Raspberry Pi", "Arduino", "Tailwind", "Three.js"],
    github: "https://github.com/rakesh-yadav/robo-solar-adapt",
    demo: "https://robo-solar.demo",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop",
    features: [
      "Dynamic weather adjustment algorithms using sensor fusion.",
      "Custom micro-controller PID control loop for azimuth and altitude angles.",
      "Three.js real-time status visualizer dashboard on React.",
      "Predictive analytics tracking battery status, energy generation, and consumption."
    ],
    metrics: [
      { label: "Energy Boost", value: "+37.2%" },
      { label: "Motor Accuracy", value: "0.05°" },
      { label: "Sensor Fusion Sync", value: "10ms" }
    ]
  },
  {
    id: "ai-vision-slam",
    title: "Vision SLAM Robotics",
    description: "Visual Simultaneous Localization and Mapping for micro-ground robotics.",
    longDescription: "A visual spatial tracking system designed for GPS-denied environments. Leveraging dual RGB-D cameras and an edge computing board, the autonomous robot creates high-fidelity 3D spatial voxel grids, localizing itself within complex spaces with sub-centimeter drift error.",
    category: "AI Projects",
    tech: ["ROS2", "OpenCV", "C++", "Python", "PyTorch", "FastAPI"],
    github: "https://github.com/rakesh-yadav/vision-slam-bot",
    demo: "https://slam-robot.demo",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop",
    features: [
      "Sparse loop-closure mapping using modern ORB-SLAM3 models.",
      "Dynamic obstacle avoidance via localized depth estimation.",
      "Point-cloud compression algorithms for live web dashboard streaming.",
      "WebSockets telemetry transmitting position coordinates, hardware temperature, and video feeds."
    ],
    metrics: [
      { label: "Position Drift", value: "< 0.8cm" },
      { label: "Processing Speed", value: "45 FPS" },
      { label: "Voxel Grid Res", value: "5cm" }
    ]
  },
  {
    id: "task-orchestrator",
    title: "Nexus Orchestrator",
    description: "Distributed task scheduling engine with premium UI controls.",
    longDescription: "Nexus is a high-throughput, fault-tolerant worker pool that schedules, triggers, and runs complex distributed pipelines. The system is designed for massive scale and comes packaged with a highly detailed, futuristic management portal featuring reactive metrics charts, real-time node cluster mapping, and visual pipeline designers.",
    category: "Full Stack Development",
    tech: ["Next.js", "Go", "Redis", "Docker", "Tailwind CSS", "Chart.js"],
    github: "https://github.com/rakesh-yadav/nexus-orchestrator",
    demo: "https://nexus-orchestrate.demo",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    features: [
      "Visual pipeline builder with drag-and-drop React Flow integrations.",
      "High performance queue handling up to 15,000 tasks/second via Redis clusters.",
      "Automatic failover and dynamic scaling of worker processes using Docker APIs.",
      "Secure API key management, rate limiting, and detail log ingestion stream."
    ],
    metrics: [
      { label: "Task Capacity", value: "15k/sec" },
      { label: "Worker Latency", value: "< 2ms" },
      { label: "Up-time Guarantee", value: "99.99%" }
    ]
  }
];

export const timelineData: TimelineItem[] = [
  {
    id: "t1",
    type: "experience",
    role: "Senior AI & Full-Stack Engineer",
    company: "Neural Therapeutics",
    location: "Bengaluru, IN",
    period: "2024 - Present",
    details: [
      "Pioneered vision transformer systems for diagnostic radiological anomaly classification.",
      "Designed and integrated micro-services handling medical data pipelines, boosting processing performance by 35%.",
      "Created highly responsive dashboard systems utilizing React, Tailwind, and custom WebSockets."
    ],
    tags: ["PyTorch", "FastAPI", "React", "Docker", "Medical AI"]
  },
  {
    id: "t2",
    type: "experience",
    role: "Robotics Software Developer",
    company: "SunDrive Innovations",
    location: "Mumbai, IN",
    period: "2022 - 2024",
    details: [
      "Wrote PID motor algorithms and astronomical tracking layers for dual-axis hardware.",
      "Developed edge computer vision models running on embedded processors for real-time sky condition parsing.",
      "Established robust sensor fusion sync arrays across LIDAR, IMU, and light sensors using ROS2."
    ],
    tags: ["ROS2", "C++", "Python", "Raspberry Pi", "Sensor Fusion"]
  },
  {
    id: "t3",
    type: "experience",
    role: "Full Stack Web Developer",
    company: "Vertex Tech Studio",
    location: "New Delhi, IN",
    period: "2021 - 2022",
    details: [
      "Engineered real-time collaboration canvas applications using React, Node.js, and WebSockets.",
      "Optimized query structures and indexing in MongoDB databases, saving 25% computational resources.",
      "Developed modular custom component kits, streamlining engineering timelines by 30%."
    ],
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS", "WebSockets"]
  },
  {
    id: "t4",
    type: "education",
    role: "Master of Technology (M.Tech) in AI & Robotics",
    company: "Indian Institute of Information Technology",
    location: "IN",
    period: "2019 - 2021",
    details: [
      "Focused on autonomous navigation algorithms, visual SLAM networks, and reinforcement learning.",
      "Graduated with High Honors. Thesis: 'Autonomous Pathfinding in dynamic indoor spaces using ROS2'."
    ],
    tags: ["SLAM", "ROS2", "Computer Vision", "Deep Learning", "Thesis"]
  },
  {
    id: "t5",
    type: "education",
    role: "Bachelor of Technology (B.Tech) in Computer Science",
    company: "State Technical University",
    location: "IN",
    period: "2015 - 2019",
    details: [
      "Core modules in Data Structures & Algorithms, Database Systems, Computer Networks, and Calculus.",
      "Won the National Robotics Hackathon and served as President of the Computer Science Society."
    ],
    tags: ["Data Structures", "Algorithms", "Mathematics", "C++", "Robotics Hackathon"]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Ananya Sharma",
    role: "Radiology Director",
    company: "Metro Care Diagnostics",
    text: "MediSight AI has completely reformed our triage process. The speed and high accuracy of Rakesh's models flag emergencies in minutes rather than hours. Highly valuable engineering.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Vikram Malhotra",
    role: "VP of Engineering",
    company: "SunDrive Innovations",
    text: "Rakesh possesses a rare blend of hardware robotics and full-stack software knowledge. He took our solar project from a prototype sensor board to a highly optimized autonomous system.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Samantha Wright",
    role: "Senior Tech Recruiter",
    company: "Horizon AI Studios",
    text: "The custom user experiences Rakesh builds are exceptional. He does not just write code; he constructs smooth digital stories. The visual aesthetic of his platforms is outstanding.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  }
];

export const certificationsData = [
  "AWS Certified Machine Learning - Specialty",
  "NVIDIA Deep Learning Institute - Computer Vision Practitioner",
  "ROS2 Industrial Development Certification",
  "Professional Scrum Master (PSM I)"
];
