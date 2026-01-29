import { useEffect, useRef, useState } from 'react'
import './App.css'

const SITE_URL = 'https://chaksingho.com'
const PRIMARY_NAME = 'Chak Sing Ho'
const ALT_NAME = 'Ho Chak Sing'
const ALT_NAME_EN = 'Hans Ho'
const BRAND_NAME = `${PRIMARY_NAME} | ${ALT_NAME_EN} | ${ALT_NAME} | Hans`
const BASE_TITLE = `${BRAND_NAME} | Applied AI & AI infrastructure (HK/US)`
const BASE_DESCRIPTION = `${PRIMARY_NAME} (also known as ${ALT_NAME_EN}, ${ALT_NAME}, or Hans) builds applied AI systems and LLM infrastructure for client-facing deployments, turning prototypes into reliable, observable, production-grade services.`
const OG_IMAGE = `${SITE_URL}/og.jpg`
const sectionMeta = {
  top: {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION
  },
  experience: {
    title: `Applied AI Experience | ${BRAND_NAME}`,
    description: 'Applied AI and infrastructure experience with measurable impact across production systems.'
  },
  projects: {
    title: `Open Source Contributions | ${BRAND_NAME}`,
    description: 'Active open-source targets in LLM serving, observability, and production AI infrastructure.'
  },
  skills: {
    title: `Applied AI Skills | ${BRAND_NAME}`,
    description: 'Applied AI and software engineering skills for building reliable, production AI systems.'
  },
  education: {
    title: `Education & Foundations | ${BRAND_NAME}`,
    description: 'Computer science education supporting applied AI systems engineering.'
  },
  contact: {
    title: `Contact | ${BRAND_NAME}`,
    description: `Contact ${PRIMARY_NAME} (${ALT_NAME_EN} | ${ALT_NAME} | Hans) for AI infrastructure and applied AI engineering roles.`
  }
}

const sectionIds = [
  'top',
  'experience',
  'projects',
  'skills',
  'education',
  'contact'
]

const projects = [
  {
    title: 'OpenTelemetry',
    context: 'Observability · Tracing',
    description:
      'Active contribution target focused on LLM observability and production instrumentation.',
    impact: 'Planned contributions: LLM semantic conventions, example SDK instrumentation, and Grafana dashboards.',
    highlight: 'Scope: traces/metrics for prompts, model latency, token usage, and cost attribution.',
    tags: ['OpenTelemetry', 'Tracing', 'Metrics'],
    repo: 'https://github.com/open-telemetry/opentelemetry-collector',
    linkLabel: 'Project home',
    group: 'featured'
  },
  {
    title: 'vLLM',
    context: 'Serving · High-throughput inference',
    description:
      'Active contribution target focused on inference performance and serving reliability.',
    impact: 'Planned contributions: benchmark suite updates, batching configs, and integration examples.',
    highlight: 'Scope: throughput/latency profiling, GPU utilization, and multi-tenant serving patterns.',
    tags: ['vLLM', 'Serving', 'Performance'],
    repo: 'https://github.com/vllm-project/vllm',
    linkLabel: 'Project home',
    group: 'featured'
  },
  {
    title: 'Dagster',
    context: 'Orchestration · Data pipelines',
    description:
      'Active contribution target focused on AI pipeline templates and operational metadata.',
    impact: 'Planned contributions: RAG/eval pipeline templates, retries/alerts patterns, and asset metadata examples.',
    highlight: 'Scope: asset lineage, materializations, and production-grade pipeline reliability.',
    tags: ['Dagster', 'Orchestration', 'Reliability'],
    repo: 'https://github.com/dagster-io/dagster',
    linkLabel: 'Project home',
    group: 'featured'
  },
  {
    title: 'Airbnb Listings ETL Pipeline (Spark)',
    context: 'Data engineering · ETL',
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
    title: 'SimCLR Skin Lesion Classifier (ResNet50)',
    context: 'Deep learning · Vision',
    description:
      'Applied contrastive pretraining and semi-supervised learning with a ResNet50 encoder on the ISIC skin lesion datasets.',
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
const generalSkillGroups = [
  {
    title: 'Backend Services',
    items: ['Node.js', 'Java (Spring Boot)', 'FastAPI', 'Kafka', 'GraphQL', 'WebSocket']
  },
  {
    title: 'Data Stores',
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'SQL']
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']
  },
  {
    title: 'Frontend',
    items: ['TypeScript', 'React', 'Next.js', 'React Native']
  }
]

// Note: experiences and education are defined later in the file but moved here for schemaData reference
const experiences = [
  {
    role: 'Remote Software Engineer Intern',
    org: 'Folio AI',
    orgUrl: 'https://gofolio.ai',
    location: 'San Jose, CA (Remote)',
    dates: 'Aug 2025 - Dec 2025',
    employmentType: 'Part-time',
    bullets: [
      'Built a FastAPI service (SQLAlchemy/PostgreSQL/Redis zset) for real-time market data, delivering <10ms P99 reads across 100k+ events.',
      'Designed resilient WebSocket ingestion with staged transforms, retries, and backpressure (Redis channels), improving peak-load stability by 60%.',
      'Productionized LangGraph agents (Gemini + tools) with retrieval over market/options data, cutting analyst turnaround by 3×.'
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
      'Architected a multi-provider GenAI platform with an LLM adapter layer (token accounting, context assembly, provider switching), enabling secure access for 20+ teams.',
      'Built modular LangChain workflows (routing + memory) for compliance Q&A and summarization, improving answer accuracy by 35%.',
      'Delivered a production RAG service (FastAPI, pgvector, asyncpg) with bounded concurrency, cutting semantic retrieval latency by 5×.',
      'Automated CI/CD and deployments (Docker Compose, GitHub Actions, VPN-secured environments), reducing setup time by 80%.'
    ]
  },
  {
    role: 'Tech Lead, Theoretical & Computational Chemistry Lab (Supervisor: Prof. Haibin Su)',
    org: 'Hong Kong University of Science and Technology',
    orgUrl: 'https://hkust.edu.hk',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    employmentType: 'Part-time',
    bullets: [
      'Built a WebXR virtual classroom (Next.js, Babylon.js) with physics and real-time collaboration for Meta Quest 3.',
      'Shipped multimodal GenAI chat (Whisper STT, streaming responses, memory) to support interactive learning workflows.',
      'Scaled live sessions with real-time networking, supporting 100+ concurrent users.'
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
      'Built real-time monitoring dashboards for Bloomberg Data License/B-PIPE usage (Node.js/Vue.js), flagging 15+ anomalous patterns across 7 departments.',
      'Implemented Spring Boot controllers with schema validation and JUnit tests to improve backend reliability and release safety.',
      'Designed an ETL pipeline converting 100k+ Bloomberg exports into normalized Oracle tables with stored procedures, triggers, and transactional routines.'
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
      'Led development of a multi-tenant real-time market intelligence SaaS (Node.js/React/GraphQL), supporting 20+ iterations and securing HKD 1M funding.',
      'Built Kafka streaming pipelines and a Node.js WebSocket gateway for live tenant-filtered updates, delivering 5M+ events.',
      'Improved MongoDB throughput by 2× by replacing Mongoose with the native driver and redesigning indexes/aggregations.',
      'Deployed to AWS (EC2, CloudFront) with Nginx and HTTPS to support stable multi-environment releases.'
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
      'Led platform architecture and release practices to improve delivery speed and reliability across teams.',
      'Owned code review standards and onboarding to increase consistency and maintainability.'
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
      'Built a React Native upload flow with Azure Functions backend, lifting UGC by ~20%.',
      'Reduced image pipeline latency by 300ms with compression and multipart parsing over Storj.',
      'Implemented signed-URL REST APIs with Sequelize schemas for secure, time-limited media access.'
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
      'OS Kernel Implementation, Programming Design Paradigm, Database Management Systems, Algorithms, Natural Language Processing, Foundations for Generative AI, Information Retrieval, Large-Scale Parallel Data Processing, Building Scalable Distributed Systems'
  },
  {
    school: 'The Hong Kong University of Science and Technology',
    url: 'https://hkust.edu.hk/',
    degree: 'Bachelor of Engineering in Electronic Engineering (Computer Science minor)',
    location: 'Hong Kong',
    dates: 'Sep 2020 - May 2024',
    honor: 'Second Class Honors, Division I',
    coursework:
      'Operating Systems, Design and Analysis of Algorithms, Cloud Computing and Big Data Systems, Artificial Intelligence Ethics, Artificial Intelligence for Medical Image Analysis, Computer Communication Networks, Probability and Random Processes in Engineering, Matrix Algebra and Applications'
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
      jobTitle: 'Applied AI and AI infrastructure engineer',
      knowsAbout: [
        'AI infrastructure',
        'LLM orchestration',
        'LLM serving',
        'Observability',
        'Applied AI systems',
        'Production AI services',
        'Evaluation pipelines',
        'Deployment automation'
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
      const languages = project.tags.filter(tag => ['Python', 'TypeScript', 'JavaScript'].includes(tag))
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
  'Applied AI Engineering (HK/US)': {
    core: [
      {
        title: 'LLM Apps & APIs',
        items: ['Python', 'FastAPI', 'REST APIs', 'LangChain / LangGraph']
      },
      {
        title: 'RAG & Retrieval',
        items: ['pgvector', 'PostgreSQL', 'Milvus / Pinecone', 'Redis']
      },
      {
        title: 'LLM Ecosystem',
        items: ['Hugging Face Transformers', 'PyTorch', 'NLP', 'LLM evaluation']
      },
      {
        title: 'Infra, Observability & Orchestration',
        items: ['AWS', 'Docker/Kubernetes', 'OpenTelemetry', 'Prometheus/Grafana', 'Dagster']
      }
    ],
    supporting: [
    ]
  }
}

const skillTracks = Object.keys(skillSets)

function App() {
  const activeTrack = skillTracks[0]
  const [activeSection, setActiveSection] = useState('top')
  const [showAdditionalExperience, setShowAdditionalExperience] = useState(false)
  const [showAllFeaturedProjects, setShowAllFeaturedProjects] = useState(false)
  const [showAllAcademicProjects, setShowAllAcademicProjects] = useState(false)
  const visibleFeaturedProjects = showAllFeaturedProjects ? featuredProjects : featuredProjects.slice(0, 3)
  const visibleAcademicProjects = showAllAcademicProjects ? academicProjects : academicProjects.slice(0, 3)
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
              Applied AI &amp; AI infrastructure engineer for HK &amp; US deployments
            </p>
          </div>
        </div>
        <div className="hero-grid">
          <div className="hero-copy reveal" style={{ '--delay': '140ms' }}>
            <p className="hero-summary">
              I build applied AI systems that turn LLM prototypes into reliable, observable services for real client
              deployments. My focus is on production-grade APIs, LLM serving, evaluation pipelines, and operational
              tooling that let teams ship experiments safely and iterate fast across models, prompts, and workflows.
            </p>
            <div className="signal-grid">
              <div className="signal-card">
                <span className="signal-label">Execution</span>
                <span className="signal-value">Ship LLM services with clear SLIs, rollout plans, and measurable outcomes.</span>
              </div>
              <div className="signal-card">
                <span className="signal-label">Reliability</span>
                <span className="signal-value">Observability-first systems with evals, guardrails, and safe fallbacks.</span>
              </div>
              <div className="signal-card">
                <span className="signal-label">Collaboration</span>
                <span className="signal-value">Translate research into reusable templates and production playbooks.</span>
              </div>
            </div>
            <div className="hero-meta">
              <span>Seeking HK/US applied AI engineering roles</span>
              <span className="hero-meta-highlight">Open to Hong Kong &amp; US locations</span>
            </div>
            <p className="section-subhead">Infra focus: LLM serving, observability, and pipeline reliability.</p>
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
            <h2>Applied AI Experience</h2>
          </div>
          <p className="section-subhead">Production ownership across LLM platforms, pipelines, observability, and deployment.</p>
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
            <h2>Open Source Contributions</h2>
          </div>
          <p className="section-subhead">Active targets — planned upstream contributions (PRs, docs, and benchmarks).</p>
          <div className="projects-grid">
            {visibleFeaturedProjects.map((project) => (
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
                      {project.linkLabel || 'Project home'}
                    </a>
                  ) : (
                    <span className="project-link project-link-muted">{project.linkLabel || 'Project home'}</span>
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
          {featuredProjects.length > 3 ? (
            <div className="project-toggle">
              <button
                type="button"
                className="toggle-button"
                onClick={() => setShowAllFeaturedProjects((prev) => !prev)}
              >
                {showAllFeaturedProjects ? 'Show fewer' : 'Show more'}
              </button>
            </div>
          ) : null}
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>Research &amp; Foundations</h2>
          </div>
          <p className="section-subhead">Applied AI and data engineering projects that support production depth.</p>
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
          {academicProjects.length > 3 ? (
            <div className="project-toggle">
              <button
                type="button"
                className="toggle-button"
                onClick={() => setShowAllAcademicProjects((prev) => !prev)}
              >
                {showAllAcademicProjects ? 'Show fewer' : 'Show more'}
              </button>
            </div>
          ) : null}
        </section>

        <section className="section" id="skills">
          <div className="section-heading">
            <h2>Skills</h2>
          </div>
          <p className="section-subhead">Applied AI depth paired with production infrastructure and reliable delivery.</p>
          <div className="skills-split">
            <div className="skills-column">
              <p className="section-subhead">Applied AI</p>
              <div className="skills-grid compact">
                {skillSets[skillTracks[0]].core.map((group) => (
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
              <p className="section-subhead">General SWE</p>
              <div className="skills-grid compact">
                {generalSkillGroups.map((group) => (
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
        </section>

        <section className="section" id="education">
          <div className="section-heading">
            <h2>Education &amp; Foundations</h2>
          </div>
          <p className="section-subhead">Graduate and undergraduate training in NLP, GenAI, IR, and scalable systems.</p>
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
          <span>Built for applied AI reliability, observability, and iteration speed.</span>
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
