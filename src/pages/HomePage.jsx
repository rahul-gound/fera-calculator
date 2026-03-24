import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { categories, tools } from '../data/tools'

export default function HomePage() {
  return (
    <main className="page-wrap">
      <Seo
        title="Fera Calculator (2026) – Free Online Calculators"
        description="Fera Calculator offers fast, mobile-friendly finance, student, converter, and daily calculators with instant results, examples, FAQs, and clean UI."
      />
      <section className="card hero-card">
        <h1>Fera Calculator</h1>
        <h2>Fast, simple, and SEO-friendly calculators for daily use</h2>
        <p>
          Explore 24 free tools across finance, student studies, unit conversion, and daily planning.
          Every tool includes examples, FAQs, and instant input-based results.
        </p>
      </section>

      {categories.map((category) => (
        <section className="card" key={category}>
          <h2>{category}</h2>
          <ul className="links-grid">
            {tools
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <li key={tool.path}>
                  <Link to={tool.path}>{tool.name}</Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
