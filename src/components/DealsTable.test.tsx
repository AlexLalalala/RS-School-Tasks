import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import DealsTable from './DealsTable'
import { createMockDeal } from '../__tests__/factories'
import { PAGE_SIZE } from '../constant'

vi.mock('./SkeletonCard', () => ({
  default: () => <div data-testid="skeleton-card" />,
}))

vi.mock('./GameCard', ()=>({
  default: ({ title }: {title:string}) => (
    <div data-testid={`game-card`}>{title}</div>
  )
}))

vi.mock('./ErrorCard', () => ({
  default: ({children}: {children: React.ReactNode}) => {
    <>{children}</>
  }
}))

vi.mock('./ErrorBoundary', ()=> ({
  default: () => {
    <div data-testid="error-card"></div>
  }
}))

const deals = [
  createMockDeal({steamId: "1", title: "Hades"}),
  createMockDeal({steamId: "2", title: "Shovel Knight"})
]

describe('DealsTable', () => {
  describe('loading sate', () => {
    it('renders correct number of skeleton cards', () => {
      render(<DealsTable deals={deals} loading={true}/>)

      expect(screen.getAllByTestId("skeleton-card")).toHaveLength(PAGE_SIZE)
    })
  })
  describe('empty state', () => {
    it('shows the message', () => {
      render(<DealsTable deals={[]} loading={false}/>)

      expect(screen.getByText(/(no|zero) deal(s)/i)).toBeInTheDocument()
    })
    it('do not render game/skeleton/error cards', () => {
      render(<DealsTable deals={[]} loading={false}/>)

      expect(screen.queryAllByTestId("skeleton-card")).toHaveLength(0)
      expect(screen.queryAllByTestId("error-card")).toHaveLength(0)
      expect(screen.queryAllByTestId("game-card")).toHaveLength(0)
    })
  })
  describe('deals state', () => {
    it('render correct number of cards', () => {
      render(<DealsTable deals={deals} loading={false}/>)

      waitFor(() =>
        expect(screen.queryAllByTestId("game-card")).toHaveLength(2)
      )
    })
    it('do not render skeleton/error card', () => {
      render(<DealsTable deals={deals} loading={false}/>)

      waitFor(()=>{
        expect(screen.queryAllByTestId("skeleton-card")).toHaveLength(0)
        expect(screen.queryAllByTestId("error-card")).toHaveLength(0)
      })
    })
  })
})