import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([])
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
  })
  const router = useRouter()

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      const { data } = await axios.get('/api/addresses')
      setAddresses(data)
    }
    fetchAddresses()
  }, [])

  // Add new address
  const handleAddAddress = async () => {
    const { data } = await axios.post('/api/addresses', newAddress)
    setAddresses([...addresses, data.address])
    setNewAddress({ street: '', city: '', postalCode: '', country: '' })
  }

  // Update address
  const handleUpdateAddress = async (id, updatedAddress) => {
    const { data } = await axios.put(`/api/addresses/${id}`, updatedAddress)
    setAddresses(
      addresses.map((addr) => (addr._id === id ? data.address : addr))
    )
  }

  return (
    <div>
      <h1>Your Addresses</h1>
      {addresses.map((address) => (
        <div key={address._id}>
          <p>
            {address.street}, {address.city}, {address.postalCode},{' '}
            {address.country}
          </p>
          <button
            onClick={() =>
              handleUpdateAddress(address._id, {
                ...address,
                city: 'Updated City',
              })
            }
          >
            Edit
          </button>
        </div>
      ))}
      <div>
        <h2>Add New Address</h2>
        <input
          type='text'
          placeholder='Street'
          value={newAddress.street}
          onChange={(e) =>
            setNewAddress({ ...newAddress, street: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='City'
          value={newAddress.city}
          onChange={(e) =>
            setNewAddress({ ...newAddress, city: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='Postal Code'
          value={newAddress.postalCode}
          onChange={(e) =>
            setNewAddress({ ...newAddress, postalCode: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='Country'
          value={newAddress.country}
          onChange={(e) =>
            setNewAddress({ ...newAddress, country: e.target.value })
          }
        />
        <button onClick={handleAddAddress}>Add Address</button>
      </div>
    </div>
  )
}
