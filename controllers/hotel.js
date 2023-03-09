import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//creating the hotel and saving it in the database
export const createHotel = async (req, res, next) => {
  try {
    const {name, type, city, address, distance,title,desc,cheapestPrice} = req.body
    if(!req.body){
      return res.status(400).json({
        success: false,
        message: "Provide valid details"
      })
    }
    const newHotel = await Hotel.create({name, type, city, address, distance,title,desc,cheapestPrice});
    return res.status(200).json(newHotel);
  } catch (err) {
    next(err);
  }
};

// updating the hotel 
export const updateHotel = async (req, res, next) => {
  try {
    const {name} = req.body
    if(!name){
      return res.status(400).json({
        success: false,
        message: "Please add name"
      })
    }
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: {name} },
      { new: true }
    );
    return res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};


// deleting the hotel
export const deleteHotel = async (req, res, next) => {
  try {
    const {name} = req.body
    if(!name){
      return res.status(400).json({
        success: false,
        message: "Please add name"
      })
    }
    await Hotel.findOneAndUpdate({name}, {$set:{isDeleted:true}});
    return res.status(200).json({
      success: true,
      message: "Hotel has been updated."
    });
  } catch (err) {
    next(err);
  }
};

// get only one hotel through the Id
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    return res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// get all the hotels
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    return res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

//count by city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

//count by type using the countDocuments
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    return res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// get hotel rooms by the Id
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    return res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
