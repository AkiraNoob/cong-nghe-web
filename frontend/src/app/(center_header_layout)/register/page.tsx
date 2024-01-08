'use client';
import Link from 'next/link';
import RegisterForm from './_contents.tsx/RegisterForm';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 gap-2 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Đăng kí tài khoản
          </h2>
          <RegisterForm />
          <div className="text-sm font-light text-gray-500 dark:text-gray-400">
            Đã có tài khoản?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
      <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" href={'/'}>
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default SignUp;
