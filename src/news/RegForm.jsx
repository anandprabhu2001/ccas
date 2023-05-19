import React, { useState } from 'react';
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../news/newsItem.css'; 

import app  from "../firebase.js";
import { doc, addDoc, collection, updateDoc, arrayUnion } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//import { FieldValue } from 'firebase-admin/firestore';

export default function RegForm() {
    const [message,setMessage] = useState("");
    const [complaintee,setComplaintee] = useState("");
    const navigate = useNavigate();
    const db = getFirestore(app);
    
    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setComplaintee(user.email);
          console.log("Current User: " + user.email);
        } else {
          console.log("User not found");
          navigate('/');
        }
      });
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const data = {
        message,
        dept: null,
        status: null,
        priority: null
      };

      // Request to model 1 for dept

      // Request to model 2 for priority

      const docRef = await addDoc(collection(db, "complaints"), data);

      // console.log("Complaintee: " + complaintee);
      const userDoc = doc(db, "users", complaintee);
      await updateDoc(userDoc, {
        complaints: arrayUnion(docRef.id)
      });
    }

    return (
    <form className="reg_form" onSubmit={handleSubmit}>
      <h1 className="mb-3">Complaint Form</h1>
      
      <div className="form-outline">
        <textarea className="form-control" id="textAreaExample1" rows="4"
        onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
        <label className="form-label">Message</label>
      </div>
      
      <p className="lead">*Input should be atleast 10 characters</p>
      
      <MDBInput type='file' />

      <MDBCheckbox
        wrapperClass='d-flex justify-content-center mb-4'
        id='form4Example4'
        label='Send me a copy of this message'
        defaultChecked
      />
      
      <MDBBtn type='submit' className='mb-4' block disabled={message.length<10}>Submit</MDBBtn>
    </form>
  );
}