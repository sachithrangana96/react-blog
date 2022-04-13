import React,{useState,useEffect} from 'react'
import { MDBInput,MDBBtn,MDBValidation,MDBTextArea  } from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

// qyakalid

const initialState = {
  title:"",
  description:"",
  category:"",
  imageUrl:""
}

const options = ["Travel","Fashion","Fitness","Sports","Food","Tech"];

const AddEditBlog = () => {
  const [formValue,setFormValue] = useState(initialState);
  const [categoryErrMsg,setCategoryErrMsg] = useState(null);
  const [editMode,setEditMode] = useState(false);
  const {title, description, category, imageUrl} = formValue;

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    if(id){
      setEditMode(true);
      getSingleBlog(id);
    }else{
      setEditMode(false);
      setFormValue({...initialState});
    }
  },[id])

  const getSingleBlog = async (id) => {
    console.log(id)
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    console.log(singleBlog)
    if(singleBlog.status===200){
    setFormValue({...singleBlog.data});
    }else{
      toast.error("something went wrong")
    }
  }

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2,"0");
    let mm = String(today.getMonth() + 1).padStart(2,"0");
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  const handleSubmit = async (e) => {
    console.log(formValue)
    e.preventDefault();
    if(!category){
      setCategoryErrMsg("Please select a category");
    }

    const imgeValidation = !editMode ? imageUrl : true;

    if(title && description && imageUrl && category){
      const currentDate = getDate();
  
      if(!editMode){
        const updatedBlog = {...formValue,date:currentDate};
        const response = await axios.post("http://localhost:5000/blogs",updatedBlog);
        if(response.status === 201){
          toast.success("Blog created Successfully")
        }else{
          toast.error("Error")
        }
     
    }else{
        const response = await axios.put(`http://localhost:5000/blogs/${id}`,formValue);
        if(response.status === 200){
          toast.success("Blog updated Successfully")
        
      }else{
        toast.error("Error")
      }
    }
    

    setFormValue({title:"",description:"", category:"",imageUrl:""});
    navigate("/")
  }

  };

  const onInputChange = (e) => {
    let { name ,value} = e.target;
    setFormValue({...formValue,[name]:value});
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({...formValue,category:e.target.value});
  };

  const onUploadImage = (file) => {
    
    console.log(file[0].name)
    setFormValue({...formValue,imageUrl:file[0].name});
  };

  return (
    <MDBValidation className='row g-3' style={{marginTop:"100px"}} noValidate onSubmit={handleSubmit}>
        <p className='fs-2 fw-bold text-center'>{ editMode ?"Update Blog" : "Add Blog" }</p>
        <div style={{margin:'auto',padding:'15px',maxWidth:'400px',alignContent:'center'}}>
            <MDBInput value={title || ""} name='title' type='text' onChange={onInputChange} required label='Title' validation="Enter Title" />
            <br />
            <MDBTextArea  value={description || ""} name='description' type='text' onChange={onInputChange} required label='Description'  rows={4} invalid validation="Enter description" />
            <br />
            {
              !editMode&&(
                <MDBInput name='image' type='file' onChange={(e) => onUploadImage(e.target.files)} required label='Image' validation="Enter Title" />
              )
            }
            <br />
            <select className='categoryDropdown' onChange={onCategoryChange} value={category}>
              <option> Please select category</option>
              {
                options.map((option,index) => (

                  <option value={option || ""} key={index}>
                    {option}
                  </option>
                ))
              }
            </select>
            {
              categoryErrMsg && (
                <div className='categoryErrMsg'>{categoryErrMsg}</div>
              )
            }
            <br />
            <br />
            <MDBBtn type='submit' style={{marginRight:'10px'}}>Add</MDBBtn>
            <MDBBtn color='red' style={{marginRight:'10px'}} onClick={()=> navigate('/')}>Go Back</MDBBtn>
        </div>
    </MDBValidation>
  )
}

export default AddEditBlog