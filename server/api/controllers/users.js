const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const User = require('../models/user');
exports.signup = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: 'Mail Exist!'
            });
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created!'
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
                };
            });
        }
    });
}

exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }else{
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {

                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }

                if(result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    "" + process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                    
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        displayName: user[0].firstName,
                        userId: user[0]._id
                    });
                }

                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.resetPass = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(404).json({
                message: "User with email '" + email + "' does not exist!"
            });
        }else{            
            const token = jwt.sign({
                email: user[0].email,
                userId: user[0]._id
            }, 
            "" + process.env.JWT_KEY,
            {
                expiresIn: "1h"
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                auth: {
                    user: process.env.APP_EMAIL,
                    pass: process.env.APP_PASS,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const mailOptions = {
                from: "parents.assistant.service@gmail.com",
                to: `${user[0].email}`,
                subject: "Link to reset password!",
                text: `Here is the link to reset your password: \n\n` +
                    `http://localhost:3000/updatePass/${token} \n\n` +
                    `If you did not request this, please ignore this email !!!`
            }

            transporter.sendMail(mailOptions, (err, response) => {
                if(err){
                    console.log("Error sending email: " + err);
                }else{
                    res.status(200).json({ message: "Recovery email sent! Please check your email" })
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.updatePass = (req, res, next) => {
    const email = req.userData.email;
    const pass = req.body.pass;

    bcrypt.hash(pass, 10, function(err, hash) {
        if(err){
            return res.status(500).json({
                error: err
            });
        }else{
            User.updateOne({ email: email }, {$set: { "password": hash }})
            .exec()
            .then(data => {
                if(data.nModified === 1){
                    res.status(200).json({
                        message: 'Password Updated!'
                    });
                }
            })
            .catch(e => {
                return res.status(404).json({
                    message: 'User with email "'+ email +'" not found!'
                });
            })
        };
    });
}

exports.delete_one = (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted !'
        });
    })
    .catch(err => {
        res.status(404).json({
            error: err
        });
    });
}