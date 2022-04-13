import React,{useState,useEffect} from 'react';
import { MDBCol,MDBRow,MDBContainer,MDBTypography } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';
import Blogs from '../components/Blogs';
import Search from '../components/Search';
import Category from '../components/Category';
import LatestBlog from './../components/LatestBlog';

const Home = () => {
  const [data,setData] = useState([]);
  const [searchValue,setSearchValue] = useState("");
  const [latestBlog,setLatestBlog] = useState([]);
  const options = ["Travel","Fashion","Fitness","Sports","Food","Tech"];

  useEffect(()=>{
    loadBlogsData();
    fetchLatestBlog();
  },[]);

  const loadBlogsData = async () => {
    const response = await axios.get('http://localhost:5000/blogs');
    if(response.status === 200){
      setData(response.data);
    }else{
      toast.error("something went wrong")
    }
  }

  const fetchLatestBlog = async () => {
    const totalBlog = await axios.get('http://localhost:5000/blogs');
    const start = totalBlog.data.length - 4;
    const end = totalBlog.data.length;
    const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end${end}`);
    console.log("ltest",response)

    if(response.status === 200){
      setLatestBlog(response.data);
    }else{
      toast.error("something went wrong")
    }
  }

  console.log("data",data)

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure that you wanted to delete that blogs ?")){
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if(response.status === 200){
        toast.success("Blog Deleted Successfully");
        loadBlogsData();
      }else{
        toast.error("Something went wrong");
      }
    }
  };
  
  const excerpt = (str) => {
    if(str.length > 50){
      str = str.substring(0,50) + "....";
    }
    return str;
  }

  const onInputChange = (e) =>{
      if(!e.target.value){
        loadBlogsData();

      }
      setSearchValue(e.target.value)
  }

  const handleCategory = async(category) =>{
    const response = await axios.get(`http://localhost:5000/blogs?category=${category}`); 
    if(response.status === 200){
      setData(response.data);
    }else{
      toast.error('something went wrong');
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`);
    if(response.status === 200){
      setData(response.data)
    }else{
      toast.error("Something went wrong")
    }

  }

  return (
   <>
   <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch} />
    <MDBRow>
      {
        data.length === 0 && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No Blog Found
          </MDBTypography>
        )
      }

      <MDBCol>
        <MDBContainer>
          <MDBRow>
            {
              data && data.map((item,index)=>(
                <Blogs 
                  key={index}
                  {...item}
                  excerpt={excerpt}
                  handleDelete={handleDelete}
                />
              ))
            }
          </MDBRow>
        </MDBContainer>
      </MDBCol>
      <MDBCol size="3">
        <h4>Latest Blogs</h4>
        {
          latestBlog && latestBlog.map((item,index) =>(
            <LatestBlog key={index} {...item} />
          ))
        }
        <Category options={options} handleCategory={handleCategory} />
      </MDBCol>
    </MDBRow>
   </>
  )
}

export default Home