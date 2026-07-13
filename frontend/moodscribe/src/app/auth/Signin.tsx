import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-transparent.png';
import { Link } from 'react-router-dom';
import { SigninValues } from '../../utils/types';
import InputField from '../../components/CustomInputField';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { clearSigninState, signin } from '../../redux/auth/features';
import { toast } from 'sonner';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .required('Enter your email address'),
  password: Yup.string()
    .required('Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
      'Password should contain 8 or more characters, at least a symbol, number, uppercase & lower case letters',
    ),
});

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { success, token } = useAppSelector((state: RootState) => state.signin);
  const toastId = 'Sonner';

  useEffect(() => {
    if (success) {
      toast.success('Login successfull', { id: toastId });
    }

    setTimeout(() => {
      if (token) navigate('/dashboard');
    }, 500);
  }, [navigate, success, toastId, token]);

  useEffect(() => {
    return () => {
      dispatch(clearSigninState());
    };
  }, [dispatch]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    control,
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SigninValues> = (data: SigninValues, e) => {
    e?.preventDefault();
    dispatch(signin(data));
    success && reset();
  };
  return (
    <div className='fixed right-0 left-0 h-screen bg-bg-100 bg-opacity-60 p-3'>
      <Link to='/'>
        <img src={logo} alt='Moodscribe logo' />
      </Link>
      <section className='flex justify-center items-center h-full'>
        <div className='w-full max-w-lg max-h-[640px] bg-bg-800 sm:p-14 p-10 shadow-xl shadow-stone-500 overflow-y-scroll'>
          <h1 className='text-gray-400 text-lg text-center mb-14'>
            EXISTING ACCOUNT
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <InputField
              registration={{ ...register('email') }}
              type='text'
              control={control}
              valid={
                getValues('email') && !errors.email?.message ? 'success' : ''
              }
              errorMessage={errors.email?.message}
              label='EMAIL ADDRESS'
              labelClass='text-[#e7c1a3] mt-9'
              placeholder='Enter your email'
              isRequired
              className='bg-transparent border-b border-gray-400 mt-2'
            />
            <InputField
              registration={{ ...register('password') }}
              type={showPassword ? 'text' : 'password'}
              control={control}
              label='PASSWORD'
              labelClass='text-[#e7c1a3] mt-9'
              placeholder='Enter your password'
              valid={getValues('password') && !errors.password ? 'success' : ''}
              errorMessage={errors.password?.message}
              isRequired
              handleShowPassword={handleShowPassword}
              className='bg-transparent border-b  border-gray-400 mt-2'
            />
            <button
              type='submit'
              className='py-3 mb-5 mt-12 text-teal-100 font-semibold bg-slate-300 bg-opacity-50 hover:bg-cyan-500 hover:text-white w-full border rounded-3xl'
            >
              LOGIN
            </button>
          </form>
          <p className='text-gray-400 mt-2'>
            Don't have an account? {'  '}
            <Link
              to='/auth/signup'
              className='text-teal-100 hover:text-cyan-400 text-lg italic'
            >
              Signup
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Signin;
