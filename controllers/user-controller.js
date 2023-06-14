const { BookModel, UserModel } = require("../models/models.js");

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  if (users.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No user found",
    });
  }
  return res.status(200).json({
    success: true,
    data: users,
  });
};

exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No User exists by the given id",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User found",
    data: user,
  });
};

exports.addNewUser = async (req, res) => {
  const { data } = req.body;
  const newUser = await UserModel.create(data);
  return res.status(201).json({
    succes: true,
    message: "User added:>",
    data: newUser,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.deleteOne({
    _id: id,
  });
  return res.status(200).json({
    succes: true,
    message: "Deleted User Successsfully",
    data: user,
  });
};

exports.UpdateUserById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedUserData = await UserModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        ...data,
      },
    },
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    data: updatedUserData,
  });
};

exports.getSubscriptionDetailsById = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found",
    });

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      // current date
      date = new Date();
    } else {
      // getting date on bacis of data variable
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  // Subscription expiration calculation
  // January 1, 1970, UTC. // milliseconds
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  console.log("Return Date ", returnDate);
  console.log("Current Date ", currentDate);
  console.log("Subscription Date ", subscriptionDate);
  console.log("Subscription expiry date", subscriptionExpiration);

  const data = {
    ...user._doc,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };

  res.status(200).json({
    success: true,
    data,
  });
};
