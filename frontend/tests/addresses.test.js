import { render, screen, fireEvent } from '@testing-library/react'
import AddressesPage from '../pages/addresses'

describe('Addresses Page', () => {
  it('should render addresses', () => {
    render(<AddressesPage />)
    expect(screen.getByText('Your Addresses')).toBeInTheDocument()
  })

  it('should add a new address', () => {
    render(<AddressesPage />)
    fireEvent.change(screen.getByPlaceholderText('Street'), {
      target: { value: '123 Main St' },
    })
    fireEvent.change(screen.getByPlaceholderText('City'), {
      target: { value: 'City' },
    })
    fireEvent.change(screen.getByPlaceholderText('Postal Code'), {
      target: { value: '12345' },
    })
    fireEvent.change(screen.getByPlaceholderText('Country'), {
      target: { value: 'Country' },
    })
    fireEvent.click(screen.getByText('Add Address'))
    expect(
      screen.getByText('123 Main St, City, 12345, Country')
    ).toBeInTheDocument()
  })
})
