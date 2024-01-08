'use client';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import useRegister from '~/hooks/auth/useRegister';

const RegisterForm = () => {
  const { mutate } = useRegister();
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password === confirmPassword) {
          mutate({
            password,
            email,
            fullName,
          });
        }
      }}
      className="space-y-4 md:space-y-6 flex flex-col"
    >
      <TextField
        label="Họ và tên"
        type="text"
        name="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        id="fullName"
        required // Removed the equal sign and value here
      />
      <TextField
        label="Email"
        type="email"
        name="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        required // Removed the equal sign and value here
      />
      <TextField
        label="Mật khẩu"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        required // Removed the equal sign and value here
      />
      <TextField
        label="Nhập lại mật khẩu"
        type="password"
        name="re-enter-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        id="re-enter-password"
        required // Removed the equal sign and value here
      />
      <Button variant="contained" type="submit">
        Đăng kí
      </Button>
    </form>
  );
};

export default RegisterForm;
