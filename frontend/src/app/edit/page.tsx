'use client';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from 'react';
import HeaderComponent from '~/components/header_component';

export default function EditProfile() {
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [avatar, setAvatar] = useState('/images/avatar.jpeg');
  const [password, setPassword] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
      setNewAvatar(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Thông tin mới:', {
      fullName,
      email,
      avatar: newAvatar ? newAvatar : avatar,
      password,
    });
  };
  const [hoveringAvatar, setHoveringAvatar] = useState(false);

  const handleAvatarHover = () => {
    setHoveringAvatar(true);
  };

  const handleAvatarLeave = () => {
    setHoveringAvatar(false);
  };

  const handlePasswordConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChangeConfirmation = () => {
    if (password === confirmPassword) {
      setShowConfirmation(false);
      setPassword(confirmPassword);
      setEditingPassword(false);
      alert('Thay đổi mật khẩu thành công.');
    } else {
      alert('Mật khẩu không khớp. Vui lòng nhập lại.');
      setConfirmPassword('');
    }
  };

  return (
    <div>
      <div>
        <HeaderComponent></HeaderComponent>
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Thông tin người dùng</h2>
          <div className="mb-4 bg-gray-200 rounded p-4 flex flex-col">
            <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
              Họ và tên
            </label>
            {editingName ? (
              <div className="w-full">
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={handleFullNameChange}
                  className="w-9/12 border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Họ và tên"
                />
                <button
                  onClick={() => setEditingName(false)}
                  className="mt-2 ml-7 self-end bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
                >
                  Lưu
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p>{fullName}</p>
                <button
                  onClick={() => setEditingName(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
                >
                  Chỉnh sửa
                </button>
              </div>
            )}
          </div>
          <div className="mb-4 bg-gray-200 rounded p-4 flex flex-col relative">
            <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">
              Ảnh đại diện
            </label>
            <div
              className="relative flex justify-center items-center"
              onMouseEnter={handleAvatarHover}
              onMouseLeave={handleAvatarLeave}
            >
              <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              <img src={avatar} alt="Avatar" className="rounded-full h-20 w-20 object-cover cursor-pointer" />
              {hoveringAvatar && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <label htmlFor="avatar" className="cursor-pointer">
                    <AddAPhotoIcon fontSize="large" style={{ opacity: '0.5' }} />
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4 bg-gray-200 rounded p-4 flex flex-col">
            <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <p>{email}</p>
          </div>
          <div className="mb-4 bg-gray-200 rounded p-4 flex flex-col">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Mật khẩu
            </label>
            {editingPassword ? (
              <div className="w-full">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-9/12 border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="********"
                />
                <button
                  onClick={handlePasswordConfirmation}
                  className="mt-2 ml-7 self-end bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
                >
                  Lưu
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p>********</p>
                <button
                  onClick={() => setEditingPassword(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
                >
                  Chỉnh sửa
                </button>
              </div>
            )}
          </div>

          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Xác nhận thay đổi mật khẩu</h2>
                <p>Bạn có chắc chắn muốn thay đổi mật khẩu không?</p>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500 mt-4"
                  placeholder="Nhập lại mật khẩu mới"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handlePasswordChangeConfirmation}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
