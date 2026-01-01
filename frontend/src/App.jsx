import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'

const SITE_URL = 'https://hansho.dev'
const BASE_TITLE = 'Chak Sing Ho (Hans Ho) | Low-latency backend & systems engineer'
const BASE_DESCRIPTION =
  'Chak Sing Ho (Hans Ho) is a low-latency backend and systems engineer. Portfolio featuring market data, observability, and performance-focused projects.'
const OG_IMAGE = `${SITE_URL}/og.png`

const sectionMeta = {
  top: {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION
  },
  about: {
    title: 'About | Hans Ho',
    description: 'About Hans Ho: low-latency backend, market data pipelines, observability, C++ and Python systems.'
  },
  services: {
    title: 'Services | Hans Ho',
    description: 'Services in low-latency C++ engineering, market data pipelines, observability, and AI infrastructure.'
  },
  performance: {
    title: 'How I Work | Hans Ho',
    description: 'Systems approach to market ingestion, latency budgeting, and audit-ready replay tooling.'
  },
  experience: {
    title: 'Experience | Hans Ho',
    description: 'Experience building production market data, AI infrastructure, and performance-first systems.'
  },
  projects: {
    title: 'Projects | Hans Ho',
    description: 'Selected projects in C++20, concurrency, deterministic execution, and low-latency infrastructure.'
  },
  skills: {
    title: 'Skills | Hans Ho',
    description: 'Core skills across C++20, Python, data infrastructure, and low-latency systems engineering.'
  },
  education: {
    title: 'Education | Hans Ho',
    description: 'Education in computer science and electronic engineering with a focus on systems and performance.'
  },
  contact: {
    title: 'Contact | Hans Ho',
    description: 'Contact Hans Ho for low-latency backend, market infrastructure, and C++ systems roles.'
  }
}

const sectionIds = ['top', 'about', 'services', 'performance', 'experience', 'projects', 'skills', 'education', 'contact']

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Person', 'Organization'],
      '@id': `${SITE_URL}/#person`,
      name: 'Chak Sing Ho',
      alternateName: 'Hans Ho',
      url: SITE_URL,
      image: OG_IMAGE,
      jobTitle: 'Low-latency backend and systems engineer',
      sameAs: [
        'https://github.com/hans2001',
        'https://linkedin.com/in/chaksingho/',
        'https://leetcode.com/u/justnotarandomkid/'
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
      name: 'Chak Sing Ho',
      publisher: {
        '@id': `${SITE_URL}/#person`
      },
      inLanguage: 'en-US'
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Chak Sing Ho | Low-latency backend and systems engineer',
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
      'Impact: Delivered <10ms P99 reads at 100k+ events/sec using FastAPI, PostgreSQL, Redis.',
      'Impact: Built deterministic retries + backpressure, improving burst stability by 60%.'
    ]
  },
  {
    role: 'Software Engineer Intern (Innovation Lab)',
    org: 'Hong Kong Telecom (HKT)',
    orgUrl: 'https://www.hkt.com/?locale=en',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    bullets: [
      'Impact: Built a multi-provider GenAI platform adopted by 20+ internal teams.',
      'Impact: Shipped a production RAG service cutting semantic lookup latency by 5x.'
    ]
  },
  {
    role: 'Senior Developer Intern, Computational Chemistry Lab',
    org: 'HKUST',
    orgUrl: 'https://hkust.edu.hk',
    location: 'Hong Kong',
    dates: 'Jun 2024 - Aug 2024',
    bullets: [
      'Impact: Built a GenAI learning platform that secured HKD 250k in education funding.',
      'Impact: Engineered a multi-modal AI chat system with realtime streaming.'
    ]
  },
  {
    role: 'Information Technology Intern',
    org: 'China International Capital Corporation (CICC)',
    orgUrl: 'https://cicc.zhiye.com/custom/index',
    location: 'Hong Kong',
    dates: 'Oct 2023 - Jan 2024',
    bullets: [
      'Impact: Built a realtime Bloomberg usage dashboard, flagging 15+ anomalies.',
      'Impact: Implemented a derivatives valuation engine to meet SFC requirements.'
    ]
  },
  {
    role: 'Software Engineer Intern',
    org: 'Midas Analytics Limited (FinTech)',
    orgUrl: 'https://midasanalytics.ai',
    location: 'Hong Kong',
    dates: 'Jun 2022 - Oct 2023',
    bullets: [
      'Impact: Built a realtime market intelligence platform that secured HKD 1M seed funding.',
      'Impact: Engineered Kafka-streamed pipelines for 5M+ tenant-filtered events.'
    ]
  },
  {
    role: 'Software Engineer Intern',
    org: 'SOCIF Limited (Smart Travel Software)',
    orgUrl: 'https://www.socif.co/?lang=en',
    location: 'Hong Kong',
    dates: 'Dec 2021 - Jan 2022',
    bullets: [
      'Impact: Rolled out a React Native photo upload feature, boosting UGC by 20%.',
      'Impact: Built an image processing pipeline, cutting latency by 300ms.'
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
        items: ['TypeScript/JavaScript', 'Java', 'C', 'MATLAB', 'Spark', 'GCP', 'Azure', 'Firebase', 'YAML', 'GoDaddy']
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
    setMetaTag('name', 'author', 'Chak Sing Ho')
    setMetaTag('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    setLinkTag('canonical', SITE_URL)
    setMetaTag('property', 'og:title', activeMeta.title)
    setMetaTag('property', 'og:site_name', 'Chak Sing Ho')
    setMetaTag('property', 'og:url', SITE_URL)
    setMetaTag('property', 'og:description', activeMeta.description)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:image', OG_IMAGE)
    setMetaTag('property', 'og:image:alt', 'Chak Sing Ho portfolio preview')
    setMetaTag('property', 'og:locale', 'en_US')
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', activeMeta.title)
    setMetaTag('name', 'twitter:url', SITE_URL)
    setMetaTag('name', 'twitter:description', activeMeta.description)
    setMetaTag('name', 'twitter:image', OG_IMAGE)
    setMetaTag('name', 'twitter:image:alt', 'Chak Sing Ho portfolio preview')
    setJsonLd(schemaData)
  }, [activeMeta])

  return (
    <div className="App">
      <header className="hero" id="top">
        <div className="hero-top reveal" style={{ '--delay': '60ms' }}>
          <div>
            <h1>Hans Ho</h1>
            <p className="hero-role">
              Low-latency backend engineer for market data and AI infrastructure
            </p>
          </div>
          <div className="hero-actions">
            <nav className="hero-nav" aria-label="On this page">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#performance">How I work</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#education">Education</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-copy reveal" style={{ '--delay': '140ms' }}>
            <p className="hero-summary">
              Computer science student focused on low-latency C++ systems and AI infrastructure, with experience in
              market data pipelines, distributed backends, and production reliability.
            </p>
            <div className="hero-meta">
              <span>Looking for C++ quant, market infra, or AI infra roles · Open to Hong Kong and US roles</span>
            </div>
          </div>
          <div className="hero-portrait reveal" style={{ '--delay': '200ms' }}>
            <img src="/hans.jpeg" alt="Hans Ho portrait" loading="eager" decoding="async" />
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

        <section className="section contact" id="contact">
          <div className="contact-card">
            <div>
              <h2>Contact</h2>
              <p>
                If you are hiring for market systems, AI infrastructure, or C++/quant work, I would love to talk.
              </p>
            </div>
            <div className="contact-actions">
              <a className="button primary" href="mailto:ho.chak@northeastern.edu">
                ho.chak@northeastern.edu
              </a>
              <a className="button ghost" href="tel:+19735171462">
                +1 (973) 517-1462
              </a>
              <a
                className="button ghost"
                href="https://linkedin.com/in/chaksingho/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/chaksingho
              </a>
              <a
                className="button ghost"
                href="https://github.com/hans2001"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/hans2001
              </a>
              <a
                className="button ghost"
                href="https://leetcode.com/u/justnotarandomkid/"
                target="_blank"
                rel="noopener noreferrer"
              >
                leetcode.com/u/justnotarandomkid
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Hans Ho · I build low-latency market systems</span>
        <span>Open to Hong Kong and US roles</span>
      </footer>
    </div>
  )
}

export default App
