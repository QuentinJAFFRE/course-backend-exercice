import config from '../config'
import { UserModel } from '../resources/user/model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
	let email = req.email;
	let password = req.password;
	if (!password || !email) {
		res.status(400);
		res.write('You must enter an email and a password');
		res.end();
	}	
	res.status(200);
	let user = { id : email };
	let token = new newToken(user);
	res.write(token);
}

export const signin = async (req, res) => {}

export const protect = async (req, res, next) => {
  next()
}
