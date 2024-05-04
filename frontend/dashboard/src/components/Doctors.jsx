import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main"
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';


const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const doctor = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/hospital/doctor",
          {
            withCredentials: true
          })
        setDoctors(data.doctors);
        toast.success()
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    doctor();
  }, [])

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <section className='page doctors'>
        <h1>DOCTORS</h1>
        <div className="banner">
          {
            doctors && doctors.length > 0 ?
              (
                doctors.map((element) => {
                  return (
                    <div className="card">
                      <img src={element.docAvatar && element.docAvatar} alt="Doctor Avatar" />
                      <h4>{`${element.firstName} ${element.lastName}`}</h4>
                      <div className="details">
                        <p>Email: <span>{element.email}</span></p>
                        <p>Phone: <span>{element.phone}</span></p>
                        <p>DOB: <span>{element.dob.substring(0, 10)}</span></p>
                        <p>Department: <span>{element.doctorDepartment}</span></p>
                        <p>NIC: <span>{element.nic}</span></p>
                        <p>Gender: <span>{element.gender}</span></p>
                        <p>Rating: <span>{element.rating} out of 5</span></p>
                        <p>Experience: <span>{element.experience} + years</span></p>
                        <p>Online Fees: <span>₹{element.onlinefees}</span></p>
                        <p>Offline Fees: <span>₹{element.offlinefees}</span></p>
                        <p>Hospital: <span>{element.hospital}</span></p>
                      </div>
                    </div>
                  )
                })
              ) :
              <h1>No Registered Doctor Found</h1>

          }
        </div>
      </section>
    </>
  )
}

export default Doctors
