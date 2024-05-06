// LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { setCredentials } from '../../slices/authSlice';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../slices/userApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);


    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            // console.log("res",res);
            dispatch(setCredentials({ ...res }));
            console.log("adeel");
            navigate('/');
        } catch (err) {
            toast.error("Invalid");
        }
    };


    return (
        <Container className="d-flex justify-content-center mt-5">
            <Form onSubmit={submitHandler} className="w-25">
                <h4 className='text-center my-3'>LOGIN </h4>
                <FloatingLabel controlId="email" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FloatingLabel>

                <Button type="Submit" variant="primary" className="mt-3">
                    Sign in
                </Button>

                <Row className="mt-3">
                    <Col>
                        <Form.Text className="text-muted">
                            Don't have an account? <Link to='/register'>Register</Link>
                        </Form.Text>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default LoginPage;
