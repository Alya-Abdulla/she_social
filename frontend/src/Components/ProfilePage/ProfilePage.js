import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './ProfilePage.css'
import {useParams} from 'react-router-dom'


function ProfilePage() {

  const [userDetails, setUserDetails] = useState([])

    const params = useParams()
  console.log('params', params)
  useEffect(() => {
    user_details_get()
}, [])

const user_details_get = () => {
  axios.get(`http://localhost:4000/users/${params.userId}`)
  .then(res => setUserDetails(res.data))
  .catch(err => console.log(err))
}

const user_update_put= () => {
  axios.put(`http://localhost:4000/users/${params.userId}`)
  .then(res => user_update_put(res.data))
  .catch(err => console.log(err))
}
const [formData, setFormData] = useState({
  
    FirstName: '',
    LastName: '',
    username:'',
    email:''
  
  }
)

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}

const handleSubmit = (e) => {
  e.preventDefault()
  axios.put(`http://localhost:4000/users/${params.userId}`, formData)
  .then(res => console.log(res))
  // .then(() => user_update_put())
  .then(() => user_details_get() )
  .catch(err => console.log(err))
}

  return (
    
      <div>
    {/* {userDetails.length ? userDetails.map(user =>  */}
      <div>
     
        <p>Hello {userDetails.FirstName}</p>
        
      </div>

        <div className='profilecontainer' >
        <form onSubmit={handleSubmit}>
          <label>Edit Profile</label><br></br>
          <input name="FirstName" value={formData.FirstName} onChange={handleChange} placeholder="First Name" /><br></br>
          <input name="LastName" value={formData.LastName} onChange={handleChange} placeholder="Last Name" /><br></br>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" /><br></br>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" /><br></br>
          <button type="submit">Edit Profile</button>
        </form>
        </div>
    

      </div>

  )
}

export default ProfilePage