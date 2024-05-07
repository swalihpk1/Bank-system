import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from '../../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from "../../slices/authSlice";
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await register({ name, email, password, location, phone }).unwrap();
                dispatch(setCredentials(...res));
                console.log("3")

                navigate('/');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Form onSubmit={submitHandler} className="w-25">
                <h4 className='text-center my-3'>SIGN UP </h4>
                <FloatingLabel controlId="name" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="john" value={name} onChange={(e) => setName(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel controlId="Phone" label="Phone " className="mb-3">
                    <Form.Control type="number" placeholder="" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel controlId="email" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel controlId="Password" label="Confirm password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel controlId="location" label="Location" className="mb-3">
                    <Form.Control type="text" placeholder="" value={location} onChange={(e) => setLocation(e.target.value)} />
                </FloatingLabel>

                <Button type='Submit' variant='primary' className='mt-3 '>
                    Register
                </Button>

                <Row className="mt-3">
                    <Col>
                        <Form.Text className="text-muted">
                            Already have an account? <Link to='/login'>Login</Link>
                        </Form.Text>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default RegisterPage;
