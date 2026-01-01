import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'

const SITE_URL = 'https://hans-ho.vercel.app'
const BASE_TITLE = 'Ho Chak Sing | Hans | Quant C++ & low-latency systems engineer'
const BASE_DESCRIPTION =
  'Ho Chak Sing | Hans is a C++ and low-latency systems engineer. Portfolio featuring market data infrastructure, deterministic execution, and performance-critical projects for Hong Kong and US teams.'
const OG_IMAGE = `${SITE_URL}/og.png`

const sectionMeta = {
  top: {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION
  },
  about: {
    title: 'About | Ho Chak Sing | Hans',
    description:
      'About Ho Chak Sing | Hans: C++ systems engineer working on market data, deterministic execution, and latency-critical infrastructure.'
  },
  services: {
    title: 'Services | Ho Chak Sing | Hans',
    description:
      'Services in low-latency C++ engineering, market data pipelines, observability, and systems infrastructure.'
  },
  performance: {
    title: 'How I Work | Ho Chak Sing | Hans',
    description: 'Systems approach to market ingestion, latency budgeting, and audit-ready replay tooling.'
  },
  experience: {
    title: 'Experience | Ho Chak Sing | Hans',
    description: 'Experience building production market data, AI infrastructure, and performance-first systems.'
  },
  projects: {
    title: 'Projects | Ho Chak Sing | Hans',
    description: 'Selected projects in C++20, concurrency, deterministic execution, and low-latency infrastructure.'
  },
  skills: {
    title: 'Skills | Ho Chak Sing | Hans',
    description: 'Core skills across C++20, Python, data infrastructure, and low-latency systems engineering.'
  },
  education: {
    title: 'Education | Ho Chak Sing | Hans',
    description: 'Education in computer science and electronic engineering with a focus on systems and performance.'
  },
  contact: {
    title: 'Contact | Ho Chak Sing | Hans',
    description: 'Contact Ho Chak Sing | Hans for C++ systems, market infrastructure, and low-latency roles.'
  }
}

const sectionIds = ['top', 'about', 'services', 'performance', 'experience', 'projects', 'skills', 'education', 'contact']

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Person', 'Organization'],
      '@id': `${SITE_URL}/#person`,
      name: 'Ho Chak Sing | Hans',
      alternateName: 'Ho Chak Sing | Hans',
      url: SITE_URL,
      image: OG_IMAGE,
      jobTitle: 'Quant C++ and low-latency systems engineer',
      knowsAbout: [
        'Low-latency C++',
        'Market data infrastructure',
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
      name: 'Ho Chak Sing | Hans',
      publisher: {
        '@id': `${SITE_URL}/#person`
      },
      inLanguage: 'en-US'
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Ho Chak Sing | Hans | Quant C++ and low-latency systems engineer',
      description: BASE_DESCRIPTION,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: OG_IMAGE
      },
      about: {
        '@id': `${SITE_URL}/#person`
      },
      inLanguage: 'en-US'
    },
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

const setLinkTag = (rel, href) => {
  let link = document.head.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
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

const heroMetrics = [
  { value: '<10ms', label: 'P99 read latency on market data backend' },
  { value: '100k+', label: 'Peak ingest rate (events/sec)' },
  { value: '+60%', label: 'Stability improvement during bursty feeds' },
  { value: '5x', label: 'Faster semantic lookup latency (RAG)' }
]

const performanceStory = [
  {
    title: 'Market Ingestion',
    tag: 'Burst-safe',
    description:
      'When data volume spikes, I keep systems stable with rate limits, safe retries, and clean reprocessing.'
  },
  {
    title: 'Latency Budgeting',
    tag: 'P99-first',
    description:
      'I protect user experience by keeping queues bounded, using cache-first paths, and exposing bottlenecks early.'
  },
  {
    title: 'Audit + Replay',
    tag: 'Compliance-ready',
    description: 'I build replay harnesses and structured tracing so teams can explain incidents and prove the SLA.'
  }
]

const experiences = [
  {
    role: 'Software Engineer Intern',
    org: 'Folio AI',
    orgUrl: 'https://gofolio.ai',
    location: 'San Jose, CA (Remote)',
    dates: 'Sep 2025 - Present',
    bullets: [
      'Building a low-latency read path for high-rate event analytics using FastAPI, PostgreSQL, and Redis.',
      'Achieved <10ms P99 reads at 100k+ events/sec.',
      'Improved burst stability by 60% with deterministic retries and backpressure.'
    ]
  },
  {
    role: 'Software Engineer Intern (Innovation Lab)',
    org: 'Hong Kong Telecom (HKT)',
    orgUrl: 'https://www.hkt.com/?locale=en',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    bullets: [
      'Built an internal GenAI platform by customizing LibreChat/Open WebUI and deploying OpenAI, Gemini, and Llama3 on-prem (Ollama).',
      'Improved Q&A accuracy by 30% with Assistants API and context-aware responses.',
      'Enabled compliance-safe usage via LangChain + Azure LLM integration and RAG document workflows.',
      'Automated Docker installs and VPN-tunneled container networking to unblock regional API access.',
      'Revamped Tap&Go rewards search and cut cell diagram generation time by 90% with a Python automation pipeline.'
    ]
  },
  {
    role: 'Tech Lead, Theoretical & Computational Chemistry Lab',
    org: 'Hong Kong University of Science and Technology',
    orgUrl: 'https://hkust.edu.hk',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    bullets: [
      'Led a GenAI learning platform and immersive 3D classroom for the lab.',
      'Secured HKD 250k in education funding for the platform.',
      'Delivered WebXR interactions for Meta Quest 3 and a multimodal chat interface (Whisper + SSE).',
      'Deployed real-time avatar networking with Colyseus, supporting 100+ concurrent users.'
    ]
  },
  {
    role: 'Information Technology Intern',
    org: 'China International Capital Corporation (CICC)',
    orgUrl: 'https://cicc.zhiye.com/custom/index',
    location: 'Hong Kong',
    dates: 'Oct 2023 - Jan 2024',
    bullets: [
      'Built internal tools for Bloomberg B-PIPE usage monitoring and derivatives valuation.',
      'Flagged 15+ anomalous spend patterns across 7 departments with a real-time dashboard.',
      'Processed 100k+ Oracle invoice records via Knex-powered REST endpoints.',
      'Delivered a valuation SaaS to meet SFC requirements and accelerated reporting with typed UI + high-volume Excel export.'
    ]
  },
  {
    role: 'Software Engineer Intern',
    org: 'Midas Analytics Limited (FinTech)',
    orgUrl: 'https://midasanalytics.ai',
    location: 'Hong Kong',
    dates: 'Jun 2022 - Oct 2023',
    bullets: [
      'Architected a market intelligence SaaS from scratch for a fintech startup.',
      'Led 10+ product iterations and supported HKD 1M funding.',
      'Processed 5M+ news records with React Window + GraphQL, reducing memory via chunking.',
      'Achieved 2x faster retrieval after MongoDB schema redesign and native driver migration.',
      'Cut API overhead by 40% with a typed GraphQL API and caching.',
      'Shipped AWS infra (EC2, S3/CloudFront, Nginx, PM2, SSL, load balancing) for UAT/prod.'
    ]
  },
  {
    role: 'Software Engineer Intern',
    org: 'SOCIF Limited (Smart Travel Software)',
    orgUrl: 'https://www.socif.co/?lang=en',
    location: 'Hong Kong',
    dates: 'Dec 2021 - Jan 2022',
    bullets: [
      'Built mobile and desktop tools for transit operations using React Native and Electron.',
      'Boosted UGC by 20% with an iOS/Android photo upload feature on Azure Functions.',
      'Cut image latency by 300ms and storage by ~40% with compression and Storj (S3 API).',
      'Automated attendance reporting with signed-URL upload APIs and a Windows RollCall app.'
    ]
  }
]

const projects = [
  {
    title: 'Low-Latency Market Data Engine',
    description:
      'Built an in-memory L2 order book with contention-aware sync, deterministic replay, and tail-latency benchmarks.',
    tags: ['C++20', 'Low Latency', 'Concurrency'],
    repo: 'https://github.com/hans2001/low-latency-market-data-engine'
  },
  {
    title: 'Work-Stealing Task Scheduler',
    description:
      'Designed a fixed-size scheduler with work-stealing queues, explicit lifetimes, and throughput benchmarks vs std::async.',
    tags: ['C++', 'Schedulers', 'Benchmarks'],
    repo: 'https://github.com/hans2001/cpp-thread-pool'
  },
  {
    title: 'Deterministic Agent Framework',
    description:
      'Extended Open Interpreter with deterministic execution, policy-based tool access, and replayable audits.',
    tags: ['AI Infra', 'Determinism', 'Policy Engine'],
    repo: 'https://github.com/hans2001'
  }
]

const skillSets = {
  'AI Infrastructure': {
    core: [
      {
        title: 'Systems & Backend',
        items: ['Python', 'C++', 'FastAPI', 'Node.js', 'REST', 'GraphQL', 'WebSocket']
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
        items: ['C++20 (STL, templates, RAII)', 'Python', 'SQL', 'Bash']
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
        title: 'Tools',
        items: [
          'gcc / clang',
          'CMake',
          'gdb',
          'perf',
          'valgrind',
          'Google Test',
          'Git',
          'Unix/Linux'
        ]
      },
      {
        title: 'Focus',
        items: [
          'I focus on low-latency C++ systems for financial applications, with an emphasis on concurrency safety and production performance.'
        ]
      }
    ]
  }
}

const skillTracks = Object.keys(skillSets)

const education = [
  {
    school: 'Northeastern University',
    url: 'https://www.northeastern.edu/',
    degree: 'M.S. Computer Science',
    details: 'GPA 4.0',
    location: 'Boston, MA',
    dates: 'Sep 2025 - May 2027'
  },
  {
    school: 'Hong Kong Univ. of Sci. & Tech.',
    url: 'https://hkust.edu.hk/',
    degree: 'B.Eng. Electronic Eng. (CS minor)',
    details: 'Second Class Honors (Div. I)',
    location: 'Hong Kong',
    dates: 'Sep 2020 - May 2024'
  }
]

function App() {
  const [activeTrack, setActiveTrack] = useState('AI Infrastructure')
  const [skillsMinHeight, setSkillsMinHeight] = useState(0)
  const [activeSection, setActiveSection] = useState('top')
  const skillPanelRefs = useRef({})

  useLayoutEffect(() => {
    const heights = skillTracks.map((track) => {
      const panel = skillPanelRefs.current[track]
      return panel ? panel.getBoundingClientRect().height : 0
    })
    const maxHeight = Math.max(0, ...heights)
    if (maxHeight && maxHeight !== skillsMinHeight) {
      setSkillsMinHeight(maxHeight)
    }
  }, [activeTrack, skillsMinHeight])

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
    setMetaTag('name', 'author', 'Ho Chak Sing | Hans')
    setMetaTag('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    setLinkTag('canonical', SITE_URL)
    setMetaTag('property', 'og:title', activeMeta.title)
    setMetaTag('property', 'og:site_name', 'Ho Chak Sing | Hans')
    setMetaTag('property', 'og:url', SITE_URL)
    setMetaTag('property', 'og:description', activeMeta.description)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:image', OG_IMAGE)
    setMetaTag('property', 'og:image:alt', 'Ho Chak Sing | Hans portfolio preview')
    setMetaTag('property', 'og:locale', 'en_US')
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', activeMeta.title)
    setMetaTag('name', 'twitter:url', SITE_URL)
    setMetaTag('name', 'twitter:description', activeMeta.description)
    setMetaTag('name', 'twitter:image', OG_IMAGE)
    setMetaTag('name', 'twitter:image:alt', 'Ho Chak Sing | Hans portfolio preview')
    setJsonLd(schemaData)
  }, [activeMeta])

  return (
    <div className="App">
      <header className="hero" id="top">
        <div className="hero-top reveal" style={{ '--delay': '60ms' }}>
          <div>
            <h1>Ho Chak Sing | Hans</h1>
            <p className="hero-role">
              Low-latency backend engineer for market data and AI infrastructure
            </p>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-copy reveal" style={{ '--delay': '140ms' }}>
            <p className="hero-summary">
              Computer science student focused on low-latency C++ systems and AI infrastructure, with hands-on
              experience in market data, distributed services, and production observability.{' '}
              <strong>Tight latency budgets, deterministic performance, and pragmatic reliability</strong> guide how
              I build. Seeking C++ developer roles in market infrastructure or AI infrastructure for
              performance-critical systems.
            </p>
            <div className="hero-meta">
              <span>Looking for AI infrastructure roles and C++ quant dev roles</span>
              <span className="hero-meta-highlight">Open to Hong Kong &amp; US roles</span>
            </div>
          </div>
          <div className="hero-portrait reveal" style={{ '--delay': '200ms' }}>
            <img src="/hans.jpeg" alt="Ho Chak Sing | Hans portrait" loading="eager" decoding="async" />
          </div>
        </div>

        <div className="hero-metrics reveal" style={{ '--delay': '280ms' }}>
          {heroMetrics.map((stat) => (
            <div className="hero-metric" key={stat.label}>
              <div className="hero-metric-value">{stat.value}</div>
              <div className="hero-metric-label">{stat.label}</div>
            </div>
          ))}
        </div>

      </header>

      <main className="main">
        <section className="section" id="services">
          <div className="section-heading">
            <h2>Services</h2>
          </div>
          <div className="card">
            <p>
              I build SaaS, mobile, and web applications alongside performance-critical systems, with a focus on
              low-latency C++ services, market data pipelines, and AI infrastructure reliability.
            </p>
            <ul>
              <li>SaaS, mobile, and web application development</li>
              <li>Low-latency C++ backend engineering and optimization</li>
              <li>Market data ingestion, normalization, and distribution</li>
              <li>Distributed systems reliability, profiling, and performance tuning</li>
              <li>Observability, tracing, and audit-ready telemetry</li>
              <li>AI infrastructure foundations and evaluation pipelines</li>
            </ul>
          </div>
        </section>

        <section className="section performance" id="performance">
          <div className="section-heading">
            <h2>How I work</h2>
          </div>
          <div className="performance-grid">
            {performanceStory.map((item, index) => (
              <article className="performance-card reveal" style={{ '--delay': `${index * 90}ms` }} key={item.title}>
                <span className="performance-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading">
            <h2>Experience</h2>
          </div>
          <div className="card-stack">
            {experiences.map((item) => (
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
                          <span className="org-link-hint">site</span>
                        </a>
                      ) : (
                        item.org
                      )}{' '}
                      · {item.location}
                    </p>
                  </div>
                  <span className="card-date">{item.dates}</span>
                </div>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {item.details?.length ? (
                  <details className="experience-details">
                    <summary>More impact</summary>
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading">
            <h2>Projects</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-header">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <a className="project-link" href={project.repo} target="_blank" rel="noopener noreferrer">
                    GitHub Repo
                  </a>
                </div>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span className="tag-text" key={tag}>
                      {tag}
                    </span>
                  ))}
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
          <div className="skills-panels" style={skillsMinHeight ? { minHeight: `${skillsMinHeight}px` } : undefined}>
            {skillTracks.map((track) => {
              const skills = skillSets[track]
              const isActive = track === activeTrack
              return (
                <div
                  key={track}
                  className={`skills-panel ${isActive ? 'is-active' : ''}`}
                  ref={(node) => {
                    skillPanelRefs.current[track] = node
                  }}
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
                <p className="education-meta">{item.details}</p>
                <p className="education-meta">{item.location}</p>
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
          <span>© {new Date().getFullYear()} Ho Chak Sing | Hans</span>
        </div>
      </footer>
    </div>
  )
}

export default App
