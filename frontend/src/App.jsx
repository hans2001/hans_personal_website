import { useEffect, useRef, useState } from 'react'
import './App.css'

const SITE_URL = 'https://chaksingho.com'
const PRIMARY_NAME = 'Chak Sing Ho'
const ALT_NAME = 'Ho Chak Sing'
const ALT_NAME_EN = 'Hans Ho'
const BRAND_NAME = `${PRIMARY_NAME} | ${ALT_NAME_EN} | ${ALT_NAME} | Hans`
const BASE_TITLE = `${BRAND_NAME} | AI infrastructure & low-latency C++ systems`
const BASE_DESCRIPTION = `${PRIMARY_NAME} (also known as ${ALT_NAME_EN}, ${ALT_NAME}, or Hans) builds low-latency C++ systems and AI infrastructure for market data teams, focused on deterministic performance, clean data paths, and production reliability.`
const OG_IMAGE = `${SITE_URL}/og.jpg`

const sectionMeta = {
  top: {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION
  },
  about: {
    title: `How I Work | ${BRAND_NAME}`,
    description:
      'Clear goals, simple metrics, and reliable handoffs.'
  },
  experience: {
    title: `Experience | ${BRAND_NAME}`,
    description: 'Timeline of internships and leadership with measurable impact across fintech, AI, and research.'
  },
  projects: {
    title: `Projects | ${BRAND_NAME}`,
    description: 'Selected C++ systems, concurrency, and data-platform projects with open-source repos.'
  },
  skills: {
    title: `Skills | ${BRAND_NAME}`,
    description: 'Skills across systems programming, data infrastructure, and platform tooling; organized by track.'
  },
  education: {
    title: `Education | ${BRAND_NAME}`,
    description: 'Education in computer science and electronic engineering across Hong Kong and the US.'
  },
  contact: {
    title: `Contact | ${BRAND_NAME}`,
    description: `Contact ${PRIMARY_NAME} (${ALT_NAME_EN} | ${ALT_NAME} | Hans) for low-latency backend and data infrastructure roles.`
  }
}

const sectionIds = [
  'top',
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'contact'
]

const projects = [
  {
    title: 'Low-Latency Market Data Engine',
    description:
      'Designed an in-memory L2 order book with contention-aware synchronization, deterministic replay, and a tail-latency harness.',
    impact: 'Enabled repeatable tail-latency regression checks for tuning and correctness.',
    highlight: 'Deterministic replay paired with contention-aware synchronization across the L2 pipeline.',
    tags: ['C++20', 'Low Latency', 'Concurrency'],
    repo: 'https://github.com/hans2001/low-latency-market-data-engine',
    group: 'featured'
  },
  {
    title: 'Work-Stealing Task Scheduler',
    description:
      'Built a fixed-size scheduler with work-stealing queues, explicit lifetimes, and throughput benchmarks vs std::async.',
    impact: 'Documented throughput tradeoffs under a bounded worker pool.',
    highlight: 'Work-stealing queues with explicit lifetimes and a fixed-size runtime.',
    tags: ['C++', 'Schedulers', 'Benchmarks'],
    repo: 'https://github.com/hans2001/cpp-thread-pool',
    group: 'featured'
  },
  {
    title: 'Deterministic Agent Framework',
    description:
      'Extended Open Interpreter with deterministic execution, policy-based tool access, and replayable audits.',
    impact: 'Added policy gates and auditability for tool-using agents.',
    highlight: 'Deterministic execution harness with policy-based tool access.',
    tags: ['AI Infra', 'Determinism', 'Policy Engine'],
    repo: 'https://github.com/hans2001',
    group: 'featured'
  },
  {
    title: 'Power-Gated 8kb SRAM Design',
    context: 'Circuit design · Low-power ICs',
    description:
      'Designed a low-power SRAM using power gating, simulated in Cadence Virtuoso to reduce leakage and idle power while retaining data.',
    impact: 'Reduced leakage and idle power while retaining data.',
    highlight: 'Power-gated SRAM simulated and validated in Cadence Virtuoso.',
    tags: ['TSMC 180nm', 'Power Gating', 'SRAM'],
    repo: 'https://drive.google.com/file/d/1UUswsKy2AfpEP6Ja7mSuGMwmd4cjCP03/view?usp=sharing',
    linkLabel: 'Project overview',
    schemaType: 'Project',
    group: 'academic'
  },
  {
    title: 'Airbnb Listings ETL + Market Insights',
    context: 'HKUST · Data engineering',
    description:
      'Built an ETL pipeline over Inside Airbnb data to analyze pricing, amenities, and demand across 85 global regions.',
    impact: 'Processed 6–8GB of listings into parquet for consistent, faster analysis.',
    highlight: 'Spark ETL + PySpark SQL with sentiment and pricing model comparisons.',
    tags: ['ETL', 'PySpark', 'Analytics'],
    repo: 'https://drive.google.com/file/d/1afxda583McI0Wp_UDlM5nYFmIQSaUDbV/view?usp=sharing',
    linkLabel: 'Project overview',
    group: 'academic'
  },
  {
    title: 'SimCLR + Skin Lesion Classifier',
    context: 'HKUST · Deep learning',
    description:
      'Applied contrastive pretraining and semi-supervised learning with a ResNet50 encoder on the ISIC skin lesion datasets.',
    impact: 'Improved classification robustness over a supervised baseline on ISIC benchmarks.',
    highlight: 'SimCLR pretraining + FixMatch-style pseudo-labeling with ResNet50.',
    tags: ['Deep Learning', 'SimCLR', 'FixMatch'],
    repo: 'https://drive.google.com/file/d/1pfVlWrskko6F7k7LXyLrlDSPqPVgoT6d/view?usp=sharing',
    linkLabel: 'Project overview',
    group: 'academic'
  },
  {
    title: 'Multi-Calendar App (MVC + GUI)',
    context: 'Northeastern · Productivity tooling',
    description:
      'Built a multi-calendar app with per-calendar timezones, event copy across ranges, and iCal/CSV export via CLI + Swing GUI.',
    impact: 'Enabled cross-calendar event copying with timezone-aware scheduling.',
    highlight: 'CLI + Swing GUI with iCal/CSV export support.',
    repo: 'https://github.com/hans2001/CS5010--MultiCalendarApp',
    linkLabel: 'Project overview',
    tags: ['Java', 'MVC', 'Design Patterns'],
    group: 'academic'
  }
]

const featuredProjects = projects.filter((project) => project.group !== 'academic')
const academicProjects = projects.filter((project) => project.group === 'academic')

// Note: experiences and education are defined later in the file but moved here for schemaData reference
const experiences = [
  {
    role: 'Software Engineer Intern (Volunteer)',
    org: 'Folio AI',
    orgUrl: 'https://gofolio.ai',
    location: 'San Jose, CA (Remote)',
    dates: 'Sep 2025 - Dec 2025',
    employmentType: 'Part-time',
    group: 'additional',
    bullets: [
      'Delivering a low-latency read path for high-rate event analytics using FastAPI, PostgreSQL, and Redis.',
      'Benchmarked and tuned read performance for predictable tail latency.',
      'Improved burst stability with deterministic retries and backpressure.'
    ]
  },
  {
    role: 'Software Engineer Intern (Innovation Lab)',
    org: 'Hong Kong Telecom (HKT)',
    orgUrl: 'https://www.hkt.com/?locale=en',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    employmentType: 'Full-time',
    bullets: [
      'Operationalized an internal GenAI platform with multi-model routing across cloud and on-prem.',
      'Improved answer quality with structured prompting, evaluation loops, and context management.',
      'Enabled compliance-safe usage with RAG document workflows and policy controls.',
      'Automated Docker installs and VPN-tunneled container networking to unblock regional API access.'
    ]
  },
  {
    role: 'Senior Developer Intern, Theoretical & Computational Chemistry Lab (Supervisor: Prof. Haibin Su)',
    org: 'Hong Kong University of Science and Technology',
    orgUrl: 'https://hkust.edu.hk',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    employmentType: 'Part-time',
    bullets: [
      'Built an AI-driven learning platform with Next.js, securing HKD 250k funding from HKUST Center for Education Innovation.',
      'Designed a 3D virtual classroom with Babylon.js, Ammo.js, and Blender, enabling avatar control, spatial audio, and WebXR for Meta Quest 3.',
      'Engineered a multimodal GenAI chat system with Whisper API, SSE streaming, and context-aware memory for voice + markdown output.',
      'Developed real-time avatar networking with Colyseus on Fly.io, supporting 100+ concurrent users.'
    ]
  },
  {
    role: 'Information Technology Intern',
    org: 'China International Capital Corporation (CICC)',
    orgUrl: 'https://cicc.zhiye.com/custom/index',
    location: 'Hong Kong',
    dates: 'Oct 2023 - Jan 2024',
    employmentType: 'Part-time',
    bullets: [
      'Built internal tools for market data usage monitoring and derivatives valuation.',
      'Flagged anomalous spend patterns across departments with a real-time dashboard.',
      'Delivered a valuation SaaS to meet regulatory requirements with typed UI + Excel export.'
    ]
  },
  {
    role: 'Software Engineer Intern',
    org: 'Midas Analytics Limited (FinTech)',
    orgUrl: 'https://midasanalytics.ai',
    location: 'Hong Kong',
    dates: 'Jun 2022 - Oct 2023',
    employmentType: 'Full-time',
    bullets: [
      'Founding engineer who built the market intelligence SaaS platform from scratch, securing HKD 1M+ in VC funding.',
      'Shipped production AWS infrastructure (EC2, S3/CloudFront, Nginx, PM2, SSL, load balancing).',
      'Improved retrieval latency via MongoDB schema redesign and native driver migration.',
      'Built high-volume browsing with React Window + GraphQL, reducing memory via chunking.',
      'Reduced API overhead with a typed GraphQL API and caching.'
    ]
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
    ]
  },
  {
    role: 'Software Engineer Intern',
    org: 'SOCIF Limited (Smart Travel Software)',
    orgUrl: 'https://www.socif.co/?lang=en',
    location: 'Hong Kong',
    dates: 'Dec 2021 - Jan 2022',
    employmentType: 'Full-time',
    bullets: [
      'Built mobile and desktop tools for transit operations using React Native and Electron.',
      'Boosted UGC with an iOS/Android photo upload feature on Azure Functions.',
      'Reduced image latency and storage with compression and S3-compatible object storage.'
    ]
  }
]

const education = [
  {
    school: 'Northeastern University',
    url: 'https://www.northeastern.edu/',
    degree: 'M.S. Computer Science',
    location: 'Boston, MA',
    dates: 'Sep 2025 - May 2027',
    gpa: '4.0 CGPA',
    coursework:
      'OS Kernel Implementation, Programming Language Principles, Programming Paradigm Design, Compiler Design, Database Management Systems, Distributed Systems, Network Programming'
  },
  {
    school: 'Hong Kong Univ. of Sci. & Tech.',
    url: 'https://hkust.edu.hk/',
    degree: 'B.Eng. Electronic Eng. (CS minor)',
    location: 'Hong Kong',
    dates: 'Sep 2020 - May 2024',
    honor: 'Second Class Honors, Division I',
    coursework:
      'Algorithms & Data Structures, Computer Organization, Computer Communication Networks, Discrete Math, Probability & Random Processes, Linear Algebra, C++ & OOP'
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
      jobTitle: 'AI infrastructure and low-latency C++ systems engineer',
      knowsAbout: [
        'Low-latency C++',
        'Market data infrastructure',
        'AI infrastructure',
        'Deterministic systems',
        'Latency budgeting',
        'Observability'
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

const skillSets = {
  'AI Infrastructure': {
    core: [
      {
        title: 'Systems & Backend',
        items: ['Python', 'TypeScript', 'FastAPI', 'Node.js', 'C++', 'REST', 'GraphQL', 'WebSocket']
      },
      {
        title: 'Data & Retrieval',
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'pgvector', 'SQL', 'Mongoose', 'Sequelize', 'Knex']
      },
      {
        title: 'Infra & Cloud',
        items: ['Docker', 'Kubernetes', 'AWS (EC2/S3/CloudFront)', 'Nginx', 'Linux', 'GitHub Actions', 'Terraform']
      }
    ],
    supporting: [
      {
        title: 'Frontend & UX',
        items: ['React', 'Next.js', 'React Native', 'Electron', 'Vue.js', 'Vuetify', 'Chart.js', 'Babylon.js']
      },
      {
        title: 'Languages & Tools',
        items: [
          'TypeScript',
          'JavaScript',
          'Java',
          'C',
          'MATLAB',
          'Spark',
          'GCP',
          'Azure',
          'Firebase',
          'YAML',
          'GoDaddy'
        ]
      }
    ]
  },
  'C++ / Quant Dev': {
    core: [
      {
        title: 'Programming',
        items: ['C++20 (STL, templates, RAII)', 'C', 'Python', 'SQL', 'Bash']
      },
      {
        title: 'Concurrency & Systems',
        items: [
          'Multithreading (std::thread, mutex)',
          'Memory layout',
          'Contention-aware design',
          'Linux process & memory model'
        ]
      },
      {
        title: 'Networking',
        items: ['TCP/IP', 'Streaming systems', 'WebSocket-style protocols']
      }
    ],
    supporting: [
      {
        title: 'Python & Math',
        items: ['PyTorch', 'NumPy', 'Matplotlib', 'Pandas', 'SciPy', 'scikit-learn']
      },
      {
        title: 'Tools',
        items: [
          'gcc / clang',
          'CMake',
          'gdb',
          'perf',
          'valgrind',
          'Google Test',
          'Git',
          'Unix/Linux',
          'RISC-V'
        ]
      },
      {
        title: 'Focus',
        items: [
          'This track reflects my interest in correctness under concurrency and predictable performance in high-stakes systems.'
        ]
      }
    ]
  }
}

const skillTracks = Object.keys(skillSets)

function App() {
  const [activeTrack, setActiveTrack] = useState('AI Infrastructure')
  const [activeSection, setActiveSection] = useState('top')
  const [showAdditionalExperience, setShowAdditionalExperience] = useState(false)
  const visibleAcademicProjects = academicProjects.slice(0, 4)
  const coreExperiences = experiences.filter((item) => item.group !== 'additional')
  const additionalExperiences = experiences.filter((item) => item.group === 'additional')
  const prerenderDispatched = useRef(false)

  const renderExperienceCard = (item) => {
    const [primaryBullet, ...restBullets] = item.bullets
    const extraDetails = item.details?.length ? item.details : []
    const moreBullets = [...restBullets, ...extraDetails]

    return (
      <article className="card" key={`${item.org}-${item.role}`}>
        <div className="card-header">
          <div>
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
              · {item.location}
            </p>
          </div>
          <div className="card-meta">
            <span className="card-date">{item.dates}</span>
            {item.employmentType ? <span className="card-type">{item.employmentType}</span> : null}
          </div>
        </div>
        {primaryBullet ? (
          <ul>
            <li>{primaryBullet}</li>
          </ul>
        ) : null}
        {moreBullets.length ? (
          <details className="experience-details">
            <summary>More impact</summary>
            <ul>
              {moreBullets.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
        ) : null}
      </article>
    )
  }

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (!visibleEntries.length) {
          return
        }
        const [primary] = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (primary?.target?.id) {
          setActiveSection(primary.target.id)
        }
      },
      {
        rootMargin: '0px 0px -45% 0px',
        threshold: [0.25, 0.5, 0.75]
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

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
        <div className="hero-top reveal" style={{ '--delay': '60ms' }}>
          <div>
            <h1>
              <a href={SITE_URL} className="hero-brand-link" aria-label="Home">
                {PRIMARY_NAME} | Hans
              </a>
            </h1>
            <p className="hero-role">
              AI infrastructure &amp; low-latency systems developer
            </p>
          </div>
        </div>
        <div className="hero-grid">
          <div className="hero-copy reveal" style={{ '--delay': '140ms' }}>
            <p className="hero-summary">
              I pursue low-latency C++ systems and AI infrastructure because deterministic pipelines and measurable
              latency budgets unlock clearer, more trustable outcomes. I&rsquo;m curious about how high-frequency
              market data and large-scale AI stacks weave together, and I prototype systems that keep performance
              predictable while surfacing the story behind every packet and inference.
            </p>
            <div className="signal-grid">
              <div className="signal-card">
                <span className="signal-label">Execution</span>
                <span className="signal-value">Define scope, deliver milestones, and de-risk early.</span>
              </div>
              <div className="signal-card">
                <span className="signal-label">Reliability</span>
                <span className="signal-value">Benchmark, monitor, and harden for predictable performance.</span>
              </div>
              <div className="signal-card">
                <span className="signal-label">Collaboration</span>
                <span className="signal-value">Share context, unblock early, and write it down.</span>
              </div>
            </div>
            <div className="hero-meta">
              <span>Seeking AI infrastructure or C++ roles (quant system focus)</span>
              <span className="hero-meta-highlight">Open to Hong Kong &amp; US locations</span>
            </div>
          </div>
          <div className="hero-portrait reveal" style={{ '--delay': '200ms' }}>
            <img
              src="/hans.jpeg"
              alt={`${PRIMARY_NAME} (${ALT_NAME} | Hans) portrait`}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

      </header>

      <main className="main">
        <section className="section" id="experience">
          <div className="section-heading">
            <h2>Experience</h2>
          </div>
          <div className="card-stack">
            {coreExperiences.map(renderExperienceCard)}
          </div>
          {additionalExperiences.length ? (
            <div className="experience-toggle">
              <button
                type="button"
                className="toggle-button"
                onClick={() => setShowAdditionalExperience((prev) => !prev)}
              >
                {showAdditionalExperience ? 'Show fewer' : 'Show more'}
              </button>
            </div>
          ) : null}
          {showAdditionalExperience ? (
            <>
              <p className="section-subhead">Additional experience</p>
              <div className="card-stack">
                {additionalExperiences.map(renderExperienceCard)}
              </div>
            </>
          ) : null}
        </section>

        <section className="section" id="projects">
          <div className="section-heading">
            <h2>Selected projects</h2>
          </div>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  {project.context ? <p className="project-context">{project.context}</p> : null}
                  <p>{project.description}</p>
                  {project.impact ? (
                    <p className="project-impact">
                      <span className="project-label">Impact</span>
                      {project.impact}
                    </p>
                  ) : null}
                  {project.highlight ? (
                    <p className="project-highlight">
                      <span className="project-label">Highlight</span>
                      {project.highlight}
                    </p>
                  ) : null}
                </div>
                <div className="project-footer">
                  {project.repo && project.group === 'academic' ? (
                    <a className="project-link" href={project.repo} target="_blank" rel="noopener noreferrer">
                      {project.linkLabel || 'View code'}
                    </a>
                  ) : (
                    <span className="project-link project-link-muted">
                      {project.linkLabel || 'View code'}
                    </span>
                  )}
                  <div className="tag-row">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span className="tag-text" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>Research &amp; academic</h2>
          </div>
          <div className="projects-grid">
            {visibleAcademicProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  {project.context ? <p className="project-context">{project.context}</p> : null}
                  <p>{project.description}</p>
                  {project.impact ? (
                    <p className="project-impact">
                      <span className="project-label">Impact</span>
                      {project.impact}
                    </p>
                  ) : null}
                  {project.highlight ? (
                    <p className="project-highlight">
                      <span className="project-label">Highlight</span>
                      {project.highlight}
                    </p>
                  ) : null}
                </div>
                <div className="project-footer">
                  {project.repo ? (
                    <a className="project-link" href={project.repo} target="_blank" rel="noopener noreferrer">
                      {project.linkLabel || 'View code'}
                    </a>
                  ) : (
                    <span className="project-link project-link-muted">Project overview</span>
                  )}
                  <div className="tag-row">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span className="tag-text" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-heading">
            <h2>Skills</h2>
          </div>
          <div className="skills-toggle" role="tablist" aria-label="Skill track toggle">
            {skillTracks.map((track) => (
              <button
                key={track}
                type="button"
                className={`toggle-button ${track === activeTrack ? 'active' : ''}`}
                onClick={() => setActiveTrack(track)}
                role="tab"
                aria-selected={track === activeTrack}
              >
                {track}
              </button>
            ))}
          </div>
          <div className="skills-panels">
            {skillTracks.map((track) => {
              const skills = skillSets[track]
              const isActive = track === activeTrack
              return (
                <div
                  key={track}
                  className={`skills-panel ${isActive ? 'is-active' : ''}`}
                  role="tabpanel"
                  aria-hidden={!isActive}
                >
                  <div className="skills-split">
                    <div className="skills-column">
                      <div className="skills-grid compact">
                        {skills.core.map((group) => (
                          <div className="skill-card" key={group.title}>
                            <h3>{group.title}</h3>
                            <div className="tag-row skill-tags">
                              {group.items.map((item) => (
                                <span className="tag" key={item}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="skills-column supporting">
                      <div className="skills-grid compact">
                        {skills.supporting.map((group) => (
                          <div className="skill-card" key={group.title}>
                            <h3>{group.title}</h3>
                            <div className="tag-row skill-tags">
                              {group.items.map((item) => (
                                <span className="tag" key={item}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="section" id="education">
          <div className="section-heading">
            <h2>Education</h2>
          </div>
          <div className="education-grid">
            {education.map((item) => (
              <div className="education-card" key={item.school}>
                <h3>
                  {item.url ? (
                    <a
                      className="education-link"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
              </div>
            ))}
          </div>
        </section>

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
                  <a href="tel:+19735171462">Phone</a>
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
          <span>Built for speed, clarity, and auditability.</span>
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
