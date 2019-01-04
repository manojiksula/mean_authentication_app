import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

//Import Secret Key
import { SecretOrKey } from "./keys";

//Import User Model
import User from "../models/userSchema";

export default function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = SecretOrKey;

  passport.use(new Strategy(opts, (jwt_payload, done) => {
    //console.log(jwt_payload);
    User.findOne({_id: jwt_payload.user._id}, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
