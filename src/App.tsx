import { useEffect, useState } from 'react'
import { adaptLesson } from "./lib/gemini"
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Transition } from 'framer-motion'

type AccessMode = 'ADHD mode' | 'Dyslexia mode' | 'Calm mode'

const sampleContent =
  'Photosynthesis is the process by which plants convert light energy into chemical energy. Students should understand chlorophyll, carbon dioxide intake, water absorption through roots, glucose production, and oxygen release. They should compare cellular respiration and photosynthesis, explain the role of stomata, and complete a written response using evidence from the diagram.'

const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0 },
}

const sectionTransition: Transition = {
  duration: 0.85,
  ease: [0.21, 0.47, 0.32, 0.98],
}

function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      variants={fadeUp}
      transition={sectionTransition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AmbientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ x: [0, 42, -18, 0], y: [0, -28, 22, 0], scale: [1, 1.04, 0.98, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="orb orb-a"
      />
      <motion.div
        animate={{ x: [0, -34, 24, 0], y: [0, 30, -16, 0], scale: [1, 0.98, 1.05, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        className="orb orb-b"
      />
      <motion.div
        animate={{ x: [0, 20, -30, 0], y: [0, 24, -36, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
        className="orb orb-c"
      />
    </div>
  )
}

function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.28], [0, 110])
  const opacity = useTransform(scrollYProgress, [0, 0.24], [1, 0.52])

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-8 sm:px-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#d9c9bd]/70 bg-[#fffaf0]/70 px-5 py-3 shadow-soft backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9b7d9] text-[#3f3446] shadow-inner-glow">
            E
          </div>
          <span className="text-base font-semibold tracking-wide text-[#3f3446]">EduBridge AI</span>
        </div>
        <a href="#try-ai" className="rounded-full bg-[#6f5f76] px-5 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#5e5065]">
          Try AI
        </a>
      </nav>

      <motion.div style={{ y, opacity }} className="mx-auto grid max-w-7xl gap-16 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-32">
        <Reveal>
          <p className="mb-6 inline-flex rounded-full border border-[#dfb9a6]/80 bg-[#fff6ec]/70 px-4 py-2 text-sm font-medium text-[#8f6253]">
            Warm adaptive AI for neurodiverse learning
          </p>
          <h1 className="max-w-5xl text-6xl font-semibold leading-[0.96] text-balance text-[#3f3446] sm:text-7xl lg:text-8xl">
            Learning support that feels gentle before it feels smart.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-[#675d65]">
            EduBridge AI turns dense lessons into calm, structured learning paths that respect attention, reading comfort, sensory load, and emotional regulation.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#try-ai" className="rounded-full bg-[#6f5f76] px-7 py-4 text-base font-semibold text-[#fffaf0] shadow-soft transition hover:-translate-y-0.5 hover:bg-[#5e5065]">
              Try EduBridge AI
            </a>
            <a href="#calm" className="rounded-full border border-[#d8c7bb] bg-[#fffaf0]/60 px-7 py-4 text-base font-semibold text-[#5d5059] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/80">
              See calm mode
            </a>
          </div>
        </Reveal>

        <Reveal className="relative">
          <motion.div
            animate={{ rotate: [0, 1.2, -0.8, 0], y: [0, -10, 5, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="hero-device"
          >
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#7b6a72]">Live lesson support</span>
                <span className="rounded-full bg-[#f5d8c8]/80 px-3 py-1 text-sm text-[#7c5549]">soft pace</span>
              </div>
              <div className="rounded-[32px] bg-[#fffaf0]/70 p-6 shadow-inner-panel">
                <div className="mb-5 h-3 w-36 rounded-full bg-[#c9b7d9]" />
                <div className="space-y-4">
                  <div className="h-4 rounded-full bg-[#bfaecb]/70" />
                  <div className="h-4 w-10/12 rounded-full bg-[#e4cfc3]" />
                  <div className="h-4 w-7/12 rounded-full bg-[#eadfd2]" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {['Focus', 'Comfort', 'Load'].map((label, index) => (
                  <div key={label} className="rounded-[28px] border border-[#e4d7cd] bg-[#fffaf0]/54 p-4 text-center">
                    <div className={`mx-auto mb-3 h-14 w-14 rounded-full ${index === 0 ? 'bg-[#d7c6e6]' : index === 1 ? 'bg-[#f1cbbb]' : 'bg-[#ddd7b7]'}`} />
                    <span className="text-sm text-[#6d6067]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Reveal>
      </motion.div>
    </section>
  )
}

function TryAiSection() {
  const [content, setContent] = useState(sampleContent)

  const [modes, setModes] = useState<AccessMode[]>([
    'ADHD mode',
    'Calm mode',
  ])

  const [isAdapting, setIsAdapting] = useState(false)

  const [adapted, setAdapted] = useState({
    goal: '',
    steps: [] as string[],
    supports: [] as string[],
    teacherNote: '',
  })

  async function handleAdapt() {
    setIsAdapting(true)

    try {
      const modeLabel =
        modes.includes('ADHD mode')
          ? 'ADHD'
          : modes.includes('Dyslexia mode')
          ? 'Dyslexia'
          : 'Calm'

      const response = await adaptLesson(content, modeLabel)

      setAdapted({
        goal: response.title,
        steps: response.steps,
        supports: response.support,
        teacherNote: response.summary,
      })
    } catch (error) {
      console.error(error)

      alert('Gemini connection failed')
    }

    setIsAdapting(false)
  }

  useEffect(() => {
    handleAdapt()
  }, [])

  const toggleMode = (mode: AccessMode) => {
    setModes((current) =>
      current.includes(mode)
        ? current.filter((item) => item !== mode)
        : [...current, mode]
    )
  }

  return (
    <section id="try-ai" className="section-shell">
      <Reveal className="section-heading mx-auto text-center">
        <p className="eyebrow">Try EduBridge AI</p>

        <h2>
          Paste a dense lesson. Watch it become safer to learn.
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-[#675d65]">
          EduBridge AI transforms overwhelming educational content into
          calmer, neurodivergent-friendly learning experiences.
        </p>
      </Reveal>

      <Reveal className="ai-lab">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">

          {/* LEFT PANEL */}

          <div className="ai-input-card">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#9b7566]">
                  Original content
                </p>

                <h3 className="mt-2 text-3xl font-semibold text-[#3f3446]">
                  Before
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setContent(sampleContent)}
                className="rounded-full border border-[#d7c6ba] bg-[#fffaf0]/80 px-4 py-2 text-sm font-semibold text-[#6d6067]"
              >
                Reset
              </button>
            </div>

            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="ai-textarea"
              aria-label="Educational content to adapt"
              placeholder="Paste educational content here..."
            />

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                'ADHD mode',
                'Dyslexia mode',
                'Calm mode',
              ].map((mode) => (
                <button
                  key={mode}
                  onClick={() => toggleMode(mode as AccessMode)}
                  className={`rounded-full px-5 py-3 border transition ${
                    modes.includes(mode as AccessMode)
                      ? 'bg-[#6f5f76] text-white border-[#6f5f76]'
                      : 'bg-white text-[#5f555c] border-[#d8c7bb]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button
              onClick={handleAdapt}
              className="mt-6 rounded-full bg-[#3f3446] text-white px-6 py-4 font-semibold transition hover:bg-[#2f2436]"
            >
              {isAdapting ? 'Adapting...' : 'Adapt with AI'}
            </button>
          </div>

          {/* RIGHT PANEL */}

          <div className="rounded-[38px] border border-[#e4d7cd] bg-[#fffaf0]/72 p-8 shadow-soft backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#9b7566]">
                  EduBridge AI Adaptation
                </p>

                <h3 className="mt-2 text-3xl font-semibold text-[#3f3446]">
                  After
                </h3>
              </div>

              <div className="rounded-full bg-[#efe2d7] px-4 py-2 text-sm text-[#6f5f76]">
                Adaptive mode active
              </div>
            </div>

            <div className="mt-8 space-y-7">

              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-[#9b7566]">
                  Learning Goal
                </p>

                <h4 className="mt-3 text-3xl font-semibold text-[#3f3446] leading-tight">
                  {adapted.goal}
                </h4>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-[#9b7566]">
                  Step-by-step Learning
                </p>

                <div className="mt-5 space-y-4">
                  {adapted.steps?.map((step, index) => (
                    <div
                      key={index}
                      className="rounded-[28px] border border-[#e7d9cf] bg-white/90 p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efe2d7] text-[#6f5f76] font-semibold">
                          {index + 1}
                        </div>

                        <p className="flex-1 text-lg leading-8 text-[#5f555c]">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-[#9b7566]">
                  Support Tips
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {adapted.supports?.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-full bg-[#f3e8dc] px-5 py-3 text-[#5f555c]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] bg-white/80 p-6">
                <p className="text-sm uppercase tracking-[0.12em] text-[#9b7566]">
                  Emotional Support
                </p>

                <p className="mt-4 text-lg leading-8 text-[#5f555c]">
                  {adapted.teacherNote}
                </p>
              </div>

            </div>
          </div>

        </div>
      </Reveal>
    </section>
  )
}

function TransformationSection() {
  return (
    <section id="transformation" className="section-shell">
      <Reveal className="section-heading">
        <p className="eyebrow">Before becomes after</p>
        <h2>From effortful and crowded to calm enough to begin.</h2>
      </Reveal>
      <Reveal className="grid gap-6 lg:grid-cols-2">
        <div className="overwhelm-panel panel min-h-[520px]">
          <p className="mb-6 text-lg font-semibold text-[#7f4e49]">Traditional lesson</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <motion.div
                key={index}
                animate={{ opacity: [0.64, 0.9, 0.72], x: [0, index % 2 ? 5 : -4, 0] }}
                transition={{ duration: 2.4 + index * 0.08, repeat: Infinity }}
                className="rounded-3xl border border-[#dfb9a6]/70 bg-[#fff6ec]/64 p-4 text-sm text-[#765d5a]"
              >
                Dense task, unclear priority, too many signals
              </motion.div>
            ))}
          </div>
        </div>
        <div className="panel calm-panel min-h-[520px]">
          <p className="mb-6 text-lg font-semibold text-[#62536b]">EduBridge adaptation</p>
          <div className="space-y-5">
            {[
              ['One next step', 'The lesson highlights a single beginning point and gives the learner room to start.'],
              ['Language softens', 'Instructions become shorter, warmer, and easier to scan.'],
              ['Support appears quietly', 'Visual structure, pause prompts, and modality choices arrive without stigma.'],
            ].map(([title, body], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.16, duration: 0.7 }}
                className="rounded-[32px] border border-[#d8c8df]/70 bg-[#fffaf0]/58 p-6 shadow-soft"
              >
                <h3 className="text-2xl font-semibold text-[#3f3446]">{title}</h3>
                <p className="mt-3 text-lg leading-8 text-[#675d65]">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function AttentionSection() {
  const signals = [
    ['Attention comfort', '84%', 'focus-peach'],
    ['Reading ease', '76%', 'focus-lavender'],
    ['Emotional safety', '92%', 'focus-sage'],
  ]

  return (
    <section className="section-shell">
      <Reveal className="section-heading">
        <p className="eyebrow">Live AI attention</p>
        <h2>Learning signals become supportive choices, not pressure.</h2>
      </Reveal>
      <Reveal className="panel grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
          {signals.map(([label, value, className]) => (
            <div key={label} className="rounded-[34px] border border-[#e1d5ca] bg-[#fffaf0]/56 p-6">
              <div className={`focus-ring ${className}`}>
                <span>{value}</span>
              </div>
              <p className="mt-5 text-xl font-semibold text-[#4a3f49]">{label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[38px] bg-[#fffaf0]/58 p-6">
          <div className="chart-glow">
            {Array.from({ length: 18 }).map((_, index) => (
              <motion.span
                key={index}
                animate={{ height: [`${24 + (index % 4) * 8}%`, `${38 + (index % 5) * 7}%`, `${24 + (index % 4) * 8}%`] }}
                transition={{ duration: 4, delay: index * 0.08, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Reduce choices', 'Offer visual path', 'Quiet the timer', 'Invite a pause'].map((item) => (
              <div key={item} className="rounded-3xl bg-[#f8eee5] p-5 text-lg text-[#5f555c]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function CalmModeSection() {
  return (
    <section id="calm" className="section-shell">
      <Reveal className="calm-center">
        <p className="eyebrow">Calm mode</p>
        <h2>When learning gets loud, the interface becomes quieter.</h2>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.86, 1, 0.86] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          className="breath-orb"
        >
          <span>Breathe</span>
        </motion.div>
        <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-[#675d65]">
          EduBridge can lower density, soften pacing, and create a private moment for regulation without making a learner feel watched.
        </p>
      </Reveal>
    </section>
  )
}

function TeacherSection() {
  return (
    <section className="section-shell">
      <Reveal className="section-heading">
        <p className="eyebrow">Teacher intelligence</p>
        <h2>Insight that feels less like monitoring and more like care.</h2>
      </Reveal>
      <Reveal className="grid gap-6 lg:grid-cols-3">
        {[
          ['Learning modality', 'Visual cues are strongest before independent practice.', ['Visual', 'Audio', 'Text']],
          ['AI recommendation', 'Move Maya to a two-step prompt and offer the color-coded example first.', ['Pace', 'Choice', 'Support']],
          ['Classroom rhythm', 'The group is ready for quiet collaboration after a three-minute reset.', ['Energy', 'Focus', 'Ease']],
        ].map(([title, body, chips]) => (
          <div key={title as string} className="panel">
            <h3 className="text-3xl font-semibold text-[#3f3446]">{title}</h3>
            <p className="mt-5 text-lg leading-8 text-[#675d65]">{body as string}</p>
            <div className="mt-8 space-y-4">
              {(chips as string[]).map((chip, index) => (
                <div key={chip} className="rounded-full bg-[#f8eee5] p-2">
                  <motion.div
                    initial={{ width: '35%' }}
                    whileInView={{ width: `${88 - index * 16}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: index * 0.12 }}
                    className="rounded-full bg-gradient-to-r from-[#d8c8df] via-[#fffaf0] to-[#f1cbbb] px-4 py-2 text-sm font-semibold text-[#4a3f49]"
                  >
                    {chip}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function ParentSection() {
  return (
    <section className="section-shell">
      <Reveal className="panel warm-panel grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">Parent experience</p>
          <h2 className="text-5xl font-semibold leading-tight text-[#3f3446] md:text-6xl">Progress updates that sound like your child, not a spreadsheet.</h2>
          <p className="mt-6 text-xl leading-9 text-[#675d65]">
            Families see weekly improvements, support ideas, and moments of confidence worth celebrating at home.
          </p>
        </div>
        <div className="grid gap-5">
          {[
            ['+18%', 'More independent starts this week'],
            ['4 calm returns', 'Used breathing support without prompting'],
            ['Visual-first path', 'Best comprehension window: late morning'],
          ].map(([metric, detail]) => (
            <div key={metric} className="rounded-[34px] border border-[#e1d5ca] bg-[#fffaf0]/62 p-6 shadow-soft backdrop-blur-xl">
              <p className="text-5xl font-semibold text-[#3f3446]">{metric}</p>
              <p className="mt-3 text-lg text-[#675d65]">{detail}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section id="cta" className="section-shell pb-20">
      <Reveal className="final-panel">
        <p className="eyebrow">The bridge is personal</p>
        <h2>Build classrooms where more children feel understood before they have to ask.</h2>
        <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-[#675d65]">
          EduBridge AI brings warm intelligence to adaptive education, helping teachers, parents, and learners meet in the same hopeful place.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="mailto:hello@edubridge.ai" className="rounded-full bg-[#6f5f76] px-8 py-4 text-base font-semibold text-[#fffaf0] shadow-soft transition hover:-translate-y-0.5 hover:bg-[#5e5065]">
            Request early access
          </a>
          <a href="#try-ai" className="rounded-full border border-[#d8c7bb] bg-[#fffaf0]/70 px-8 py-4 text-base font-semibold text-[#5d5059] transition hover:-translate-y-0.5 hover:bg-white">
            Try the AI again
          </a>
        </div>
      </Reveal>
    </section>
  )
}

export default function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf3e8] text-[#3f3446]">
      <AmbientOrbs />
      <HeroSection />
      <TryAiSection />
      <TransformationSection />
      <AttentionSection />
      <CalmModeSection />
      <TeacherSection />
      <ParentSection />
      <FinalCtaSection />
    </main>
  )
}
