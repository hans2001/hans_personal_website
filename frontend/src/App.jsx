import { useEffect, useRef, useState } from 'react'
import './App.css'

const SITE_URL = 'https://chaksingho.com'
const PRIMARY_NAME = 'Chak Sing Ho'
const ALT_NAME = 'Ho Chak Sing'
const ALT_NAME_EN = 'Hans Ho'
const BRAND_NAME = `${PRIMARY_NAME} | ${ALT_NAME_EN} | ${ALT_NAME} | Hans`
const BASE_TITLE = `${BRAND_NAME} | AI infrastructure and distributed systems engineer`
const BASE_DESCRIPTION = `${PRIMARY_NAME} (also known as ${ALT_NAME_EN}, ${ALT_NAME}, or Hans) builds AI infrastructure and distributed evaluation systems: control planes, leases and state machines, agent evaluation harnesses, and the C++/systems performance work underneath them.`
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
    title: 'TTEH Agent Evaluation Flywheel',
    context: 'Distributed systems · Evaluation infrastructure',
    status: 'Shipped',
    description:
      'A distributed control plane that runs overnight on a single host to decide whether AI-authored bug fixes actually work. A supervisor, nightly controller, per-lane daemons, eval children, and capture workers coordinate through SQLite transactions and TTL leases rather than a shared call stack, so a crashed worker releases its task instead of stranding it.',
    impact: 'Replaced "the diff looks plausible" with a falsifiable verdict, and produced a transferable result: swapping only the author of the grading test moved the pass rate from 27.5% to 65.6%, meaning self-authored benchmarks overstate by ~2.4x.',
    highlight: 'Recovery is safe because identity is composite — task id, run id, controller generation, lane id, owner token, pinned revision — so a worker resurrected from an older generation cannot write into state it no longer owns. Shared state is published by temp file, fsync, and atomic rename; corrupt ledgers fail closed instead of reading as empty.',
    tags: ['Python', 'SQLite', 'Distributed Systems', 'Concurrency'],
    metrics: ['14,328 scored eval runs', '~18 workers / ~6 model slots', 'Nightly: 32 shards / 12 lanes'],
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'Effect House Runtime Verifier',
    context: 'Runtime verification · Anti-fake-green',
    status: 'Shipped',
    description:
      'A behavioral ground-truth service: a TypeScript job shell owns lifecycle, timeouts, and forced cleanup, while a Python decision kernel owns the verdict. It runs the same oracle against the baseline and candidate builds and returns PASS only when the baseline genuinely fails and the candidate passes.',
    impact: 'Made "it compiles" and "it looks right" insufficient, and introduced UNPROVEN as a first-class verdict that forbids a claim in either direction when evidence is missing.',
    highlight: 'The contended resources are physical — one build checkout, one single-instance editor holding a port and the GPU — so serialization is a correctness precondition, not a performance choice. Non-blocking flocks make the design deadlock-free by construction, over a filesystem queue where every transition is a single atomic rename.',
    tags: ['TypeScript', 'Python', 'State Machines', 'Concurrency'],
    metrics: ['Verdicts: PASS / FAIL / UNPROVEN', 'Queue: atomic rename transitions', 'Locks: non-blocking, no hold-and-wait'],
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'Effect House Performance Agent (MCP)',
    context: 'MCP server · Performance engineering',
    status: 'Shipped',
    description:
      'An MCP server exposing 31 governed tools so a creator\'s agent can optimize a live AR effect project. A single manifest is the only source of caller, side-effect, and approval policy, shared identically by the MCP, CLI, and programmatic entry points.',
    impact: 'Turned effect optimization into something an agent can do safely against a creator\'s real project, with a transaction that restores the tree if the run dies mid-surgery.',
    highlight: 'Modeled as a typed state machine — PolicyDecision, Measurement{ok|invalid}, Suspect[], Transaction, Verdict{pass|fail|invalid} — where an invalid at any stage forbids the next from subtracting nulls and calling it a win. Cost is attributed through JS profiling, scene objects, GPU telemetry, and hierarchical ablation.',
    tags: ['TypeScript', 'MCP', 'Profiling', 'GPU Telemetry'],
    metrics: ['31 governed tools', 'Verdicts: pass / fail / invalid', 'Writeback: transactional + restore'],
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'EGOS-2000 Network Stack (CS 6640)',
    context: 'OS + networking internals · DMA/interrupt path',
    status: 'Shipped',
    description:
      'Implemented the Ethernet/UDP send path in EGOS-2000 against an emulated Intel E1000 NIC, tracing packet flow from software descriptors into device-visible DMA buffers and transmit queue state.',
    impact: 'A systems project centered on hardware-facing I/O mechanics instead of application-layer networking abstractions.',
    highlight: 'Focused on descriptor ring management, DMA ownership transfer, and interrupt-driven completion handling in the emulated NIC path.',
    tags: ['C', 'Network Stack', 'DMA', 'Interrupts'],
    demoUrl: 'https://www.youtube.com/watch?v=SMzsY9ywQT0&t=1s',
    demoLabel: 'Demo video',
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'UDP Multicast L2 Order-Book Engine',
    context: 'Low-level systems · Deterministic pipelines',
    status: 'Shipped',
    description:
      'A UDP multicast ingest pipeline and binary protocol parser feeding an in-memory L2 order book, with deterministic replay for correctness checks under bursty traffic.',
    impact: 'Enabled repeatable tail-latency regression checks and order-book correctness under bursty feeds.',
    highlight: 'Zero-copy ingest path with contention-aware synchronization across the L2 pipeline.',
    tags: ['C++20', 'Low Latency', 'Concurrency'],
    repo: 'https://github.com/hans2001/low-latency-market-data-engine',
    group: 'featured'
  },
  {
    title: 'C++ Work-Stealing Thread Pool Scheduler',
    context: 'Systems · Concurrency',
    status: 'Shipped',
    description:
      'A fixed-size scheduler with work-stealing queues and explicit task lifetimes, benchmarked against std::async to quantify throughput and overhead differences.',
    impact: 'Documented throughput tradeoffs under a bounded worker pool.',
    highlight: 'Work-stealing queues with explicit lifetimes and a fixed-size runtime.',
    tags: ['C++', 'Schedulers', 'Benchmarks'],
    repo: 'https://github.com/hans2001/cpp-thread-pool',
    group: 'featured'
  },
  {
    title: 'Tiny Tensor Compiler',
    context: 'Compiler/runtime systems · ML execution',
    status: 'Building',
    description:
      'A small compiler pipeline for tensor-style expressions: parsing, AST construction, IR lowering, optimization passes, and a NumPy-backed execution path. In progress, not finished.',
    impact: 'Compiler fundamentals as a concrete project rather than coursework, aimed at ML runtime and graph execution work.',
    highlight: 'Planned passes include constant folding, dead-code elimination, shape-aware execution planning, and simple operator fusion over a tiny tensor IR.',
    tags: ['Python', 'Compiler', 'IR', 'ML Systems'],
    hideLink: true,
    group: 'featured'
  },
  {
    title: 'Power-Gated 8kb SRAM (TSMC 180nm)',
    context: 'Circuit design · Low-power ICs',
    status: 'Shipped',
    description:
      'A low-power 8kb SRAM with power-gating controls in Cadence Virtuoso (TSMC 180nm), reducing leakage and idle power while preserving state and validating behavior through simulation.',
    impact: 'Reduced leakage and idle power while retaining data.',
    highlight: 'Power-gated SRAM simulated and validated in Cadence Virtuoso.',
    tags: ['TSMC 180nm', 'Power Gating', 'SRAM'],
    metrics: ['Memory size: 8kb', 'Process node: TSMC 180nm'],
    repo: 'https://drive.google.com/file/d/1UUswsKy2AfpEP6Ja7mSuGMwmd4cjCP03/view?usp=sharing',
    linkLabel: 'Project overview',
    schemaType: 'Project',
    group: 'academic'
  },
  {
    title: 'SimCLR Skin Lesion Classifier (ResNet50)',
    context: 'Deep learning · Vision',
    status: 'Shipped',
    description:
      'SimCLR-style contrastive pretraining and semi-supervised learning with a ResNet50 backbone on ISIC skin-lesion datasets, exploring stronger representation learning under limited labels.',
    impact: 'Improved classification robustness over a supervised baseline on ISIC benchmarks.',
    highlight: 'SimCLR pretraining + FixMatch-style pseudo-labeling with ResNet50.',
    tags: ['Deep Learning', 'SimCLR', 'FixMatch'],
    repo: 'https://drive.google.com/file/d/1pfVlWrskko6F7k7LXyLrlDSPqPVgoT6d/view?usp=sharing',
    linkLabel: 'Project overview',
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
      'Built a company-wide GenAI platform for 20+ internal teams, deploying OpenAI, Gemini, and Llama3 via Ollama and adapting the stack for internal agentic workflows.',
      'Integrated proprietary compliance-tuned LLMs and agent/tool orchestration paths for multi-step retrieval and enterprise reasoning flows.',
      'Implemented the document and retrieval layer behind RAG-style workflows, including upload/retrieval/delete paths and context assembly for LLM execution.',
      'Integrated OpenAI Assistants-style context handling for agentic responses, lifting answer accuracy ~35% on internal-document question answering.',
      'Automated Docker-based platform installs across Windows/Linux via scripted tooling and orchestrated VPN-tunneled container networking with Docker Compose to bypass regional API blocks.',
      'Refreshed Tap&Go wallet rewards with a Flutter-powered merchant search (brand/category/region filters) backed by local JSON data.',
      'Built a Python automation pipeline that extracts Excel data, scripts Mermaid diagrams, and renders wireless on-site cell diagrams in minutes, cutting generation time 90%.'
    ],
    metrics: ['Adoption scope: 20+ teams', 'Answer accuracy: +~35%', 'Diagram generation time: -90%']
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
      jobTitle: 'AI infrastructure and distributed systems engineer',
      knowsAbout: [
        'Distributed systems',
        'AI evaluation infrastructure',
        'Agentic AI systems',
        'Concurrency and locking',
        'State machine design',
        'C++ systems',
        'Runtime verification',
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
  'I am most interested in the layer that decides whether generated code is actually correct: oracles, evidence, and the control plane around them.',
  'My longer-term direction is AI developer infrastructure and the compiler/runtime work underneath it.',
  'I care about latency budgets, memory behavior, determinism, and measurable performance under real system constraints.',
  'I am especially drawn to compilers, developer tooling, and the hardware/software boundary.'
]

const recruiterSummary = [
  'I build AI infrastructure and distributed evaluation systems: control planes, worker lifecycles, and harnesses that decide whether generated code actually works.',
  'My strongest areas are distributed state (leases, fencing, single-writer discipline, crash-safe recovery), state-machine design, and C++/Python systems work close to the runtime.',
  'I also have real overlap with graphics and interactive tooling through OpenGL, Babylon.js, and Effect House performance work.'
]

const bestFitRoles = [
  'AI developer infrastructure and evaluation systems',
  'Distributed systems and backend platform engineering',
  'ML systems / inference runtime engineering',
  'Low-latency infrastructure and market-data systems'
]

const credibilitySignals = [
  'Projects here cover networking hot paths, schedulers, DMA/interrupt handling, OpenGL rendering, and compiler/runtime fundamentals.',
  'My internship work spans agentic AI tooling, LLM workflow infrastructure, immersive platforms, and AI harness/runtime-verification work around TikTok Effect House.',
  'The TTEH harness work turned repeated guidance into a shared repo-native workflow, and paired it with an overnight evaluation flywheel that measures whether a given intervention actually helps before the team adopts it.',
  'The common thread is execution quality: systems that need to be explainable, measurable, and close to the runtime behavior underneath them.'
]

const futureDirection = [
  'I am going deeper into AI developer infrastructure: evaluation, verification, and the distributed systems that run them.',
  'That builds directly on the control planes, harnesses, and runtime verification I shipped this year, with compiler/runtime work underneath.',
  'The goal is to stay close to the execution layer rather than drift toward generic application engineering.'
]

const financeConcepts = [
  'Market microstructure: limit order books, spread, depth, and queue position (from building an L2 book off a UDP multicast feed)',
  'Execution quality: slippage, fill probability, latency, and transaction costs',
  'Data reliability for trading systems: timestamp integrity, replayability, and feed consistency'
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
  'AI Infrastructure & Distributed Systems': {
    core: [
      {
        title: 'Distributed State',
        items: [
          'TTL leases and work claiming',
          'Generation fencing and identity-based recovery',
          'Single-writer discipline',
          'Atomic publication and crash-safe recovery',
          'Deadlock-free non-blocking locking',
          'Supervisor state machines and circuit breakers'
        ]
      },
      {
        title: 'Evaluation Infrastructure',
        items: [
          'Closed-book agent evaluation',
          'Falsifiable oracles',
          'Paired A/B and pre-registration',
          'Evidence bundles and provenance',
          'Instrumentation auditing'
        ]
      }
    ],
    supporting: [
      {
        title: 'Agentic / LLM Systems',
        items: [
          'MCP servers and tool policy',
          'Multi-agent role and context isolation',
          'Tool orchestration',
          'RAG pipelines',
          'Context assembly',
          'OpenAI Assistants API',
          'Ollama / self-hosted models'
        ]
      }
    ]
  },
  'Systems & Performance': {
    core: [
      {
        title: 'Programming',
        items: ['C++20 (STL, templates, RAII)', 'Python', 'C', 'TypeScript', 'SQL', 'Bash']
      },
      {
        title: 'Performance & Concurrency',
        items: [
          'Multithreading',
          'Work-stealing schedulers',
          'Cache hierarchy and memory layout',
          'Contention-aware design',
          'Deterministic replay',
          'DMA and interrupt paths'
        ]
      }
    ],
    supporting: [
      {
        title: 'Systems Tooling',
        items: ['gcc / clang', 'CMake', 'gdb', 'perf', 'Google Test', 'Git (worktrees)', 'Linux / POSIX']
      }
    ]
  },
  'Product & Platform Engineering': {
    core: [
      {
        title: 'Backend & APIs',
        items: ['Node.js', 'GraphQL (Pothos, Yoga)', 'REST / WebSocket / SSE', 'Azure Functions', 'Knex.js', 'Sequelize']
      },
      {
        title: 'Data & Storage',
        items: ['MongoDB', 'Oracle (triggers, stored procedures)', 'SQLite', 'Cloud Firestore', 'NumPy / Pandas']
      }
    ],
    supporting: [
      {
        title: 'Frontend',
        items: ['React', 'Vue.js', 'React Native', 'Flutter', 'Electron']
      },
      {
        title: 'Infra & Delivery',
        items: ['Docker / Docker Compose', 'AWS (EC2, S3, CloudFront)', 'Nginx', 'PM2', 'Fly.io', 'CI/CD']
      }
    ]
  },
  'Graphics & Interactive': {
    core: [
      {
        title: 'Graphics',
        items: ['OpenGL', 'Babylon.js', 'WebGL / WebXR', 'Meta Quest 3', 'Blender asset pipelines', 'Effect House']
      }
    ],
    supporting: [
      {
        title: 'Interactive Systems',
        items: ['Scene graph thinking', 'Physics-integrated interaction', 'GPU telemetry and frame profiling']
      }
    ]
  }
}

const skillSets = rawSkillSets
const skillTracks = Object.keys(skillSets)

function App() {
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
      <h3>
        {project.title}
        {project.status ? (
          <span className={`status-tag status-tag--${project.status.toLowerCase()}`}>{project.status}</span>
        ) : null}
      </h3>
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
            <p className="hero-role">AI infrastructure, distributed systems, and performance engineering</p>
            <p className="hero-summary">
              I build the infrastructure that decides whether software actually works: distributed control planes,
              agent evaluation harnesses, and runtime verification. Most recently at TikTok Effect House, where I built
              three production systems for evaluating AI-authored code. Underneath that I care about how software behaves
              close to the machine — memory, concurrency, determinism — and I work in C++ and Python at that boundary.
            </p>
            <p className="hero-proof">
              Most useful thing I found this year: hold an eval pipeline fixed and swap only who writes the grading
              test, and the pass rate moves from <strong>27.5%</strong> to <strong>65.6%</strong>. Benchmarks that let
              the model write its own test overstate it by roughly <strong>2.4x</strong>.
            </p>
            <div className="hero-meta">
              <span>Focused on measurable correctness, distributed state, and performance-critical software.</span>
              <span className="hero-meta-highlight">Open to Hong Kong &amp; US locations</span>
            </div>
          </div>
          <div className="hero-side">
            <p className="hero-side-title">Breadth</p>
            <p className="hero-side-line">Distributed Control Planes: leases and fencing, single-writer state, crash-safe recovery.</p>
            <p className="hero-side-line">Evaluation Infrastructure: closed-book agent evals, falsifiable oracles, paired A/B.</p>
            <p className="hero-side-line">Systems &amp; Performance: C++20, concurrency, cache-aware design, deterministic replay.</p>
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
                  I am primarily targeting AI infrastructure and distributed systems roles. My background is distributed
                  state and evaluation infrastructure built at production scale, sitting on top of C/C++ systems work where
                  memory behavior, concurrency, and determinism matter. I also have real overlap with graphics and
                  immersive tooling, which makes engine-adjacent platform roles a natural second fit.
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
                  <li>Distributed state that survives crashes: leases, fencing, single-writer discipline, atomic publication.</li>
                  <li>Evaluation infrastructure that can be trusted, including the discipline to report a null result.</li>
                  <li>Failures that name their own layer, so the next person does not re-diagnose from zero.</li>
                  <li>Agentic workflow engineering across retrieval, tool use, orchestration, and production constraints.</li>
                  <li>Hardware-conscious implementation across concurrency, memory movement, and critical-path allocation.</li>
                  <li>Graphics and interactive-system fluency across OpenGL, Babylon.js, and engine-adjacent tooling.</li>
                </ul>
              </article>
              <article className="panel">
                <h3>Market-data domain context</h3>
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
              Strongest areas: distributed state and evaluation infrastructure, then C++/Python systems performance.
              Everything listed here appears in a project or role above — nothing is included on familiarity alone.
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
                  Reach me for AI infrastructure, distributed systems, ML systems, graphics/tooling, or performance-oriented engineering work.
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
