import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const NAV_H = 80
const CARD_TOP = NAV_H + 8
const CARD_HEIGHT = `calc(100vh - ${CARD_TOP + 8}px)`

export default function Projects() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const cards = cardsRef.current.filter(Boolean)
        const total = cards.length

        gsap.set(headerRef.current, { yPercent: 0, opacity: 1 })
        cards.forEach((card, i) => {
          gsap.set(card, {
            yPercent: 105,
            scale: 1,
            zIndex: i + 1,
            transformOrigin: 'top center',
            force3D: true,
          })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * (total + 1)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        tl.to(headerRef.current, { yPercent: -110, opacity: 0, duration: 0.8, ease: 'none' }, 0)
        tl.to(cards[0], { yPercent: 0, duration: 0.8, ease: 'none' }, 0)

        cards.forEach((card, i) => {
          if (i === 0) return
          tl.to(card, { yPercent: 0, duration: 0.8, ease: 'none' }, i)
          tl.to(cards[i - 1], { scale: 0.88, yPercent: -8, duration: 0.8, ease: 'none' }, i)
        })

        tl.to({}, { duration: 0.5 })
      }, sectionRef)

      return () => ctx.revert()
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style>{`
        .proj-card-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          height: 100%;
          gap: 0;
        }

        @media (max-width: 768px) {
          .proj-card-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }
          .proj-img-col {
            height: 200px !important;
          }
          .proj-info-col {
            padding: 24px 24px 28px !important;
          }
          .proj-title {
            font-size: 2.8rem !important;
          }
          .proj-meta-row {
            flex-direction: column !important;
            gap: 16px !important;
            align-items: flex-start !important;
          }
        }

        @media (max-width: 480px) {
          .proj-card-inner {
            grid-template-rows: 180px 1fr;
          }
          .proj-img-col {
            height: 180px !important;
          }
          .proj-title {
            font-size: 2.2rem !important;
          }
        }

        .proj-img-col {
          position: relative;
          overflow: hidden;
          border-radius: 0;
        }

        .proj-img-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.6s ease;
          display: block;
        }

        .proj-card-wrap:hover .proj-img-col img {
          transform: scale(1.04);
        }

        .proj-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%);
          pointer-events: none;
        }

        .proj-img-number {
          position: absolute;
          bottom: 20px;
          left: 24px;
          font-size: 72px;
          font-weight: 900;
          font-family: Inter, sans-serif;
          letter-spacing: -0.05em;
          line-height: 1;
          opacity: 0.08;
          color: #fff;
          pointer-events: none;
          user-select: none;
        }

        .proj-info-col {
          padding: 36px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .proj-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .proj-subtitle-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-family: Inter, sans-serif;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid;
          font-weight: 500;
        }

        .proj-num {
          font-size: 11px;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.15);
          font-family: Inter, sans-serif;
        }

        .proj-mid {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px 0 20px;
        }

        .proj-title {
          font-size: clamp(3rem, 5vw, 5.5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.04em;
          line-height: 0.9;
          font-family: Inter, sans-serif;
          margin-bottom: 16px;
        }

        .proj-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          line-height: 1.75;
          font-family: Inter, sans-serif;
          max-width: 420px;
        }

        .proj-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
        }

        .proj-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .proj-tech-tag {
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 4px 10px;
          border-radius: 6px;
          font-family: Inter, sans-serif;
          background: rgba(255,255,255,0.03);
        }

        .proj-live-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          font-family: Inter, sans-serif;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid;
          transition: background 0.3s, transform 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .proj-live-btn:hover {
          transform: translateY(-1px);
        }

        .proj-divider {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 1px;
          background: rgba(255,255,255,0.06);
        }

        .proj-corner-accent {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 120px;
          height: 120px;
          pointer-events: none;
          opacity: 0.04;
          border-top-left-radius: 100%;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          height: '100vh',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            position: 'absolute',
            top: CARD_TOP,
            left: 0,
            right: 0,
            padding: '24px 6vw 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            zIndex: 100,
          }}
        >
          <div>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '10px',
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '5px', height: '5px',
                borderRadius: '50%',
                background: '#00D4FF',
                display: 'inline-block',
              }} />
              Selected Work
            </p>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              fontFamily: 'Inter, sans-serif',
            }}>
              PROJECTS
            </h2>
          </div>

          <Link
            to="/projects"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              borderBottom: '1px solid rgba(255,255,255,0.15)',
              paddingBottom: '4px',
              transition: 'color 0.3s, border-color 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#00D4FF'
              e.currentTarget.style.borderColor = '#00D4FF'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
          >
            View All →
          </Link>
        </div>

        {/* Cards */}
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={el => (cardsRef.current[i] = el)}
            className="proj-card-wrap"
            style={{
              position: 'absolute',
              top: CARD_TOP,
              left: '4vw',
              right: '4vw',
              height: CARD_HEIGHT,
              background: project.bg,
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              overflow: 'hidden',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="proj-card-inner">

              {/* LEFT — Image */}
              <div className="proj-img-col">
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                />
                <div className="proj-img-overlay" />
                <div className="proj-img-number">{project.num}</div>
              </div>

              {/* RIGHT — Info */}
              <div className="proj-info-col">
                <div className="proj-divider" />

                {/* Corner bg accent */}
                <div
                  className="proj-corner-accent"
                  style={{ background: project.color }}
                />

                {/* Top */}
                <div className="proj-top">
                  <span
                    className="proj-subtitle-pill"
                    style={{
                      color: project.color,
                      borderColor: `${project.color}33`,
                      background: `${project.color}0d`,
                    }}
                  >
                    <span style={{
                      width: '4px', height: '4px',
                      borderRadius: '50%',
                      background: project.color,
                      display: 'inline-block',
                      flexShrink: 0,
                    }} />
                    {project.subtitle}
                  </span>
                  <span className="proj-num">
                    {project.num} / {String(projects.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Mid — title + desc */}
                <div className="proj-mid">
                  <h3 className="proj-title">{project.title}</h3>
                  <p className="proj-desc">{project.description}</p>
                </div>

                {/* Bottom — tech + live */}
                <div className="proj-meta-row">
                  <div className="proj-tech-list">
                    {project.tech.map((t, j) => (
                      <span key={j} className="proj-tech-tag">{t}</span>
                    ))}
                  </div>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-live-btn"
                    style={{
                      color: project.color,
                      borderColor: `${project.color}44`,
                      background: `${project.color}0d`,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = `${project.color}22`)}
                    onMouseLeave={e => (e.currentTarget.style.background = `${project.color}0d`)}
                  >
                    Live ↗
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom accent line */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '50%',
              height: '2px',
              background: `linear-gradient(to right, ${project.color}99, transparent)`,
            }} />
          </div>
        ))}
      </section>
    </>
  )
}