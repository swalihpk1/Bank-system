import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Home = () => {

    const { userInfo } = useSelector((state) => state.auth);

    console.log("account",userInfo)



    // const fetchAccountBalance = async (username) => {
    //     try {
    //         const response = await fetch(`/api/accountBalance/${username}`);
    //         const data = await response.json();
    //         console.log("data",data);
    //         setAccountBalance(data.accountBalance);
    //     } catch (error) {
    //         console.error('Error fetching account balance:', error);
    //     }
    // };

    return (
        <div className='py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>Welcome to ABC bank</h1>
             
                    {!userInfo && <p>Please login to your account..!</p>}
                    {userInfo && <h2>Account balance: {userInfo.balance}</h2>}


                    {userInfo && (
                        <div className='d-flex'>
                            <LinkContainer to='/login'>
                                <Button variant='primary' className='me-3'>
                                    Deposit
                                </Button>
                            </LinkContainer>
                            <LinkContainer to='/register'>
                                <Button variant='secondary'>
                                    Withdraw
                                </Button>
                            </LinkContainer>
                        </div>
                    )}
                </Card>
            </Container>
        </div>
    );
};

export default Home;
