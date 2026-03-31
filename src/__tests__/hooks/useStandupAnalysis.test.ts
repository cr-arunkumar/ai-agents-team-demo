import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'
import { useStandupAnalysis } from '@/hooks/useStandupAnalysis'
import { mockAnalyzeResponse } from '../mocks/handlers'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: 0 }, queries: { retry: 0 } },
  })
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  Wrapper.displayName = 'TestQueryWrapper'
  return Wrapper
}

describe('useStandupAnalysis', () => {
  it('has correct initial state', () => {
    const { result } = renderHook(() => useStandupAnalysis(), {
      wrapper: createWrapper(),
    })
    expect(result.current.isPending).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.isError).toBe(false)
    expect(result.current.moods).toEqual([])
    expect(result.current.riskFlag).toBeNull()
  })

  it('populates data on success', async () => {
    const { result } = renderHook(() => useStandupAnalysis(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.analyze('Sara is blocked. Arun is making progress.')
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.moods).toHaveLength(2)
    expect(result.current.moods[0].name).toBe('Sara')
    expect(result.current.riskFlag?.level).toBe('medium')
  })

  it('sets isError on API failure', async () => {
    server.use(
      http.post('/api/standup/analyze', () => {
        return HttpResponse.json({ error: 'Server error' }, { status: 500 })
      })
    )

    const { result } = renderHook(() => useStandupAnalysis(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.analyze('Sara is blocked. Arun is making progress.')
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error?.message).toBeTruthy()
  })

  it('reset clears data and error', async () => {
    const { result } = renderHook(() => useStandupAnalysis(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.analyze('Sara is blocked. Arun is making progress.')
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    act(() => {
      result.current.reset()
    })

    await waitFor(() => expect(result.current.data).toBeUndefined())
    expect(result.current.isError).toBe(false)
  })
})

// Suppress unused import warning — mockAnalyzeResponse used indirectly via MSW handler
void mockAnalyzeResponse
