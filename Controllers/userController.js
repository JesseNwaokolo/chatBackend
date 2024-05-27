const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json("User already exists with email ");
    if (!name || !email || !password)
      return res.status(400).json("All fields are required");
    if (!validator.isEmail(email))
      return res.status(400).json("Email must be a valid email ");
    if (!validator.isStrongPassword(password))
      return res.status(400).json("Password must be a strong password ");

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json("invalid email or password");
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json("invalid email or password");
    const token = createToken(user.id);

    res.status(200).json({ _id: user._id, name : user.name, email, token });
  } catch (err) {
    console.log(err);
  }
};

const findUser = async (req, res)=>{
  const userId = req.params.userId;
  try{
    const user = await userModel.findById(userId)
    res.status(200).json(user)
  } catch(err){
    console.log(err)
  }
}

const getUsers = async (req, res)=>{
  try{
    const user = await userModel.find()
    res.send("user1")
  } catch(err){
    console.log(err)
  }
}

module.exports = { registerUser, loginUser, findUser, getUsers };
