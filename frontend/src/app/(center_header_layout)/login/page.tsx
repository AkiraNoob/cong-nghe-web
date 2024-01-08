import Link from 'next/link';
import LoginForm from './_contents.tsx/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 gap-2 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Đăng nhập
          </h2>
          <LoginForm />
          <div className="text-sm font-light text-gray-500 dark:text-gray-400">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Đăng kí
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

export default Login;
