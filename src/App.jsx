import { Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import {
  AgeCalculatorPage,
  AttendanceCalculatorPage,
  BmiCalculatorPage,
  CgpaToPercentagePage,
  CmToFeetConverterPage,
  CompoundInterestCalculatorPage,
  DateDifferenceCalculatorPage,
  DiscountCalculatorPage,
  EmiCalculatorPage,
  FeetToCmConverterPage,
  GstCalculatorPage,
  IncomeTaxCalculatorPage,
  InterestCalculatorPage,
  KgToPoundConverterPage,
  KmToMilesConverterPage,
  LoanCalculatorPage,
  MarksPercentageCalculatorPage,
  PercentageCalculatorPage,
  PercentageToCgpaPage,
  PoundToKgConverterPage,
  SalaryCalculatorPage,
  SimpleInterestCalculatorPage,
  SipCalculatorPage,
  TimeCalculatorPage,
} from './pages/tools'

function App() {
  return (
    <div className="app-shell">
      <div className="app-loader" aria-hidden="true" />
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand-link" to="/">
            Fera Calculator
          </Link>
          <span className="header-note">Modern tools • Instant results</span>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gst-calculator" element={<GstCalculatorPage />} />
        <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
        <Route path="/sip-calculator" element={<SipCalculatorPage />} />
        <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
        <Route path="/interest-calculator" element={<InterestCalculatorPage />} />
        <Route path="/compound-interest-calculator" element={<CompoundInterestCalculatorPage />} />
        <Route path="/simple-interest-calculator" element={<SimpleInterestCalculatorPage />} />
        <Route path="/salary-calculator" element={<SalaryCalculatorPage />} />
        <Route path="/income-tax-calculator" element={<IncomeTaxCalculatorPage />} />
        <Route path="/discount-calculator" element={<DiscountCalculatorPage />} />
        <Route path="/percentage-calculator" element={<PercentageCalculatorPage />} />
        <Route path="/cgpa-to-percentage" element={<CgpaToPercentagePage />} />
        <Route path="/percentage-to-cgpa" element={<PercentageToCgpaPage />} />
        <Route path="/attendance-calculator" element={<AttendanceCalculatorPage />} />
        <Route path="/marks-percentage-calculator" element={<MarksPercentageCalculatorPage />} />
        <Route path="/cm-to-feet-converter" element={<CmToFeetConverterPage />} />
        <Route path="/feet-to-cm-converter" element={<FeetToCmConverterPage />} />
        <Route path="/kg-to-pound-converter" element={<KgToPoundConverterPage />} />
        <Route path="/pound-to-kg-converter" element={<PoundToKgConverterPage />} />
        <Route path="/km-to-miles-converter" element={<KmToMilesConverterPage />} />
        <Route path="/age-calculator" element={<AgeCalculatorPage />} />
        <Route path="/time-calculator" element={<TimeCalculatorPage />} />
        <Route path="/date-difference-calculator" element={<DateDifferenceCalculatorPage />} />
        <Route path="/bmi-calculator" element={<BmiCalculatorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>Fera Calculator</span>
          <span>© 2026 Fera Calculator • Built for everyday decisions</span>
        </div>
      </footer>
    </div>
  )
}

export default App
