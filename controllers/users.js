const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(
  "950300558921-v0hvpv7gip2l7id0meges0vspnatlaj9.apps.googleusercontent.com",
  "IbolUUXkvrnsNI3C6q0DJZ4X"
);

exports.getAll = async (req, res, next) => {
  try {
    const user = await User.find()
    return res.status(200).send(users)
  } catch (error) {
    res.status(400)
    next(error)
  }
}
exports.verifyGoogleToken = async (req, res, next) => {
  const { idToken } = req.body;
  try {
    const response = await client.verifyIdToken({ idToken });
    const { payload: { sub: googleId, email, name: userName, picture: avatar } } = response;
    req.payload = { googleId, email, userName, avatar }
    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
exports.googleLogin = async (req, res, next) => {
  const { payload: { googleId, userName, email, avatar } } = req
  let user = null
  try {
    user = await User.findOne({ googleId });
    if (!user) {
      user = await new User({ userName, email, googleId, avatar }).save();
    }
    req.user = user
    return next();
  } catch (error) {
    return res.sendStatus(400)
  }
}
exports.registerToken = async (req, res) => {
  const { user: { _id, userName, email, avatar } } = req
  try {
    const token = await jwt.sign({ user: _id }, 'MYSECRET', { algorithm: 'HS256', expiresIn: 36000 });
    res.cookie('token', token, {
      maxAge: 36000000000,
      httpOnly: true,
    })
    return res.status(200).send({
      user: { userName, email, _id, avatar },
      token
    })
  } catch (error) {
    return res.sendStatus(400)
  }
}
exports.verifyToken = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.sendStatus(403);
  }
  console.log(token)
  try {
    const authData = await jwt.verify(token, 'MYSECRET');
    if (authData) {
      req.params.userId = authData.user
      return next();
    }
    return res.sendStatus(403);
  } catch (error) {
    if (error && error.name === 'TokenExpiredError') {
      return res.sendStatus(403);
    }
    return res.sendStatus(400);
  }
}
exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  console.log(req.cookies.token)
  try {
    const user = await User.findById(userId)

    if (user) {
      return res.status(200).send(user);
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(400);
  }
}
exports.editName = async (req, res) => {
  const { params: { userId }, body: { newName } } = req
  try {
    const user = await User.updateOne({ _id: userId }, { userName: newName })
    if (!user) {
      return res.sendStatus(404)
    }
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(400)
  }
}
exports.deleteUser = async (req, res) => {
  const { userId } = req.params
  try {
    const deletedUser = await User.deleteOne({ _id: userId })
    if (!deletedUser) {
      return res.sendStatus(404)
    }
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(400)
  }
}