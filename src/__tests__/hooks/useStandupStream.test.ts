import { renderHook, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import type { UseCompletionHelpers } from '@ai-sdk/react'

const mockComplete = vi.fn()
const mockStop = vi.fn()

function makeCompletion(overrides: Partial<UseCompletionHelpers>): UseCompletionHelpers {
  return {
    completion: '',
    complete: mockComplete,
    isLoading: false,
    error: undefined,
    stop: mockStop,
    setCompletion: vi.fn(),
    input: '',
    setInput: vi.fn(),
    handleInputChange: vi.fn(),
    handleSubmit: vi.fn(),
    ...overrides,
  } as unknown as UseCompletionHelpers
}

vi.mock('@ai-sdk/react', () => ({
  useCompletion: vi.fn(() => makeCompletion({})),
}))

import { useStandupStream } from '@/hooks/useStandupStream'
import { useCompletion } from '@ai-sdk/react'

describe('useStandupStream', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useCompletion).mockReturnValue(makeCompletion({}))
  })

  it('streamSummary calls complete with rawInput', () => {
    const { result } = renderHook(() => useStandupStream())
    act(() => {
      result.current.streamSummary('Team standup input text')
    })
    expect(mockComplete).toHaveBeenCalledWith('Team standup input text')
  })

  it('isStreaming reflects isLoading', () => {
    vi.mocked(useCompletion).mockReturnValueOnce(makeCompletion({ isLoading: true }))
    const { result } = renderHook(() => useStandupStream())
    expect(result.current.isStreaming).toBe(true)
  })

  it('isComplete is true when not loading and completion has content', () => {
    vi.mocked(useCompletion).mockReturnValueOnce(
      makeCompletion({ completion: 'Sprint summary here', isLoading: false })
    )
    const { result } = renderHook(() => useStandupStream())
    expect(result.current.isComplete).toBe(true)
  })

  it('isComplete is false when still loading', () => {
    vi.mocked(useCompletion).mockReturnValueOnce(
      makeCompletion({ completion: 'partial text', isLoading: true })
    )
    const { result } = renderHook(() => useStandupStream())
    expect(result.current.isComplete).toBe(false)
  })

  it('summary returns completion value', () => {
    vi.mocked(useCompletion).mockReturnValueOnce(
      makeCompletion({ completion: 'The sprint is going well.' })
    )
    const { result } = renderHook(() => useStandupStream())
    expect(result.current.summary).toBe('The sprint is going well.')
  })
})
