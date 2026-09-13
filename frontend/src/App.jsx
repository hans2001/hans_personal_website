import { useEffect, useRef, useState } from 'react'
import './App.css'

const SITE_URL = 'https://chaksingho.com'
const PRIMARY_NAME = 'Chak Sing Ho'
const ALT_NAME = 'Ho Chak Sing'
const ALT_NAME_EN = 'Hans Ho'
const BRAND_NAME = `${PRIMARY_NAME} | ${ALT_NAME_EN} | ${ALT_NAME} | Hans`
const BASE_TITLE = `${BRAND_NAME} | ML systems, GPU runtime, and performance engineer`
const BASE_DESCRIPTION = `${PRIMARY_NAME} (also known as ${ALT_NAME_EN}, ${ALT_NAME}, or Hans) focuses on ML systems, GPU runtime engineering, low-latency infrastructure, and performance-critical software at the hardware/software boundary.`
const OG_IMAGE = `${SITE_URL}/og.jpg`
const sectionMeta = {
  top: {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION
  },
  overview: {
    title: `Overview | ${BRAND_NAME}`,
    description: 'Recruiter-facing overview of role fit, technical direction, and current build themes.'
  },
  experience: {
    title: `Experience | ${BRAND_NAME}`,
    description: 'Timeline of internships and leadership with measurable impact across systems, performance, and research.'
  },
  projects: {
    title: `Projects | ${BRAND_NAME}`,
    description: 'Selected systems, performance, and hardware-adjacent projects with open-source repos.'
  },
  profile: {
    title: `Profile | ${BRAND_NAME}`,
    description: 'Technical profile covering systems design, skills, and education.'
  },
  contact: {
    title: `Contact | ${BRAND_NAME}`,
    description: `Contact ${PRIMARY_NAME} (${ALT_NAME_EN} | ${ALT_NAME} | Hans) for systems, performance, and low-latency infrastructure roles.`
  }
}

const sectionIds = ['profile', 'projects', 'experience', 'overview', 'contact']
const sectionLabels = {
  overview: 'Overview',
  experience: 'Experience',
  projects: 'Projects',
  profile: 'Profile',
  contact: 'Contact'
}

const projects = [
  {
    title: 'EGOS-2000 Network Stack (CS 6640)',
    context: 'OS + networking internals · DMA/interrupt path',
    description:
      'Implemented the Ethernet/UDP send path in EGOS-2000 against an emulated Intel E1000 NIC, tracing packet flow from software descriptors into device-visible DMA buffers and transmit queue state.',
    impact: 'Established a concrete systems project centered on hardware-facing I/O mechanics instead of application-layer networking abstractions.',
    highlight: 'Focused on descriptor ring management, DMA ownership transfer, and interrupt-driven completion handling in the emulated NIC path.',
    tags: ['C', 'Network Stack', 'DMA', 'Interrupts'],
    metrics: ['Platform: EGOS-2000', 'Device model: emulated E1000', 'Path: Ethernet/UDP transmit'],
    demoUrl: 'https://www.youtube.com/watch?v=SMzsY9ywQT0&t=1s',
    demoLabel: 'Demo video',
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'UDP Multicast L2 Order-Book Engine',
    context: 'Low-level systems · Deterministic pipelines',
    description:
      'Built a UDP multicast ingest pipeline and binary protocol parser feeding an in-memory L2 order book, with deterministic replay for correctness checks. The project focuses on predictable behavior under bursty market traffic.',
    impact: 'Enabled repeatable tail-latency regression checks and order-book correctness under bursty feeds.',
    highlight: 'Zero-copy ingest path with contention-aware synchronization across the L2 pipeline.',
    tags: ['C++20', 'Low Latency', 'Concurrency'],
    metrics: ['Protocol feed: UDP multicast', 'Data model: L2 order book', 'Latency tracking: tail regressions'],
    repo: 'https://github.com/hans2001/low-latency-market-data-engine',
    group: 'featured'
  },
  {
    title: 'C++ Work-Stealing Thread Pool Scheduler',
    context: 'Systems · Concurrency',
    description:
      'Built a fixed-size scheduler with work-stealing queues and explicit task lifetimes to study practical concurrency tradeoffs. Benchmarked against std::async to quantify throughput and overhead differences.',
    impact: 'Documented throughput tradeoffs under a bounded worker pool.',
    highlight: 'Work-stealing queues with explicit lifetimes and a fixed-size runtime.',
    tags: ['C++', 'Schedulers', 'Benchmarks'],
    metrics: ['Runtime: fixed-size worker pool', 'Baseline: std::async', 'Focus: throughput under contention'],
    repo: 'https://github.com/hans2001/cpp-thread-pool',
    group: 'featured'
  },
  {
    title: 'Tiny Tensor Compiler MVP',
    context: 'Compiler/runtime systems · ML execution',
    description:
      'Building a small compiler pipeline for tensor-style expressions to deepen compiler fundamentals through a project directly connected to ML systems. The scope includes parsing, AST construction, IR lowering, simple optimization passes, and a NumPy-backed execution path.',
    impact: 'Turns compiler study into a concrete systems project with direct relevance to ML runtimes, graph execution, and future compiler/runtime engineering work.',
    highlight: 'Planned passes include constant folding, dead-code elimination, shape-aware execution planning, and simple operator fusion over a tiny tensor IR.',
    tags: ['Python', 'Compiler', 'IR', 'ML Systems'],
    metrics: ['Pipeline: parse -> AST -> IR -> optimize -> execute', 'Backend: NumPy', 'Focus: compiler fundamentals + runtime intuition'],
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'Mini Effect Engine',
    context: 'Graphics systems · OpenGL',
    description:
      'Building a small C++ OpenGL effect-engine skeleton to prepare for graphics and AR tooling work. The current implementation sets up an OpenGL 3.3 core-profile render loop with GLFW/GLAD, shader compilation/linking, texture upload, and fullscreen-quad rendering.',
    impact: 'Turns graphics preparation into a concrete systems project instead of treating rendering APIs as resume keywords.',
    highlight: 'Implements the foundational graphics path directly: context creation, GPU buffer setup with VAO/VBO/EBO, shader program management, and texture sampling through a simple rendering pipeline.',
    tags: ['C++', 'OpenGL', 'Graphics', 'GLFW'],
    metrics: ['Graphics stack: OpenGL 3.3 + GLFW + GLAD', 'Current scope: shaders + textures + render loop', 'Direction: effect-engine / AR tooling fundamentals'],
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'TTEH AI Harness Layer',
    context: 'Agentic developer tooling · Evaluation infrastructure',
    description:
      'Built and maintained a repo-local AI engineering harness for TTEH workstreams, covering linked consumer bootstrap, task routing, worktree isolation, eval/holdout execution, run-artifact validation, and live Effect House verification workflows.',
    impact: 'Turned agent-assisted engineering from ad hoc prompts into a measured workflow: explicit routing, closed-book evaluation, and verdicts backed by evidence rather than by a diff that merely looks plausible.',
    highlight: 'Ran a daemonized flywheel (`measure → triage → improve`) as a supervised nightly service over 32 shards and 12 concurrent lanes in isolated worktrees, with run.json, verification.md, runtime traces, and diffs as the source of truth behind every verdict.',
    tags: ['Python', 'Bash', 'Agentic Tooling', 'Eval Harness'],
    metrics: ['14,328 scored eval runs', 'Nightly: 32 shards / 12 lanes', 'Self-tests: 165 pass / 0 fail'],
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'Power-Gated 8kb SRAM (TSMC 180nm)',
    context: 'Circuit design · Low-power ICs',
    description:
      'Designed a low-power 8kb SRAM with power-gating controls in Cadence Virtuoso (TSMC 180nm). The goal was reducing leakage and idle power while preserving state and validating behavior through simulation.',
    impact: 'Reduced leakage and idle power while retaining data.',
    highlight: 'Power-gated SRAM simulated and validated in Cadence Virtuoso.',
    tags: ['TSMC 180nm', 'Power Gating', 'SRAM'],
    metrics: ['Memory size: 8kb', 'Process node: TSMC 180nm', 'Target: lower leakage + idle power'],
    repo: 'https://drive.google.com/file/d/1UUswsKy2AfpEP6Ja7mSuGMwmd4cjCP03/view?usp=sharing',
    linkLabel: 'Project overview',
    schemaType: 'Project',
    group: 'academic'
  },
  {
    title: 'Airbnb Listings ETL Pipeline (Spark)',
    context: 'Data engineering · ETL',
    description:
      'Built a Spark-based ETL pipeline over Inside Airbnb data to transform noisy listing records into analytics-ready parquet datasets. Used the pipeline to compare pricing, amenities, and demand patterns across 85 global regions.',
    impact: 'Processed 6–8GB of listings into parquet for consistent, faster analysis.',
    highlight: 'Spark ETL + PySpark SQL with sentiment and pricing model comparisons.',
    tags: ['ETL', 'PySpark', 'Analytics'],
    metrics: ['Dataset size: 6-8GB', 'Geographies: 85 regions', 'Output format: parquet'],
    repo: 'https://drive.google.com/file/d/1afxda583McI0Wp_UDlM5nYFmIQSaUDbV/view?usp=sharing',
    linkLabel: 'Project overview',
    group: 'academic'
  },
  {
    title: 'SimCLR Skin Lesion Classifier (ResNet50)',
    context: 'Deep learning · Vision',
    description:
      'Applied SimCLR-style contrastive pretraining and semi-supervised learning with a ResNet50 backbone on ISIC skin-lesion datasets. The project explored stronger representation learning under limited labels.',
    impact: 'Improved classification robustness over a supervised baseline on ISIC benchmarks.',
    highlight: 'SimCLR pretraining + FixMatch-style pseudo-labeling with ResNet50.',
    tags: ['Deep Learning', 'SimCLR', 'FixMatch'],
    metrics: ['Backbone: ResNet50', 'Setup: SimCLR + semi-supervised', 'Dataset family: ISIC benchmarks'],
    repo: 'https://drive.google.com/file/d/1pfVlWrskko6F7k7LXyLrlDSPqPVgoT6d/view?usp=sharing',
    linkLabel: 'Project overview',
    group: 'academic'
  },
  {
    title: 'Multi-Calendar Scheduler (Java MVC + Swing)',
    context: 'Java · MVC',
    description:
      'Built a multi-calendar scheduling app with per-calendar timezone handling, range-based event copy, and iCal/CSV export. Delivered both CLI and Swing GUI workflows with MVC structure.',
    impact: 'Enabled cross-calendar event copying with timezone-aware scheduling.',
    highlight: 'CLI + Swing GUI with iCal/CSV export support.',
    repo: 'https://github.com/hans2001/CS5010--MultiCalendarApp',
    linkLabel: 'Project overview',
    tags: ['Java', 'MVC', 'Design Patterns'],
    metrics: ['Interfaces: CLI + Swing GUI', 'Export formats: iCal + CSV', 'Feature: timezone-aware copy'],
    group: 'academic'
  }
]

const featuredProjects = projects.filter((project) => project.group !== 'academic')
const academicProjects = projects.filter((project) => project.group === 'academic')

// Note: experiences and education are defined later in the file but moved here for schemaData reference
const experiences = [
  {
    role: 'Summer Intern, Intelligent Creation (Effect House)',
    org: 'TikTok',
    orgUrl: 'https://effecthouse.tiktok.com/',
    location: 'San Jose, CA',
    dates: 'May 11, 2026 - Sep 8, 2026',
    employmentType: 'Full-time',
    featured: true,
    bullets: [
      'Worked with TikTok\'s Intelligent Creation team on Effect House, the company\'s official AR creation tool, building three systems on top of the TTEH desktop codebase: an overnight agent-evaluation flywheel, a runtime verifier, and an MCP performance agent for creators.',
      'Flywheel · Built a distributed control plane on a single host — supervisor, nightly controller, per-lane daemons, eval children, and capture workers that share no call stack and never fail together. Task ownership is a SQLite transaction plus a TTL lease rather than a boolean flag, so two pickers can never claim the same task and a crashed worker\'s lease expires into someone else\'s hands instead of stranding the work.',
      'Flywheel · Made recovery safe with a composite identity — task id, run id, controller generation, lane id, owner token, pinned revision, worktree — compared together, so a worker resurrected from an older generation cannot write into state it no longer owns. Shared JSON is published by temp file, fsync, and atomic replace, and corrupt ledgers fail closed rather than reading as empty and silently re-running work that already landed.',
      'Flywheel · Designed the lock taxonomy (supervisor singleton flock, lease lock, eval admission slot, reentrant ledger lock, telemetry append/rotate lock, single distill-compiler lock) under one rule: a lock must span the entire read-decide-write, because locking only the final write still loses updates. Parallel lanes avoid contending on shared knowledge files altogether by writing content-addressed fragments that one compiler folds together.',
      'Flywheel · Ran the supervisor as a pure state machine over collected facts — hold, restart, repair, stop — behind a restart circuit breaker, with a hard line between a broken road that self-heals (worktree gone, process dead) and a pulled stop gate that must never auto-clear.',
      'Flywheel · Ran it as a multi-agent system where roles are separated by context, not just by name: a blind fixer agent that cannot see the grader, a reviewer fed only a summary of the previous attempt, a scheduler choosing the next task, and producers minting tasks and reaping dead worktrees. ~18 worker loops over roughly 6 concurrent model slots, 32 nightly shards across 12 lanes, 14,328 scored runs.',
      'Flywheel · The hardest problem was diagnostic rather than functional: twelve distinct failures — a runaway process escaping its cgroup, a service booting from a tree with no modules, timeouts reporting success as failure, one lane killing another lane\'s editor through a default port fallback — all surfaced as the same symptom, "the editor is flaky." Introduced a shared failure-layer vocabulary so every refusal names its own layer and no layer may report another layer\'s failure as its own.',
      'Flywheel · Produced the program\'s most transferable result by holding the pipeline fixed and swapping only the source of the grading test: agent fixes passed 27.5% (n=578) against tests written by the original human developer versus 65.6% (n=276) against tests the agent wrote for itself — a ~2.4x overestimate, reproduced twice. A follow-up audit of the instrumentation found 48.6% of prompts silently carrying the previous attempt\'s verdict while the run records reported none of it.',
      'Runtime verifier · Built the behavioral ground truth the flywheel lacked, as a TypeScript job shell over a Python decision kernel: PASS only when the same oracle genuinely fails on the baseline build and passes on the candidate, UNPROVEN when evidence is missing. The contended resources here are physical — one build checkout, one single-instance editor holding a port and the GPU — so serialization is a correctness precondition, enforced by non-blocking flocks that make the design deadlock-free by construction, over a filesystem queue where every transition is a single atomic rename.',
      'Perf MCP · Built an MCP server exposing 31 governed tools that lets a creator\'s agent optimize a live effect project as a typed state machine — PolicyDecision, Measurement{ok|invalid}, Suspect[], Transaction, Verdict{pass|fail|invalid} — attributing cost through JS profiling, scene objects, GPU telemetry, and hierarchical ablation, then writing fixes back inside a transaction that re-measures on the same workload and restores the creator\'s tree on failure.'
    ],
    stack: ['TypeScript', 'Python', 'SQLite', 'MCP', 'git worktrees', 'flock + TTL leases', 'Multi-agent orchestration', 'GPU + JS profiling'],
    metrics: ['Program: 17 weeks (May 11 - Sep 8, 2026)', '3 systems: flywheel / verifier / perf MCP', '14,328 scored eval runs', 'Nightly: 32 shards / 12 lanes', 'Test-source bias: 27.5% vs 65.6%', 'Perf MCP: 31 governed tools']
  },
  {
    role: 'Software Engineer Intern (Innovation Lab)',
    org: 'Hong Kong Telecom (HKT)',
    orgUrl: 'https://www.hkt.com/?locale=en',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    employmentType: 'Full-time',
    bullets: [
      'Developed a company-wide internal GenAI platform with Node.js and React.js by customizing open-source projects (LibreChat, Open WebUI), deploying OpenAI, Gemini, and Llama3 via Ollama on-prem.',
      'Extended the codebase using LangChain to integrate a proprietary compliance-trained LLM via the Azure API.',
      'Engineered a file management system supporting Retrieval Augmented Generation (RAG) by developing server-side RESTful endpoints in Next.js that handle document uploads, retrievals, and deletions.',
      'Integrated the OpenAI Assistants API to enable context-aware responses, enhancing question-answering accuracy by 30%.',
      'Developed automation scripts to streamline local installation of the Docker-based GenAI platform across Windows and Linux environments.',
      'Orchestrated container networking infrastructure with VPN tunneling protocols and Docker Compose to circumvent regional API restrictions.',
      'Revamped the Tap&Go mobile wallet reward feature using Flutter, building a real-time merchant search with dynamic keyword filtering (brand/category/region) via local JSON data.',
      'Implemented a Python-based automation pipeline for wireless on-site cell diagram generation, integrating Excel data extraction, Mermaid Markdown scripting, and diagram creation, reducing generation time by 90%.'
    ],
    stack: ['Node.js', 'React.js', 'Next.js', 'LangChain', 'Ollama', 'Azure OpenAI', 'Docker Compose', 'Flutter', 'Python'],
    metrics: ['Adoption scope: 20+ teams', 'Answer quality: +~30%', 'Diagram generation time: -90%']
  },
  {
    role: 'Tech Lead, Theoretical & Computational Chemistry Lab (Supervisor: Prof. Haibin Su)',
    org: 'Hong Kong University of Science and Technology',
    orgUrl: 'https://hkust.edu.hk',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    employmentType: 'Part-time',
    bullets: [
      'Led the development of a GenAI Learning Platform with Next.js, securing HKD 250k in funding from the HKUST Center for Education Innovation.',
      'Built an immersive 3D virtual classroom with Babylon.js, incorporating physics simulation with Ammo.js and custom 3D assets created in Blender.',
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
      'Led the development of a real-time monitoring dashboard for Bloomberg Data License & Market Data Feed (B-PIPE) usage with Node.js and Vue.js, identifying and flagging 15+ anomalous expenditure patterns across 7 departments.',
      'Engineered RESTful query and mutation endpoints utilizing Knex.js for schema management, optimizing the processing of 100k+ Bloomberg invoice records in Oracle Database.',
      'Developed a Derivatives Automated Valuation Engine (SaaS) using TypeScript and React.js to comply with SFC regulations.',
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
      'Architected the entire codebase for a Real-time Market Intelligence and Search Platform (SaaS) from scratch with Node.js and React.js, led the team through 10+ product iterations, and acquired HKD 1M in funding from Hong Kong Science & Technology Parks (HKSTP).',
      'Engineered a high-performance financial news feed processing 5M+ historical records with real-time updates by implementing React Window with Infinite Loader, reducing memory footprint through data chunking and integrating with a paginated GraphQL API.',
      'Redesigned the underlying protobuf schema to optimize data architecture in MongoDB, implementing indexing and aggregation pipelines to accelerate concurrent processing of 100k+ documents.',
      'Conducted query profiling analysis and migrated from Mongoose ODM to the native MongoDB Node.js driver, resulting in 2x faster backend data retrieval.',
      'Built a GraphQL API using Pothos to enforce strict type validation, and implemented multi-layered caching using GraphQL Yoga with configurable TTL parameters, session-based scoping, and automatic mutation-based invalidation, reducing endpoint overhead by 40%.',
      'Developed watchlist functionality leveraging Cloud Firestore to perform CRUD operations for tag-based tracking of companies and industries, integrated with Firebase Authentication for secure, scalable user management.',
      'Deployed the platform on AWS, hosting frontend and backend on separate Ubuntu EC2 instances across distinct UAT and production environments, sizing t3.medium instances from measured CPU/memory/storage usage, and serving static assets from S3 through a CloudFront CDN.',
      'Ran Nginx as reverse proxy and load balancer (upstream blocks with round robin, IP restrictions, HTTPS), kept backend services alive under PM2, and managed GoDaddy subdomains and DNS for load-balanced production and isolated UAT with Certbot-automated SSL renewal.'
    ],
    stack: ['Node.js', 'React.js', 'GraphQL (Pothos + Yoga)', 'MongoDB', 'Protobuf', 'Firebase', 'AWS EC2/S3/CloudFront', 'Nginx', 'PM2'],
    metrics: ['Funding impact: HKD 1M', 'Product iterations: 10+', 'Record scale: 5M+', 'Retrieval speed: 2x', 'API overhead: -40%']
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
      'Information Retrieval, Building Distributed Systems, OS Kernel Implementation, Agentic AI, Programming Language Principles, Programming Paradigm Design, Database Management Systems, Network Programming'
  },
  {
    school: 'Hong Kong Univ. of Sci. & Tech.',
    url: 'https://hkust.edu.hk/',
    degree: 'Bachelor of Engineering (B.Eng.) in Electronic Engineering, with a Minor in Information Technology (Computer Science)',
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
      jobTitle: 'ML systems, GPU runtime, and performance engineer',
      knowsAbout: [
        'GPU programming',
        'CUDA',
        'Low-level performance',
        'Parallel computing',
        'C++ systems',
        'Latency budgeting',
        'Profiling and benchmarking'
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

const positioningHighlights = [
  'I build agentic systems end to end: orchestration, tool and MCP interfaces, retrieval, eval harnesses, and the runtime they execute on.',
  'Every internship has been the same shape at a different scale - an LLM product that only works if the system underneath it is correct: TikTok Effect House, HKT\'s company-wide GenAI platform, and the HKUST GenAI learning platform.',
  'The systems depth is what makes the agentic work hold up: leases and locking, failure isolation, atomic state, idempotency, and evals that measure rather than flatter.',
  'I also work across graphics and interactive runtimes - Babylon.js, WebXR, OpenGL - which is where AR tooling and immersive agent interfaces meet.'
]

const recruiterSummary = [
  'I build agentic AI systems and the applications on top of them: orchestration, MCP and tool interfaces, RAG, and the eval harnesses that keep them honest.',
  'My strongest areas are LLM platform engineering and the distributed systems underneath it, where correctness under concurrency decides whether the AI layer actually works.',
  'I also work across graphics and interactive runtimes through Effect House AR tooling, Babylon.js, WebXR, and OpenGL, which is where AI-for-creators sits.'
]

const bestFitRoles = [
  'Agentic AI systems and LLM application engineering',
  'AI platform / LLM infrastructure and developer tooling',
  'Distributed systems and backend infrastructure',
  'Graphics, AR, and interactive platform engineering'
]

const credibilitySignals = [
  'Projects here cover networking hot paths, schedulers, DMA/interrupt handling, OpenGL rendering, and compiler/runtime fundamentals.',
  'My internship work spans agentic AI tooling, LLM workflow infrastructure, immersive platforms, and AI harness/runtime-verification work around TikTok Effect House.',
  'The TTEH harness work turned repeated guidance into a shared repo-native workflow, and paired it with an overnight evaluation flywheel that measures whether a given intervention actually helps before the team adopts it.',
  'The common thread is execution quality: systems that need to be explainable, measurable, and close to the runtime behavior underneath them.'
]

const futureDirection = [
  'I am going deeper into agentic systems that hold up in production: evaluation you can trust, multi-agent orchestration, and runtimes that fail safely.',
  'That builds directly on my current work at Effect House and on the LLM platforms I shipped at HKT and HKUST.',
  'The goal is to keep working where the AI layer meets real system constraints, rather than on prompt-level products alone.'
]

const financeConcepts = [
  'Market microstructure basics: limit order books, spread, depth, and queue position',
  'Execution quality concepts: slippage, fill probability, latency, and transaction costs',
  'Derivative fundamentals: options pricing intuition, Greeks, and volatility surface basics',
  'Risk and portfolio basics: exposure, drawdown, and position sizing',
  'Data reliability concepts for trading systems: timestamp integrity, replayability, and feed consistency'
]

const computerSideEeCourses = [
  'VLSI circuit design (SRAM power-gating project)',
  'Cache and memory hierarchy fundamentals',
  'Programming with C++',
  'Data Structures',
  'Operating Systems',
  'Algorithms',
  'Cloud Computing',
  'Computer Organization',
  'Computer Networks',
  'Probability & Random Processes'
]

const rawSkillSets = {
  'Agentic & LLM Systems': {
    core: [
      {
        title: 'Agent Frameworks & Orchestration',
        items: ['LangChain', 'LangGraph', 'MCP (Model Context Protocol)', 'OpenAI Assistants API', 'Tool / function calling', 'Multi-agent orchestration']
      },
      {
        title: 'Retrieval & Context',
        items: ['RAG pipelines', 'Embeddings and vector search', 'Document ingestion and chunking', 'Context assembly and budgeting']
      },
      {
        title: 'Evaluation & Reliability',
        items: ['Graded eval harnesses', 'Held-out oracles', 'Grading rubrics', 'Instrumentation audits', 'Regression tracking']
      }
    ],
    supporting: [
      {
        title: 'Models & Serving',
        items: ['OpenAI API', 'Azure OpenAI', 'Gemini', 'Llama 3', 'Ollama (on-prem)', 'Hugging Face Transformers', 'PyTorch', 'vLLM', 'Whisper', 'SSE streaming']
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
        items: ['C++20', 'Python', 'C', 'Multithreading and lock design', 'Memory and cache behavior', 'CUDA / SIMT model', 'Profiling (perf, Nsight, flame graphs)']
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
        items: ['MongoDB', 'PostgreSQL', 'Oracle', 'Cloud Firestore', 'Redis', 'Pandas / NumPy']
      }
    ]
  }
}

const skillSets = rawSkillSets
const skillTracks = Object.keys(skillSets)

const BULLET_PREVIEW = 6

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
  const [activeSection, setActiveSection] = useState('profile')
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
        {project.impact ? (
          <p className="project-detail">
            <span className="project-label">Impact</span>
            {project.impact}
          </p>
        ) : null}
        {project.highlight ? (
          <p className="project-detail">
            <span className="project-label">Technical highlight</span>
            {project.highlight}
          </p>
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
            <span className="project-link project-link-muted">Project overview</span>
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
          {project.tags.slice(0, 4).map((tag) => (
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
      setActiveSection('profile')
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
            <p className="hero-role">Agentic AI systems &middot; LLM infrastructure &middot; Graphics engineering</p>
            <p className="hero-summary">
              I build agentic AI systems and the infrastructure they run on - multi-agent orchestration, MCP tooling,
              RAG, and evaluation harnesses - backed by the distributed systems depth that keeps them correct under load.
            </p>
            <div className="hero-meta">
              <span className="hero-meta-highlight">Open to new grad / 2027 roles &middot; US &amp; Hong Kong</span>
            </div>
          </div>
          <div className="hero-side">
            <p className="hero-side-title">At a glance</p>
            <dl className="glance">
              <div className="glance-row">
                <dt>Now</dt>
                <dd>SWE Intern, TikTok Effect House (Intelligent Creation) &mdash; San Jose, CA</dd>
              </div>
              <div className="glance-row">
                <dt>Education</dt>
                <dd>M.S. Computer Science, Northeastern University &mdash; 4.0 GPA, May 2027</dd>
              </div>
              <div className="glance-row">
                <dt>Core stack</dt>
                <dd>LangChain &middot; LangGraph &middot; MCP &middot; PyTorch &middot; TypeScript &middot; Python &middot; C++ &middot; React</dd>
              </div>
              <div className="glance-row">
                <dt>Also</dt>
                <dd>5 prior engineering roles &middot; HKD 1.25M in funding won &middot; Babylon.js / WebXR / OpenGL</dd>
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

        {seoMode || activeSection === 'overview' ? (
          <section className="section" id="overview">
            <div className="section-heading">
              <h2>Overview</h2>
            </div>
            <div className="panel-grid">
              <article className="panel">
                <h3>Who I am</h3>
                <ul className="plain-list">
                  {recruiterSummary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <h3>Best-fit roles</h3>
                <ul className="plain-list">
                  {bestFitRoles.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <h3>Why this is credible</h3>
                <ul className="plain-list">
                  {credibilitySignals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <h3>Where I am going</h3>
                <ul className="plain-list">
                  {futureDirection.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        ) : null}

        {seoMode || activeSection === 'experience' ? (
          <section className="section" id="experience">
            <div className="section-heading">
              <h2>Experience (prior)</h2>
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
              <h2>Profile</h2>
            </div>
            <div className="panel-grid">
              <article className="panel">
                <h3>Positioning</h3>
                <p>
                  I build agentic AI systems and the applications on top of them - orchestration, tool and MCP
                  interfaces, RAG and retrieval, eval harnesses, and the distributed runtime that keeps them honest.
                  That work is backed by real systems depth: concurrency, state ownership, failure isolation, and
                  performance under load, which is what separates an agent demo from an agent platform people depend
                  on. I also work across graphics and immersive runtimes, from AR creation tooling at Effect House to
                  Babylon.js and WebXR, which makes AI-for-creators and interactive platform roles a natural fit.
                </p>
                <ul className="plain-list">
                  {positioningHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="panel ee-panel">
                <h3>Computer-side EE foundation</h3>
                <p>
                  My EE background is why the systems layer under my AI work holds up. It gives me a feel for how
                  software actually meets the machine - memory and cache behavior, networking, contention, and where
                  performance really goes - which is the difference between an agent pipeline that survives concurrency
                  and one that quietly corrupts its own state. It also includes hands-on VLSI/SRAM and
                  computer-organization fundamentals.
                </p>
                <ul className="plain-list">
                  {computerSideEeCourses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <h3>What I deliver</h3>
                <ul className="plain-list">
                  <li>Agentic systems end to end: multi-agent orchestration, tool and MCP interfaces, RAG and context assembly, and agent-callable automation.</li>
                  <li>Eval infrastructure that measures rather than flatters - graded harnesses, held-out oracles, and instrumentation audits that catch inflated results.</li>
                  <li>LLM platforms in production: multi-provider gateways (OpenAI, Gemini, Llama via Ollama, Azure), on-prem serving, and compliance-constrained deployments.</li>
                  <li>Distributed runtime correctness underneath the AI layer: leases, lock taxonomies, atomic state publication, failure isolation, and idempotent recovery.</li>
                  <li>Graphics and interactive-system fluency across Effect House AR tooling, Babylon.js, WebXR, and OpenGL render pipelines.</li>
                  <li>Full-stack delivery around the model: React/Next.js, Node.js, GraphQL and REST services, and the cloud infra to ship them.</li>
                </ul>
              </article>
              <article className="panel">
                <h3>Financial concepts I work with</h3>
                <ul className="plain-list">
                  {financeConcepts.map((concept) => (
                    <li key={concept}>{concept}</li>
                  ))}
                </ul>
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
              Strongest areas: agentic and LLM systems, the distributed infrastructure they run on, and graphics and
              interactive runtimes. Supported by systems and performance fundamentals, and full-stack product delivery
              across the whole path from model to interface.
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

        {seoMode || activeSection === 'contact' ? (
          <section className="section" id="contact">
            <div className="section-heading">
              <h2>Contact</h2>
            </div>
            <div className="panel-grid">
              <article className="panel">
                <p>
                  Reach me for agentic AI systems, LLM infrastructure and developer tooling, distributed backend work,
                  or graphics and interactive platform engineering. The best fit is work where the AI layer has to survive
                  real system constraints - correctness under concurrency, evaluation you can trust, and measurable results.
                </p>
                <div className="hero-links">
                  <a href="mailto:ho.chak@northeastern.edu">ho.chak@northeastern.edu</a>
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
              </article>
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
