import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

const mockOnSearch = vi.fn()

beforeEach(()=>{
  mockOnSearch.mockClear()
})

function setup (initialQuery?: string){
  const user = userEvent.setup()
  render(<SearchBar onSearch={mockOnSearch} initialQuery = {initialQuery}/>)

  const queryInput = screen.getByRole('textbox', {name: "Search Query"})
  const submitButton = screen.getByRole('button')
  
  return {
    user,
    queryInput,
    submitButton
  }
}

describe('SearchBar', () => {
  describe('render', () => {
    it('render placeholder', () => {
      const { queryInput } = setup()

    expect(queryInput.getAttribute('placeholder')).toMatch(/search/i)
    })
    it('render button', () => {
      const { submitButton } = setup()

      expect( submitButton).toBeInTheDocument()
    })
    it('renders empty if initialQuery is not provided', () => {
      const {queryInput} = setup()

      expect(queryInput).toHaveValue("")
    })
    it('pre-filled if initialQuery provided ', () => {
      const {queryInput} = setup("Hades")

      expect(queryInput).toHaveValue("Hades")
    })
  })
  describe('interaction', () => {
    it('updates input as the user types', async () => {
      const {user, queryInput} = setup()

      await user.type(queryInput, 'Hades')

      expect(queryInput).toHaveValue('Hades')
    })
    describe('submit', ()=>{
      it('trims query before submitting', async () => {
        const {user, queryInput, submitButton } = setup()

        await user.type(queryInput, ' Hades II  ')
        await user.click(submitButton)

        expect(mockOnSearch).toHaveBeenCalledExactlyOnceWith('Hades II')
      })
      it('submits the initialQuery value when submitted without any changes', async () => {
        const {user, submitButton } = setup('Hades II')

        await user.click(submitButton)

        expect(mockOnSearch).toHaveBeenCalledExactlyOnceWith('Hades II')
      })
      it('submits empty string when input is empty', async () => {
        const {user, submitButton} = setup()

        await user.click(submitButton)

        expect(mockOnSearch).toHaveBeenCalledExactlyOnceWith('')
      })
    })
  })
})