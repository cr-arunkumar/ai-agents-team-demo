import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StreamingSummary } from '@/components/streaming-summary'

describe('StreamingSummary', () => {
  it('does not render when show=false', () => {
    const { container } = render(
      <StreamingSummary summary="" isStreaming={false} isComplete={false} show={false} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders skeleton when show=true and summary is empty', () => {
    const { container } = render(
      <StreamingSummary summary="" isStreaming={false} isComplete={false} show={true} />
    )
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
    expect(screen.getByText('Generating summary...')).toBeInTheDocument()
  })

  it('renders summary text when content present', () => {
    render(
      <StreamingSummary
        summary="Sprint is on track."
        isStreaming={false}
        isComplete={true}
        show={true}
      />
    )
    expect(screen.getByText(/Sprint is on track/)).toBeInTheDocument()
  })

  it('copy button appears only when isComplete=true', () => {
    const { rerender } = render(
      <StreamingSummary summary="Done" isStreaming={false} isComplete={false} show={true} />
    )
    expect(screen.queryByRole('button')).toBeNull()

    rerender(
      <StreamingSummary summary="Done" isStreaming={false} isComplete={true} show={true} />
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls clipboard on copy button click', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    render(
      <StreamingSummary summary="Sprint text" isStreaming={false} isComplete={true} show={true} />
    )
    await user.click(screen.getByRole('button'))
    expect(writeText).toHaveBeenCalledWith('Sprint text')
  })
})
