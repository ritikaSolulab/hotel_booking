import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// create the room
export const createRoom = async (req, res, next) => {
  try {
  const hotelId = req.params;
  if(!hotelId){
    return res.status(400).json({message: 'hotel id not found'});
  }
  const {title,desc,price,maxPeople,roomNumbers} = req.body
  const newRoom = await Room.create({title,desc,price,maxPeople,roomNumbers});
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: newRoom._id },
      });
    } catch (err) {
      next(err);
    }
    return res.status(200).json(newRoom);
  } catch (err) {
    next(err);
  }
};

// update the room
export const updateRoom = async (req, res, next) => {
  try {
    const {title, price, maxPeople, desc} = req.body
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: {title, price, maxPeople, desc} },
      { new: true }
    );
    return res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// update the room availabilty
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    return res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

// delete the room by room id
export const deleteRoom = async(req,res,next) => {
  try {
    const {title} = req.body
    if(!title){
      return res.status(400).json({
        success: false,
        message: "title not found"
      })
    }
    await Room.findOneAndUpdate({title}, {$set:{isDeleted:true}});
    return res.status(200).json({
      success: true,
      message: 'Room has been updated.'
    });
  } catch (err) {
    next(err);
  }
}

// get the single room by providing the room id
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    return res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};


// get all rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
