import React, {useState,useContext} from 'react';
import AuthService from '../../Services/AuthService';
import {AuthContext} from '../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Row, Col, Button , Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Login = props=>{
    const [user,setUser] = useState({email: "", password : ""});
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    console.log(user);
    const onSubmit = e =>{
        e.preventDefault();
        console.log(user);
        AuthService.login(user).then(data=>{
            console.log(data);
            const { isAuthenticated,user} = data;
            if(isAuthenticated){
                console.log(user);
                toast.success("Logged in Successfully");
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/myschools');
                
                
            }else{
                toast.error(data.error);
            }
            
        }).catch(err=>{
            console.log(err);
        });
    }



    return(
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', margin:"60px auto", width: '60%', minHeight: "63vh"}} className="shadow p-3 mb-5 bg-white rounded">
             <ToastContainer />
             <Form style= {{width: '50%', height: "50vh", margin: 'auto'}} className = "d-flex flex-column justify-content-around" onSubmit={onSubmit}>
            <Row className="justify-content-md-center">
                <h2 style={{fontFamily: "Ubuntu", fontSize:'24px', fontWeight:"bold", paddingTop:"30px"}}>SIGN IN</h2>
            </Row>
            <Row className="d-flex flex-column justify-content-center">
            <Form.Group as={Row} controlId="email">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="email" placeholder="Email" name="email" value={user.email} onChange={onChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Password" name="password" value={user.password1} onChange={onChange}/>
                    </Col>
                </Form.Group>
            </Row>
                
                <Form.Group as={Row} className="d-flex justify-content-end">
                <Col sm="4" className="d-flex justify-content-center">
                <Link to="/register">
                <Button href="/register" style={{background: '#000051', border: "none", borderRadius:"10px", fontSize: "1.1rem", padding: "8px 35px", margin:"10px"}} size="lg"> New user?
                </Button>
                </Link>
                </Col>
                <Col sm="4" className="d-flex justify-content-center">
                <Button style={{background: '#B71C1C', border: "none", borderRadius:"10px", fontSize: "1.1rem", padding: "8px 35px", margin:"10px"}} type="submit" size="lg">
                    Sign In
                </Button>{' '}
                </Col>
                </Form.Group>
                </Form>
        </div>
    )
}

export default Login;