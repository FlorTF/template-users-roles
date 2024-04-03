import {User} from '../models/User'
import {Role} from '../models/Role'

export const createUser = async (req, res) => {

    try {
        const {username, email, password} = req.body;
        //console.log(req.Role._id)
        const newUser = await User.create({
          username, 
          email, 
          password,
          //RoleId: req.Role._id
        });
        res.json(newUser);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

}

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
          attributes: ["_id", "username", "email", "password"/*, "RoleId"*/],
          order: [["_id", "DESC"]],
          //where: {RoleId: req.Role._id}
        })
        res.json(users);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

}

export const getUserById = async (req, res) => {
    const { _id } = req.params;
    
  try {
    const user = await User.findOne({
      where: { _id },
      attributes: ["_id", "username", "email", "password", "RoleId"],
    });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const updateUserById = async (req, res) => {
    const { _id } = req.params;
  try {
    
    const user = await User.findOne({
      attributes: ["_id", "username", "email", "password"],
      where: { _id },
    });

    user.set(req.body);

    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const deleteUserById = async (req, res) => {
    const { _id } = req.params;
    try {
      await User.destroy({
        where: { _id },
      });
  
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}