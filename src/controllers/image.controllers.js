import Image from "../models/image.models.js";

export const getImages = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  const query = req.query.new;
  try {
    const image = query
      ? await Image.find().sort({ _id: -1 })
      : await Image.find();
    if (!image) {
      const response = res.status(403).json({
        status: "fail",
        message: "Image not found",
      });
      return response;
    }
    const response = res.status(200).json({
      status: "success",
      data: image,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: "fail",
      message: err.message,
    });
    return response;
  }
};

export const deleteImage = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  const { id } = req.params;
  try {
    const image = await Image.findByIdAndDelete(id.replace(":", ""));
    if (!image) {
      const response = res.status(403).json({
        status: "fail",
        message: "image not found",
      });
      return response;
    }
    const response = res.status(200).json({
      status: "success",
      message: "image has been deleted",
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: "fail",
      message: err.message,
    });
    return response;
  }
};

export const getImageById = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  console.log("OK HERE");
  const { id } = req.params;
  try {
    const image = await Image.findById(id.replace(":", ""));
    if (!image) {
      const response = res.status(403).json({
        status: "fail",
        message: "image not found",
      });
      return response;
    }
    const response = res.status(200).json({
      status: "success",
      data: image,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: "fail",
      message: err.message,
    });
    return response;
  }
};

export const insertImage = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
    const title = req.body["title"];
    const desc = req.body["desc"];
    const imgSrc = req.body["imgSrc"];
    const imgId = req.body["imgId"];
    console.log("1:",title,"2:",desc,"3:",imgSrc,"4:",imgId)
    try {
    const image = new Image({
      title,
      desc,
      imgSrc,
      imgId,
    });
    const result = await image.save();
    const response = res.status(200).json({
      status: "success",
      data: result,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: "failed",
      message: "failed to insert image" + err.message,
    });
    return response;
  }
};
