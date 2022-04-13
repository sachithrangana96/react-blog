import React,{useEffect,useState} from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBTypography, MDBContainer, MDBIcon, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Blog = () => {

  const [blog,setBlog] = useState();
  const [relatedPost,setRelatedPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if(id){
      getSingleBlog();
    }
  },[id])

  const getSingleBlog = async () =>{
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);
    const relatedPostData = await axios.get(`http://localhost:5000/blogs?category=${response.data.category}&_start=0&_end=3`);
   
    if(response.status === 200){
      setBlog(response.data);
      setRelatedPost(relatedPostData.data);
      console.log(relatedPost)
    }else{
      toast.error("something went wrong")
    }
  }

  const excerpt = (str) => {
    if(str.length > 50){
      str = str.substring(0,50) + "....";
    }
    return str;
  }

  return (
    <MDBContainer style={{border:"1px solid #d1ebe8"}}>
      <Link to="/">
        <strong style={{float:"left", color:"black"}} className="mt-3">
          Go Back
        </strong>
      </Link>
      <MDBTypography tag="h2" className='text-center text-muted mt-2' style={{display:"inline-block"}}>{blog && blog.title}</MDBTypography>
      <img 
        src={`/images/${blog && blog.imageUrl}`}
        className="img-fluid rounded"
        alt={blog && blog.title}
        style={{width:"100%",maxHeight:"600px"}}
      />
      <div style={{marginTop:"20px"}}>
        <div style={{height:"43px",background:"#f6f6f6"}}>
          <MDBIcon
            style={{float:"left"}}
            className="mt-3"
            far
            icon="calendar-alt"
            size="lg"
          />
          <strong style={{float:"left", marginTop:"12px", marginLeft:"2px"}}>
            {blog && blog.date}
          </strong>
          <h3>{blog && blog.category}</h3>
        </div>
        <MDBTypography className='lead md-0'>
        {blog && blog.description}
        </MDBTypography>
      </div>

      {
          relatedPost && relatedPost.length > 0 && (
           <>
              { relatedPost.length > 1 && (
                <h1>Related Post</h1>
              )} 
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
              {
                relatedPost.filter((item)=>item.id != id).map((item,index) => (
                  <MDBCol>
                    <MDBCard>
                      <Link to={`/blog/${item.id}`}>
                        <MDBCardImage 
                           src={`/images/${item.imageUrl}`}
                           alt={ item.title}
                           position="top"
                        />
                      </Link>

                      <MDBCardBody>
                        <MDBCardTitle>{item.title}</MDBCardTitle>
                        <MDBCardText>{excerpt(item.description)}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))
              }
            </MDBRow>
           </>
          )
      }

    </MDBContainer>
  )
}

export default Blog