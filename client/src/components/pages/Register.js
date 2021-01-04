import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../../Services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Form, Row, Col, Button , Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';


const Register = props=>{
    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password1: "",
        password2: "",
        country: "",
        city: "",
        street: "",
        building: "",
        postcode: "",
        role : ""});
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({
        firstName: "",
        lastName: "",
        email: "",
        password1: "",
        password2: "",
        country: "",
        city: "",
        street: "",
        building: "",
        postcode: "",
        role : ""
    });
    }

    console.log(user);

    const onSubmit = e =>{
        e.preventDefault();
        if (user.firstName && user.lastName && user.email && user.password1 && user.country && user.city && user.street && user.building && user.postcode && user.role) {
            if (user.password1 === user.password2) {
                axios
                .post(`/user/register`, {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  password: user.password1,
                  role: user.role,
                  address: {
                      country:user.country,
                      city: user.city,
                      street: user.street,
                      building: user.building,
                      postcode: user.postcode
                      
                  }
                })
                .then(res => {
                  resetForm();
                  toast.success(res.data.message);
                  timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
                })
                .catch(err => {
                  resetForm();
                  toast.error(err.response.data.error);
                });
            } else {
              toast.error("Passwords don't matches");
            }
          } else {
            toast.error('Please fill all fields');
          }
    }

    
    return(
        
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', margin:"60px auto", width: '70%'}} className="shadow p-3 mb-5 bg-white rounded">
        
            <ToastContainer />
            {/* <Container> */}
            <Form style= {{width: '60%', margin: 'auto', minHeight: "80vh"}} onSubmit={onSubmit}>
            <Row className="justify-content-md-center">
                <h2 style={{fontFamily: "Ubuntu", fontSize:'24px', fontWeight:"bold", margin:"20px 0"}}>SIGN UP</h2>
            </Row>
                <Form.Group as={Row} controlId="firstName">
                    <Form.Label column sm="2">
                    First Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="First Name" name="firstName"value={user.firstName} onChange={onChange}  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="lastName">
                    <Form.Label column sm="2">
                    Last Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="Last Name" name="lastName" value={user.lastName} onChange={onChange}  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="email">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="email" placeholder="Email" name="email" value={user.email} onChange={onChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password1">
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Password" name="password1" value={user.password1} onChange={onChange}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password2">
                    <Form.Label column sm="2">
                    Confirm Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Confirm Password" name="password2" value={user.password2} onChange={onChange}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="address">
                    <Form.Label column sm="2">
                    Address
                    </Form.Label>
                    <Col sm="10">
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="city">
                    <Form.Label column sm="2">
                    City
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="city" placeholder="City" name="city" value={user.city} onChange={onChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="street">
                    <Form.Label column sm="2">
                    Street
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="street" placeholder="Street" name="street" value={user.street} onChange={onChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="country">
                    <Form.Label column sm="2">
                    Country
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="country" placeholder="Country" name="country" value={user.country} onChange={onChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="house">
                    <Form.Label column sm="2">
                    Building Number
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="number" placeholder="Building number" name="building" value={user.building} onChange={onChange}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="postcode">
                    <Form.Label column sm="2">
                    Postcode
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="number" placeholder="Postcode"  name="postcode" value={user.postcode} onChange={onChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                <Col sm={4} className="m-auto">
                    <Form.Check
                    type="radio"
                    label="I'm a parent"
                    name="role"
                    id="user"
                    value='user' onChange={onChange} 
                    />
                    <Form.Check
                    type="radio"
                    label="I'm a school manager"
                    name="role"
                    id="school"
                    value='school' onChange={onChange}
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-5">
                <Col sm="6" className="d-flex justify-content-center">
                <Button href="/login" style={{background: '#000051', border: "none", margin: "10px", borderRadius:"10px", fontSize: "1.1rem", padding: "8px 30px"}} size="lg"> Have an account?
                </Button>
                </Col>
                <Col sm="6" className="d-flex justify-content-center">
                <Button style={{background: '#B71C1C', border: "none", margin: "10px", borderRadius:"10px", fontSize: "1.1rem", padding: "8px 30px"}} type="submit" size="lg">
                    Create an account
                </Button>{' '}
                </Col>
                </Form.Group>
                </Form>
            {/* </Container> */}
            

            
            {/* <form onSubmit={onSubmit}>
                <h3>Please Register</h3>
                <label htmlFor="name" className="sr-only">Name: </label>
                <input type="text" 
                       name="name" 
                       value={user.name}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Name"/>
                <label htmlFor="email" className="sr-only">Email: </label>
                <input type="email" 
                       name="email" 
                       value={user.email}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Username"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password1"
                       value={user.password} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password"/>
                                <label htmlFor="password" className="sr-only">Confirm Password: </label>
                <input type="password" 
                       name="password2"
                       value={user.password2} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Confirm Password"/>
                <label htmlFor="role" className="sr-only">Role: </label>
                <input type="text" 
                       name="role"
                       value={user.role}  
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter role (admin/user)"/>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Register</button>
            </form> */}
        </div>
    )
}

export default Register;