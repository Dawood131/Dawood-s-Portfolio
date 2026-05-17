import Hero from '../sections/Hero'
import HorizontalScroll from '../sections/HorizontalScroll'
import Projects from '../sections/Projects'

export default function Home({ isReady }) {
  return (
    <main>
      <Hero isReady={isReady} />
      <HorizontalScroll />
      <Projects />
      <div style={{ height: '100vh' }} />
    </main>
  )
}