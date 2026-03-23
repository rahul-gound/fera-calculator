const parseNumber = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : NaN
}

const isPositive = (value) => Number.isFinite(value) && value > 0

const formatDescription = (toolName) => {
  const base = `Use the ${toolName} on Fera Calculator for fast, accurate results with instant formulas, input checks, solved examples, and practical FAQs for daily use.`
  let description = base
  while (description.length < 150) {
    description += ' Trusted by learners and professionals.'
  }
  if (description.length > 160) {
    return `${description.slice(0, 157).trimEnd()}...`
  }
  return description
}

const taxBySlab = (income) => {
  if (income <= 300000) return 0
  const slabs = [
    [700000, 0.05],
    [1000000, 0.1],
    [1200000, 0.15],
    [1500000, 0.2],
    [Infinity, 0.3],
  ]
  let totalTax = 0
  let previous = 300000
  for (const [limit, rate] of slabs) {
    if (income <= previous) break
    const taxable = Math.min(income, limit) - previous
    totalTax += taxable * rate
    previous = limit
  }
  return totalTax
}

const getAgeDiff = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
    return null
  }

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months -= 1
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate()
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  return { years, months, days }
}

export const categories = [
  'Finance Calculators',
  'Student Tools',
  'Converters',
  'Daily Tools',
]

export const tools = [
  {
    name: 'GST Calculator',
    path: '/gst-calculator',
    category: 'Finance Calculators',
    h2: 'Calculate GST and total invoice value quickly',
    description: 'This tool calculates GST amount and the final amount payable from base value and GST rate.',
    metaDescription: formatDescription('GST Calculator'),
    fields: [
      { key: 'amount', label: 'Base Amount (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'rate', label: 'GST Rate (%)', type: 'number', min: 0, step: 'any' },
    ],
    steps: ['Enter base amount.', 'Enter GST percentage.', 'Read GST amount and final amount.'],
    examples: [
      { question: 'Example 1: ₹1,000 at 18% GST', answer: 'GST is ₹180 and total amount is ₹1,180.' },
      { question: 'Example 2: ₹2,500 at 5% GST', answer: 'GST is ₹125 and total amount is ₹2,625.' },
    ],
    faqs: [
      { question: 'Can GST rate be decimal?', answer: 'Yes, decimal GST rates are supported.' },
      { question: 'Does this remove GST from inclusive prices?', answer: 'No, this version adds GST to base amount.' },
      { question: 'Can I use this for quick billing checks?', answer: 'Yes, it is useful for invoice estimates.' },
    ],
    relatedPaths: ['/discount-calculator', '/percentage-calculator'],
    calculate: (v) => {
      const amount = parseNumber(v.amount)
      const rate = parseNumber(v.rate)
      if (!isPositive(amount) || Number.isNaN(rate) || rate < 0) {
        return { error: 'Enter amount greater than 0 and GST rate 0 or more.' }
      }
      const gst = (amount * rate) / 100
      return {
        items: [
          { label: 'GST Amount', value: gst, suffix: ' ₹' },
          { label: 'Total Amount', value: amount + gst, suffix: ' ₹' },
        ],
      }
    },
  },
  {
    name: 'EMI Calculator',
    path: '/emi-calculator',
    category: 'Finance Calculators',
    h2: 'Estimate monthly EMI, interest, and total payment',
    description: 'Use loan amount, annual interest rate, and tenure to get monthly EMI instantly.',
    metaDescription: formatDescription('EMI Calculator'),
    fields: [
      { key: 'principal', label: 'Loan Amount (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'rate', label: 'Annual Interest Rate (%)', type: 'number', min: 0, step: 'any' },
      { key: 'years', label: 'Tenure (Years)', type: 'number', min: 0, step: 'any' },
    ],
    steps: ['Enter loan amount.', 'Enter annual rate and years.', 'View EMI and total repayment.'],
    examples: [
      { question: 'Example 1: ₹5,00,000 at 10% for 5 years', answer: 'EMI ≈ ₹10,624.67 and total payment ≈ ₹6,37,480.2.' },
      { question: 'Example 2: ₹10,00,000 at 8% for 10 years', answer: 'EMI ≈ ₹12,132.76 and total payment ≈ ₹14,55,931.2.' },
    ],
    faqs: [
      { question: 'Can I calculate EMI with 0% rate?', answer: 'Yes, it becomes principal divided by total months.' },
      { question: 'Is EMI always fixed?', answer: 'For fixed-rate loans, EMI generally remains fixed.' },
      { question: 'Is this exact bank schedule?', answer: 'It is a close estimate for planning.' },
    ],
    relatedPaths: ['/loan-calculator', '/interest-calculator'],
    calculate: (v) => {
      const p = parseNumber(v.principal)
      const r = parseNumber(v.rate)
      const y = parseNumber(v.years)
      if (!isPositive(p) || Number.isNaN(r) || r < 0 || !isPositive(y)) {
        return { error: 'Enter principal and years above 0, with rate 0 or more.' }
      }
      const n = y * 12
      const mr = r / 1200
      const emi = mr === 0 ? p / n : (p * mr * (1 + mr) ** n) / ((1 + mr) ** n - 1)
      const total = emi * n
      return {
        items: [
          { label: 'Monthly EMI', value: emi, suffix: ' ₹' },
          { label: 'Total Interest', value: total - p, suffix: ' ₹' },
          { label: 'Total Payment', value: total, suffix: ' ₹' },
        ],
      }
    },
  },
  {
    name: 'SIP Calculator',
    path: '/sip-calculator',
    category: 'Finance Calculators',
    h2: 'Estimate SIP maturity and wealth gain',
    description: 'Calculate expected SIP maturity from monthly amount, annual return, and time period.',
    metaDescription: formatDescription('SIP Calculator'),
    fields: [
      { key: 'monthly', label: 'Monthly Investment (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'rate', label: 'Expected Annual Return (%)', type: 'number', min: 0, step: 'any' },
      { key: 'years', label: 'Investment Period (Years)', type: 'number', min: 0, step: 'any' },
    ],
    steps: ['Enter monthly SIP amount.', 'Add expected annual return and period.', 'Check maturity estimate.'],
    examples: [
      { question: 'Example 1: ₹5,000/month at 12% for 10 years', answer: 'Invested = ₹6,00,000 and maturity ≈ ₹11,61,695.' },
      { question: 'Example 2: ₹2,000/month at 10% for 15 years', answer: 'Invested = ₹3,60,000 and maturity ≈ ₹8,34,116.' },
    ],
    faqs: [
      { question: 'Are SIP returns guaranteed?', answer: 'No, returns are market-linked estimates.' },
      { question: 'Can expected return be zero?', answer: 'Yes, maturity then equals invested amount.' },
      { question: 'Can I compare two SIP plans?', answer: 'Yes, change the inputs and compare instantly.' },
    ],
    relatedPaths: ['/compound-interest-calculator', '/emi-calculator'],
    calculate: (v) => {
      const monthly = parseNumber(v.monthly)
      const rate = parseNumber(v.rate)
      const years = parseNumber(v.years)
      if (!isPositive(monthly) || Number.isNaN(rate) || rate < 0 || !isPositive(years)) {
        return { error: 'Enter monthly amount and years above 0, with rate 0 or more.' }
      }
      const months = years * 12
      const mr = rate / 1200
      const invested = monthly * months
      const maturity = mr === 0 ? invested : monthly * ((((1 + mr) ** months - 1) / mr) * (1 + mr))
      return {
        items: [
          { label: 'Invested Amount', value: invested, suffix: ' ₹' },
          { label: 'Estimated Wealth Gain', value: maturity - invested, suffix: ' ₹' },
          { label: 'Maturity Value', value: maturity, suffix: ' ₹' },
        ],
      }
    },
  },
  {
    name: 'Loan Calculator',
    path: '/loan-calculator',
    category: 'Finance Calculators',
    h2: 'Plan loan repayment with monthly cost details',
    description: 'Get monthly payment, total interest, and total repayment from loan amount, rate, and months.',
    metaDescription: formatDescription('Loan Calculator'),
    fields: [
      { key: 'principal', label: 'Loan Amount (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'rate', label: 'Annual Interest Rate (%)', type: 'number', min: 0, step: 'any' },
      { key: 'months', label: 'Tenure (Months)', type: 'number', min: 1, step: '1' },
    ],
    steps: ['Enter loan amount.', 'Add annual rate and tenure in months.', 'Read monthly and total repayment.'],
    examples: [
      { question: 'Example 1: ₹3,00,000 at 12% for 36 months', answer: 'Monthly payment ≈ ₹9,964 and total repayment ≈ ₹3,58,704.' },
      { question: 'Example 2: ₹1,50,000 at 9% for 24 months', answer: 'Monthly payment ≈ ₹6,854 and total repayment ≈ ₹1,64,496.' },
    ],
    faqs: [
      { question: 'How is this different from EMI calculator?', answer: 'This tool takes tenure in months directly.' },
      { question: 'Can rate be 0?', answer: 'Yes, monthly payment becomes amount divided by months.' },
      { question: 'Does it include additional charges?', answer: 'No, this includes only principal and interest.' },
    ],
    relatedPaths: ['/emi-calculator', '/interest-calculator'],
    calculate: (v) => {
      const p = parseNumber(v.principal)
      const r = parseNumber(v.rate)
      const n = parseNumber(v.months)
      if (!isPositive(p) || Number.isNaN(r) || r < 0 || !isPositive(n)) {
        return { error: 'Enter amount and months above 0, with rate 0 or more.' }
      }
      const mr = r / 1200
      const payment = mr === 0 ? p / n : (p * mr) / (1 - (1 + mr) ** -n)
      const total = payment * n
      return {
        items: [
          { label: 'Monthly Payment', value: payment, suffix: ' ₹' },
          { label: 'Total Interest', value: total - p, suffix: ' ₹' },
          { label: 'Total Repayment', value: total, suffix: ' ₹' },
        ],
      }
    },
  },
  {
    name: 'Interest Calculator',
    path: '/interest-calculator',
    category: 'Finance Calculators',
    h2: 'Simple interest and maturity amount in seconds',
    description: 'Calculate interest amount for principal, annual rate, and time period quickly.',
    metaDescription: formatDescription('Interest Calculator'),
    fields: [
      { key: 'principal', label: 'Principal Amount (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'rate', label: 'Annual Rate (%)', type: 'number', min: 0, step: 'any' },
      { key: 'years', label: 'Time (Years)', type: 'number', min: 0, step: 'any' },
    ],
    steps: ['Enter principal amount.', 'Enter annual rate and years.', 'Read interest and maturity amount.'],
    examples: [
      { question: 'Example 1: ₹10,000 at 8% for 2 years', answer: 'Interest = ₹1,600 and maturity = ₹11,600.' },
      { question: 'Example 2: ₹25,000 at 6% for 3 years', answer: 'Interest = ₹4,500 and maturity = ₹29,500.' },
    ],
    faqs: [
      { question: 'What formula is used?', answer: 'Principal × Rate × Time ÷ 100.' },
      { question: 'Can I use decimal years?', answer: 'Yes, decimal values are supported.' },
      { question: 'Is compound interest included?', answer: 'No, this uses simple interest only.' },
    ],
    relatedPaths: ['/simple-interest-calculator', '/compound-interest-calculator'],
    calculate: (v) => {
      const p = parseNumber(v.principal)
      const r = parseNumber(v.rate)
      const y = parseNumber(v.years)
      if (!isPositive(p) || Number.isNaN(r) || r < 0 || !isPositive(y)) {
        return { error: 'Enter principal and years above 0, with rate 0 or more.' }
      }
      const interest = (p * r * y) / 100
      return {
        items: [
          { label: 'Interest Amount', value: interest, suffix: ' ₹' },
          { label: 'Maturity Amount', value: p + interest, suffix: ' ₹' },
        ],
      }
    },
  },
  {
    name: 'Compound Interest Calculator',
    path: '/compound-interest-calculator',
    category: 'Finance Calculators',
    h2: 'Estimate compound growth with compounding frequency',
    description: 'Find compound interest and maturity value using principal, rate, period, and frequency.',
    metaDescription: formatDescription('Compound Interest Calculator'),
    fields: [
      { key: 'principal', label: 'Principal Amount (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'rate', label: 'Annual Rate (%)', type: 'number', min: 0, step: 'any' },
      { key: 'years', label: 'Time (Years)', type: 'number', min: 0, step: 'any' },
      { key: 'frequency', label: 'Compounds per Year', type: 'number', min: 1, step: '1', defaultValue: '1' },
    ],
    steps: ['Enter principal amount.', 'Set annual rate, years, and frequency.', 'Read compound interest and maturity value.'],
    examples: [
      { question: 'Example 1: ₹10,000 at 10% for 2 years yearly', answer: 'Maturity = ₹12,100 and compound interest = ₹2,100.' },
      { question: 'Example 2: ₹50,000 at 8% for 3 years quarterly', answer: 'Maturity ≈ ₹63,453 and compound interest ≈ ₹13,453.' },
    ],
    faqs: [
      { question: 'What is compounding frequency?', answer: 'It is how many times interest is added each year.' },
      { question: 'Can I use monthly compounding?', answer: 'Yes, set compounds per year to 12.' },
      { question: 'Can rate be 0?', answer: 'Yes, maturity will then equal principal.' },
    ],
    relatedPaths: ['/simple-interest-calculator', '/sip-calculator'],
    calculate: (v) => {
      const p = parseNumber(v.principal)
      const r = parseNumber(v.rate)
      const y = parseNumber(v.years)
      const f = parseNumber(v.frequency)
      if (!isPositive(p) || Number.isNaN(r) || r < 0 || !isPositive(y) || !isPositive(f)) {
        return { error: 'Enter positive values. Rate can be 0 but frequency must be at least 1.' }
      }
      const amount = p * (1 + r / (100 * f)) ** (f * y)
      return {
        items: [
          { label: 'Compound Interest', value: amount - p, suffix: ' ₹' },
          { label: 'Maturity Amount', value: amount, suffix: ' ₹' },
        ],
      }
    },
  },
  {
    name: 'Simple Interest Calculator',
    path: '/simple-interest-calculator',
    category: 'Finance Calculators',
    h2: 'Simple interest estimate for loans and savings',
    description: 'Calculate simple interest quickly from principal, rate, and years with instant output.',
    metaDescription: formatDescription('Simple Interest Calculator'),
    fields: [
      { key: 'principal', label: 'Principal Amount (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'rate', label: 'Annual Rate (%)', type: 'number', min: 0, step: 'any' },
      { key: 'years', label: 'Time (Years)', type: 'number', min: 0, step: 'any' },
    ],
    steps: ['Enter principal value.', 'Add annual interest rate and time.', 'Read simple interest and total value.'],
    examples: [
      { question: 'Example 1: ₹8,000 at 5% for 4 years', answer: 'Simple interest = ₹1,600 and total amount = ₹9,600.' },
      { question: 'Example 2: ₹12,000 at 7% for 1.5 years', answer: 'Simple interest = ₹1,260 and total amount = ₹13,260.' },
    ],
    faqs: [
      { question: 'Does simple interest compound?', answer: 'No, it is calculated only on principal amount.' },
      { question: 'Can I use decimal years?', answer: 'Yes, decimal time values are supported.' },
      { question: 'Where is this useful?', answer: 'It is useful for school learning and quick estimates.' },
    ],
    relatedPaths: ['/interest-calculator', '/compound-interest-calculator'],
    calculate: (v) => {
      const p = parseNumber(v.principal)
      const r = parseNumber(v.rate)
      const y = parseNumber(v.years)
      if (!isPositive(p) || Number.isNaN(r) || r < 0 || !isPositive(y)) {
        return { error: 'Enter principal and years above 0, with rate 0 or more.' }
      }
      const interest = (p * r * y) / 100
      return {
        items: [
          { label: 'Simple Interest', value: interest, suffix: ' ₹' },
          { label: 'Total Amount', value: p + interest, suffix: ' ₹' },
        ],
      }
    },
  },
  {
    name: 'Salary Calculator',
    path: '/salary-calculator',
    category: 'Finance Calculators',
    h2: 'Estimate annual gross and net salary quickly',
    description: 'Convert monthly salary inputs into yearly gross and net values after deductions.',
    metaDescription: formatDescription('Salary Calculator'),
    fields: [
      { key: 'monthly', label: 'Monthly Salary (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'bonus', label: 'Annual Bonus (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'deductions', label: 'Yearly Deductions (₹)', type: 'number', min: 0, step: 'any' },
    ],
    steps: ['Enter monthly salary.', 'Add annual bonus and deductions.', 'View annual gross and net estimate.'],
    examples: [
      { question: 'Example 1: ₹50,000 monthly, ₹50,000 bonus, ₹60,000 deductions', answer: 'Gross = ₹6,50,000 and net = ₹5,90,000.' },
      { question: 'Example 2: ₹35,000 monthly, ₹20,000 bonus, ₹30,000 deductions', answer: 'Gross = ₹4,40,000 and net = ₹4,10,000.' },
    ],
    faqs: [
      { question: 'Is this exact payroll output?', answer: 'No, this is a simplified planning estimate.' },
      { question: 'Can deductions exceed gross?', answer: 'No, this is validated to avoid negative net salary.' },
      { question: 'Can bonus be zero?', answer: 'Yes, keep bonus as 0 if not applicable.' },
    ],
    relatedPaths: ['/income-tax-calculator', '/discount-calculator'],
    calculate: (v) => {
      const monthly = parseNumber(v.monthly)
      const bonus = parseNumber(v.bonus)
      const deductions = parseNumber(v.deductions)
      if (!isPositive(monthly) || Number.isNaN(bonus) || Number.isNaN(deductions) || bonus < 0 || deductions < 0) {
        return { error: 'Enter monthly salary above 0 and bonus/deductions as 0 or more.' }
      }
      const gross = monthly * 12 + bonus
      if (deductions > gross) {
        return { error: 'Deductions cannot be greater than annual gross salary.' }
      }
      return {
        items: [
          { label: 'Annual Gross Salary', value: gross, suffix: ' ₹' },
          { label: 'Estimated Annual Net Salary', value: gross - deductions, suffix: ' ₹' },
        ],
      }
    },
  },
  {
    name: 'Income Tax Calculator',
    path: '/income-tax-calculator',
    category: 'Finance Calculators',
    h2: 'Estimate tax with deductions and cess',
    description: 'Get taxable income, base tax, and total tax estimate with cess in one view.',
    metaDescription: formatDescription('Income Tax Calculator'),
    fields: [
      { key: 'income', label: 'Annual Income (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'deductions', label: 'Eligible Deductions (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'cess', label: 'Cess (%)', type: 'number', min: 0, step: 'any', defaultValue: '4' },
    ],
    steps: ['Enter annual income.', 'Enter deductions and cess percentage.', 'View taxable income and estimated tax.'],
    examples: [
      { question: 'Example 1: ₹8,00,000 income and ₹1,00,000 deductions', answer: 'Taxable income = ₹7,00,000 and total tax (4% cess) = ₹20,800.' },
      { question: 'Example 2: ₹12,00,000 income and ₹2,00,000 deductions', answer: 'Taxable income = ₹10,00,000 and total tax (4% cess) = ₹57,200.' },
    ],
    faqs: [
      { question: 'Are these official final tax values?', answer: 'No, this is a simplified estimator for planning.' },
      { question: 'Can deductions be greater than income?', answer: 'Yes, taxable income is capped at zero.' },
      { question: 'Do tax slabs change?', answer: 'Yes, verify with latest official tax notifications.' },
    ],
    relatedPaths: ['/salary-calculator', '/loan-calculator'],
    calculate: (v) => {
      const income = parseNumber(v.income)
      const deductions = parseNumber(v.deductions)
      const cess = parseNumber(v.cess)
      if (!isPositive(income) || Number.isNaN(deductions) || Number.isNaN(cess) || deductions < 0 || cess < 0) {
        return { error: 'Enter income above 0 and deductions/cess as 0 or more.' }
      }
      const taxableIncome = Math.max(income - deductions, 0)
      const baseTax = taxBySlab(taxableIncome)
      const totalTax = baseTax + (baseTax * cess) / 100
      return {
        items: [
          { label: 'Taxable Income', value: taxableIncome, suffix: ' ₹' },
          { label: 'Base Tax', value: baseTax, suffix: ' ₹' },
          { label: 'Total Tax (with Cess)', value: totalTax, suffix: ' ₹' },
        ],
      }
    },
  },
  {
    name: 'Discount Calculator',
    path: '/discount-calculator',
    category: 'Finance Calculators',
    h2: 'Calculate final price after discount instantly',
    description: 'Find discount amount and final payable price from original amount and discount percentage.',
    metaDescription: formatDescription('Discount Calculator'),
    fields: [
      { key: 'price', label: 'Original Price (₹)', type: 'number', min: 0, step: 'any' },
      { key: 'discount', label: 'Discount (%)', type: 'number', min: 0, step: 'any' },
    ],
    steps: ['Enter original price.', 'Enter discount percentage.', 'See savings and final payable amount.'],
    examples: [
      { question: 'Example 1: ₹1,500 at 20% off', answer: 'Discount = ₹300 and final price = ₹1,200.' },
      { question: 'Example 2: ₹2,000 at 12.5% off', answer: 'Discount = ₹250 and final price = ₹1,750.' },
    ],
    faqs: [
      { question: 'Can discount exceed 100%?', answer: 'No, valid range is 0 to 100.' },
      { question: 'Does this include tax?', answer: 'No, this calculator only applies discount.' },
      { question: 'Can I use decimal percentages?', answer: 'Yes, decimal discounts are supported.' },
    ],
    relatedPaths: ['/percentage-calculator', '/gst-calculator'],
    calculate: (v) => {
      const price = parseNumber(v.price)
      const discount = parseNumber(v.discount)
      if (!isPositive(price) || Number.isNaN(discount) || discount < 0 || discount > 100) {
        return { error: 'Enter price above 0 and discount between 0 and 100.' }
      }
      const saved = (price * discount) / 100
      return {
        items: [
          { label: 'Discount Amount', value: saved, suffix: ' ₹' },
          { label: 'Final Price', value: price - saved, suffix: ' ₹' },
        ],
      }
    },
  },
  {
    name: 'Percentage Calculator',
    path: '/percentage-calculator',
    category: 'Student Tools',
    h2: 'Convert a value into percentage quickly',
    description: 'Calculate percentage from part and total values for study, reports, and daily use.',
    metaDescription: formatDescription('Percentage Calculator'),
    fields: [
      { key: 'value', label: 'Value', type: 'number', min: 0, step: 'any' },
      { key: 'total', label: 'Total', type: 'number', min: 0, step: 'any' },
    ],
    steps: ['Enter part value.', 'Enter total value.', 'Read percentage result instantly.'],
    examples: [
      { question: 'Example 1: 45 out of 60', answer: 'Percentage = 75%.' },
      { question: 'Example 2: 18 out of 24', answer: 'Percentage = 75%.' },
    ],
    faqs: [
      { question: 'What formula is used?', answer: 'Percentage = (Value ÷ Total) × 100.' },
      { question: 'Can total be zero?', answer: 'No, total must be greater than zero.' },
      { question: 'Can value be decimal?', answer: 'Yes, decimals are supported.' },
    ],
    relatedPaths: ['/marks-percentage-calculator', '/discount-calculator'],
    calculate: (v) => {
      const value = parseNumber(v.value)
      const total = parseNumber(v.total)
      if (Number.isNaN(value) || value < 0 || !isPositive(total)) {
        return { error: 'Enter value as 0 or more and total greater than 0.' }
      }
      return { items: [{ label: 'Percentage', value: (value / total) * 100, suffix: '%' }] }
    },
  },
  {
    name: 'CGPA to Percentage',
    path: '/cgpa-to-percentage',
    category: 'Student Tools',
    h2: 'Convert CGPA score to percentage instantly',
    description: 'Use the standard CGPA conversion method to find equivalent percentage quickly.',
    metaDescription: formatDescription('CGPA to Percentage'),
    fields: [{ key: 'cgpa', label: 'CGPA', type: 'number', min: 0, step: 'any' }],
    steps: ['Enter CGPA value.', 'Tool multiplies CGPA by 9.5.', 'View estimated percentage.'],
    examples: [
      { question: 'Example 1: CGPA 8.0', answer: 'Percentage = 76%.' },
      { question: 'Example 2: CGPA 9.2', answer: 'Percentage = 87.4%.' },
    ],
    faqs: [
      { question: 'What formula is used?', answer: 'Percentage = CGPA × 9.5.' },
      { question: 'Is this valid everywhere?', answer: 'Some institutions use different formulas.' },
      { question: 'Can I enter decimal CGPA?', answer: 'Yes, decimal CGPA values work.' },
    ],
    relatedPaths: ['/percentage-to-cgpa', '/marks-percentage-calculator'],
    calculate: (v) => {
      const cgpa = parseNumber(v.cgpa)
      if (Number.isNaN(cgpa) || cgpa < 0) {
        return { error: 'Enter CGPA as 0 or more.' }
      }
      return { items: [{ label: 'Percentage', value: cgpa * 9.5, suffix: '%' }] }
    },
  },
  {
    name: 'Percentage to CGPA',
    path: '/percentage-to-cgpa',
    category: 'Student Tools',
    h2: 'Convert percentage marks into CGPA value',
    description: 'Convert percentage to CGPA with standard formula for quick academic estimates.',
    metaDescription: formatDescription('Percentage to CGPA'),
    fields: [{ key: 'percentage', label: 'Percentage (%)', type: 'number', min: 0, step: 'any' }],
    steps: ['Enter percentage.', 'Tool divides by 9.5.', 'Read estimated CGPA value.'],
    examples: [
      { question: 'Example 1: 76%', answer: 'CGPA = 8.0.' },
      { question: 'Example 2: 87.4%', answer: 'CGPA = 9.2.' },
    ],
    faqs: [
      { question: 'Can percentage be above 100?', answer: 'No, valid percentage is 0 to 100.' },
      { question: 'Is this official grade conversion?', answer: 'Use it as an estimate and verify with institution rules.' },
      { question: 'Can I use decimals?', answer: 'Yes, decimal percentages are supported.' },
    ],
    relatedPaths: ['/cgpa-to-percentage', '/percentage-calculator'],
    calculate: (v) => {
      const percentage = parseNumber(v.percentage)
      if (Number.isNaN(percentage) || percentage < 0 || percentage > 100) {
        return { error: 'Enter percentage between 0 and 100.' }
      }
      return { items: [{ label: 'CGPA', value: percentage / 9.5 }] }
    },
  },
  {
    name: 'Attendance Calculator',
    path: '/attendance-calculator',
    category: 'Student Tools',
    h2: 'Track attendance percentage and required classes',
    description: 'Find current attendance and additional classes needed to reach target percentage.',
    metaDescription: formatDescription('Attendance Calculator'),
    fields: [
      { key: 'attended', label: 'Classes Attended', type: 'number', min: 0, step: '1' },
      { key: 'total', label: 'Total Classes', type: 'number', min: 1, step: '1' },
      { key: 'target', label: 'Target Attendance (%)', type: 'number', min: 1, step: 'any', defaultValue: '75' },
    ],
    steps: ['Enter attended classes.', 'Enter total classes and target %.', 'View current % and additional classes needed.'],
    examples: [
      { question: 'Example 1: 60/90 with target 75%', answer: 'Current = 66.67% and additional classes needed = 30.' },
      { question: 'Example 2: 80/100 with target 75%', answer: 'Current = 80% and additional classes needed = 0.' },
    ],
    faqs: [
      { question: 'Can attended be greater than total?', answer: 'No, this is validated as invalid input.' },
      { question: 'Can target be 100%?', answer: 'Target must be between 0 and 100 (exclusive).' },
      { question: 'Is this useful for semester tracking?', answer: 'Yes, it helps monitor attendance goals.' },
    ],
    relatedPaths: ['/marks-percentage-calculator', '/percentage-calculator'],
    calculate: (v) => {
      const attended = parseNumber(v.attended)
      const total = parseNumber(v.total)
      const target = parseNumber(v.target)
      if (Number.isNaN(attended) || Number.isNaN(total) || Number.isNaN(target) || attended < 0 || !isPositive(total) || target <= 0 || target >= 100) {
        return { error: 'Enter valid values. Total > 0 and target between 0 and 100.' }
      }
      if (attended > total) {
        return { error: 'Attended classes cannot exceed total classes.' }
      }
      const current = (attended / total) * 100
      const needed = current >= target ? 0 : Math.ceil((target * total - 100 * attended) / (100 - target))
      return { items: [{ label: 'Current Attendance', value: current, suffix: '%' }, { label: 'Additional Classes Needed', value: needed }] }
    },
  },
  {
    name: 'Marks Percentage Calculator',
    path: '/marks-percentage-calculator',
    category: 'Student Tools',
    h2: 'Calculate marks percentage from obtained and total marks',
    description: 'Quickly convert exam marks into percentage with validation for obtained and total marks.',
    metaDescription: formatDescription('Marks Percentage Calculator'),
    fields: [
      { key: 'obtained', label: 'Obtained Marks', type: 'number', min: 0, step: 'any' },
      { key: 'total', label: 'Total Marks', type: 'number', min: 0, step: 'any' },
    ],
    steps: ['Enter obtained marks.', 'Enter total marks.', 'View marks percentage instantly.'],
    examples: [
      { question: 'Example 1: 420 out of 500', answer: 'Percentage = 84%.' },
      { question: 'Example 2: 355 out of 400', answer: 'Percentage = 88.75%.' },
    ],
    faqs: [
      { question: 'Can obtained marks exceed total?', answer: 'No, this is validated as invalid input.' },
      { question: 'Can I use decimal marks?', answer: 'Yes, decimal marks are supported.' },
      { question: 'Is formula same as normal percentage?', answer: 'Yes, formula is (obtained ÷ total) × 100.' },
    ],
    relatedPaths: ['/percentage-calculator', '/cgpa-to-percentage'],
    calculate: (v) => {
      const obtained = parseNumber(v.obtained)
      const total = parseNumber(v.total)
      if (Number.isNaN(obtained) || Number.isNaN(total) || obtained < 0 || !isPositive(total)) {
        return { error: 'Enter obtained as 0 or more and total greater than 0.' }
      }
      if (obtained > total) {
        return { error: 'Obtained marks cannot be greater than total marks.' }
      }
      return { items: [{ label: 'Marks Percentage', value: (obtained / total) * 100, suffix: '%' }] }
    },
  },
  {
    name: 'CM to Feet Converter',
    path: '/cm-to-feet-converter',
    category: 'Converters',
    h2: 'Convert centimeters into feet and inches',
    description: 'Convert cm values to feet and feet-inch format for height and distance use cases.',
    metaDescription: formatDescription('CM to Feet Converter'),
    fields: [{ key: 'cm', label: 'Centimeters (cm)', type: 'number', min: 0, step: 'any' }],
    steps: ['Enter centimeters value.', 'Tool converts to feet instantly.', 'Read feet and feet-inch values.'],
    examples: [
      { question: 'Example 1: 170 cm', answer: '170 cm ≈ 5.58 ft (about 5 ft 6.93 in).' },
      { question: 'Example 2: 152.4 cm', answer: '152.4 cm = 5 ft exactly.' },
    ],
    faqs: [
      { question: 'What formula is used?', answer: 'Feet = centimeters ÷ 30.48.' },
      { question: 'Can I convert decimal cm values?', answer: 'Yes, decimals are supported.' },
      { question: 'Can this help for height conversion?', answer: 'Yes, it is ideal for height conversions.' },
    ],
    relatedPaths: ['/feet-to-cm-converter', '/bmi-calculator'],
    calculate: (v) => {
      const cm = parseNumber(v.cm)
      if (!isPositive(cm)) return { error: 'Enter centimeters greater than 0.' }
      const feet = cm / 30.48
      const wholeFeet = Math.floor(feet)
      const inches = (feet - wholeFeet) * 12
      return { items: [{ label: 'Feet', value: feet, suffix: ' ft' }, { label: 'Feet & Inches', value: `${wholeFeet} ft ${inches.toFixed(2)} in` }] }
    },
  },
  {
    name: 'Feet to CM Converter',
    path: '/feet-to-cm-converter',
    category: 'Converters',
    h2: 'Convert feet values into centimeters quickly',
    description: 'Convert feet into centimeters using a simple and instant formula-based conversion.',
    metaDescription: formatDescription('Feet to CM Converter'),
    fields: [{ key: 'feet', label: 'Feet (ft)', type: 'number', min: 0, step: 'any' }],
    steps: ['Enter feet value.', 'Tool multiplies by 30.48.', 'Read centimeters output.'],
    examples: [
      { question: 'Example 1: 5.5 ft', answer: '5.5 ft = 167.64 cm.' },
      { question: 'Example 2: 6 ft', answer: '6 ft = 182.88 cm.' },
    ],
    faqs: [
      { question: 'What is 1 foot in cm?', answer: '1 foot equals 30.48 centimeters.' },
      { question: 'Can I use decimal feet?', answer: 'Yes, decimal values like 5.75 are accepted.' },
      { question: 'Can I use this for architecture units?', answer: 'Yes, this is useful for quick measurements.' },
    ],
    relatedPaths: ['/cm-to-feet-converter', '/bmi-calculator'],
    calculate: (v) => {
      const feet = parseNumber(v.feet)
      if (!isPositive(feet)) return { error: 'Enter feet greater than 0.' }
      return { items: [{ label: 'Centimeters', value: feet * 30.48, suffix: ' cm' }] }
    },
  },
  {
    name: 'KG to Pound Converter',
    path: '/kg-to-pound-converter',
    category: 'Converters',
    h2: 'Convert kilograms into pounds instantly',
    description: 'Convert weight from kilograms to pounds for fitness, travel, and shipping needs.',
    metaDescription: formatDescription('KG to Pound Converter'),
    fields: [{ key: 'kg', label: 'Kilograms (kg)', type: 'number', min: 0, step: 'any' }],
    steps: ['Enter kilograms.', 'Tool multiplies by 2.20462.', 'View pounds value.'],
    examples: [
      { question: 'Example 1: 60 kg', answer: '60 kg ≈ 132.28 lb.' },
      { question: 'Example 2: 75.5 kg', answer: '75.5 kg ≈ 166.45 lb.' },
    ],
    faqs: [
      { question: 'What is formula?', answer: 'Pounds = kilograms × 2.20462.' },
      { question: 'Can I enter decimal kilograms?', answer: 'Yes, decimals are supported.' },
      { question: 'Useful for gym tracking?', answer: 'Yes, it helps convert body weight units.' },
    ],
    relatedPaths: ['/pound-to-kg-converter', '/bmi-calculator'],
    calculate: (v) => {
      const kg = parseNumber(v.kg)
      if (!isPositive(kg)) return { error: 'Enter kilograms greater than 0.' }
      return { items: [{ label: 'Pounds', value: kg * 2.20462, suffix: ' lb' }] }
    },
  },
  {
    name: 'Pound to KG Converter',
    path: '/pound-to-kg-converter',
    category: 'Converters',
    h2: 'Convert pounds into kilograms in one click',
    description: 'Convert pounds to kilograms quickly using the standard weight conversion factor.',
    metaDescription: formatDescription('Pound to KG Converter'),
    fields: [{ key: 'pound', label: 'Pounds (lb)', type: 'number', min: 0, step: 'any' }],
    steps: ['Enter pounds value.', 'Tool multiplies by 0.45359237.', 'View kilograms output.'],
    examples: [
      { question: 'Example 1: 150 lb', answer: '150 lb ≈ 68.04 kg.' },
      { question: 'Example 2: 180 lb', answer: '180 lb ≈ 81.65 kg.' },
    ],
    faqs: [
      { question: 'What is 1 pound in kg?', answer: '1 pound equals 0.45359237 kg.' },
      { question: 'Can I use decimal pounds?', answer: 'Yes, decimal input values are supported.' },
      { question: 'Useful for parcel weight conversion?', answer: 'Yes, it helps in shipping conversions.' },
    ],
    relatedPaths: ['/kg-to-pound-converter', '/bmi-calculator'],
    calculate: (v) => {
      const pound = parseNumber(v.pound)
      if (!isPositive(pound)) return { error: 'Enter pounds greater than 0.' }
      return { items: [{ label: 'Kilograms', value: pound * 0.45359237, suffix: ' kg' }] }
    },
  },
  {
    name: 'KM to Miles Converter',
    path: '/km-to-miles-converter',
    category: 'Converters',
    h2: 'Convert kilometers to miles for travel and fitness',
    description: 'Convert kilometer distances into miles instantly for route planning and sports tracking.',
    metaDescription: formatDescription('KM to Miles Converter'),
    fields: [{ key: 'km', label: 'Kilometers (km)', type: 'number', min: 0, step: 'any' }],
    steps: ['Enter kilometers.', 'Tool multiplies by 0.621371.', 'View distance in miles.'],
    examples: [
      { question: 'Example 1: 5 km', answer: '5 km ≈ 3.11 miles.' },
      { question: 'Example 2: 42.195 km', answer: '42.195 km ≈ 26.22 miles.' },
    ],
    faqs: [
      { question: 'What is the factor?', answer: '1 kilometer = 0.621371 miles.' },
      { question: 'Can I use decimal km values?', answer: 'Yes, decimal distances are supported.' },
      { question: 'Good for running plans?', answer: 'Yes, useful for converting race distances.' },
    ],
    relatedPaths: ['/time-calculator', '/date-difference-calculator'],
    calculate: (v) => {
      const km = parseNumber(v.km)
      if (!isPositive(km)) return { error: 'Enter kilometers greater than 0.' }
      return { items: [{ label: 'Miles', value: km * 0.621371, suffix: ' mi' }] }
    },
  },
  {
    name: 'Age Calculator',
    path: '/age-calculator',
    category: 'Daily Tools',
    h2: 'Calculate exact age from date of birth',
    description: 'Find age in years, months, and days from date of birth to a selected comparison date.',
    metaDescription: formatDescription('Age Calculator'),
    fields: [
      { key: 'dob', label: 'Date of Birth', type: 'date' },
      { key: 'today', label: 'Age on Date', type: 'date', defaultValue: new Date().toISOString().slice(0, 10) },
    ],
    steps: ['Select date of birth.', 'Select age-on date.', 'View years, months, and days.'],
    examples: [
      { question: 'Example 1: 2000-01-01 to 2026-01-01', answer: 'Age = 26 years, 0 months, 0 days.' },
      { question: 'Example 2: 2010-08-10 to 2026-03-23', answer: 'Age = 15 years, 7 months, 13 days.' },
    ],
    faqs: [
      { question: 'Can I calculate age on past date?', answer: 'Yes, choose any valid date after DOB.' },
      { question: 'Are leap years handled?', answer: 'Yes, date handling includes leap years.' },
      { question: 'What if end date is before DOB?', answer: 'Tool shows validation error in that case.' },
    ],
    relatedPaths: ['/date-difference-calculator', '/time-calculator'],
    calculate: (v) => {
      const diff = getAgeDiff(v.dob, v.today)
      if (!diff) return { error: 'Select valid dates and ensure age-on date is not before DOB.' }
      return {
        items: [
          { label: 'Years', value: diff.years },
          { label: 'Months', value: diff.months },
          { label: 'Days', value: diff.days },
        ],
      }
    },
  },
  {
    name: 'Time Calculator',
    path: '/time-calculator',
    category: 'Daily Tools',
    h2: 'Add hours and minutes to a start time quickly',
    description: 'Add custom duration to a start time and get end time instantly with clean output.',
    metaDescription: formatDescription('Time Calculator'),
    fields: [
      { key: 'start', label: 'Start Time', type: 'time' },
      { key: 'hours', label: 'Add Hours', type: 'number', min: 0, step: '1', defaultValue: '0' },
      { key: 'minutes', label: 'Add Minutes', type: 'number', min: 0, step: '1', defaultValue: '0' },
    ],
    steps: ['Choose start time.', 'Enter hours and minutes to add.', 'Read computed end time.'],
    examples: [
      { question: 'Example 1: 09:30 + 2h 45m', answer: 'End time = 12:15.' },
      { question: 'Example 2: 23:20 + 1h 10m', answer: 'End time = 00:30 (next day).' },
    ],
    faqs: [
      { question: 'Can result cross midnight?', answer: 'Yes, output wraps to next day correctly.' },
      { question: 'Can I add only minutes?', answer: 'Yes, keep hours as 0 and enter minutes.' },
      { question: 'Can I subtract time?', answer: 'This version supports addition only.' },
    ],
    relatedPaths: ['/date-difference-calculator', '/age-calculator'],
    calculate: (v) => {
      if (!v.start) return { error: 'Select a valid start time.' }
      const hours = parseNumber(v.hours)
      const minutes = parseNumber(v.minutes)
      if (Number.isNaN(hours) || Number.isNaN(minutes) || hours < 0 || minutes < 0) {
        return { error: 'Enter hours and minutes as 0 or more.' }
      }
      const [h, m] = v.start.split(':').map(Number)
      const total = h * 60 + m + hours * 60 + minutes
      const end = ((total % (24 * 60)) + 24 * 60) % (24 * 60)
      const hh = String(Math.floor(end / 60)).padStart(2, '0')
      const mm = String(end % 60).padStart(2, '0')
      return { items: [{ label: 'End Time', value: `${hh}:${mm}` }] }
    },
  },
  {
    name: 'Date Difference Calculator',
    path: '/date-difference-calculator',
    category: 'Daily Tools',
    h2: 'Calculate days between any two dates',
    description: 'Find absolute day difference between start and end dates for plans and timelines.',
    metaDescription: formatDescription('Date Difference Calculator'),
    fields: [
      { key: 'start', label: 'Start Date', type: 'date' },
      { key: 'end', label: 'End Date', type: 'date' },
    ],
    steps: ['Select start date.', 'Select end date.', 'Read difference in days instantly.'],
    examples: [
      { question: 'Example 1: 2026-01-01 to 2026-01-31', answer: 'Difference = 30 days.' },
      { question: 'Example 2: 2025-12-31 to 2026-03-23', answer: 'Difference = 82 days.' },
    ],
    faqs: [
      { question: 'Does date order matter?', answer: 'No, result is absolute day difference.' },
      { question: 'Are leap years handled?', answer: 'Yes, JS date math handles leap years.' },
      { question: 'Does it include time of day?', answer: 'No, it compares dates only.' },
    ],
    relatedPaths: ['/age-calculator', '/time-calculator'],
    calculate: (v) => {
      const start = new Date(v.start)
      const end = new Date(v.end)
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return { error: 'Select valid start and end dates.' }
      }
      const diff = Math.abs(end.getTime() - start.getTime())
      return { items: [{ label: 'Difference in Days', value: Math.floor(diff / (1000 * 60 * 60 * 24)), suffix: ' days' }] }
    },
  },
  {
    name: 'BMI Calculator',
    path: '/bmi-calculator',
    category: 'Daily Tools',
    h2: 'Calculate body mass index and health category',
    description: 'Calculate BMI using height and weight and get a quick category for awareness.',
    metaDescription: formatDescription('BMI Calculator'),
    fields: [
      { key: 'weight', label: 'Weight (kg)', type: 'number', min: 0, step: 'any' },
      { key: 'height', label: 'Height (cm)', type: 'number', min: 0, step: 'any' },
    ],
    steps: ['Enter weight in kg.', 'Enter height in cm.', 'View BMI score and category.'],
    examples: [
      { question: 'Example 1: 70 kg and 170 cm', answer: 'BMI ≈ 24.22 (Normal).' },
      { question: 'Example 2: 85 kg and 170 cm', answer: 'BMI ≈ 29.41 (Overweight).' },
    ],
    faqs: [
      { question: 'What is BMI formula?', answer: 'BMI = weight (kg) ÷ [height (m)]².' },
      { question: 'Is BMI a diagnosis?', answer: 'No, it is a screening indicator only.' },
      { question: 'Can this be used for children?', answer: 'Child BMI needs age-specific standards.' },
    ],
    relatedPaths: ['/kg-to-pound-converter', '/cm-to-feet-converter'],
    calculate: (v) => {
      const weight = parseNumber(v.weight)
      const height = parseNumber(v.height)
      if (!isPositive(weight) || !isPositive(height)) {
        return { error: 'Enter valid weight and height values greater than 0.' }
      }
      const bmi = weight / (height / 100) ** 2
      let category = 'Obese'
      if (bmi < 18.5) category = 'Underweight'
      else if (bmi < 25) category = 'Normal'
      else if (bmi < 30) category = 'Overweight'
      return { items: [{ label: 'BMI', value: bmi }, { label: 'Category', value: category }] }
    },
  },
]

export const toolsByPath = Object.fromEntries(tools.map((tool) => [tool.path, tool]))
