import express from "express";
import authRoute from "./auth.js";
import usersRoute from "./users.js";
import hotelsRoute from "./hotels.js";
import roomsRoute from "./rooms.js";
const router = express.Router();


router.use("/api/auth", authRoute);
router.use("/api/users", usersRoute);
router.use("/api/hotels", hotelsRoute);
router.use("/api/rooms", roomsRoute);


export default router;



