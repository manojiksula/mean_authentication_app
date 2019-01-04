import express from "express";
import passport from "passport";

const router = express.Router();

//Get Dashboard
router.route('/dashboard').get(passport.authenticate('jwt', {session:false}), (req, res, next) => {
  return res.status(200).json(req.user);
});


export default router;