import { useState } from 'react'
import FaceTracker from './components/FaceTracker'
import './App.css'

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>Yuki Cui</h1>
          <p className="header-subtitle">Applied Scientist</p>
          <p className="header-title">The Johns Hopkins University | School of Government and Policy</p>
          <p className="header-title" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Washington, District of Columbia</p>
        </div>
      </header>

      {/* Main Content - Centered */}
      <div className="main-container">
        {/* About Section */}
        <section className="section about-section">
          <h2 className="section-title">About</h2>
          <div className="about-content">
            <div className="face-container">
              <FaceTracker basePath="/faces/" showDebug={false} />
            </div>
            <div className="about-text">
              <p>
                I am an Applied Scientist at The Johns Hopkins University's School of Government and Policy, 
                where I apply advanced data science and machine learning methods to address complex policy challenges. 
                I hold a Master's in Data Science from New York University (GPA: 3.94/4.0) and a Bachelor's in 
                Quantitative Finance from The Chinese University of Hong Kong (1st Class Honor).
              </p>
              <p>
                My expertise spans Python, SQL, cloud platforms (GCP, Azure), and data visualization tools. 
                I have extensive experience developing production-grade data pipelines, building ML models, and creating 
                insights from complex datasets. I'm passionate about using data science to solve real-world problems 
                in criminal justice, social media analysis, policy evaluation, and financial markets.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section - Data Science Themed */}
        <section className="section stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5M+</div>
              <div className="stat-label">Records Processed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">92.45%</div>
              <div className="stat-label">Model Precision</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3.6M</div>
              <div className="stat-label">Sentences Analyzed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Workshop Attendees</div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="section">
          <h2 className="section-title">Education</h2>
          <div className="experience-list">
            <div className="experience-item">
              <h3 className="experience-title">M.S. in Data Science | GPA: 3.94/4.0</h3>
              <div className="experience-org">New York University</div>
              <div className="experience-date">Sep 2022 - May 2024</div>
              <div className="experience-description">
                <strong>Key Courses:</strong> Machine Learning, Natural Language Processing, Big Data (Hadoop, Spark), 
                Responsible Data Science, Text as Data
              </div>
            </div>
            
            <div className="experience-item">
              <h3 className="experience-title">B.S. in Quantitative Finance, Minor in Statistics | GPA: 3.76/4.0, 1st Class Honor</h3>
              <div className="experience-org">The Chinese University of Hong Kong</div>
              <div className="experience-date">Sep 2018 - May 2022</div>
              <div className="experience-description">
                <strong>Honors:</strong> Dean's List, EY Scholarship ($10k for leadership), 
                Sir Run Run Shaw Scholarship ($40k for academic excellence)<br/>
                <strong>Key Courses:</strong> Regression, Data Mining, Time Series Analysis, 
                Probability and Statistics, Survey and Sampling, Bayesian Learning
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="section">
          <h2 className="section-title">Professional Experience</h2>
          <div className="experience-list">
            <div className="experience-item" style={{ borderLeft: '4px solid var(--jhu-gold)', background: 'var(--jhu-white)', boxShadow: '0 4px 12px rgba(0, 45, 114, 0.2)' }}>
              <h3 className="experience-title">Applied Scientist</h3>
              <div className="experience-org">The Johns Hopkins University | School of Government and Policy</div>
              <div className="experience-date">Jul 2025 - Present</div>
              <div className="experience-description">
                Applying advanced data science and machine learning methodologies to support policy research and evaluation 
                at one of the world's leading research institutions. Collaborating with interdisciplinary teams to develop 
                innovative solutions for complex policy challenges.
              </div>
            </div>

            <div className="experience-item">
              <h3 className="experience-title">Junior Research Scientist/Data Scientist</h3>
              <div className="experience-org">NYU Marron Institute of Urban Management</div>
              <div className="experience-date">Sep 2024 - May 2025</div>
              <div className="experience-description">
                • Developed Selenium scraper prototypes to extract 5M+ electronic criminal case records from Wisconsin Circuit Court Access<br/>
                • Designed schema and managed large-scale SQL Server database using Azure Data Studio<br/>
                • Created SQL queries to disambiguate defendants, map criminal history, and infer recidivism rates<br/>
                • Built interactive Tableau dashboards for district attorneys featuring defendant search, criminal trajectory analysis, 
                and pre/post diversion analysis<br/>
                • Created public-facing dashboard visualizing demographics, racial disparity, criminal activities, and incarceration trends
              </div>
            </div>

            <div className="experience-item">
              <h3 className="experience-title">Data for Justice Fellow</h3>
              <div className="experience-org">NYU Marron Institute of Urban Management</div>
              <div className="experience-date">Jan 2024 - Aug 2024</div>
              <div className="experience-description">
                Summer Fellow (Jun 2024 - Aug 2024) and Student Fellow (Jan 2024 - May 2024) working on criminal justice 
                data analysis and policy research projects.
              </div>
            </div>

            <div className="experience-item">
              <h3 className="experience-title">Data Scientist</h3>
              <div className="experience-org">Information Tracer</div>
              <div className="experience-date">Jan 2023 - May 2024</div>
              <div className="experience-description">
                • Designed real-time ETL pipelines for JSON social media data from Twitter, Instagram, Facebook, YouTube, and Reddit<br/>
                • Built 4 interactive Superset dashboards monitoring Mexico governor, UK general, and US presidential elections<br/>
                • Scripted Linux VM setup with Docker, integrating scraper, database and frontend, reducing deployment time by 90%<br/>
                • Developed bot detection program with 10 indicators using NLP techniques (regex, text clustering, similarity scores)<br/>
                • Delivered 5 workshops to 100+ professors and students on GCP, Docker, Airflow, and social network analysis<br/>
                • Investigated science misinformation spread about Fukushima Nuclear Wastewater Release through large-scale data collection 
                and 20+ interviews across 5 countries, composed news story supported by Pulitzer Center and Initium Media
              </div>
            </div>

            <div className="experience-item">
              <h3 className="experience-title">Product Data Scientist</h3>
              <div className="experience-org">Midas Analytics</div>
              <div className="experience-date">Dec 2022 - Dec 2023</div>
              <div className="experience-description">
                • Developed four-layer taxonomy-based financial news topic modeling algorithm achieving 92.45% precision using 
                clustering, text similarity and tree traversal techniques<br/>
                • Fine-tuned BERT with TensorFlow for emotion and sentiment prediction, obtaining F1 scores &gt; 0.7 for 5 out of 7 emotion classes<br/>
                • Performed EDA on 3.6M news sentences to generate sentiment signals quantifying company risks (causality test confidence &gt; 99%)<br/>
                • Setup containerized CI/CD workflow using GitHub Actions to automate build, test and engine deployment<br/>
                • Revamped data schema using Protobuf and C++, created MongoDB indexes saving over 90% processing time<br/>
                • Fixed entity validation logic reducing 64% duplicated company names in NER system
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="section">
          <h2 className="section-title">Technical Skills</h2>
          <div className="projects-grid">
            <div className="project-card skill-card">
              <div className="skill-icon">🐍</div>
              <h3 className="project-title">Languages</h3>
              <p className="project-description">
                Python (NumPy, Pandas, SciPy, Sklearn, Selenium, PyTorch), R, SQL, MongoDB, 
                HTML, CSS, JavaScript, C++
              </p>
            </div>

            <div className="project-card skill-card">
              <div className="skill-icon">⚙️</div>
              <h3 className="project-title">Tools & Frameworks</h3>
              <p className="project-description">
                Linux, Git, Bash, Docker, Kubernetes, Protobuf, Spark, Hadoop, Airflow, 
                GCP, Microsoft Azure
              </p>
            </div>

            <div className="project-card skill-card">
              <div className="skill-icon">📊</div>
              <h3 className="project-title">Visualization</h3>
              <p className="project-description">
                Apache Superset, Tableau, Power BI, Matplotlib, Seaborn, Plotly, ggplot2, Figma
              </p>
            </div>
          </div>
        </section>

        {/* Key Projects Section */}
        <section className="section">
          <h2 className="section-title">Key Projects & Achievements</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3 className="project-title">Criminal Justice Database & Analytics</h3>
              <p className="project-description">
                Built comprehensive database with 5M+ criminal records and interactive Tableau dashboards 
                for district attorneys. Enabled criminal trajectory analysis and recidivism prediction.
              </p>
              <div className="project-tags">
                <span className="tag">Python</span>
                <span className="tag">Selenium</span>
                <span className="tag">SQL</span>
                <span className="tag">Tableau</span>
              </div>
            </div>

            <div className="project-card">
              <h3 className="project-title">Social Media Election Monitoring</h3>
              <p className="project-description">
                Designed real-time ETL pipelines for social media data and built 4 interactive dashboards 
                monitoring elections across multiple countries. Automated deployment reducing setup time by 90%.
              </p>
              <div className="project-tags">
                <span className="tag">GCP</span>
                <span className="tag">Docker</span>
                <span className="tag">Airflow</span>
                <span className="tag">Superset</span>
              </div>
            </div>

            <div className="project-card">
              <h3 className="project-title">Financial News Topic Modeling</h3>
              <p className="project-description">
                Developed taxonomy-based topic modeling algorithm achieving 92.45% precision. 
                Fine-tuned BERT for sentiment analysis with F1 scores &gt; 0.7 for 5 emotion classes.
              </p>
              <div className="project-tags">
                <span className="tag">BERT</span>
                <span className="tag">NLP</span>
                <span className="tag">PyTorch</span>
                <span className="tag">MongoDB</span>
              </div>
            </div>

            <div className="project-card">
              <h3 className="project-title">Misinformation Research</h3>
              <p className="project-description">
                Investigated science misinformation spread through large-scale data collection and 20+ 
                interviews across 5 countries. Composed news story supported by Pulitzer Center.
              </p>
              <div className="project-tags">
                <span className="tag">Research</span>
                <span className="tag">Data Analysis</span>
                <span className="tag">NLP</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section contact-section">
          <h2 className="section-title">Contact</h2>
          <p>Interested in collaboration or have questions about my work?</p>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/yukicui/" target="_blank" rel="noopener noreferrer" className="contact-link">
              LinkedIn
            </a>
            <a href="https://github.com/yuqingcuiyuki" target="_blank" rel="noopener noreferrer" className="contact-link">
              GitHub
            </a>
            <a href="mailto:yc6285@nyu.edu" className="contact-link">
              Email
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Yuki Cui | Applied Scientist | The Johns Hopkins University | yc6285@nyu.edu</p>
      </footer>
    </div>
  )
}

export default App
