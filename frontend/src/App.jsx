import { useEffect, useRef, useState } from 'react'
import './App.css'

const SITE_URL = 'https://chaksingho.com'
const PRIMARY_NAME = 'Chak Sing Ho'
const ALT_NAME = 'Ho Chak Sing'
const ALT_NAME_EN = 'Hans Ho'
const BRAND_NAME = `${PRIMARY_NAME} | ${ALT_NAME_EN} | ${ALT_NAME} | Hans`
const BASE_TITLE = `${BRAND_NAME} | GPU systems + performance engineer`
const BASE_DESCRIPTION = `${PRIMARY_NAME} (also known as ${ALT_NAME_EN}, ${ALT_NAME}, or Hans) focuses on systems and performance engineering across GPU compute, low-latency market infrastructure, and production reliability.`
const OG_IMAGE = `${SITE_URL}/og.jpg`
const sectionMeta = {
  top: {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION
  },
  overview: {
    title: `Focus | ${BRAND_NAME}`,
    description: 'Current technical focus, in-progress builds, and open-source targets.'
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
  overview: 'Focus',
  experience: 'Experience',
  projects: 'Projects',
  profile: 'Profile',
  contact: 'Contact'
}

const projects = [
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
    title: 'C TCP/UDP Exchange Feed Gateway',
    context: 'Systems · Networking',
    description:
      'Built a C-based market data gateway that normalizes TCP/UDP exchange feeds, maintains order-book snapshots, and emits enriched ticks to downstream services. The design prioritizes low jitter and minimal copy overhead.',
    impact: 'Cut per-message processing overhead and improved jitter under bursty market data loads.',
    highlight: 'Zero-copy ring buffer, SO_REUSEPORT fan-out, and lock-free hot path.',
    tags: ['C', 'Network Programming', 'Low Latency'],
    metrics: ['Protocol support: TCP + UDP', 'Pipeline: normalize -> enrich', 'Hot path: lock-free + zero-copy'],
    repo: 'https://github.com/hans2001',
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'Distributed GPU-Accelerated LLM Inference',
    context: 'AI infrastructure · Distributed systems',
    description:
      'Built a distributed LLM serving system with a FastAPI gateway, routing scheduler, and replicated vLLM GPU workers. Integrated LangGraph reasoning workflows to support concurrent inference with dynamic load balancing and automatic failover.',
    impact: 'Optimized token-aware batching and queue-based scheduling with KV-cache management, achieving sub-second p95 latency and 2x token throughput under 50+ concurrent requests.',
    highlight: 'Implemented end-to-end observability with OpenTelemetry to track latency, throughput, and error rates across load and failure testing.',
    tags: ['Performance', 'Evaluation', 'Benchmarking'],
    metrics: ['Serving architecture: gateway + scheduler + replicated GPU workers', 'Latency: sub-second p95', 'Throughput: 2x', 'Load: 50+ concurrent requests'],
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
    role: 'Remote Software Engineer Intern',
    org: 'Folio AI',
    orgUrl: 'https://gofolio.ai',
    location: 'San Jose, CA (Remote)',
    dates: 'Sep 2025 - Nov 2025',
    employmentType: 'Part-time',
    group: 'additional',
    bullets: [
      'Delivered <10ms P99 reads on a real-time financial backend using FastAPI + SQLAlchemy, PostgreSQL, and a Redis zset time-series store fed by 100k+ Yahoo Finance events.',
      'Built fault-isolated WebSocket + Redis ingestion stages with deterministic retry and backpressure, improving stability by 60% under peak load.',
      'Integrated LangGraph agentic workflows (Gemini + tool nodes) with Redis-backed retrieval to produce multi-step market/option insights, cutting analyst turnaround by 3×.'
    ],
    metrics: ['P99 read latency: <10ms', 'Ingestion events: 100k+', 'Stability gain: +60%', 'Turnaround: 3x faster']
  },
  {
    role: 'Software Engineer Intern (Innovation Lab)',
    org: 'Hong Kong Telecom (HKT)',
    orgUrl: 'https://www.hkt.com/?locale=en',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    employmentType: 'Full-time',
    bullets: [
      'Built a company-wide GenAI platform by customizing Libre-chat/Open WebUI stacks with Node.js + React, deploying OpenAI, Gemini, and Llama3 via Ollama on-prem for 20+ internal teams.',
      'Extended the codebase with LangChain to integrate a proprietary compliance-trained LLM through Azure API calls.',
      'Created Next.js REST endpoints for a file management layer that handles uploads/retrievals/deletions, powering RAG document workflows.',
      'Integrated OpenAI Assistants API for context-aware responses, lifting question-answer accuracy by ~30%.',
      'Automated Docker-based platform installs across Windows/Linux via scripted tooling and orchestrated VPN-tunneled container networking with Docker Compose to bypass regional API blocks.',
      'Refreshed Tap&Go wallet rewards with a Flutter-powered merchant search (brand/category/region filters) backed by local JSON data.',
      'Built a Python automation pipeline that extracts Excel data, scripts Mermaid diagrams, and renders wireless on-site cell diagrams in minutes, cutting generation time 90%.'
    ],
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
      'Built an AI-driven Next.js learning platform with HKUST Center for Education Innovation, securing HKD 250k funding.',
      'Developed an immersive Babylon.js + Ammo.js virtual classroom with Blender assets, physics, drag-and-drop, avatar movement, spatial audio, and Meta Quest 3 WebXR controls.',
      'Embedded multimedia video/audio playback, dynamic blackboards, and clickable shelves using TypeScript for richer interactions.',
      'Engineered a multimodal chat interface with Whisper-powered audio-to-text, SSE streaming with token tracking/retry logic, Markdown/code-block rendering, and Redux-managed feedback.',
      'Deployed a Colyseus-based avatar networking layer on Fly.io to coordinate 100+ concurrent users.'
    ],
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
      'Built real-time Bloomberg Data License / B-PIPE monitoring dashboards with Node.js + Vue.js, flagging 15+ anomalous patterns across 7 departments.',
      'Engineered Knex.js-backed REST query/mutation endpoints to process 100k+ Bloomberg invoice records in Oracle, providing schema management and transactional safety.',
      'Delivered a TypeScript + React derivatives valuation SaaS to meet SFC compliance while automating data ingestion and reporting.',
      'Crafted reusable UI components with TypeScript generics (conditional/indexed/mapped types) and generic parsing helpers with type guards to eliminate runtime validation failures.',
      'Implemented a concurrent Excel export service with dynamic schemas, rate limiting, and paginated processing to bulk-export 10k+ rows without overloading downstream APIs.'
    ],
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
      'Architected a real-time market intelligence SaaS with Node.js/React, driving 10+ product iterations and $1M HKD in HKSTP funding.',
      'Built React Window + Infinite Loader components over paginated GraphQL to stream 5M+ historical records with real-time updates while chunking data to manage memory.',
      'Redesigned protobuf/MongoDB schema, implemented indexes/aggregations, and profiled queries before migrating from Mongoose to the native driver, doubling retrieval speed.',
      'Implemented a GraphQL API with Pothos, layered caching with GraphQL Yoga (configurable TTLs, session scoping, mutation invalidation), cutting endpoint overhead by 40%.',
      'Delivered watchlist CRUD via Cloud Firestore tied to Firebase Auth for scalable tag-based company/industry tracking.',
      'Centralized static assets on AWS S3 + CloudFront, enforced IP-restricted Nginx reverse proxies, and hosted separate Ubuntu EC2 instances for frontend/backend in UAT + production.',
      'Selected t3.medium instances via local resource profiling, configured PM2 for backend resilience, and automated SSL renewals with Certbot.',
      'Created GoDaddy DNS records + subdomains for load-balanced production and isolated UAT, wiring Nginx upstreams to distribute traffic securely.'
    ],
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
      'Led platform architecture across core services to improve maintainability and delivery cycles.',
      'Shipped feature roadmaps end-to-end, from technical design to production release.',
      'Owned code reviews to keep quality and consistency high across teams.',
      'Coordinated Web, Design, and Marketing workflows to align releases and reduce blockers.',
      'Trained and onboarded engineers with technical docs and hands-on sessions.'
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
      'Rolled out the React Native EasyTransit photo upload experience for iOS/Android with a TypeScript Azure Functions backend, lifting UGC ~20%.',
      'Built a Storj-integrated image pipeline with client compression, multipart parsing, and binary buffer conversion that shaved 300ms off responses and trimmed storage ~40%.',
      'Structured Sequelize schemas to manage metadata and built signed-URL REST APIs for time-limited image access.',
      'Delivered a Windows RollCall automation app with Electron + TypeScript, applying Lodash/FP helpers to automate attendance tracking and SQL Server reporting.'
    ],
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
      'OS Kernel Implementation, Programming Language Principles, Programming Paradigm Design, Compiler Design, Database Management Systems, Distributed Systems, Network Programming'
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
      jobTitle: 'GPU systems and performance engineer',
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
  'Repositioning away from AI-infra roles toward GPU systems, parallel computing, and low-level performance engineering.',
  'Comfortable at the C/C++ level, focused on latency budgets, memory behavior, and end-to-end determinism.',
  'Drawn to compilers, developer tooling, and the hardware/software boundary (kernels, drivers, runtime).'
]

const overlapSkills = [
  'C/C++ and Python for performance-critical systems and tooling.',
  'Low-latency networking fundamentals (TCP/UDP, socket programming, feed handling).',
  'Concurrency and synchronization (threading, contention control, lock-aware design).',
  'CUDA + GPU programming fundamentals (threads, blocks, warps, memory hierarchy).',
  'Parallel programming models and concurrency.',
  'Computer architecture fundamentals (CPU/GPU memory, caches, interconnects).',
  'Linux systems knowledge and debugging/profiling.'
]

const openSourceTargets = [
  'CUTLASS (CUDA templates for GEMM kernels)',
  'CUDA Samples (learning + optimization baselines)',
  'RAPIDS (GPU data science stack)',
  'LLVM/MLIR (compiler foundations)',
  'Triton (GPU kernel DSL)'
]

const currentFocus = [
  'Low-latency systems design: predictable pipelines, bounded queues, and backpressure-aware services.',
  'Market data style ingestion: high-throughput feed processing, order-book style state handling, and deterministic replay.',
  'Performance profiling from software to hardware: perf/Nsight traces, cache behavior, and tail-latency analysis.'
]

const currentBuilds = [
  'Microbenchmarks for concurrency, networking hot paths, and memory behavior.',
  'Deterministic performance regression harness with repeatable traces and baseline comparisons.',
  'Hands-on study notes on computer architecture, networking, and low-latency design patterns.'
]

const professionalSignals = [
  'Evidence-driven performance tuning with reproducible results.',
  'Systems thinking across kernels, compilers, runtime behavior, and production operations.',
  'Clear communication of bottlenecks, design tradeoffs, and reliability risks.'
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
  'Systems Performance (Core)': {
    core: [
      {
        title: 'Programming',
        items: ['C++20 (STL, templates, RAII)', 'Python', 'SQL', 'Bash', 'TypeScript', 'Java']
      },
      {
        title: 'Parallel + GPU',
        items: ['SIMD/SIMT mental model', 'Thread blocks & warps', 'Shared memory', 'Memory coalescing']
      },
      {
        title: 'Systems + Performance',
        items: [
          'Multithreading',
          'Memory layout',
          'Cache hierarchy intuition (L1/L2/L3 and DRAM)',
          'Contention-aware design',
          'Linux process and memory model',
          'Concurrency safety',
          'Determinism'
        ]
      }
    ],
    supporting: [
      {
        title: 'Networking',
        items: ['TCP/IP', 'Streaming systems', 'WebSocket-style protocols']
      },
      {
        title: 'Tooling',
        items: ['gcc / clang', 'CMake', 'gdb', 'perf', 'valgrind', 'Google Test', 'Git', 'Unix/Linux', 'RISC-V', 'QEMU', 'POSIX']
      },
      {
        title: 'Profiling + Optimization',
        items: [
          'Benchmarking harnesses',
          'Cache locality',
          'Nsight Systems/Compute',
          'Flame graphs',
          'CPU/GPU timelines',
          'Vectorization and kernel tuning'
        ]
      },
      {
        title: 'Applied Work',
        items: ['CUDA kernels', 'GPU-accelerated data pipelines', 'Low-level benchmarks']
      },
      {
        title: 'Focus',
        items: [
          'Low-latency C++ systems for financial applications, emphasizing concurrency safety, determinism, and production performance.'
        ]
      }
    ]
  },
  'Systems Design (Learning)': {
    core: [
      {
        title: 'Design Skills',
        items: [
          'Latency budgeting',
          'Throughput modeling',
          'Backpressure',
          'Failure isolation',
          'Idempotency design',
          'State-machine thinking'
        ]
      },
      {
        title: 'Application Patterns',
        items: [
          'Layered and modular architecture',
          'Domain boundaries and service decomposition',
          'E-commerce flow design (catalog/cart/checkout/order)',
          'Inventory and payment consistency patterns',
          'Async job and workflow orchestration'
        ]
      },
      {
        title: 'Distributed Systems',
        items: [
          'Pub/sub and stream processing patterns',
          'Partitioning and sharding basics',
          'Retry/backoff/circuit-breaker patterns',
          'At-least-once and exactly-once tradeoffs',
          'Consistency vs availability'
        ]
      },
      {
        title: 'Tradeoffs',
        items: ['Cost vs performance', 'Batch vs streaming', 'Operational simplicity vs flexibility']
      }
    ],
    supporting: [
      {
        title: 'Data Systems',
        items: ['PostgreSQL', 'Redis', 'Kafka basics', 'Caching strategies', 'Data retention and replay strategy']
      },
      {
        title: 'Cloud-Native + Infra',
        items: [
          'Container-first service design',
          'Kubernetes workload patterns',
          'CI/CD and progressive delivery',
          'Infrastructure as code basics',
          'Service observability and SLO-driven operations'
        ]
      },
      {
        title: 'Virtualization + Runtime',
        items: ['VM and container isolation basics', 'QEMU workflows', 'Resource limits and scheduling behavior']
      },
      {
        title: 'AI Infra Patterns',
        items: [
          'Model gateway + worker pool pattern',
          'Queue-based batching and scheduling',
          'Online/offline pipeline separation',
          'Tracing and metrics for model serving'
        ]
      }
    ]
  },
  'AI Infrastructure + Full-Stack': {
    core: [
      {
        title: 'Programming',
        items: [
          'Python',
          'TypeScript/JavaScript',
          'C++20 (STL, templates)',
          'Java (JVM, Collections)',
          'SQL',
          'Bash',
          'YAML',
          'MATLAB'
        ]
      },
      {
        title: 'Backend & Data',
        items: [
          'Redis',
          'Kafka',
          'GraphQL',
          'WebSocket',
          'PostgreSQL',
          'MongoDB',
          'pgvector',
          'Pandas',
          'NumPy',
          'Grafana',
          'PySpark'
        ]
      },
      {
        title: 'AI & Infra',
        items: [
          'LangChain',
          'Docker',
          'AWS',
          'Terraform',
          'Git',
          'vLLM',
          'Kubernetes',
          'Unix',
          'Pinecone',
          'Dagster',
          'OpenTelemetry',
          'PyTorch'
        ]
      }
    ],
    supporting: [
      {
        title: 'APIs & Web',
        items: ['FastAPI', 'Spring Boot', 'Node.js', 'React.js', 'Next.js', 'Electron', 'Vue.js', 'HTML/CSS']
      },
      {
        title: 'Focus',
        items: ['Strong competency shipping AI infrastructure end-to-end, from backend services to production operations.']
      }
    ]
  },
  'Systems Internals (Learning)': {
    core: [
      {
        title: 'Runtime internals',
        items: ['Memory allocators', 'Process/thread model', 'Calling conventions', 'Linking + binary formats']
      },
      {
        title: 'Toolchain basics',
        items: ['Compiler flags and optimization levels', 'IR awareness (basic)', 'Symbol/debug info basics']
      }
    ],
    supporting: [
      {
        title: 'Languages',
        items: ['C++', 'C', 'Python', 'Rust (learning)', 'Assembly (reading)']
      },
      {
        title: 'Focus',
        items: [
          'Supporting skillset to reason about low-level behavior and performance regressions.'
        ]
      }
    ]
  },
  
}

const normalizeSkill = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim()

const buildUniqueSkillSets = (sets) => {
  const seen = new Set()
  const result = {}

  for (const [track, groups] of Object.entries(sets)) {
    const dedupeGroup = (group) => {
      const uniqueItems = []
      for (const item of group.items) {
        const key = normalizeSkill(item)
        if (seen.has(key)) {
          continue
        }
        seen.add(key)
        uniqueItems.push(item)
      }
      if (!uniqueItems.length) {
        return null
      }
      return { ...group, items: uniqueItems }
    }

    const core = groups.core.map(dedupeGroup).filter(Boolean)
    const supporting = groups.supporting.map(dedupeGroup).filter(Boolean)

    if (core.length || supporting.length) {
      result[track] = { core, supporting }
    }
  }

  return result
}

const skillSets = buildUniqueSkillSets(rawSkillSets)
const skillTracks = Object.keys(skillSets)

function App() {
  const [activeSection, setActiveSection] = useState('profile')
  const prerenderDispatched = useRef(false)
  const renderExperienceCard = (item) => (
    <article className="panel experience-panel" key={`${item.org}-${item.role}`}>
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
      <ul className="plain-list">
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
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
      <p>{project.description}</p>
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
      {project.metrics?.length ? (
        <div className="metric-row">
          {project.metrics.map((metric) => (
            <span className="metric-pill" key={metric}>
              {metric}
            </span>
          ))}
        </div>
      ) : null}
      <div className="project-footer">
        {project.hideLink || !project.repo ? (
          <span className="project-link project-link-muted">Project overview</span>
        ) : (
          <a className="project-link" href={project.repo} target="_blank" rel="noopener noreferrer">
            Project overview
          </a>
        )}
        <div className="tag-row">
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
            <p className="hero-role">Systems &amp; performance engineering</p>
            <p className="hero-summary">
              I build deterministic C/C++ systems and profile for hardware bottlenecks across memory, concurrency, and
              throughput. My technical direction is performance-focused systems work at the hardware/software boundary:
              kernels, compilers/toolchains, and measurable latency behavior in production environments.
            </p>
            <div className="hero-meta">
              <span>Open to systems, platform, backend, performance, and market-infrastructure engineering roles</span>
              <span className="hero-meta-highlight">Open to Hong Kong &amp; US locations</span>
            </div>
          </div>
          <div className="hero-side">
            <p className="hero-side-title">Breadth</p>
            <p className="hero-side-line">Full-stack: React, Next.js, Node.js, TypeScript</p>
            <p className="hero-side-line">AI/Python: PyTorch, NumPy, Pandas, FastAPI</p>
            <p className="hero-side-line">Systems design: backpressure, reliability, SLO-driven design</p>
            <p className="hero-side-line">Market infra interest: exchange connectivity, market data, and execution reliability</p>
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

        {activeSection === 'overview' ? (
          <section className="section" id="overview">
            <div className="section-heading">
              <h2>Focus</h2>
            </div>
            <div className="panel-grid">
              <article className="panel">
                <h3>Current technical focus</h3>
                <ul className="plain-list">
                  {currentFocus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <h3>In-progress builds</h3>
                <ul className="plain-list">
                  {currentBuilds.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <h3>Open-source targets</h3>
                <ul className="plain-list">
                  {openSourceTargets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <h3>Engineering principles</h3>
                <ul className="plain-list">
                  {professionalSignals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <h3>Core overlap skills</h3>
                <ul className="plain-list">
                  {overlapSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <h3>Target role direction</h3>
                <ul className="plain-list">
                  <li>Primary fit: systems and performance engineering where reliability and latency matter.</li>
                  <li>Also open: platform, backend, and infrastructure roles with strong technical ownership.</li>
                  <li>Domain interests: financial markets, market data quality, and low-latency execution reliability.</li>
                </ul>
              </article>
            </div>
          </section>
        ) : null}

        {activeSection === 'experience' ? (
          <section className="section" id="experience">
            <div className="section-heading">
              <h2>Experience (prior)</h2>
            </div>
            <div className="panel-grid dense tab-panel">
              {experiences.map(renderExperienceCard)}
            </div>
          </section>
        ) : null}

        {activeSection === 'projects' ? (
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

        {activeSection === 'profile' ? (
          <section className="section" id="profile">
            <div className="section-heading">
              <h2>Profile</h2>
            </div>
            <div className="panel-grid">
              <article className="panel">
                <h3>Positioning</h3>
                <p>
                  I focus on systems performance and reliability, with strong overlap across low-level engineering,
                  end-to-end platform delivery, and production-minded system design. I am also interested in applying
                  these skills to market infrastructure problems in quant and crypto environments. I keep my positioning
                  intentionally broad enough to contribute across different product domains where systems quality is a core requirement.
                </p>
                <ul className="plain-list">
                  {positioningHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <h3>What I deliver</h3>
                <ul className="plain-list">
                  <li>Performance-first system design with explicit latency and throughput targets.</li>
                  <li>Production-ready services across backend, data pipelines, and observability.</li>
                  <li>Evidence-driven optimization with benchmarks, profiling traces, and regression checks.</li>
                  <li>Low-latency engineering mindset applicable to market data, execution infrastructure, and other real-time systems.</li>
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
              <article className="panel">
                <h3>Computer-side EE foundation</h3>
                <p>
                  I keep the computer-systems part of my EE background visible because it directly supports systems
                  software work: architecture-aware performance decisions, networking intuition, and quantitative
                  reasoning in design tradeoffs. This includes practical intuition from VLSI/SRAM design and cache-level
                  behavior (L1/L2/L3 to DRAM) when analyzing performance bottlenecks.
                </p>
                <ul className="plain-list">
                  {computerSideEeCourses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </article>
            </div>

            <p className="group-subtitle">Skills by category</p>
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

        {activeSection === 'contact' ? (
          <section className="section" id="contact">
            <div className="section-heading">
              <h2>Contact</h2>
            </div>
            <div className="panel-grid">
              <article className="panel">
                <p>
                  Reach me for systems, platform, backend, infrastructure, or performance-oriented engineering work.
                  I am open to multiple role shapes as long as the work emphasizes strong engineering fundamentals and measurable outcomes.
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
