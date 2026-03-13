import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle2, Car, Calendar, Shield,
  UserPlus, Navigation, ClipboardList, Menu, X, Smartphone,
  PiggyBank, Target, AlertCircle
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

// ─── Waitlist Modal ───────────────────────────────────────────────────────────
function WaitlistModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Join the waitlist</h2>
          <p className="text-gray-500 text-base">Be among the first UK learners to try DrivePrep. Free — one email when we launch.</p>
        </div>
        <WaitlistForm />
      </motion.div>
    </motion.div>
  )
}

// ─── Mobile Carousel ──────────────────────────────────────────────────────────
function MobileCarousel({ children, count, containerClass, dark = false }) {
  const [active, setActive] = useState(0)
  const ref = useRef(null)

  const onScroll = () => {
    if (!ref.current) return
    const { scrollLeft, scrollWidth, clientWidth } = ref.current
    const maxScroll = scrollWidth - clientWidth
    const pct = maxScroll > 0 ? scrollLeft / maxScroll : 0
    setActive(Math.min(Math.round(pct * (count - 1)), count - 1))
  }

  const goTo = (i) => {
    if (!ref.current) return
    const cardW = ref.current.scrollWidth / count
    ref.current.scrollTo({ left: i * cardW, behavior: 'smooth' })
  }

  return (
    <div>
      <div ref={ref} onScroll={onScroll} className={containerClass}>
        {children}
      </div>
      <div className="flex justify-center gap-2 mt-5 md:hidden">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i
                ? `w-5 ${dark ? 'bg-purple-400' : 'bg-violet-600'}`
                : `w-1.5 ${dark ? 'bg-white/30' : 'bg-gray-300'}`
            }`}
            aria-label={`Card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Interactive Scorecard ───────────────────────────────────────────────────
function InteractiveScorecard() {
  const [faults, setFaults] = useState({
    Mirrors: 0,
    Signals: 0,
    Speed: 0,
    Position: 0
  })
  const [serious, setSerious] = useState(false)
  const [lastAction, setLastAction] = useState('')
  const [isFinished, setIsFinished] = useState(false)

  const totalMinors = Object.values(faults).reduce((a, b) => a + b, 0)
  const finalResult = !serious && totalMinors < 16

  const addMinor = (type) => {
    if (isFinished || serious) return
    
    const newCount = faults[type] + 1
    if (newCount === 3) {
      setSerious(true)
      setLastAction(`3x ${type} = Serious Fault!`)
      setFaults(prev => ({ ...prev, [type]: 3 }))
    } else {
      setFaults(prev => ({ ...prev, [type]: newCount }))
      setLastAction(`Added Minor: ${type}`)
    }
  }

  const toggleSerious = () => {
    if (isFinished) return
    setSerious(true)
    setLastAction('SERIOUS FAULT recorded')
  }

  const reset = () => {
    setFaults({ Mirrors: 0, Signals: 0, Speed: 0, Position: 0 })
    setSerious(false)
    setLastAction('Test Reset')
    setIsFinished(false)
  }

  const endTrip = () => {
    setIsFinished(true)
    setLastAction('Test Drive Complete')
  }

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden max-w-2xl mx-auto relative">
      {/* Overlay for Finished State */}
      <AnimatePresence>
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${finalResult ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {finalResult ? <CheckCircle2 size={40} /> : <X size={40} />}
            </div>
            <h3 className="text-3xl font-black italic tracking-tighter mb-2">
              {finalResult ? 'YOU PASSED ✓' : 'YOU FAILED ✗'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-xs">
              {serious ? 'Failed due to a Serious Fault.' : totalMinors >= 16 ? 'Failed on too many minor faults.' : 'Great job! You stayed within the limits.'}
            </p>
            <button onClick={reset} className="bg-violet-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-violet-700 transition-all">
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-[#1A1A1B] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Live Mock Test</span>
        </div>
        <div className="flex gap-4">
          <button onClick={reset} className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
            Reset
          </button>
          <button 
            onClick={endTrip} 
            disabled={isFinished}
            className="bg-violet-600 hover:bg-violet-700 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md transition-colors disabled:opacity-50"
          >
            End Trip
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Status Display */}
        <div className={`mb-8 p-6 rounded-2xl border transition-colors duration-500 text-center ${
          serious || totalMinors >= 16 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
        }`}>
          <div className={`text-4xl sm:text-5xl font-black italic tracking-tighter mb-1 ${
            serious || totalMinors >= 16 ? 'text-red-600' : 'text-green-600'
          }`}>
            {serious || totalMinors >= 16 ? 'FAILING' : 'PASSING'}
          </div>
          <div className="flex justify-center items-center gap-2 text-gray-600 text-sm font-medium">
            <span>{totalMinors} Minors</span>
            <span className="opacity-30">|</span>
            <span className={serious ? 'text-red-600 font-bold' : ''}>{serious ? '1 Serious' : '0 Serious'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Driving Faults</p>
              <p className="text-[9px] text-gray-400 font-medium italic">3 strikes = 1 Major</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(faults).map(type => (
                <button
                  key={type}
                  onClick={() => addMinor(type)}
                  disabled={serious || isFinished}
                  className="bg-gray-50 hover:bg-violet-50 border border-gray-100 hover:border-violet-200 text-gray-700 p-4 rounded-xl text-xs font-bold transition-all active:scale-95 flex flex-col items-center gap-2 disabled:opacity-50"
                >
                  <span className="uppercase tracking-tight">+ {type}</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map(step => (
                      <div 
                        key={step} 
                        className={`w-1.5 h-1.5 rounded-full border transition-colors ${
                          faults[type] >= step 
                          ? step === 3 ? 'bg-red-500 border-red-500' : 'bg-violet-600 border-violet-600' 
                          : 'bg-white border-gray-200'
                        }`} 
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest px-1">Critical Error</p>
            <button
              onClick={toggleSerious}
              disabled={serious || isFinished}
              className={`w-full h-[calc(100%-30px)] border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 transition-all ${
                serious 
                ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-200' 
                : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 active:scale-95 disabled:opacity-50'
              }`}
            >
              <Shield size={28} />
              <div className="text-center">
                <span className="block text-sm font-black uppercase italic tracking-tighter leading-tight">Serious Fault</span>
                <span className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Automatic Fail</span>
              </div>
            </button>
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-gray-100/50 rounded-xl px-4 py-3 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-2 h-2 rounded-full shrink-0 ${serious ? 'bg-red-600' : 'bg-violet-600'}`} />
            <span className="text-xs text-gray-500 font-bold uppercase tracking-tight truncate">
              {lastAction || 'Wait for first fault...'}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 font-bold italic shrink-0 ml-4">LIVE FEED</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const waitlistRef = useRef(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="overflow-x-hidden font-['Inter',sans-serif] bg-white relative">
      <AnimatePresence>
        {isModalOpen && <WaitlistModal onClose={closeModal} />}
      </AnimatePresence>
      <Nav onWaitlistClick={openModal} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex items-center pt-24 pb-16 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-white lg:min-h-[90vh]">
        {/* BG blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-50/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left — Text content */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <motion.div
                variants={blurIn}
                custom={0}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-4 py-2 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-semibold text-violet-700 uppercase tracking-widest">Early Access</span>
              </motion.div>

              {/* Headline */}
              <div className="mb-6 space-y-2">
                <motion.h1
                  variants={blurIn}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] text-gray-900"
                >
                  Stop Memorising Test Routes.
                </motion.h1>
                <motion.h1
                  variants={blurIn}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent"
                >
                  Fix the Habits That Make People Fail.
                </motion.h1>
              </div>

              {/* Subhead */}
              <motion.p
                variants={blurIn}
                custom={3}
                initial="hidden"
                animate="visible"
                className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl"
              >
                Failed your test recently, or have one booked and not sure if you're truly ready?
                You're not alone — and it's probably not what you think.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={blurIn}
                custom={4}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <button
                  onClick={openModal}
                  className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-purple-200 active:scale-95 w-full sm:w-auto"
                >
                  Join the waitlist
                  <ArrowRight size={18} />
                </button>
                <div className="text-sm text-gray-500 text-center sm:text-left">
                  <span className="block font-medium text-gray-700">UK learners only.</span>
                  No spam. One email when we launch.
                </div>
              </motion.div>
            </div>

            {/* Right — Phone Mockup (Grid Breaking) */}
            <motion.div
              className="lg:col-span-5 hidden lg:flex justify-end relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 -right-4 z-20"
              >
                <IPhoneMockup />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Experience the Test ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-4">TRY THE SIMULATOR</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
              How would you score today?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              During a real test, the examiner marks faults instantly. 
              One serious mistake is an automatic fail. Try it yourself below.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <InteractiveScorecard />
          </motion.div>
        </div>
      </section>

      {/* ── Who It's For ──────────────────────────────────────────────────── */}
      <section id="who" className="relative py-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-[#fbfaff]">
        {/* Road detail */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-24 bg-gradient-to-b from-white to-transparent z-10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-4">WHO IT'S FOR</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
              Is this for you?
            </h2>
            <p className="text-gray-500 text-xl max-w-xl mx-auto font-medium">
              Not for beginners.
            </p>
          </motion.div>

          <MobileCarousel count={4} containerClass="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-6 lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:overflow-visible lg:gap-6">
            {[
              {
                Icon: Calendar,
                title: 'Your test is booked and you want to know if you\'re ready',
                story: 'Test date locked in. You need proof your driving is at the right standard — not just a feeling.',
                bg: 'bg-purple-100',
                iconClass: 'text-purple-600',
              },
              {
                Icon: AlertCircle,
                title: "You've failed before and want to understand why",
                story: "Second-chance nerves are real. Find out exactly what went wrong so it doesn't happen again.",
                bg: 'bg-red-100',
                iconClass: 'text-red-500',
              },
              {
                Icon: PiggyBank,
                title: "You can't afford endless extra lessons",
                story: 'More paid lessons aren\'t always the answer. Use someone you know to get real, structured feedback.',
                bg: 'bg-violet-100',
                iconClass: 'text-violet-600',
              },
              {
                Icon: Shield,
                title: 'You want confidence before test day',
                story: "Not just hoping for the best. Proof that your driving is ready before you step into that examiner's car.",
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
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="snap-start snap-always flex-none w-[85vw] lg:w-auto bg-white rounded-[32px] p-8 border border-violet-100/50 shadow-sm hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <card.Icon size={26} className={card.iconClass} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-tight">{card.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{card.story}</p>
              </motion.div>
            ))}
          </MobileCarousel>
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
              Four steps. One honest result.
            </h2>
          </motion.div>

          <MobileCarousel count={4} containerClass="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-3 relative md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:gap-8 md:pb-0">
            {[
              {
                num: '1',
                Icon: UserPlus,
                title: 'Invite Your Buddy',
                story: 'A parent, friend, or partner — anyone with 3+ years on the road.',
              },
              {
                num: '2',
                Icon: Car,
                title: 'Go for a Drive',
                story: 'Drive as you normally would. Your Buddy stays quiet and observes.',
              },
              {
                num: '3',
                Icon: Navigation,
                title: 'They Tap Faults',
                story: 'Using the app, your Buddy marks observations as they happen.',
              },
              {
                num: '4',
                Icon: ClipboardList,
                title: 'See Your Result',
                story: 'Pass or fail — with a full breakdown of every fault.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="snap-start snap-always flex-none w-[80vw] md:w-auto text-center relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm md:bg-transparent md:border-0 md:rounded-none md:p-0 md:shadow-none"
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
          </MobileCarousel>
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
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[1.1] text-balance mb-6 sm:mb-8"
          >
            LESSONS teach you <span className="text-purple-400">HOW</span> to drive.{' '}
            <br className="hidden sm:block" />
            DrivePrep shows <span className="text-purple-400">IF</span> you're{' '}
            <span className="text-purple-400">READY.</span>
          </motion.h2>

          <motion.blockquote
            variants={blurIn}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-purple-300 text-lg sm:text-xl italic font-medium mb-4 leading-relaxed"
          >
            "Knowing the route won't save you. Knowing your habits will."
          </motion.blockquote>

          <motion.p
            variants={blurIn}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-white/50 text-sm mb-12 sm:mb-16"
          >
            No AI. No sensors. No complicated setup. Just real feedback, from a real person you trust — structured the way a real examiner would do it.
          </motion.p>

          <MobileCarousel count={3} dark containerClass="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-3 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
            {[
              { Icon: PiggyBank, title: 'No extra money on more lessons', story: 'Use someone you know. Not a paid instructor.' },
              { Icon: Target, title: 'Spot and fix habits that fail tests', story: 'See your real weaknesses before the examiner does.' },
              { Icon: Shield, title: 'Go in knowing what to expect', story: 'Test day feels familiar. Not scary.' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="snap-start snap-always flex-none w-[80vw] sm:w-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:bg-white/10 transition-all duration-200 will-change-transform"
              >
                <div className="w-10 h-10 bg-purple-900/50 rounded-xl flex items-center justify-center mb-4">
                  <card.Icon size={18} className="text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">{card.title}</h3>
                <p className="text-white/75 text-base leading-relaxed">{card.story}</p>
              </motion.div>
            ))}
          </MobileCarousel>
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
              Know before you go
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 leading-tight text-balance mb-4">
              Know If You're Ready<br />Before Test Day.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Be among the first learners to try DrivePrep.
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
