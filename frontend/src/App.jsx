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
    role: 'Incoming Summer Intern, Intelligent Creation (Effect House)',
    org: 'TikTok',
    orgUrl: 'https://effecthouse.tiktok.com/',
    location: 'Summer 2026 internship',
    dates: 'Summer 2026 · 12 weeks',
    employmentType: 'Part-time',
    bullets: [
      'Joining TikTok\'s Intelligent Creation team to work on Effect House, the company\'s official AR creation tool for building interactive effects.',
      'The role is centered on creator-facing tooling, editing workflows, and core technology for immersive effect development rather than generic product engineering.',
      'It aligns directly with my interest in graphics/interactive systems, native programming, real-time rendering, and GPU-adjacent platform work; project details will be updated once public.'
    ],
    metrics: ['Program: 12-week internship', 'Area: Effect House / AR creation tooling', 'Focus: editor workflows + core technology']
  },
  {
    role: 'Software Engineer Intern (Innovation Lab)',
    org: 'Hong Kong Telecom (HKT)',
    orgUrl: 'https://www.hkt.com/?locale=en',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    employmentType: 'Full-time',
    bullets: [
      'Built a company-wide GenAI platform for 20+ internal teams, deploying OpenAI, Gemini, and Llama3 via Ollama and adapting the stack for internal agentic workflows.',
      'Integrated proprietary compliance-tuned LLMs and agent/tool orchestration paths for multi-step retrieval and enterprise reasoning flows.',
      'Implemented the document and retrieval layer behind RAG-style workflows, including upload/retrieval/delete paths and context assembly for LLM execution.',
      'Integrated OpenAI Assistants-style context handling for agentic responses, lifting question-answer accuracy by ~30%.',
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
      'Built an AI-driven platform with HKUST Center for Education Innovation, securing HKD 250k funding.',
      'Developed an immersive Babylon.js + Ammo.js virtual classroom with Blender assets, physics, drag-and-drop, avatar movement, spatial audio, and Meta Quest 3 WebXR controls.',
      'Embedded multimedia video/audio playback, dynamic blackboards, and clickable shelves using TypeScript for richer interactions.',
      'Engineered a multimodal chat interface with Whisper-powered audio-to-text, SSE streaming, token tracking/retry logic, and LLM-backed interaction flows.',
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
      'Delivered derivatives valuation tooling to meet SFC compliance while automating data ingestion and reporting flows.',
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
      'Architected a real-time market intelligence platform, driving 10+ product iterations and $1M HKD in HKSTP funding.',
      'Built high-scale data delivery paths over paginated GraphQL to stream 5M+ historical records with real-time updates while controlling memory growth.',
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
      'OS Kernel Implementation, Agentic AI, Programming Language Principles, Programming Paradigm Design, Compiler Design, Database Management Systems, Distributed Systems, Network Programming'
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
  'I am most interested in the execution layer of modern compute: inference runtimes, GPU systems, and hardware-aware C++.',
  'My longer-term direction includes AI compiler/runtime work and kernel-level optimization.',
  'I care about latency budgets, memory behavior, determinism, and measurable performance under real system constraints.',
  'I am especially drawn to compilers, developer tooling, and the hardware/software boundary.'
]

const recruiterSummary = [
  'I work on performance-oriented systems, ML runtime-adjacent software, and agentic infrastructure.',
  'My strongest areas are C/C++ systems thinking, deterministic execution, and hardware-aware software design.',
  'I also have meaningful overlap with graphics and interactive tooling through OpenGL, Babylon.js, and immersive-system work.'
]

const bestFitRoles = [
  'ML systems / inference runtime engineering',
  'GPU compute and kernel-optimization engineering',
  'Low-latency infrastructure and market-data systems',
  'Graphics / interactive tooling and engine-adjacent platform work'
]

const credibilitySignals = [
  'Projects here cover networking hot paths, schedulers, DMA/interrupt handling, OpenGL rendering, and compiler/runtime fundamentals.',
  'My internship work spans agentic AI tooling, LLM workflow infrastructure, immersive platforms, and upcoming AR creation tooling at TikTok Effect House.',
  'The common thread is execution quality: systems that need to be explainable, measurable, and close to the runtime behavior underneath them.'
]

const futureDirection = [
  'I am continuing deeper into compiler/runtime systems, GPU execution, and kernel-level optimization.',
  'That direction builds naturally on my current work in systems performance, ML infrastructure, and graphics/tooling foundations.',
  'The goal is to stay close to the execution layer rather than drift toward generic application engineering.'
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
  'Core Systems & GPU': {
    core: [
      {
        title: 'Programming',
        items: ['C++20 (STL, templates, RAII)', 'Python', 'C', 'SQL', 'Bash']
      },
      {
        title: 'Performance Fundamentals',
        items: [
          'Multithreading',
          'Memory layout',
          'Cache hierarchy (L1/L2/L3 and DRAM)',
          'Contention-aware design',
          'Concurrency safety',
          'Determinism'
        ]
      },
      {
        title: 'GPU & Parallel Compute',
        items: [
          'CUDA',
          'SIMD/SIMT mental model',
          'Thread blocks & warps',
          'Shared memory',
          'Memory coalescing',
          'GPU-accelerated pipelines',
          'Low-level benchmarks'
        ]
      }
    ],
    supporting: [
      {
        title: 'Networking',
        items: ['TCP/IP', 'Streaming systems', 'Deterministic replay', 'Feed handling']
      },
      {
        title: 'Systems Tooling',
        items: ['gcc / clang', 'CMake', 'gdb', 'perf', 'valgrind', 'Nsight Systems/Compute', 'Google Test', 'Git', 'Unix/Linux', 'POSIX']
      },
      {
        title: 'Profiling & Optimization',
        items: ['Benchmarking harnesses', 'Cache locality', 'Flame graphs', 'CPU/GPU timelines', 'Vectorization and kernel tuning']
      }
    ]
  },
  'Distributed & AI Runtime Systems': {
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
        title: 'Distributed Systems',
        items: [
          'Layered and modular architecture',
          'Domain boundaries and service decomposition',
          'Pub/sub and stream processing patterns',
          'Partitioning and sharding basics',
          'Retry/backoff/circuit-breaker patterns',
          'At-least-once and exactly-once tradeoffs',
          'Consistency vs availability',
          'Async job and workflow orchestration'
        ]
      }
    ],
    supporting: [
      {
        title: 'Data & Infra',
        items: ['PostgreSQL', 'Redis', 'Kafka basics', 'Caching strategies', 'Data retention and replay strategy', 'Kubernetes', 'CI/CD', 'Service observability']
      },
      {
        title: 'AI Runtime Patterns',
        items: [
          'PyTorch',
          'vLLM',
          'Model gateway + worker pool pattern',
          'Queue-based batching and scheduling',
          'Online/offline pipeline separation',
          'Tracing and metrics for model serving'
        ]
      },
      {
        title: 'Agentic / LLM Systems',
        items: [
          'LangChain',
          'LangGraph',
          'OpenAI Assistants API',
          'Tool orchestration',
          'RAG pipelines',
          'Context assembly'
        ]
      }
    ]
  },
  'Graphics & Interactive Systems': {
    core: [
      {
        title: 'Applied Graphics',
        items: ['Babylon.js', 'WebGL', 'WebXR', 'Meta Quest 3', 'Blender asset pipelines']
      },
      {
        title: 'APIs & Engines',
        items: [
          'OpenGL',
          'Vulkan',
          'Metal',
          'Unity',
          'Effect House'
        ]
      }
    ],
    supporting: [
      {
        title: 'Interactive Systems',
        items: ['Real-time rendering intuition', 'Scene graph thinking', 'Physics-integrated interaction', 'Spatial audio integration', 'Avatar / immersive environments']
      }
    ]
  },
  'Application & Product Engineering': {
    core: [
      {
        title: 'Languages',
        items: [
          'TypeScript',
          'JavaScript',
          'Python',
          'Java',
          'SQL',
          'Bash',
          'YAML',
          'MATLAB'
        ]
      },
      {
        title: 'Frontend',
        items: [
          'React.js',
          'Next.js',
          'Vue.js',
          'React Native',
          'HTML/CSS',
          'Redux',
          'Flutter',
          'Electron',
          'Swing'
        ]
      }
    ],
    supporting: [
      {
        title: 'Backend & APIs',
        items: [
          'Node.js',
          'FastAPI',
          'Spring Boot',
          'GraphQL',
          'GraphQL Yoga',
          'Pothos',
          'WebSocket',
          'SSE',
          'REST API design',
          'Knex.js',
          'SQLAlchemy',
          'Azure Functions'
        ]
      },
      {
        title: 'Data & Storage',
        items: [
          'PostgreSQL',
          'MongoDB',
          'Oracle',
          'Redis',
          'Kafka',
          'Pandas',
          'NumPy',
          'PySpark',
          'Cloud Firestore'
        ]
      },
      {
        title: 'Infra & Delivery',
        items: [
          'Docker',
          'Docker Compose',
          'Kubernetes',
          'AWS',
          'Terraform',
          'Nginx',
          'PM2',
          'Certbot',
          'Fly.io',
          'OpenTelemetry',
          'Grafana',
          'Dagster'
        ]
      }
    ]
  },
  'Supporting Internals & Tools': {
    core: [
      {
        title: 'Runtime Internals',
        items: ['Memory allocators', 'Process/thread model', 'Calling conventions', 'Linking + binary formats']
      },
      {
        title: 'Toolchain Basics',
        items: ['Compiler flags and optimization levels', 'IR awareness (basic)', 'Symbol/debug info basics']
      }
    ],
    supporting: [
      {
        title: 'Languages',
        items: ['C++', 'C', 'Python', 'Rust', 'Assembly (reading)']
      },
      {
        title: 'Platform Exposure',
        items: ['RISC-V', 'QEMU', 'VM and container isolation basics', 'Resource limits and scheduling behavior', 'Infrastructure as code basics']
      }
    ]
  },
  
}

const skillSets = rawSkillSets
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
            <p className="hero-role">Systems, runtime, and performance engineering</p>
            <p className="hero-summary">
              I build performance-oriented C/C++ systems and care about how software behaves close to the machine:
              memory, concurrency, latency, and runtime efficiency. My strongest traits are systems thinking,
              execution-focused engineering, and a willingness to work at the hardware/software boundary, with growing
              overlap in graphics tooling, GPU-adjacent work, and developer-facing infrastructure.
            </p>
            <div className="hero-meta">
              <span>Focused on deterministic systems, runtime behavior, and performance-critical software.</span>
              <span className="hero-meta-highlight">Open to Hong Kong &amp; US locations</span>
            </div>
          </div>
          <div className="hero-side">
            <p className="hero-side-title">Breadth</p>
            <p className="hero-side-line">Low-Latency &amp; Determinism: C++20, TCP/IP bypass, zero-allocation critical paths.</p>
            <p className="hero-side-line">Hardware-Aware Compute: CUDA, SIMD/SIMT, memory coalescing, cache hierarchy optimization.</p>
            <p className="hero-side-line">Systems Infrastructure: Linux internals, distributed consensus, streaming architectures.</p>
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
                  I am primarily targeting ML systems, GPU runtime, and low-latency engineering roles. My background
                  combines C/C++ systems work, agentic AI infrastructure, and performance-focused software where memory
                  behavior, concurrency, and runtime efficiency matter. I also have solid overlap with graphics and
                  immersive-system tooling, which makes graphics-oriented platform roles a natural adjacent fit.
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
                  My EE background matters because it gives me a better feel for how software interacts with the
                  machine underneath it. That shows up in how I think about cache and memory behavior, networking,
                  performance bottlenecks, and hardware-aware tradeoffs. It also includes hands-on VLSI/SRAM work and
                  computer-organization fundamentals that support lower-level systems and runtime engineering.
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
                  <li>Performance-first system design with explicit latency and throughput targets.</li>
                  <li>Evidence-driven optimization with benchmarks, profiling traces, and regression checks.</li>
                  <li>Agentic workflow engineering across retrieval, tool use, orchestration, and production constraints.</li>
                  <li>Hardware-conscious implementation decisions across concurrency, memory movement, and critical-path allocation.</li>
                  <li>Graphics and interactive-system fluency across Babylon.js, immersive runtime behavior, and engine-adjacent tooling.</li>
                  <li>Low-latency engineering mindset applicable to market data, execution infrastructure, and GPU-serving systems.</li>
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
              Strongest areas: systems performance, distributed/agentic AI infrastructure, and GPU/runtime-adjacent
              engineering. Additional experience spans graphics tooling, interactive systems, and full-stack product delivery.
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

        {activeSection === 'contact' ? (
          <section className="section" id="contact">
            <div className="section-heading">
              <h2>Contact</h2>
            </div>
            <div className="panel-grid">
              <article className="panel">
                <p>
                  Reach me for ML systems, GPU runtime, graphics/tooling, low-latency infrastructure, or performance-oriented engineering work.
                  The best fit is work that values strong systems fundamentals, measurable performance, and hardware-aware software decisions.
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
