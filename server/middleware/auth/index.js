/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { Authenticate, EmployeeContact, User } = require("../../models/index/index");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      errors: { common: { msg: "Access Denied: No token provided" } },
    });
  }

  try {
    const tokenDetails = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    let employeeDetails, firstName, lastName;
    if (tokenDetails.user.employeeId) {
      employeeDetails = await EmployeeContact.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(tokenDetails.user.employeeId),
          },
        },
      ]);
      firstName = employeeDetails[0].fullName.split(" ")[0];
      lastName = employeeDetails[0].fullName.split(" ")[1]
        ? employeeDetails[0].fullName.split(" ")[1]
        : "";

      req.user = {
        ...tokenDetails,
        firstName: firstName,
        lastName: lastName,
        email: employeeDetails[0].email,
        phone: employeeDetails[0].phone,
        location: employeeDetails[0].location,
      };
      next();
    } else {
      userDetails = await Authenticate.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(tokenDetails._id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "userId",
            as: "user",
          },
        },
      ]);

      const userOrgDetails = await User.findOne({ _id: userDetails[0].user[0]._id }).populate(
        "organizations",
        ["name", "email", "url"]
      );

      const { organization_id, location_id } = req.headers;

      if (organization_id) {
        const orgIds = userOrgDetails.organizations.map((o) => o._id.toString());
        if (orgIds.indexOf(organization_id.toString()) < 0) {
          return res.status(403).json({
            errors: { common: { msg: "Access Denied: You are not a part of this organization" } },
          });
        }
      }

      if (location_id) {
        if (userOrgDetails.locations) {
          const locationIds = userOrgDetails?.locations?.map((l) => l._id.toString());
          if (locationIds.indexOf(location_id.toString()) < 0) {
            return res.status(403).json({
              errors: {
                common: { msg: "Access Denied: You are not a part of this organization location" },
              },
            });
          }
        }
      }

      req.user = {
        ...tokenDetails,
        firstName: userDetails[0].user[0].firstName,
        lastName: userDetails[0].user[0].lastName,
        email: userDetails[0].email,
        phone: userDetails[0].phone,
        userType: userDetails[0].userType || "user",
        location: userDetails[0].location,
        organizations: userOrgDetails.organizations || [],
        // organization: {
        //   id: userOrgDetails?.organizationId?._id || null,
        //   name: userOrgDetails?.organizationId?.name || null,
        //   path: userOrgDetails?.organizationId?.path || null,
        //   url: userOrgDetails?.organizationId?.url || null,
        // },
        // role: userDetails[0].user[0].role,
      };
      next();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
   // console.log(err);
    return res.status(403).json({
      errors: { common: { msg: "Access Denied: Invalid token" } },
    });
  }
};
