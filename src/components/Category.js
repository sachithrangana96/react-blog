import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBTypography, MDBContainer, MDBIcon, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';


const Category = ({handleCategory,options}) => {
  return (
    <MDBCard style={{width:"20rem",marginTop:"20px",padding:"15px"}}>
        <h4>Categories</h4>
        <MDBListGroup flush>
            {
                options.map((item,index)=>(
                  <MDBListGroupItem key={index} style={{cursor:"pointer"}} onClick={()=> handleCategory(item)}>
                      {item}
                  </MDBListGroupItem>  
                ))
            }
        </MDBListGroup>
    </MDBCard>
  )
}

export default Category