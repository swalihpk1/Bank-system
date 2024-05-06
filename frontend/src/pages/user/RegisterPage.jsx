import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from '../../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from "../../slices/authSlice";


const RegisterPage = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }))
                navigate('/')
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Form className="w-25">
                <h4 className='text-center my-3'>SIGN UP </h4>
                <FloatingLabel controlId="name" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="john" />
                </FloatingLabel>

                <FloatingLabel controlId="Phone" label="Phone " className="mb-3">
                    <Form.Control type="number" placeholder="" />
                </FloatingLabel>

                <FloatingLabel controlId="email" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="text" placeholder="Password" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Confirm password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>

                <FloatingLabel controlId="location" label="Location" className="mb-3">
                    <Form.Control type="text" placeholder="" />
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
