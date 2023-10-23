import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, googleLogin } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';
const SignUp = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { user: { email }, isLoading, isError, error
    } = state.auth;

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(value => !value);
    }
    const { register, handleSubmit, control } = useForm();
    const [disabledButton, setDisabledButton] = useState(true);
    const watchPassword = useWatch({ control, name: "password" });
    const watchConfirmPassword = useWatch({ control, name: "confirmPassword" });

    useEffect(() => {
        if (!isLoading && email) {
            navigate("/")
        }
    }, [isLoading, email, navigate])

    useEffect(() => {
        if (isError) {
            toast.error(error)
        }
    }, [isError, error])


    useEffect(() => {
        if (watchPassword !== undefined &&
            watchPassword !== "" &&
            watchConfirmPassword !== undefined &&
            watchConfirmPassword !== "" &&
            watchPassword === watchConfirmPassword
        ) {
            setDisabledButton(false);
        }
        else {
            setDisabledButton(true);
        }

    }, [watchConfirmPassword, setDisabledButton, watchPassword])

    const onSubmit = (data) => {
        // const user = { email: data.email, password: data.password };
        dispatch(createUser(data));
        // console.log(user)
        // reset();
    }
    return (
        <div className="flex justify-center items-center mt-12">
            <section className="w-3/5 flex justify-between">
                <div className="w-2/5 px-6 py-8 bg-white form_container">
                    <h2 className="text-left text-2xl font-bold">Sign Up</h2>
                    <div className="text-left flex">
                        <p className="font-bold text-gray-500"><small>Already have an account yet?</small></p>
                        <Link to="/login" className="font-bold text-violet-600 underline mx-2">
                            <small>Login</small>
                        </Link>
                    </div>
                    <form action="" className="mt-2" onSubmit={handleSubmit(onSubmit)}>
                        {/* -----Email Field----- */}
                        <div>
                            <label className="label label-text font-bold">Email Address</label>
                            <input type="text" placeholder="you@example.com" className="input input-bordered border-2 w-full mb-2" {...register("email", { required: true })} />
                        </div>

                        {/* -----Password Field----- */}
                        <div>
                            <label className="label label-text font-bold">Password</label>
                            <input type={showPassword ? "text" : "password"} placeholder="********" className="input input-bordered border-2 w-full mb-2" {...register("password")} />
                        </div>

                        {/* -----Confirm Password Field----- */}
                        <div>
                            <label className="label label-text font-bold">Confirm Password</label>
                            <input type={showPassword ? "text" : "password"} placeholder="********" className="input input-bordered border-2 w-full mb-2" {...register("confirmPassword")} />
                        </div>

                        {/* -----Show Password----- */}
                        <div className='flex items-center my-4'>
                            <input type="checkbox" className="checkbox checkbox-primary mr-2" onClick={handleShowPassword} />
                            <label className="font-bold text-gray-500">Show Password</label>
                        </div>

                        {/* -----Submit Button----- */}
                        <input type="submit" value="Sign Up" className="w-full btn text-white bg-violet-600 hover:bg-violet-800" disabled={disabledButton} />
                    </form>

                    {/* -----OR Divider----- */}
                    <div className='flex justify-center items-center my-2'>
                        <div className="divider bg-gray-300 w-2/6 h-0.5 rounded-lg"></div>
                        <h5 className='mx-2 text-gray-300 font-bold'>OR</h5>
                        <div className="divider bg-gray-300 w-2/6 h-0.5 rounded-lg"></div>

                    </div>

                    {/* -----Google Button----- */}
                    <div className='flex justify-center items-center btn  border-2 bg-white border-orange-400 hover:bg-gray-100 hover:border-orange-600'>
                        <button className="flex justify-center items-center w-full py-2" onClick={() => dispatch(googleLogin())}>
                            <img className='w-6 h-6 mr-4' src="https://i.ibb.co/vcHZKPm/google-logo.png" alt="google_logo" />
                            <p className='m-0 text-orange-500 font-bold'>Google</p>
                        </button>
                    </div>
                </div>

                <div className="w-2/5 flex justify-center items-center">
                    <img src="https://i.ibb.co/N7Chg6v/login-anime.jpg" alt="login_image" />
                </div>
            </section>
        </div>
    );
};

export default SignUp;