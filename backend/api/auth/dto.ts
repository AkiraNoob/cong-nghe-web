import mongoose from 'mongoose';

// User Config
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
});

export const UserModel = mongoose.model('users', UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByUserName = (username: string) => UserModel.findOne({ username });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
