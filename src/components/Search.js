import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBTypography, MDBContainer, MDBIcon, MDBRow, MDBCol } from 'mdb-react-ui-kit';


const Search = ({ handleSearch , searchValue, onInputChange }) => {
  return (
    <div className='searchForm'>
        <form className='d-flex' onSubmit={handleSearch}>
            <input
                type="search"
                className='form-control'
                placeholder='Search Blog...'
                value={searchValue}
                onChange={onInputChange}
            />
            <MDBBtn type="submit">Search</MDBBtn>
        </form>
    </div>
  )
}

export default Search