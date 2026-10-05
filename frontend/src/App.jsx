import { useEffect, useRef, useState } from 'react'
import './App.css'

const SITE_URL = 'https://chaksingho.com'
const PRIMARY_NAME = 'Chak Sing Ho'
const ALT_NAME = 'Ho Chak Sing'
const ALT_NAME_EN = 'Hans Ho'
const BRAND_NAME = `${PRIMARY_NAME} | ${ALT_NAME_EN} | ${ALT_NAME} | Hans`
const BASE_TITLE = `${BRAND_NAME} | Agentic AI, AI infrastructure, and distributed systems engineer`
const BASE_DESCRIPTION = `${PRIMARY_NAME} (also known as ${ALT_NAME_EN}, ${ALT_NAME}, or Hans) builds agentic AI systems and the infrastructure under them: agent evaluation at scale, LLM and RAG platforms, deep learning in PyTorch, and concurrent, distributed backends.`
const OG_IMAGE = `${SITE_URL}/og.jpg`
const sectionMeta = {
  top: {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION
  },
  experience: {
    title: `Experience | ${BRAND_NAME}`,
    description: 'Internships with measurable impact: agent-evaluation infrastructure at TikTok, LLM and RAG platforms at HKT, and full-stack products in fintech.'
  },
  projects: {
    title: `Projects | ${BRAND_NAME}`,
    description: 'Selected projects in distributed systems and concurrency, deep learning with PyTorch, OS internals, and graphics.'
  },
  profile: {
    title: `Skills & Education | ${BRAND_NAME}`,
    description: 'Skills across agentic AI, machine learning, and distributed backend infrastructure, plus education at Northeastern and HKUST.'
  }
}

const sectionIds = ['experience', 'projects', 'profile']
const sectionLabels = {
  experience: 'Experience',
  projects: 'Projects',
  profile: 'Skills & Education'
}

const projects = [
  {
    title: 'Multi-Threaded C++ RPC Server',
    context: 'Distributed systems · Concurrency · CS 6650',
    description:
      'Client-server RPC system over TCP in C++ with hand-written marshalling, a thread per connection, and a shared worker pool coordinated by mutexes, condition variables, and promise/future hand-off.',
    impact: 'Sustained 68K requests/s across two 4-core machines, clean under ThreadSanitizer and AddressSanitizer, with latency scaling checked against Little\'s Law over 36 benchmark runs.',
    highlight: 'Fixed a throughput collapse of up to 170x at 256 concurrent clients by tracing it to TCP listen-backlog overflow (backlog 8 -> 1024).',
    tags: ['C++', 'Multithreading', 'Mutex / Condition Variables', 'RPC', 'TCP Sockets', 'Benchmarking'],
    metrics: ['68K req/s across 2 machines', 'Up to 170x collapse fixed', 'TSan / ASan clean'],
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'Label-Efficient Skin Cancer Classification',
    context: 'Deep learning · Computer vision · Team of 2 (HKUST)',
    description:
      'Melanoma detection with few labeled images: a ResNet-50 in PyTorch, pretrained on unlabeled dermoscopy images and compared against a supervised baseline.',
    impact: 'Team result: SimCLR self-supervised contrastive pretraining raised test AUC from 73.1 to 83.1.',
    highlight: 'I built the FixMatch semi-supervised pipeline: weak/strong data augmentation loaders, confidence-thresholded pseudo-labels (tau = 0.95) on 4,500 unlabeled images, an SGD training loop, and epoch sweeps. It did not beat the baseline on this data, and the write-up analyzes why.',
    tags: ['PyTorch', 'NumPy', 'ResNet-50', 'Self-Supervised Learning', 'Contrastive Learning (SimCLR)', 'Semi-Supervised Learning (FixMatch)', 'Pseudo-Labeling', 'Data Augmentation', 'Transfer Learning', 'Computer Vision'],
    metrics: ['AUC 73.1 -> 83.1 (team, SimCLR)', 'My part: FixMatch pipeline', '4,500 unlabeled images'],
    repo: 'https://drive.google.com/file/d/1pfVlWrskko6F7k7LXyLrlDSPqPVgoT6d/view?usp=sharing',
    linkLabel: 'Project report',
    group: 'featured'
  },
  {
    title: 'EGOS-2000 Network Stack',
    context: 'OS internals · Networking · CS 6640',
    description:
      'Implemented the Ethernet/UDP transmit path of a teaching OS against an emulated Intel E1000 NIC: DMA descriptor rings, device ownership hand-off, and interrupt-driven completion.',
    tags: ['C', 'OS Kernel', 'DMA', 'Interrupts', 'Network Stack'],
    metrics: ['Emulated Intel E1000', 'Ethernet/UDP transmit path'],
    demoUrl: 'https://www.youtube.com/watch?v=SMzsY9ywQT0&t=1s',
    demoLabel: 'Demo video',
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'C++ Work-Stealing Thread Pool',
    context: 'Concurrency · C++20',
    description:
      'Fixed-size thread pool with work-stealing queues, futures, graceful shutdown, and atomic telemetry, benchmarked for throughput and tail latency against std::async.',
    tags: ['C++20', 'Multithreading', 'Atomics', 'Schedulers'],
    metrics: ['Baseline: std::async', 'Throughput + tail latency'],
    repo: 'https://github.com/hans2001/cpp-thread-pool',
    linkLabel: 'GitHub',
    group: 'featured'
  },
  {
    title: 'Mini Effect Engine',
    context: 'Graphics · OpenGL',
    description:
      'C++ OpenGL 3.3 core-profile effect engine: render loop with GLFW/GLAD, shader compilation and linking, GPU buffers (VAO/VBO/EBO), texture upload and sampling, and fullscreen-quad rendering.',
    tags: ['C++', 'OpenGL', 'GLFW', 'Shaders'],
    metrics: ['OpenGL 3.3 core profile', 'Shaders + textures + render loop'],
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'Power-Gated 8kb SRAM (TSMC 180nm)',
    context: 'Circuit design · HKUST final-year project',
    description:
      'Low-power 8kb SRAM with power gating, designed and simulated in Cadence Virtuoso, cutting leakage power by 85% while retaining data.',
    tags: ['Cadence Virtuoso', 'Power Gating', 'SRAM', 'TSMC 180nm'],
    metrics: ['Leakage power: -85%', 'TSMC 180nm'],
    repo: 'https://drive.google.com/file/d/1UUswsKy2AfpEP6Ja7mSuGMwmd4cjCP03/view?usp=sharing',
    linkLabel: 'Project report',
    schemaType: 'Project',
    group: 'academic'
  },
  {
    title: 'Airbnb Listings ETL Pipeline',
    context: 'Data engineering · PySpark',
    description:
      'PySpark ETL over 6-8 GB of Inside Airbnb listings from 85 regions into analytics-ready Parquet, used to compare pricing, amenities, and demand.',
    tags: ['PySpark', 'Spark SQL', 'ETL', 'Parquet'],
    metrics: ['6-8 GB', '85 regions'],
    repo: 'https://drive.google.com/file/d/1afxda583McI0Wp_UDlM5nYFmIQSaUDbV/view?usp=sharing',
    linkLabel: 'Project report',
    group: 'academic'
  },
  {
    title: 'Multi-Calendar Scheduler',
    context: 'Java · MVC',
    description:
      'Multi-calendar app with per-calendar time zones, range-based event copy, and iCal/CSV export, with CLI and Swing GUI front ends over one MVC model.',
    tags: ['Java', 'MVC', 'Swing'],
    metrics: ['CLI + Swing GUI', 'iCal + CSV export'],
    repo: 'https://github.com/hans2001/CS5010--MultiCalendarApp',
    linkLabel: 'GitHub',
    group: 'academic'
  }
]

const featuredProjects = projects.filter((project) => project.group !== 'academic')
const academicProjects = projects.filter((project) => project.group === 'academic')

// Note: experiences and education are defined later in the file but moved here for schemaData reference
const experiences = [
  {
    role: 'Software Engineering Intern, Intelligent Creation (Effect House)',
    org: 'TikTok',
    orgUrl: 'https://effecthouse.tiktok.com/',
    location: 'San Jose, CA',
    dates: 'May 11, 2026 - Sep 8, 2026',
    employmentType: 'Full-time',
    featured: true,
    bullets: [
      'Architected the control plane of an overnight agent-evaluation flywheel in which coding agents fix real production bugs: SQLite-transaction + TTL-lease task ownership with fencing, non-blocking flock admission, git-worktree isolation, and a supervisor state machine, running 32 nightly shards across 12 lanes with crash-safe recovery and no duplicate execution.',
      'Showed that agent-written tests overstated the pass rate about 2.4x (65.6% vs 27.5% on the original developer tests, n=854, reproduced twice), and led an adversarial audit of the grading chain that rebuilt verdicts around fail-to-pass oracles, closed-book agents, and a single verdict writer.',
      'Built a Runtime Verifier that judges a fix by driving the real editor on pre-fix and post-fix builds and returns PASS only on a fail-to-pass flip, using a TypeScript job state machine (RECEIVED -> PREFLIGHT -> RUNNING -> CLEANING_UP -> REPORTING) over a Python verdict kernel, schema-enforced reason codes for every non-PASS, and a crash-safe file queue serialized by non-blocking flocks.',
      'Wired the verifier into Lark through a bot and a zero-dependency MCP server: a developer @-mentions the bot, an agent submits the job, and verdict cards post back (12.1 s end to end on the fastest tier); added a human-gated reproduce -> approve -> external-agent fix -> judge loop that returns only a one-bit retry signal and voids any PASS from an agent session that saw the held-out test.',
      'Built an MCP performance agent (31 governed tools) that measures AR effects against fail-closed, same-workload baselines, attributes cost through JS profiling, frame telemetry, and hierarchical ablation, and writes fixes back transactionally (expected hash, journal, atomic replace, automatic restore).',
      'Flywheel · Made recovery safe with a composite identity — task id, run id, controller generation, lane id, owner token, pinned revision, worktree — compared together, so a worker resurrected from an older generation cannot write into state it no longer owns. Shared JSON is published by temp file, fsync, and atomic replace, and corrupt ledgers fail closed rather than reading as empty and silently re-running work that already landed.',
      'Flywheel · Designed the lock taxonomy (supervisor singleton flock, lease lock, eval admission slot, reentrant ledger lock, telemetry append/rotate lock, single distill-compiler lock) under one rule: a lock must span the entire read-decide-write, because locking only the final write still loses updates. Parallel lanes avoid contending on shared knowledge files altogether by writing content-addressed fragments that one compiler folds together.',
      'Flywheel · Ran the supervisor as a pure state machine over collected facts — hold, restart, repair, stop — behind a restart circuit breaker, with a hard line between a broken road that self-heals (worktree gone, process dead) and a pulled stop gate that must never auto-clear.',
      'Flywheel · Ran it as a multi-agent system where roles are separated by context, not just by name: a blind fixer agent that cannot see the grader, a reviewer fed only a summary of the previous attempt, a scheduler choosing the next task, and producers minting tasks and reaping dead worktrees. ~18 worker loops over roughly 6 concurrent model slots, 32 nightly shards across 12 lanes.',
      'Flywheel · The hardest problem was diagnostic rather than functional: twelve distinct failures — a runaway process escaping its cgroup, a service booting from a tree with no modules, timeouts reporting success as failure, one lane killing another lane\'s editor through a default port fallback — all surfaced as the same symptom, "the editor is flaky." Introduced a shared failure-layer vocabulary so every refusal names its own layer and no layer may report another layer\'s failure as its own.',
    ],
    stack: ['TypeScript', 'Python', 'SQLite', 'MCP', 'Lark bot', 'git worktrees', 'flock + TTL leases', 'Multi-agent orchestration', 'GPU + JS profiling'],
    metrics: ['32 nightly shards / 12 lanes', 'Agent-written tests overstate pass rate ~2.4x', 'Fail-to-pass verdicts', 'Tier-0 verdict: 12.1 s end to end', 'Perf MCP: 31 governed tools']
  },
  {
    role: 'Software Engineer Intern (Innovation Lab)',
    org: 'Hong Kong Telecom (HKT)',
    orgUrl: 'https://www.hkt.com/?locale=en',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    employmentType: 'Full-time',
    bullets: [
      'Built a multi-modal chat assistant platform using Node.js, React, and Ollama, deploying Azure OpenAI, Gemini, and on-premises Llama 3 models to give 20+ internal teams secure enterprise-wide LLM access.',
      'Engineered modular agentic workflows with document retrieval, model routing, tool calling, and context management, improving compliance Q&A and summarization accuracy by 35%.',
      'Built a production RAG service with FastAPI, pgvector, asyncpg, and a bounded ThreadPoolExecutor, supporting file-scoped embeddings and multi-query retrieval; cut semantic lookup latency by 3x.',
      'Extended the platform with LangChain to integrate a proprietary compliance-trained LLM via the Azure API.',
      'Automated CI/CD pipelines using Docker Compose and GitHub Actions, reducing environment setup time by 80% and enabling consistent multi-environment deployment with VPN-based secure networking and configuration isolation.',
      'Implemented a Python automation pipeline for wireless on-site cell diagram generation, integrating Excel data extraction (Pandas), Mermaid Markdown scripting, and diagram creation, reducing generation time by 90%.',
      'Revamped the Tap&Go mobile wallet reward feature using Flutter, building a real-time merchant search with dynamic keyword filtering (brand/category/region).'
    ],
    stack: ['Python', 'FastAPI', 'pgvector', 'asyncpg', 'LangChain', 'Node.js', 'React.js', 'Ollama', 'Azure OpenAI', 'Docker Compose', 'GitHub Actions', 'Flutter'],
    metrics: ['Adoption scope: 20+ teams', 'Q&A accuracy: +35%', 'Semantic lookup latency: 3x faster', 'Environment setup: -80%', 'Diagram generation time: -90%']
  },
  {
    role: 'Software Developer Intern, Computational Chemistry Lab (Supervisor: Prof. Haibin Su)',
    org: 'Hong Kong University of Science and Technology',
    orgUrl: 'https://hkust.edu.hk',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    employmentType: 'Part-time',
    bullets: [
      'Architected a browser-native WebXR/3D educational platform with Babylon.js and Ammo.js, implementing real-time rendering, scene graphs, physics simulation, mesh/material manipulation, spatial interaction, and Meta Quest 3 controls; the platform secured HKD 250k in funding from the HKUST Center for Education Innovation.',
      'Built a Blender/GLB asset and interaction pipeline for hierarchical chemical models, integrating RAG/tool-calling agents, voice input, and SSE streaming to inspect, label, and manipulate 3D scene objects through multimodal interactions.',
      'Embedded interactive multimedia elements including video/audio playback, dynamic blackboards, and clickable shelves using TypeScript.',
      'Optimized WebXR controls for Meta Quest 3, implementing drag-and-drop interactions, avatar movement, object scaling, mesh highlighting, and position reset functionalities.',
      'Engineered a multi-modal chat interface supporting text input, voice recording, and audio-to-text conversion via the OpenAI Whisper API; streamed dynamic AI responses with markdown rendering, token tracking, and retry logic via server-sent events (SSE).',
      'Developed and deployed a collaborative avatar networking system using Colyseus on Fly.io, enabling real-time interactions supporting 100+ concurrent users.'
    ],
    stack: ['Next.js', 'TypeScript', 'Babylon.js', 'Ammo.js', 'WebXR', 'Blender', 'Colyseus', 'Fly.io', 'OpenAI Whisper'],
    metrics: ['Funding secured: HKD 250k', 'Concurrent users: 100+', 'Delivery: immersive WebXR classroom']
  },
  {
    role: 'Information Technology Intern',
    org: 'China International Capital Corporation (CICC)',
    orgUrl: 'https://cicc.zhiye.com/custom/index',
    location: 'Hong Kong',
    dates: 'Oct 2023 - Jan 2024',
    employmentType: 'Part-time',
    bullets: [
      'Engineered an end-to-end Bloomberg billing-data ETL pipeline and dashboard with Node.js/Vue.js and Oracle, building ingestion/ETL, schemas, indexes, and procedures, with monitoring dashboards that process 100K+ invoices and detect 15+ anomalous expenditure patterns across 7 departments.',
      'Built a Derivatives Valuation Platform with schema-driven forms, reusable generic components, RBAC, paginated data flows, and rate-limited API execution, transforming multi-instrument trader inputs into quant pricing requests and typed outputs.',
      'Designed reusable UI components using TypeScript generics with conditional types, indexed access types, and mapped types.',
      'Engineered generic parsing functions with type guards and type assertions to eliminate runtime validation errors.',
      'Implemented a generic Excel export feature with dynamic schemas, leveraging concurrent promise calls and rate limiting to bulk-export 10k+ paginated rows per request without API overload.'
    ],
    stack: ['Node.js', 'Vue.js', 'React.js', 'TypeScript', 'Knex.js', 'Oracle Database', 'REST'],
    metrics: ['Anomalies flagged: 15+', 'Departments supported: 7', 'Invoice rows: 100k+', 'Bulk export: 10k+ rows']
  },
  {
    role: 'Software Engineer Intern',
    org: 'Midas Analytics Limited (FinTech)',
    orgUrl: 'https://midasanalytics.ai',
    location: 'Hong Kong',
    dates: 'Jun 2022 - Oct 2023',
    employmentType: 'Full-time',
    bullets: [
      'Architected and built the full-stack foundation of a Financial-Intelligence SaaS serving 50+ DAU, defining its frontend, GraphQL API contracts, data-access architecture, and cloud deployment while shipping 25+ customer-facing features; the platform secured HKD 1M in funding from Hong Kong Science & Technology Parks (HKSTP).',
      'Engineered the Pothos + MongoDB data layer for 5M+ records and 1M+ daily requests, optimizing aggregation pipelines/indexes, connection pooling, batching, rate limiting, and mutation-aware caching to cut server load by 40% and deliver 2x faster queries.',
      'Built low-latency data visualization with virtualization, incremental pagination, and Graphistry, supporting 5K+ results per session with bounded DOM/memory usage and interactive entity-relationship search, filtering, and neighbor exploration.',
      'Redesigned the underlying protobuf schema to optimize data architecture in MongoDB, implementing indexing and aggregation pipelines to accelerate concurrent processing of 100k+ documents.',
      'Developed watchlist functionality leveraging Cloud Firestore to perform CRUD operations for tag-based tracking of companies and industries, integrated with Firebase Authentication for secure, scalable user management.',
      'Deployed the platform on AWS, hosting frontend and backend on separate Ubuntu EC2 instances across distinct UAT and production environments, sizing t3.medium instances from measured CPU/memory/storage usage, and serving static assets from S3 through a CloudFront CDN; automated CI/CD cut environment setup time by 90%.',
      'Ran Nginx as reverse proxy and load balancer (upstream blocks with round robin, IP restrictions, HTTPS), kept backend services alive under PM2, and managed GoDaddy subdomains and DNS for load-balanced production and isolated UAT with Certbot-automated SSL renewal.'
    ],
    stack: ['Node.js', 'React.js', 'GraphQL (Pothos + Yoga)', 'MongoDB', 'Protobuf', 'Firebase', 'AWS EC2/S3/CloudFront', 'Nginx', 'PM2'],
    metrics: ['Funding impact: HKD 1M', 'Users: 50+ DAU', 'Features shipped: 25+', 'Scale: 5M+ records / 1M+ daily requests', 'Query speed: 2x', 'Server load: -40%', 'Environment setup: -90%']
  },
  {
    role: 'Senior Software Engineer, Web Team Lead',
    org: 'USThing - HKUST',
    orgUrl: 'https://usthing.xyz',
    location: 'Hong Kong SAR',
    dates: 'Sep 2021 - Sep 2023',
    employmentType: 'Part-time',
    group: 'additional',
    bullets: [
      'Implemented features across the student app, including the Easter event, Cupid student matching, USTree, and a point collection and swapping system.',
      'Led a UI and website revamp to a new version, modernizing the front end across the platform.',
      'Hosted code reviews to keep quality and consistency high across the web team.',
      'Ran technical training sessions to onboard members and level up the team.',
      'Organized gathering and bonding sessions to keep members engaged across semesters.',
      'Coordinated Web, Design, and Marketing workflows to align releases and reduce blockers.'
    ],
    metrics: ['Coordination scope: 3 teams (Web/Design/Backend)', 'Leadership span: 2 years', 'Role: Web Team Lead']
  },
  {
    role: 'Software Engineer Intern',
    org: 'SOCIF Limited (Smart Travel Software)',
    orgUrl: 'https://www.socif.co/?lang=en',
    location: 'Hong Kong',
    dates: 'Dec 2021 - Jan 2022',
    employmentType: 'Full-time',
    bullets: [
      'Rolled out the React Native photo upload feature for EasyTransit on iOS/Android, with a TypeScript backend deployed on Azure Functions, increasing user-generated content by 20%.',
      'Engineered an image processing pipeline with client-side compression, multipart form-data parsing, and binary buffer conversion, and designed a cloud storage solution integrating Storj with the AWS S3 API, improving response times by 300ms and reducing storage requirements by ~40%.',
      'Structured a relational database schema with Sequelize ORM to manage image metadata.',
      'Built RESTful API endpoints for upload and retrieval operations, implementing URL signing for time-limited access to stored images.',
      'Developed a Windows-based RollCall application for MTR (Mass Transit Railway) using Electron and TypeScript, implementing functional programming with Lodash/FP methods to automate attendance tracking and report generation from SQL Server data.'
    ],
    stack: ['React Native', 'TypeScript', 'Azure Functions', 'Sequelize', 'Storj + AWS S3 API', 'Electron', 'SQL Server'],
    metrics: ['UGC improvement: ~20%', 'Response time: -300ms', 'Storage footprint: ~40% lower']
  }
]

const education = [
  {
    school: 'Northeastern University',
    url: 'https://www.northeastern.edu/',
    degree: 'M.S. Computer Science (Pursuing)',
    location: 'Boston, MA',
    dates: 'Sep 2025 - May 2027',
    gpa: '4.0 CGPA',
    coursework:
      'Deep Learning, Information Retrieval, Building Distributed Systems, OS Kernel Implementation, Agentic AI, Programming Language Principles, Programming Paradigm Design, Database Management Systems, Network Programming'
  },
  {
    school: 'Hong Kong Univ. of Sci. & Tech.',
    url: 'https://hkust.edu.hk/',
    degree: 'Bachelor of Engineering (B.Eng.) in Electronic Engineering, with a Minor in Computer Science',
    location: 'Hong Kong',
    dates: 'Sep 2020 - May 2024',
    honor: 'Second Class Honors, Division I',
    coursework:
      'Programming with C++, Data Structures, Operating Systems, Algorithms, Cloud Computing, Computer Organization, Computer Networks, Probability & Random Processes'
  }
]

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Person', 'Organization'],
      '@id': `${SITE_URL}/#person`,
      name: PRIMARY_NAME,
      alternateName: [ALT_NAME, 'Hans Ho', 'Hans'],
      givenName: 'Chak Sing',
      familyName: 'Ho',
      additionalName: 'Hans',
      disambiguatingDescription: 'Also known as Ho Chak Sing or Hans Ho.',
      url: SITE_URL,
      image: OG_IMAGE,
      jobTitle: 'Agentic AI, AI infrastructure, and distributed systems engineer',
      knowsAbout: [
        'Agentic AI systems',
        'LLM evaluation harnesses',
        'Retrieval Augmented Generation (RAG)',
        'Model Context Protocol (MCP)',
        'PyTorch',
        'NumPy',
        'Pandas',
        'Deep learning',
        'Distributed systems',
        'Full-stack engineering',
        'C++ systems'
      ],
      areaServed: ['Hong Kong', 'United States'],
      sameAs: [
        'https://github.com/hans2001',
        'https://linkedin.com/in/chaksingho/',
        'https://instagram.com/chaksingho'
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'inquiries',
          email: 'ho.chak@northeastern.edu',
          url: `${SITE_URL}/#contact`
        }
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Boston',
        addressRegion: 'MA',
        addressCountry: 'US'
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND_NAME,
      publisher: {
        '@id': `${SITE_URL}/#person`
      },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'ReadAction',
        target: SITE_URL
      }
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: BASE_TITLE,
      description: BASE_DESCRIPTION,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: OG_IMAGE
      },
      about: {
        '@id': `${SITE_URL}/#person`
      },
      inLanguage: 'en-US',
      breadcrumb: {
        '@id': `${SITE_URL}/#breadcrumb`
      }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL
        }
      ]
    },
    ...projects.map((project, index) => {
      const languages = project.tags.filter(tag => ['C++', 'C++20', 'Python', 'TypeScript', 'JavaScript'].includes(tag))
      const schemaType = project.schemaType || 'SoftwareApplication'
      const isSoftware = schemaType === 'SoftwareApplication'
      return {
        '@type': schemaType,
        '@id': `${SITE_URL}/#project-${index + 1}`,
        name: project.title,
        description: project.description,
        url: project.repo || undefined,
        ...(isSoftware
          ? {
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Cross-platform',
              programmingLanguage: languages
            }
          : {}),
        keywords: project.tags.join(', '),
        creator: {
          '@id': `${SITE_URL}/#person`
        }
      }
    }),
    ...experiences.map((exp, index) => ({
      '@type': 'OrganizationRole',
      '@id': `${SITE_URL}/#experience-${index + 1}`,
      roleName: exp.role,
      startDate: exp.dates.split(' - ')[0],
      endDate: exp.dates.includes('Present') ? undefined : exp.dates.split(' - ')[1],
      worksFor: {
        '@type': 'Organization',
        name: exp.org,
        url: exp.orgUrl || undefined,
        address: {
          '@type': 'PostalAddress',
          addressLocality: exp.location.split(',')[0]?.trim(),
          addressRegion: exp.location.split(',').length > 1 ? exp.location.split(',')[1]?.trim() : undefined,
          addressCountry: exp.location.includes('Hong Kong') ? 'HK' : exp.location.includes('CA') ? 'US' : undefined
        }
      },
      description: exp.bullets.join(' ')
    })),
    ...education.map((edu, index) => ({
      '@type': 'EducationalOccupationalCredential',
      '@id': `${SITE_URL}/#education-${index + 1}`,
      credentialCategory: 'degree',
      recognizedBy: {
        '@type': 'EducationalOrganization',
        name: edu.school,
        url: edu.url,
        address: {
          '@type': 'PostalAddress',
          addressLocality: edu.location.split(',')[0]?.trim(),
          addressRegion: edu.location.split(',').length > 1 ? edu.location.split(',')[1]?.trim() : undefined,
          addressCountry: edu.location.includes('Hong Kong') ? 'HK' : 'US'
        }
      },
      educationalLevel: edu.degree,
      about: {
        '@id': `${SITE_URL}/#person`
      },
      dateCreated: edu.dates.split(' - ')[0]
    }))
  ]
}

const setMetaTag = (attr, key, content) => {
  const selector = `meta[${attr}="${key}"]`
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const setLinkTag = (rel, href, attributes = {}) => {
  if (attributes.hreflang) {
    // For hreflang, we need unique links per hreflang value
    const selector = `link[rel="${rel}"][hreflang="${attributes.hreflang}"]`
    let link = document.head.querySelector(selector)
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', rel)
      link.setAttribute('hreflang', attributes.hreflang)
      document.head.appendChild(link)
    }
    link.setAttribute('href', href)
  } else {
    // For regular links, use the existing logic
    let link = document.head.querySelector(`link[rel="${rel}"]`)
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', rel)
      document.head.appendChild(link)
    }
    link.setAttribute('href', href)
  }
}

const setJsonLd = (data) => {
  let script = document.getElementById('seo-jsonld')
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'seo-jsonld'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

const rawSkillSets = {
  'Agentic & LLM Systems': {
    core: [
      {
        title: 'Agent Frameworks & Orchestration',
        items: ['LangChain', 'LangGraph', 'MCP (Model Context Protocol)', 'OpenAI Assistants API', 'Tool / function calling', 'Multi-agent orchestration']
      },
      {
        title: 'Retrieval & Context',
        items: ['RAG pipelines', 'Embeddings and vector search (pgvector)', 'BM25 / TF-IDF ranking', 'Inverted indexes', 'Document ingestion and chunking', 'Context assembly and budgeting']
      },
      {
        title: 'Evaluation & Reliability',
        items: ['Graded eval harnesses', 'Held-out oracles', 'Grading rubrics', 'Instrumentation audits', 'Regression tracking']
      }
    ],
    supporting: [
      {
        title: 'Models & Serving',
        items: ['OpenAI API', 'Azure OpenAI', 'Gemini', 'Llama 3', 'Ollama (on-prem)', 'Hugging Face Transformers', 'Whisper', 'SSE streaming']
      }
    ]
  },
  'ML & Python Ecosystem': {
    core: [
      {
        title: 'Deep Learning',
        items: ['PyTorch', 'Custom training loops and data loaders', 'Self-/semi-supervised learning (SimCLR, FixMatch)', 'ResNet / CNN fine-tuning', 'Hugging Face Transformers']
      },
      {
        title: 'Scientific Python & Data',
        items: ['NumPy', 'Pandas', 'scikit-learn', 'Matplotlib', 'Jupyter', 'PySpark']
      }
    ],
    supporting: [
      {
        title: 'Python Services for AI',
        items: ['FastAPI', 'Pydantic', 'asyncio / asyncpg', 'pgvector', 'LangChain', 'LangGraph', 'concurrent.futures']
      }
    ]
  },
  'Systems & Distributed Infrastructure': {
    core: [
      {
        title: 'Distributed Design',
        items: ['Failure isolation', 'Idempotency and crash recovery', 'Leases and state ownership', 'Atomic state publication', 'Backpressure and retry/circuit-breaker', 'State-machine control', 'Consistency vs availability']
      },
      {
        title: 'Performance & Concurrency',
        items: ['C++20', 'Python', 'C', 'Multithreading and lock design', 'Mutexes, condition variables, atomics', 'Promise/future hand-off', 'Thread pools and work queues', 'RPC over TCP sockets', 'Memory and cache behavior', 'Profiling (perf, flame graphs)', 'ThreadSanitizer / AddressSanitizer']
      }
    ],
    supporting: [
      {
        title: 'Infra & Tooling',
        items: ['Docker', 'Kubernetes', 'AWS', 'Nginx', 'Kafka', 'Redis', 'PostgreSQL', 'CI/CD', 'OpenTelemetry / Grafana', 'Linux / POSIX', 'Git']
      }
    ]
  },
  'Graphics & Product Engineering': {
    core: [
      {
        title: 'Graphics & Interactive Systems',
        items: ['Effect House', 'Babylon.js', 'WebGL', 'WebXR', 'Meta Quest 3', 'OpenGL', 'Blender asset pipelines', 'Real-time rendering and scene graphs']
      }
    ],
    supporting: [
      {
        title: 'Full-Stack',
        items: ['TypeScript', 'React.js', 'Next.js', 'React Native', 'Node.js', 'GraphQL (Pothos / Yoga)', 'REST API design', 'Flutter', 'Electron']
      },
      {
        title: 'Data & Storage',
        items: ['MongoDB', 'PostgreSQL + pgvector', 'Oracle', 'Cloud Firestore', 'Redis', 'SQLite']
      }
    ]
  }
}

const skillSets = rawSkillSets
const skillTracks = Object.keys(skillSets)

const BULLET_PREVIEW = 5

// Shows the first few bullets with the rest behind a toggle. In seoMode every
// bullet is rendered so crawlers and LLM agents get the full text.
function BulletList({ bullets, seoMode }) {
  const [expanded, setExpanded] = useState(false)
  const collapsible = !seoMode && bullets.length > BULLET_PREVIEW + 1
  const visible = collapsible && !expanded ? bullets.slice(0, BULLET_PREVIEW) : bullets
  const hidden = bullets.length - visible.length

  return (
    <>
      <ul className="plain-list">
        {visible.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {collapsible ? (
        <button type="button" className="bullet-toggle" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Show less' : `Show ${hidden} more`}
        </button>
      ) : null}
    </>
  )
}

function App({ seoMode = false }) {
  const [activeSection, setActiveSection] = useState('experience')
  const prerenderDispatched = useRef(false)
  const renderExperienceCard = (item) => (
    <article
      className={`panel experience-panel${item.featured ? ' experience-panel--featured' : ''}`}
      key={`${item.org}-${item.role}`}
    >
      <h3>{item.role}</h3>
      <p className="card-subtitle">
        {item.orgUrl ? (
          <a
            className="org-link"
            href={item.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.org} website`}
            title={`Visit ${item.org}`}
          >
            <span>{item.org}</span>
          </a>
        ) : (
          item.org
        )}{' '}
        · <span className="exp-location">{item.location}</span> · <span className="exp-date">{item.dates}</span>
      </p>
      <BulletList bullets={item.bullets} seoMode={seoMode} />
      {item.stack?.length ? (
        <div className="tag-row experience-stack">
          {item.stack.map((tech) => (
            <span className="tag-text" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      ) : null}
      {item.metrics?.length ? (
        <div className="metric-row">
          {item.metrics.map((metric) => (
            <span className="metric-pill" key={metric}>
              {metric}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  )

  const renderProjectCard = (project) => (
    <article className="panel project-panel" key={project.title}>
      <h3>{project.title}</h3>
      {project.context ? <p className="project-context">{project.context}</p> : null}
      <div className="project-body">
        <p className="project-summary">{project.description}</p>
        {project.impact || project.highlight ? (
          <details className="project-more" open={seoMode}>
            <summary>Details</summary>
            {project.impact ? (
              <p className="project-detail">
                <span className="project-label">Result</span>
                {project.impact}
              </p>
            ) : null}
            {project.highlight ? (
              <p className="project-detail">
                <span className="project-label">Technical detail</span>
                {project.highlight}
              </p>
            ) : null}
          </details>
        ) : null}
      </div>
      {project.metrics?.length ? (
        <div className="metric-row project-metrics">
          {project.metrics.map((metric) => (
            <span className="metric-pill" key={metric}>
              {metric}
            </span>
          ))}
        </div>
      ) : null}
      <div className="project-footer">
        <div className="project-links">
          {project.hideLink || !project.repo ? (
            null
          ) : (
            <a className="project-link" href={project.repo} target="_blank" rel="noopener noreferrer">
              {project.linkLabel || 'Project overview'}
            </a>
          )}
          {project.demoUrl ? (
            <a className="project-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              {project.demoLabel || 'Demo video'}
            </a>
          ) : null}
        </div>
        <div className="tag-row project-tags">
          {project.tags.map((tag) => (
            <span className="tag-text" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )

  useEffect(() => {
    if (!sectionIds.includes(activeSection)) {
      setActiveSection('experience')
    }
  }, [activeSection])

  const activeMeta = sectionMeta[activeSection] || sectionMeta.top

  useEffect(() => {
    document.title = activeMeta.title
    setMetaTag('name', 'description', activeMeta.description)
    setMetaTag('name', 'author', BRAND_NAME)
    setMetaTag('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    setLinkTag('canonical', SITE_URL)
    // hreflang tags for primary + default language targeting
    setLinkTag('alternate', SITE_URL, { hreflang: 'en-US' })
    setLinkTag('alternate', SITE_URL, { hreflang: 'x-default' })
    setMetaTag('property', 'og:title', activeMeta.title)
    setMetaTag('property', 'og:site_name', BRAND_NAME)
    setMetaTag('property', 'og:url', SITE_URL)
    setMetaTag('property', 'og:description', activeMeta.description)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:image', OG_IMAGE)
    setMetaTag('property', 'og:image:alt', `${BRAND_NAME} portfolio preview`)
    setMetaTag('property', 'og:locale', 'en_US')
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', activeMeta.title)
    setMetaTag('name', 'twitter:url', SITE_URL)
    setMetaTag('name', 'twitter:description', activeMeta.description)
    setMetaTag('name', 'twitter:image', OG_IMAGE)
    setMetaTag('name', 'twitter:image:alt', `${BRAND_NAME} portfolio preview`)
    setJsonLd(schemaData)
    if (!prerenderDispatched.current) {
      prerenderDispatched.current = true
      document.dispatchEvent(new Event('prerender-ready'))
    }
  }, [activeMeta])

  return (
    <div className="App">
      <header className="hero" id="top">
        <div className="hero-top hero-layout">
          <div className="hero-main">
            <h1>
              <a href={SITE_URL} className="hero-brand-link" aria-label="Home">
                {PRIMARY_NAME} | Hans
              </a>
            </h1>
            <p className="hero-role">Agentic AI systems &middot; AI infrastructure &middot; Distributed backend</p>
            <p className="hero-summary">
              Software engineer building agentic AI systems and the infrastructure they run on. At TikTok, I built the
              overnight evaluation platform where coding agents fix real production bugs, plus a runtime verifier that
              judges fixes by real editor behavior, and showed that agent-written tests overstated pass rates about 2.4x.
            </p>
            <div className="hero-meta">
              <span className="hero-meta-highlight">Open to 2027 new grad roles &middot; US &amp; Asia</span>
            </div>
          </div>
          <div className="hero-side">
            <p className="hero-side-title">At a glance</p>
            <dl className="glance">
              <div className="glance-row">
                <dt>Latest</dt>
                <dd>SWE Intern, TikTok Effect House &mdash; San Jose, May&ndash;Sep 2026</dd>
              </div>
              <div className="glance-row">
                <dt>Education</dt>
                <dd>M.S. Computer Science, Northeastern University &mdash; 4.0 GPA, May 2027</dd>
              </div>
              <div className="glance-row">
                <dt>Core stack</dt>
                <dd>Python &middot; PyTorch &middot; C++ &middot; TypeScript &middot; FastAPI &middot; LangGraph &middot; MCP &middot; Kafka &middot; Docker &middot; Kubernetes</dd>
              </div>
              <div className="glance-row">
                <dt>Highlights</dt>
                <dd>3 agent systems shipped at TikTok &middot; agent-test pass-rate inflation found (~2.4x) &middot; LLM platform for 20+ teams at HKT &middot; 4.0 GPA</dd>
              </div>
            </dl>
            <div className="hero-links">
              <a href="mailto:ho.chak@northeastern.edu">Email</a>
              <a href="https://linkedin.com/in/chaksingho/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/hans2001" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://leetcode.com/justnotarandomkid/" target="_blank" rel="noopener noreferrer">
                LeetCode
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="tab-dock">
        <nav className="tab-bar" aria-label="Primary sections">
          {sectionIds.map((sectionId) => (
            <button
              key={sectionId}
              type="button"
              className={`tab-button ${activeSection === sectionId ? 'active' : ''}`}
              onClick={() => setActiveSection(sectionId)}
            >
              {sectionLabels[sectionId]}
            </button>
          ))}
        </nav>
      </div>

      <main className="main">

        {seoMode || activeSection === 'experience' ? (
          <section className="section" id="experience">
            <div className="section-heading">
              <h2>Experience</h2>
            </div>
            <div className="panel-grid dense tab-panel">
              {experiences.map(renderExperienceCard)}
            </div>
          </section>
        ) : null}

        {seoMode || activeSection === 'projects' ? (
          <section className="section" id="projects">
            <div className="section-heading">
              <h2>Projects</h2>
            </div>
            <p className="group-subtitle">Systems &amp; applied projects</p>
            <div className="panel-grid tab-panel">
              {featuredProjects.map(renderProjectCard)}
            </div>
            <p className="group-subtitle">Academic &amp; research projects</p>
            <div className="panel-grid tab-panel">
              {academicProjects.map(renderProjectCard)}
            </div>
          </section>
        ) : null}

        {seoMode || activeSection === 'profile' ? (
          <section className="section" id="profile">
            <div className="section-heading">
              <h2>Skills &amp; Education</h2>
            </div>
            <div className="panel-grid">
              <article className="panel">
                <h3>About</h3>
                <p>
                  I build agentic AI systems and the infrastructure under them. At TikTok I built the platform that ran
                  and graded coding agents at scale; before that I shipped LLM and RAG platforms at HKT and full-stack
                  products at a fintech startup and an investment bank. My EE background and C++ systems work show up
                  where it matters: concurrency, state ownership, and performance under load.
                </p>
                <p>
                  <strong>Looking for:</strong> 2027 new grad roles in agentic AI, AI infrastructure, and
                  backend/distributed systems.
                </p>
              </article>
              <article className="panel">
                <h3>Competitive programming</h3>
                <p>
                  Active in timed problem-solving with a focus on algorithms, data structures, and implementation speed.
                </p>
                <div className="hero-links">
                  <a href="https://leetcode.com/justnotarandomkid/" target="_blank" rel="noopener noreferrer">
                    LeetCode profile
                  </a>
                </div>
              </article>
            </div>

            <p className="group-subtitle">Skills by category</p>
            <p className="plain-summary">
              Strongest areas: agentic and LLM systems, machine learning with PyTorch, and the concurrent, distributed
              backends they run on.
            </p>
            <div className="stacked-groups">
              {skillTracks.map((track) => {
                const groups = skillSets[track]
                if (!groups) {
                  return null
                }
                return (
                  <article className="panel grouped-panel" key={track}>
                    <h3>{track}</h3>
                    {groups.core.map((group) => (
                      <p className="plain-inline" key={`${track}-${group.title}-core`}>
                        <span className="inline-label">{group.title}:</span> {group.items.join(', ')}
                      </p>
                    ))}
                    {groups.supporting.map((group) => (
                      <p className="plain-inline" key={`${track}-${group.title}-support`}>
                        <span className="inline-label">{group.title}:</span> {group.items.join(', ')}
                      </p>
                    ))}
                  </article>
                )
              })}
            </div>

            <p className="group-subtitle">Education</p>
            <div className="education-stack">
              {education.map((item) => (
                <article className="panel grouped-panel" key={item.school}>
                  <h3>
                    {item.url ? (
                      <a className="education-link" href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.school}
                      </a>
                    ) : (
                      item.school
                    )}
                  </h3>
                  <p className="education-degree">{item.degree}</p>
                  <p className="education-meta">
                    {item.location}
                    {item.gpa ? ` · ${item.gpa}` : ''}
                    {item.honor ? ` · ${item.honor}` : ''}
                  </p>
                  {item.coursework ? <p className="education-coursework">{item.coursework}</p> : null}
                  <span className="education-date">{item.dates}</span>
                </article>
              ))}
            </div>
          </section>
        ) : null}

      </main>

      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-block">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a className="footer-email" href="mailto:ho.chak@northeastern.edu">
                    ho.chak@northeastern.edu
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/chaksingho/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/hans2001" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/chaksingho" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-meta">
          <span>Built for performance, determinism, and systems clarity.</span>
          <span>
            © {new Date().getFullYear()}{' '}
            <a href={SITE_URL} className="footer-site-link">
              {BRAND_NAME}
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
