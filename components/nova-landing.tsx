'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Menu, MoveUpRight, Plus, Sparkles, X } from 'lucide-react'
import { Nova3DScene } from './nova-3d-scene'

const services = [
  { number: '01', title: 'Web Design', description: 'Digital identities that make people stop, feel, and remember.' },
  { number: '02', title: '3D Websites', description: 'Immersive spaces that turn browsing into a point of view.' },
  { number: '03', title: 'E-commerce', description: 'Commerce experiences engineered for desire and conversion.' },
  { number: '04', title: 'Brand Experiences', description: 'A distinct visual language built to move at every touchpoint.' },
]

const projects = [
  { title: 'Aether House', type: 'Digital experience · 2024', className: 'project-aether' },
  { title: 'Morrow Objects', type: 'Commerce · 2024', className: 'project-morrow' },
  { title: 'Studio No. 8', type: 'Brand world · 2023', className: 'project-studio' },
]

export function NovaLanding() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className="nova-site">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="NOVA Studio home">NOVA<span>®</span></a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="header-cta" href="#contact">Start a project <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Independent digital studio · Est. 2018</p>
          <h1>We build digital experiences <em>beyond</em> ordinary.</h1>
          <p className="hero-intro">NOVA is an independent studio creating bold identities, immersive websites, and digital products for brands with something to say.</p>
          <a className="text-link" href="#work">Explore our work <MoveUpRight size={17} /></a>
        </div>
        <div className="hero-scene" aria-label="Interactive 3D composition with floating metallic rings and glass spheres" role="img">
          <div className="scene-grid" />
          <Nova3DScene />
          <div className="scene-label">Interactive space / 01</div>
          <div className="scroll-note">Move to explore <span>↓</span></div>
        </div>
      </section>

      <section className="marquee" aria-label="NOVA capabilities">
        <div>Strategy <span>✳</span> Design <span>✳</span> Technology <span>✳</span> Motion <span>✳</span> Strategy <span>✳</span> Design <span>✳</span></div>
      </section>

      <section className="section services-section" id="services">
        <div className="section-heading"><p className="eyebrow">What we do</p><p className="section-index">01 — 04</p></div>
        <div className="services-intro"><h2>We turn <em>curiosity</em> into connection.</h2><p>From first thought to final pixel, we blend strategy, design, and technology to create work that earns attention.</p></div>
        <div className="service-list">{services.map((service) => <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><button aria-label={`Learn more about ${service.title}`}><Plus size={19} /></button></article>)}</div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading"><p className="eyebrow">Selected work</p><p className="section-index">A selection of our latest</p></div>
        <div className="work-grid">{projects.map((project) => <a className={`project-card ${project.className}`} href="#contact" key={project.title}><div className="project-visual"><span className="project-badge">View project <ArrowUpRight size={14} /></span><div className="project-art" /></div><div className="project-meta"><div><h3>{project.title}</h3><p>{project.type}</p></div><span className="project-arrow"><ArrowUpRight size={20} /></span></div></a>)}</div>
      </section>

      <section className="process-section">
        <div className="section process-inner"><div className="section-heading"><p className="eyebrow">How we work</p><p className="section-index">Simple by design</p></div><h2>Good work happens <em>together.</em></h2><div className="process-grid">{['Discover', 'Define', 'Design', 'Deliver'].map((stage, i) => <div className="process-step" key={stage}><span>0{i + 1}</span><h3>{stage}</h3><p>{['We listen deeply to find the signal inside the noise.', 'We shape the opportunity into a clear creative direction.', 'We make the invisible tangible, useful, and unforgettable.', 'We launch, learn, and keep making it better.'][i]}</p></div>)}</div></div>
      </section>

      <section className="section about-section" id="about"><div className="about-statement"><p className="eyebrow">A little about us</p><h2>Small team.<br /><em>Big energy.</em></h2></div><div className="about-copy"><p className="large-copy">We are a close-knit team of strategists, designers, developers, and dreamers who believe the best digital work feels less like a campaign and more like a discovery.</p><p>Based between the real and the imagined, we partner with ambitious people to make the next version of their brand impossible to ignore.</p><a className="text-link" href="#contact">More about NOVA <MoveUpRight size={17} /></a></div></section>

      <section className="testimonial-section"><div className="section testimonial-inner"><Sparkles className="testimonial-spark" size={21} /><p className="eyebrow">Words from the field</p><blockquote>“NOVA took a complex idea and made it feel inevitable. The result was not just a new website — it was a new way of seeing ourselves.”</blockquote><p className="testimonial-credit">Sample testimonial · Client name placeholder</p><div className="testimonial-dots"><span className="active" /><span /><span /></div></div></section>

      <section className="contact-section" id="contact"><div className="section contact-inner"><div className="contact-heading"><p className="eyebrow">Have a good feeling?</p><h2>Let&apos;s make<br /><em>something happen.</em></h2><a className="whatsapp-link" href="https://wa.me/" target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={16} /></a></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>{sent ? <div className="form-success"><Check size={28} /><h3>Message received.</h3><p>Thanks for reaching out. This is a demo form — connect your inbox to make it live.</p></div> : <><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Tell us a little about your project<textarea required name="message" rows={3} placeholder="A few words to get us started..." /></label><button className="submit-button" type="submit">Send enquiry <ArrowUpRight size={16} /></button></>}</form></div></section>

      <footer className="site-footer"><a className="wordmark" href="#top">NOVA<span>®</span></a><p>Independent digital studio<br />for brands with a point of view.</p><div className="footer-links"><a href="#work">Instagram</a><a href="#work">Are.na</a><a href="#contact">Email us</a></div><p className="copyright">© 2024 NOVA Studio. All rights reserved.</p></footer>
    </main>
  )
}
