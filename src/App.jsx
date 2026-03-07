import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle2, Car, Calendar, Shield,
  UserPlus, Navigation, ClipboardList, ChevronDown, Menu, X, Smartphone,
  PiggyBank, Target, Eye
} from 'lucide-react'

const API_URL = '/api/waitlist'

// ─── Animation Variants ───────────────────────────────────────────────────────
const blurIn = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 20, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav({ onWaitlistClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: "Who It's For", href: '#who' },
    { label: 'How It Works', href: '#how' },
    { label: 'Why Different', href: '#why' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-md shadow-purple-200">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-gray-900 text-base tracking-tight">Drive Prep</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center bg-gray-100/80 rounded-full px-1.5 py-1.5 gap-0.5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Badge */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Launching soon
            </div>
            <button
              onClick={onWaitlistClick}
              className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-200 active:scale-95"
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-4"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-medium text-gray-700 hover:text-violet-600 border-b border-gray-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onWaitlistClick() }}
              className="mt-4 w-full bg-violet-600 text-white text-sm font-semibold py-3 rounded-full hover:bg-violet-700 transition-colors"
            >
              Join Waitlist
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ─── iPhone Mockup ────────────────────────────────────────────────────────────
function IPhoneMockup() {
  return (
    <div className="relative w-64 mx-auto select-none">
      {/* Glow background */}
      <div className="absolute inset-0 -z-10 bg-purple-400/20 blur-3xl rounded-full scale-150" />

      {/* Phone shell */}
      <div
        className="relative bg-gray-900 rounded-[40px] p-2 shadow-2xl shadow-gray-900/40"
        style={{ transform: 'rotate(-4deg)' }}
      >
        {/* Screen */}
        <div className="bg-white rounded-[34px] overflow-hidden">
          {/* Status bar */}
          <div className="bg-gray-900 px-5 pt-3 pb-2 flex justify-between items-center">
            <span className="text-white text-[10px] font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white/60 rounded-sm flex items-center px-0.5">
                <div className="w-3/4 h-1 bg-green-400 rounded-sm" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="bg-gray-50 px-4 py-5" style={{ minHeight: 400 }}>
            {/* Header */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-[10px] font-semibold px-3 py-1 rounded-full mb-3">
                <CheckCircle2 size={10} />
                Test-style drive complete
              </div>
              <div className="text-2xl font-bold text-gray-900">4 faults</div>
              <div className="text-green-600 font-semibold text-sm mt-0.5">You would PASS ✓</div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-gray-400 mb-1.5 font-medium">
                <span>Fault Score</span>
                <span>4 / 15 max</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '27%' }}
                  transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Fault cards */}
            <div className="space-y-2.5 mb-4">
              <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Serious Faults</div>
                    <div className="text-xl font-bold text-gray-900 mt-0.5">0</div>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Driving Faults</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xl font-bold text-gray-900">4</span>
                      <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded-full">↓ from 9</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {['Mirror', 'Speed', 'Obs'].map((f) => (
                      <div key={f} className="text-[9px] text-gray-400">{f}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom button */}
            <button className="w-full bg-violet-600 text-white text-[11px] font-semibold py-2.5 rounded-xl">
              View Full Report →
            </button>
          </div>
        </div>

        {/* Home indicator */}
        <div className="h-6 flex items-center justify-center">
          <div className="w-20 h-1 bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// ─── Waitlist Form ────────────────────────────────────────────────────────────
function WaitlistForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [device, setDevice] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !device) {
      setErrorMsg('Please fill in all fields and select your phone type.')
      return
    }
    setErrorMsg('')
    setStatus('loading')

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), device }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
      >
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} className="text-green-600" />
        </div>
        <p className="text-green-800 font-semibold text-xl mb-2">You're on the list!</p>
        <p className="text-green-700 text-base leading-relaxed">
          We'll email you the moment Drive Prep launches. One email, no spam.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full">
      {/* Name */}
      <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-5 py-4 rounded-full border border-gray-200 bg-white text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
        />
      </motion.div>

      {/* Email */}
      <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-5 py-4 rounded-full border border-gray-200 bg-white text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
        />
      </motion.div>

      {/* Device picker */}
      <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-2.5 px-1">
          Which phone do you use?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {['iPhone', 'Android'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDevice(d)}
              className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-full border text-sm font-semibold transition-all duration-200 ${
                device === d
                  ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-purple-200'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50'
              }`}
            >
              <Smartphone size={15} />
              {d}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {errorMsg && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-xs text-center px-2"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Join the waitlist
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </motion.div>

      <p className="text-center text-sm text-gray-500 pt-1">
        No spam. One email when we launch. UK learners only.
      </p>
    </form>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const waitlistRef = useRef(null)

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="overflow-x-hidden font-['Inter',sans-serif]">
      <Nav onWaitlistClick={scrollToWaitlist} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex items-center pt-20 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-white lg:min-h-screen">
        {/* BG blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">

            {/* Left — 60% */}
            <div className="lg:col-span-3">
              {/* Eyebrow */}
              <motion.div
                variants={blurIn}
                custom={0}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-4 py-2 mb-4 sm:mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-semibold text-violet-700 uppercase tracking-widest">Early Access</span>
              </motion.div>

              {/* Headline */}
              <div className="mb-4 sm:mb-6 space-y-1">
                <motion.h1
                  variants={blurIn}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05] text-gray-900"
                >
                  Your driving test<br />is booked.
                </motion.h1>
                <motion.h1
                  variants={blurIn}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05] bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent"
                >
                  Are you actually ready?
                </motion.h1>
              </div>

              {/* Subhead */}
              <motion.p
                variants={blurIn}
                custom={3}
                initial="hidden"
                animate="visible"
                className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-10 max-w-xl"
              >
                Run a full mock test drive with someone you trust.
                They stay quiet, note your faults, and the app tells you if you'd pass or fail.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={blurIn}
                custom={4}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4"
              >
                <button
                  onClick={scrollToWaitlist}
                  className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-7 py-4 rounded-full text-sm sm:text-base transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-purple-200 active:scale-95 w-full sm:w-auto"
                >
                  Join the waitlist
                  <ArrowRight size={18} />
                </button>
                <p className="text-sm text-gray-500 text-center sm:text-left sm:self-center">No spam. One email when we launch.</p>
              </motion.div>
            </div>

            {/* Right — 40% */}
            <motion.div
              className="lg:col-span-2 hidden lg:flex justify-center"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="will-change-transform"
              >
                <IPhoneMockup />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-gray-300"
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Who It's For ──────────────────────────────────────────────────── */}
      <section id="who" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#f5f3ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-8 sm:mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-4">WHO IT'S FOR</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 leading-tight text-balance mb-3">
              Is this for you?
            </h2>
            <p className="text-gray-600 text-xl max-w-xl mx-auto">
              Not for beginners.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                Icon: Car,
                title: 'You can already drive on your own',
                story: "You're past beginner lessons, comfortable solo driving.",
                bg: 'bg-violet-100',
                iconClass: 'text-violet-600',
              },
              {
                Icon: Calendar,
                title: "Your test is soon (or you've failed before)",
                story: "Test date locked in, or second-chance nerves are real.",
                bg: 'bg-purple-100',
                iconClass: 'text-purple-600',
              },
              {
                Icon: Shield,
                title: 'You want confidence, not guesswork',
                story: "Proof you'd pass today. Not hope so.",
                bg: 'bg-indigo-100',
                iconClass: 'text-indigo-600',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-[28px] p-5 sm:p-8 border border-violet-100 shadow-sm hover:shadow-md transition-shadow will-change-transform"
              >
                <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center mb-5`}>
                  <card.Icon size={22} className={card.iconClass} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{card.story}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section id="how" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-8 sm:mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-4">HOW IT WORKS</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 leading-tight text-balance">
              Three steps. One honest result.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-violet-200 via-purple-300 to-violet-200" />

            {[
              {
                num: '1',
                Icon: UserPlus,
                title: 'Invite a Buddy',
                story: 'Full UK licence, 3+ years. Parent, partner, sibling.',
              },
              {
                num: '2',
                Icon: Navigation,
                title: "Drive like it's the real test",
                story: 'They stay quiet. You follow sat nav. They note faults.',
              },
              {
                num: '3',
                Icon: ClipboardList,
                title: "See your result",
                story: 'App shows pass or fail, and exactly what went wrong.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="text-center relative"
              >
                <div className="relative inline-flex w-16 h-16 bg-violet-600 rounded-2xl items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-200 z-10">
                  <step.Icon size={24} className="text-white" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-violet-600 text-violet-600 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed max-w-xs mx-auto">{step.story}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark Section ──────────────────────────────────────────────────── */}
      <section id="why" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0b021f] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-900/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-900/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            variants={blurIn}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-8"
          >
            WHY THIS IS DIFFERENT
          </motion.p>

          <motion.h2
            variants={blurIn}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[1.1] text-balance mb-10 sm:mb-14"
          >
            LESSONS teach you <span className="text-purple-400">HOW</span> to drive.{' '}
            <br className="hidden sm:block" />
            DrivePrep shows <span className="text-purple-400">IF</span> you're{' '}
            <span className="text-purple-400">READY.</span>
          </motion.h2>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { Icon: PiggyBank, title: 'No extra money on more lessons', story: 'Use someone you know. Not a paid instructor.' },
              { Icon: Target, title: 'Spot and fix habits that fail tests', story: 'See your real weaknesses before the examiner does.' },
              { Icon: Eye, title: 'Go in knowing what to expect', story: 'Test day feels familiar. Not scary.' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:bg-white/10 transition-all duration-200 will-change-transform"
              >
                <div className="w-10 h-10 bg-purple-900/50 rounded-xl flex items-center justify-center mb-4">
                  <card.Icon size={18} className="text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">{card.title}</h3>
                <p className="text-white/75 text-base leading-relaxed">{card.story}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Waitlist / Final CTA ───────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white" ref={waitlistRef}>
        <div className="max-w-md mx-auto text-center">
          <motion.div
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-7 sm:mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-4">
              Build confidence for your exam
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 leading-tight text-balance mb-4">
              Not confident about your test?<br />Failed before and don't want to again?
            </h2>
            <p className="text-gray-700 text-xl font-medium">
              DrivePrep is for you.
            </p>
          </motion.div>

          <WaitlistForm />
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">D</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">Drive Prep</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Drive Prep. Built for UK learner drivers.
          </p>
          <p className="text-sm text-gray-500">Coming soon to iOS & Android</p>
        </div>
      </footer>
    </div>
  )
}
