import { useEffect, useRef, useState } from 'react'
import './App.css'

const SITE_URL = 'https://chaksingho.com'
const PRIMARY_NAME = 'Chak Sing Ho'
const ALT_NAME = 'Ho Chak Sing'
const ALT_NAME_EN = 'Hans Ho'
const BRAND_NAME = `${PRIMARY_NAME} | ${ALT_NAME_EN} | ${ALT_NAME} | Hans`
const BASE_TITLE = `${BRAND_NAME} | AI infrastructure & low-latency C++ systems`
const BASE_DESCRIPTION = `${PRIMARY_NAME} (also known as ${ALT_NAME_EN}, ${ALT_NAME}, or Hans) builds AI infrastructure and low-latency C++ systems for market data teams, with an interest in quant systems, focused on measurable SLOs, clean data paths, and production-ready reliability.`
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
  services: {
    title: `Results | ${BRAND_NAME}`,
    description:
      'Selected outcomes across latency, funding, and delivery.'
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

const sectionIds = ['top', 'about', 'services', 'experience', 'projects', 'skills', 'education', 'contact']

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

// Note: experiences and education are defined later in the file but moved here for schemaData reference
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
    ...projects.map((project, index) => ({
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#project-${index + 1}`,
      name: project.title,
      description: project.description,
      url: project.repo,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      programmingLanguage: project.tags.filter(tag => ['C++', 'C++20', 'Python', 'TypeScript', 'JavaScript'].includes(tag)),
      keywords: project.tags.join(', '),
      creator: {
        '@id': `${SITE_URL}/#person`
      }
    })),
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
  const prerenderDispatched = useRef(false)

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
              AI Infrastructure / C++ — interested in quant systems & market data
            </p>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-copy reveal" style={{ '--delay': '140ms' }}>
            <p className="hero-summary">
              I build fast, reliable data systems. I turn vague asks into clear targets and make performance easy to
              explain.
            </p>
            <div className="signal-grid">
              <div className="signal-card">
                <span className="signal-label">Comms</span>
                <span className="signal-value">Short RFCs, diagrams, clear handoffs.</span>
              </div>
              <div className="signal-card">
                <span className="signal-label">Learning</span>
                <span className="signal-value">Prototype fast, test, then harden.</span>
              </div>
              <div className="signal-card">
                <span className="signal-label">Team</span>
                <span className="signal-value">Share context, unblock early, pair often.</span>
              </div>
            </div>
            <div className="hero-meta">
              <span>Seeking AI infrastructure or C++ roles (quant systems focus welcome)</span>
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
        <section className="section" id="about">
          <div className="section-heading">
            <h2>How I work</h2>
          </div>
          <div className="card about-card">
            <div className="about-grid">
              <div className="about-copy">
                <p>
                  I start by agreeing on the goal and assumptions, then ship with simple benchmarks and logs we can
                  trust.
                </p>
                <ul>
                  <li>Measure first, then tune.</li>
                  <li>Ship small, learn fast.</li>
                  <li>Leave a clear handoff.</li>
                </ul>
              </div>
              <div className="about-side">
                <h3>Working rules</h3>
                <ul>
                  <li>Prefer predictable systems.</li>
                  <li>Explain the why, not just the what.</li>
                  <li>Write it down once.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="section-heading">
            <h2>Results</h2>
          </div>
          <div className="card">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">P99 &lt; 10ms</div>
                <div className="stat-label">Read path @ 100k+ events/sec</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">HKD 250k</div>
                <div className="stat-label">GenAI platform funding</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">HKD 1M</div>
                <div className="stat-label">Market intelligence SaaS backing</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading">
            <h2>Experience</h2>
          </div>
          <div className="card-stack">
            {experiences.map((item) => {
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
            })}
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
