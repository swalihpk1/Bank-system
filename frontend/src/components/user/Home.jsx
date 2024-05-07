import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useDepositeMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Home = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [showDeposit, setShowDeposit] = useState(false);
    const [amount, setAmount] = useState('');

    const dispatch = useDispatch();
    const [depositeAction] = useDepositeMutation();

    useEffect(() => {
        
    },[userInfo])


    const handleDeposit = () => {
        setShowDeposit(true);   
    }

    const handleConfirmDeposit = async () => {
        const res = await depositeAction({ email: userInfo.email, balance: userInfo.balance }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Amount deposited")
        setAmount('');
        setShowDeposit(false);
    }

    return (
        <div className='py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>Welcome to ABC bank</h1>
                    {!userInfo && <p>Please login to your account..!</p>}
                    {userInfo && <h2>Account balance: {userInfo.balance}</h2>}
                </Card>
            </Container>
            {userInfo && (
                <div className='d-flex justify-content-center mt-4'>
                    <Button variant='primary' onClick={handleDeposit} className='me-3'>
                        Deposit
                    </Button>
                    <Button variant='secondary'>Withdraw</Button>
                </div>
            )}
            {showDeposit && (
                <Container className='mt-4'>
                    <Form className='w-50'>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                type='number'
                                placeholder='Enter amount'
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant='primary' onClick={handleConfirmDeposit}>
                            Confirm Deposit
                        </Button>
                    </Form>
                </Container>
            )}
        </div>
    );
}

export default Home;
