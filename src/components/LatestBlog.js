import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBTypography, MDBContainer, MDBIcon, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const LatestBlog = ({ imageUrl, title ,id}) => {
  return (
    <div>
        <Link to={`/blog/${id}`}>
            <MDBCard style={{maxWidth:"500px",height:"80px"}} className="mt-2">
                <MDBCol md="3">
                <MDBCardImage 
                           src={`/images/${imageUrl}`}
                           alt={ title}
                           fluid
                           className='rounded-circle'
                           style={{height:"80px"}}
                        />
                </MDBCol>
                <MDBCol md='9'>
                    <MDBCardBody>
                        <p className='text-start latest-title'>{title}</p>
                    </MDBCardBody>
                </MDBCol>
            </MDBCard>
        </Link>
    </div>
  )
}

export default LatestBlog