'use client';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import useLogin from '~/hooks/auth/useLogin';

const LoginForm = () => {
  const { mutate } = useLogin();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(),
          mutate({
            password,
            email,
          });
      }}
      className="space-y-4 md:space-y-6 flex flex-col"
    >
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
      <Button variant="contained" type="submit">
        Đăng nhập
      </Button>
    </form>
  );
};

export default LoginForm;
