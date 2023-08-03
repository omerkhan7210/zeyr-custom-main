import React from 'react'

export const AddressForm = ({handleSubmit,formData,setFormData,btnText}) => {


  // Sample country options, replace it with your actual country options
  const countryOptions = [
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    // Add more countries as needed
  ];

  return (
    <form onSubmit={handleSubmit} className="w50 mauto">
        <p className="form-row w100 d-flex g1">
						
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className='input-text w50'
              />
             
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className='input-text w50'
              />
          </p>
          <p className="form-row w100">
            <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className='input-text w100'
              />
          </p>

            <p className="form-row w100">
              <input
                  type="text"
                  placeholder="Address 1"
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className='input-text w100'
                />
            </p>

            <p className="form-row w100">
              <input
                type="text"
                placeholder="Address 1"
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                className='input-text w100'
              />
            </p>

            <p className="form-row w100">
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className='input-text w100'
              />
            </p>
            <p className="form-row w100">
            <select
              id="country-dropdown"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className='w100 input-text'
            >
              {/* Generate country options */}
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            </p>

            <p className="form-row w100">
            <input
              type="text"
              name="zipCode" // Add name attribute
              inputMode="numeric" // Set the input mode to numeric
              pattern="[0-9]*" // Add pattern to further enforce number input
              placeholder="Postal Code/Zip Code"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} // Use e.target.name
              className='input-text w100'
            />
            </p>

            <p className="form-row w100">
            <input
              type="text"
              name="phone" // Add name attribute
              inputMode="numeric" // Set the input mode to numeric
              pattern="[0-9]*" // Add pattern to further enforce number input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} // Use e.target.name
              className='input-text w100'
            />
            </p>

            <p className="form-row w100 d-flex justify-center">
            <button type="submit" className='button medium' disabled={loading}>
              {loading ? (btnText === 'Add Address' ? "Added" : 'Edited') : btnText}
            </button>
          </p>
        </form>
  )
}

export default AddressForm;
