import jwt from "jsonwebtoken";

// eslint-disable-next-line consistent-return
export const auth = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      const decodedData = jwt.verify(token, process.env.JWT_SEC);
      // console.log(decodedData?.isAdmin);
      req.user = {
        id: decodedData?.id,
        isAdmin: decodedData?.isAdmin,
      }; // Store the user object in req.user
      next();
    } catch (err) {
      const response = res.status(400).json({
        status: "fail",
        message: "Authentication failed. Check auth token.",
      });
      return response;
    }
  }else{
    return res.status(401).json({
      status: "fail",
      message: "Authentication token missing.",
    });
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  console.log("OK!");
  // eslint-disable-next-line consistent-return
  auth(req, res, () => {
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
      console.log("OK2!");
      next();
    } else {
      const response = res.status(403).json({
        status: "fail",
        message: "Authentication failed. Check auth token test.",
      });
      return response;
    }
  });
};

export const verifyTokenAdmin = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  auth(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      const response = res.status(403).json({
        status: "fail",
        message: "Authentication failed. Check auth token test.",
      });
      return response;
    }
  });
};
