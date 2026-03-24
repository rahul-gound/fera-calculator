import { useEffect } from 'react'

function ensureMetaDescription() {
  let description = document.querySelector('meta[name="description"]')
  if (!description) {
    description = document.createElement('meta')
    description.setAttribute('name', 'description')
    document.head.appendChild(description)
  }
  return description
}

export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title
    const metaDescription = ensureMetaDescription()
    metaDescription.setAttribute('content', description)
  }, [description, title])

  return null
}
