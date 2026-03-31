import React from 'react'
import { render, screen } from '@testing-library/react'
import { RiskBanner } from '@/components/risk-banner'
import type { RiskFlag } from '@/types/standup'

const noneFlag: RiskFlag = {
  hasRisk: false, level: 'none', title: '', description: '', recommendation: '',
}
const mediumFlag: RiskFlag = {
  hasRisk: true, level: 'medium', title: 'Risk Title',
  description: 'Risk desc', recommendation: 'Do something',
}
const highFlag: RiskFlag = {
  hasRisk: true, level: 'high', title: 'Critical Risk',
  description: 'High risk desc', recommendation: 'Escalate now',
}

describe('RiskBanner', () => {
  it('does not render when show=false', () => {
    const { container } = render(<RiskBanner riskFlag={noneFlag} show={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('does not render when riskFlag=null', () => {
    const { container } = render(<RiskBanner riskFlag={null} show={true} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders green banner for level=none', () => {
    render(<RiskBanner riskFlag={noneFlag} show={true} />)
    expect(screen.getByText(/Sprint looks healthy/)).toBeInTheDocument()
    expect(screen.getByText(/No critical blockers/)).toBeInTheDocument()
  })

  it('renders amber banner for level=medium', () => {
    render(<RiskBanner riskFlag={mediumFlag} show={true} />)
    expect(screen.getByText('Risk Title')).toBeInTheDocument()
    expect(screen.getByText('Risk desc')).toBeInTheDocument()
    expect(screen.getByText(/Recommend:.*Do something/)).toBeInTheDocument()
  })

  it('renders red banner for level=high', () => {
    render(<RiskBanner riskFlag={highFlag} show={true} />)
    expect(screen.getByText('Critical Risk')).toBeInTheDocument()
    expect(screen.getByText('High risk desc')).toBeInTheDocument()
    expect(screen.getByText(/Recommend:.*Escalate now/)).toBeInTheDocument()
  })

  it('AlertOctagon has animate-pulse only on high', () => {
    const { container: highContainer } = render(<RiskBanner riskFlag={highFlag} show={true} />)
    expect(highContainer.querySelector('.animate-pulse')).toBeInTheDocument()

    const { container: medContainer } = render(<RiskBanner riskFlag={mediumFlag} show={true} />)
    expect(medContainer.querySelector('.animate-pulse')).toBeNull()
  })
})
