import LoginForm from "./loginform";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 sm:h-[650px]">
      <div className="bg-white w-full  border border-gray-300 rounded-2xl flex flex-col sm:flex-row  sm:w-2/3">
        <div className="bg-gray-200 sm:w-4/5 flex justify-center items-center">
          <img src="/background.png" alt="Background" className="max-w-full h-auto" />
        </div>
        <div className="w-full ">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
