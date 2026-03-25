import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { categories, tools } from '../data/tools'

const categoryIcons = {
  'Finance Calculators': '📈',
  'Student Tools': '🎓',
  Converters: '🔁',
  'Daily Tools': '🗓️',
}

export default function HomePage() {
  return (
    <main className="page-wrap home-page">
      <Seo
        title="Fera Calculator (2026) – Smart Calculators for Everyday Use"
        description="Fera Calculator offers fast, modern finance, student, converter, and daily calculators with instant calculation, examples, FAQs, and related tools."
      />

      <section className="card hero-card" id="top">
        <p className="hero-kicker">Modern Calculator Suite</p>
        <h1>Smart Calculators for Everyday Use</h1>
        <p>
          Build faster decisions with beautifully designed calculators. Fera Calculator gives you instant
          results, practical examples, and easy-to-follow inputs across finance, student, conversion, and
          daily scenarios.
        </p>
        <a className="gradient-button hero-cta" href="#tool-categories">
          Explore Calculators
        </a>
      </section>

      <section className="cards-grid" id="tool-categories" aria-label="Calculator categories">
        {categories.map((category) => {
          const categoryTools = tools.filter((tool) => tool.category === category)
          return (
            <article className="card category-card" key={category}>
              <div className="category-title-wrap">
                <span className="card-icon" aria-hidden="true">
                  {categoryIcons[category] ?? '✨'}
                </span>
                <h2>{category}</h2>
              </div>
              <p>{categoryTools.length} calculators available</p>
              <ul className="links-grid">
                {categoryTools.map((tool) => (
                  <li key={tool.path}>
                    <Link to={tool.path}>{tool.name}</Link>
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </section>
    </main>
  )
}
