import ratelimit from "../repository/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // limit-key used, no login or user id for now
    const { success } = await ratelimit.limit("limit-key");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many request, please try again later" });
    }

    next();
  } catch (error) {
    console.log("Rate Limit Error", error);
    next(error);
  }
};

export default rateLimiter;
