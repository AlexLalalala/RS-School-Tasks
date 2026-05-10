import { METACRITIC_HOST_URL } from "../constant";
import GameCard from "./GameCard";
import { render, screen } from '@testing-library/react'

const mockProps = {
  title: "Ni no Kuni II: Revenant Kingdom - The Prince's Edition",
  normalPrice: 79.99,
  salePrice: 11.99,
  thumb: "https://sttc.gamersgate.com/images/product/ni-no-kunitm-ii-revenant-kingdom-the-princes-edition/cover-180-b6d878.jpg",
  metacriticLink: "null" 
}

describe('GameCard', () => {
  it('GameCard should render title', () => {
    render(<GameCard {...mockProps}/>)

    expect(screen.getByText("Ni no Kuni II: Revenant Kingdom - The Prince's Edition")).toBeInTheDocument()
  })

  it('GameCard should render normal price', ()=>{
    render(<GameCard {...mockProps}/>)

    expect(screen.getByText("79.99")).toBeInTheDocument()
  })

  it('GameCard should render sale price', ()=>{
    render(<GameCard {...mockProps}/>)

    expect(screen.getByText("11.99")).toBeInTheDocument()
  })

  it('GameCard should render image with proper alt text', () => {
    render(<GameCard {...mockProps}/>)

    const image = screen.getByRole("img")
    expect(image).toHaveAttribute('src', "https://sttc.gamersgate.com/images/product/ni-no-kunitm-ii-revenant-kingdom-the-princes-edition/cover-180-b6d878.jpg")
    expect(image.getAttribute('alt')).toMatch(/Ni no Kuni II/)
  })

  it('GameCard should render a link to metacritic site', () => {
    render(<GameCard {...mockProps}/>)

    expect(screen.getByRole('link')).toHaveAttribute('href', new URL("null", METACRITIC_HOST_URL).href)
  })
})
