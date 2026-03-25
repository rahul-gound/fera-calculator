import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Seo from './Seo'
import { toolsByPath } from '../data/tools'

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
})

const formatValue = (value, suffix = '') => `${numberFormatter.format(value)}${suffix}`

export default function ToolPage({ tool }) {
  const [values, setValues] = useState(() =>
    tool.fields.reduce((acc, field) => ({ ...acc, [field.key]: field.defaultValue ?? '' }), {}),
  )
  const [resultPulse, setResultPulse] = useState(false)

  const result = useMemo(() => tool.calculate(values), [tool, values])

  const onChange = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const onCalculate = () => {
    setResultPulse(true)
    window.setTimeout(() => setResultPulse(false), 300)
  }

  return (
    <main className="page-wrap">
      <Seo title={`${tool.name} (2026) – Fera Calculator`} description={tool.metaDescription} />
      <article className="tool-page card">
        <h1>{tool.name}</h1>
        <h2>{tool.h2}</h2>
        <p>{tool.description}</p>

        <section className="card calculator-box">
          {tool.fields.map((field) => (
            <label key={field.key} className="field-label" htmlFor={field.key}>
              <span>{field.label}</span>
              <input
                id={field.key}
                type={field.type}
                value={values[field.key]}
                min={field.min}
                step={field.step}
                onChange={(event) => onChange(field.key, event.target.value)}
              />
            </label>
          ))}
          <button type="button" onClick={onCalculate}>
            Calculate
          </button>
          <div className={`result-box${resultPulse ? ' is-highlighted' : ''}`} role="status" aria-live="polite">
            {result.error ? (
              <p className="error-text">{result.error}</p>
            ) : (
              <ul>
                {result.items.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label}:</strong>{' '}
                    {typeof item.value === 'number' ? formatValue(item.value, item.suffix) : item.value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="card">
          <h2>How to use {tool.name}</h2>
          <ol>
            {tool.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="card">
          <h2>{tool.name} examples</h2>
          <ul>
            {tool.examples.map((example) => (
              <li key={example.question}>
                <strong>{example.question}</strong>
                <p>{example.answer}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>{tool.name} FAQs</h2>
          {tool.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>

        {tool.relatedPaths?.length ? (
          <section className="card">
            <h2>Related tools</h2>
            <ul className="links-grid">
              {tool.relatedPaths.map((path) => {
                const relatedTool = toolsByPath[path]
                return (
                  <li key={path}>
                    <Link to={path}>{relatedTool?.name ?? path}</Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  )
}
