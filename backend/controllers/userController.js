import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config()

//@desc  Auth user/set token
//route  POST /users/auth
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id, 'userJwt');
        const response = {
            _id: user._id,
            name: user.name,
            email: user.email,
            balance: user.account.balance
        };


        res.status(201).json(response);
    } else {
        res.status(401);
        throw new Error('dcdcdcdcd');
    }
});

//@desc  Register  a new user
//route  POST /users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, location, password } = req.body

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const generateAccountNumber = () => {
        const min = 100000000000;
        const max = 999999999999;
        return String(Math.floor(Math.random() * (max - min + 1)) + min);
    };

    const accountNumber = generateAccountNumber();

    const user = await User.create({
        name,
        email,
        phone,
        location,
        password,
        account: {
            accountNumber,
            balance: 0.0
        }
    });



    if (user) {
        generateToken(res, user._id, 'userJwt')
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid user data')
    }
    // res.status(200).json({ message: 'User register' });
});

//@desc  logoutUser
//route  POST /users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('userJwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User Logged out' });
});

//@desc  deposite money
//route  POST /users/deposite
//@access Private
const deposteAmount = asyncHandler(async (req, res) => {

    const amountToDeposit = parseInt(req.body.amount);
    const { email } = req.body;


    console.log(typeof amountToDeposit);
    const updatedUser = await User.findOneAndUpdate(
        { email },
        {
            $inc: { 'account.balance': amountToDeposit },
            $push: {
                'account.transactionHistory': {
                    type: 'deposit',
                    amount: amountToDeposit,
                    direction: 'in',
                    transactionDate: new Date()
                }
            }
        },
    );


    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        balance: updatedUser.account.balance,
        transactionHistory: updatedUser.account.transactionHistory
    });

});


//@desc  withdraw money
//route  POST /users/withdraw
//@access Private
const withdrawAmount = asyncHandler(async (req, res) => {

    const { email, amount } = req.body;
    console.log(email, amount);
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (user.account.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
    }

    user.account.balance -= amount;

    user.account.transactionHistory.push({
        type: 'withdrawal',
        amount,
        direction: 'out',
        transactionDate: new Date()
    });

    await user.save();

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.account.balance,
        transactionHistory: user.account.transactionHistory
    });
});


//@desc  fetch balance
//route  POST /accountBalance/:username
//@access Private
const fetchBalance = asyncHandler(async (req, res) => {
    const { name } = req.params;
    const user = await User.findOne({ name });
    console.log(user)
    if (user) {
        res.json({ accountBalance: user.accountBalance });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


export {
    authUser,
    registerUser,
    deposteAmount,
    withdrawAmount,
    fetchBalance,
    logoutUser
}