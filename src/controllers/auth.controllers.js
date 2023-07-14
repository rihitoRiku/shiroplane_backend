import cryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const registerUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { username, email, password } = req.body;
  try {
    const user = await User({
      username,
      email,
      password: cryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });
    await user.save();
    const response = res.status(200).json({
      status: 'success',
      data: user,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const logoutUser = async (req, res) => {
  const { token } = req.body;
  try {
    revokedTokens.push(token);
    const response = res.status(200).json({
      status:'logout success',
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
}

export const loginUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { username, password: passwordUser } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const response = res.status(401).json({
        status: 'fail',
        message: 'Wrong username!',
      });
      return response;
    }
    const hashedPassword = cryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC,
    );
    const passwordDecrypt = hashedPassword.toString(cryptoJS.enc.Utf8);
    if (passwordDecrypt !== passwordUser) {
      const response = res.status(401).json({
        status: 'fail',
        message: 'Wrong password!',
      });
      return response;
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: '1d' },
    );
    const { password, ...others } = user._doc;
    const response = res.status(200).json({
      status: 'success',
      data: { ...others, accessToken },
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};