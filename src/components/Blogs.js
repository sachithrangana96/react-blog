import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBCardImage, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


const Blogs = ({ title,category,description,id,imageUrl,excerpt,handleDelete}) => {
  
  return (
    <MDBCard alignment='center' className='h-100 mt-5' style={{ maxWidth: '22rem' }}>
      
            <MDBCardImage 
                src={`/images/${imageUrl}`} 
                alt={title}
                position='top'
                style={{maxWidth:"100%", height:"180px"}}
            />
           
        <MDBCardBody>
            <MDBCardTitle>{title}</MDBCardTitle>
                <MDBCardText>
                    {excerpt(description)}
                    <Link to={`/blog/${id}`}>Read More</Link>
                </MDBCardText>
                <h5>{category}</h5>   
                <span>
                    <MDBBtn className='mt-1' tag="a" color='none' onClick={()=>handleDelete(id)}>
                        <MDBIcon 
                           fas
                           icon="trash"
                           style={{color:'#dd4b39'}}
                           size="lg" 
                        />
                    </MDBBtn>
                    <Link to={`/editBlog/${id}`}>
                        <MDBIcon 
                            fas
                            icon="edit"
                            style={{color:'#55acee',marginLeft:"10px"}}
                            size="lg" 
                            />
                    </Link>
                </span>
        </MDBCardBody>
  </MDBCard>
  )
}

export default Blogs