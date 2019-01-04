import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

//Import User Model
import User from "../models/userSchema";

//Import Secret Key
import { SecretOrKey } from "../config/keys";

const router = express.Router();

//Register User
router.route('/register').post((req, res, next) => {
  User
    .find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          success: false,
          message: `invalid email id...`
        });
      } else {
        User
          .find({username: req.body.username})
          .exec()
          .then(user => {
            if (user.length >= 1) {
              return res.status(409).json({
                success: false,
                message: `invalid username...`
              });
            } else {
              bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                  return res.status(500).json(err);
                } else {
                  bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                      return res.status(500).json(err);
                    } else {
                      let newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        username: req.body.username,
                        password: hash
                      });
                      return newUser
                        .save()
                        .then(user => {
                          return res.status(200).json({
                            success: true,
                            user: user
                          });
                        })
                        .catch(err => {
                          return res.status(500).json(err);
                        });
                    }
                  });
                }
              });
            }
          })
          .catch(err => {
            return res.status(500).json(err);
          });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});


//Authenticate User
router.route('/authenticate').post((req, res, next) => {
  User
    .findOne({username: req.body.username})
    .exec()
    .then(user => {
      if (!user) {
        return res.status(407).json({
          success: false,
          message: `user not found...`
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            if (isMatch) {
              let token = jwt.sign(
                {user},
                SecretOrKey,
                {
                  expiresIn: '1h'
                }
              );
              return res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
                user: {
                  name: user.name,
                  email: user.email,
                  username: user.username,
                  date: user.date
                }
              });
            }
            return res.status(407).json({
              success: false,
              message: `invalid password...`
            });
          }
        });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});


//Get Current User
router.route('/current').get(passport.authenticate('jwt',{session:false}), (req, res, next) => {
  return res.status(200).json({
    user: req.user
  });
});



export default router;