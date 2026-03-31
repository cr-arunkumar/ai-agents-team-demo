import React from 'react'
import { render, screen } from '@testing-library/react'
import { MoodCards } from '@/components/mood-cards'
import type { MoodResult } from '@/types/standup'

const mockMoods: MoodResult[] = [
  { name: 'Sara', mood: 'blocked', emoji: '🚫', status: 'blocked', reason: 'Waiting for keys' },
  { name: 'Arun', mood: 'focused', emoji: '💪', status: 'on track', reason: 'Dashboard done' },
  { name: 'Priya', mood: 'stressed', emoji: '😓', status: 'at risk', reason: 'Tight deadline' },
]

describe('MoodCards', () => {
  it('renders 3 skeleton rows when loading', () => {
    const { container } = render(<MoodCards moods={[]} isLoading={true} />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThanOrEqual(3)
  })

  it('renders no skeletons when not loading', () => {
    const { container } = render(<MoodCards moods={mockMoods} isLoading={false} />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBe(0)
  })

  it('renders correct number of member rows', () => {
    render(<MoodCards moods={mockMoods} isLoading={false} />)
    expect(screen.getByText('Sara')).toBeInTheDocument()
    expect(screen.getByText('Arun')).toBeInTheDocument()
    expect(screen.getByText('Priya')).toBeInTheDocument()
  })

  it('renders emoji and mood text per member', () => {
    render(<MoodCards moods={mockMoods} isLoading={false} />)
    expect(screen.getByText(/🚫.*blocked/)).toBeInTheDocument()
    expect(screen.getByText(/💪.*focused/)).toBeInTheDocument()
  })

  it('renders status badges', () => {
    render(<MoodCards moods={mockMoods} isLoading={false} />)
    expect(screen.getAllByText('blocked').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('on track')).toBeInTheDocument()
    expect(screen.getByText('at risk')).toBeInTheDocument()
  })
})
