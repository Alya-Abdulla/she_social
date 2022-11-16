import React, {useEffect, useState } from 'react'
import axios from 'axios'
import './CreateEvent.css'

  // const Upload = () => {
function CreateEvent() {
      useEffect(() => {
        
        event_create_post()
      }, [])
      
      const [fileInputState, setFileInputState] = useState('');
      const [previewSource, setPreviewSource] = useState('');
      const [selectedFile, setSelectedFile] = useState();
      const [successMsg, setSuccessMsg] = useState('');
      const [errMsg, setErrMsg] = useState('');
      const handleFileInputChange = (e) => {
          const file = e.target.files[0];
          previewFile(file);
          setSelectedFile(file);
          setFileInputState(e.target.value);
      };
    
      const previewFile = (file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
              setPreviewSource(reader.result);
          };
          reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
      };
    
      const handleSubmitFile = (e) => {
          e.preventDefault();
          if (!selectedFile) return;
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = () => {
              uploadImage(reader.result);
          };}
    const event_create_post = () => {
      const token = localStorage.getItem('token')
      axios.post(`http://localhost:4000/users/events`,
      {
        headers: {Authorization: token}
      })
      .catch(err => console.log(err))
    }
  const [formData, setFormData] = useState({
    EventName: '',
    Date: '',
    Time: '',
    Locate: '',
    Category: '',
    Description: ''
    }
  )
  const handleChange = (e) => {
    //Store the user input into state
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // axios.post(Create a tweet)
    const token = localStorage.getItem('token')
    axios.post('http://localhost:4000/users/events/create', formData, 
    {
      headers: {Authorization: token}
    })
    .then(res => console.log(res))
    .then(() => event_create_post())
    .catch(err => console.log(err))
  }
  return (
    <div>
 <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
<form onSubmit={handleSubmit} className='homeform'>
       <br />
       <label>Create your Event </label> <br></br>
        <input  className='input' name="EventName" value={formData.EventName} onChange={handleChange} placeholder="Event Name" /> <br /><br />
        <input  className='input' name="Date" value={formData.Date} onChange={handleChange} placeholder="Date" /> <br /><br />
        <input  className='input' name="Time" value={formData.Time} onChange={handleChange} placeholder="Time" /> <br /><br />
        <input  className='input' name="Locate" value={formData.Locate} onChange={handleChange} placeholder="Locate" /> <br /><br />
        <input  className='input' name="Category" value={formData.Category} onChange={handleChange} placeholder="Category" /> <br /><br />
        <input  className='input' name="Description" value={formData.Description} onChange={handleChange} placeholder="Description" /> <br /><br />
        <button className='submit' type="submit">Submit</button>
        <br />
      </form>

    </div>
  )
}

export default CreateEvent







