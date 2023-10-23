import { useForm, useWatch } from "react-hook-form";
import '../style/style.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../features/auth/authApi";

const EmployerRegistration = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { user: { email } } = state.auth;

    const [addUser, result] = useRegisterMutation();
    const { isLoading, isSuccess, isError, error } = result;


    const { handleSubmit, register, reset, control } = useForm({ defaultValues: { email } });
    const term = useWatch({ control, name: "term" });

    const businessCategory = [
        "Automotive",
        "Business Support & Supplies",
        "Computers & Electronics",
        "Construction & Contractors",
        "Design Agency",
        "Education",
        "Entertainment",
        "Food & Dining",
        "Health & Medicine",
        "Home & Garden",
        "IT Farm",
        "Legal & Financial",
        "Manufacturing, Wholesale, Distribution",
        "Merchants (Retail)",
        "Miscellaneous",
        "Personal Care & Services",
        "Real Estate",
        "Travel & Transportation",
    ];

    const employeeRange = ["1 - 10", "11 - 50", "51 - 100", "Above 100"];

    useEffect(() => {
        if (isLoading) {
            toast.loading("Processing", { id: "addUser" })
        }
        if (isError) {
            toast.error(error.status, { id: "addUser" })
        }
        if (isSuccess) {
            toast.success("Added Successfully", { id: "addUser" })
            reset();
        }
    }, [isLoading, isError, isSuccess, error, reset])

    const onSubmit = (data) => {
        const user = { ...data, role: "employer" };
        // console.log(user);
        dispatch(addUser(user));
    };
    return (
        <div>
            <div className='flex justify-center items-center overflow-auto p-10'>
                <form className='shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between candidate_form'
                    onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='w-full text-xl font-bold underline mb-5'>Employer</h1>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='firstName'>
                            First Name
                        </label>
                        <input type='text' className="px-4 py-1 rounded" id='firstName' {...register("firstName", { required: true })} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='lastName'>
                            Last Name
                        </label>
                        <input type='text' className="px-4 py-1 rounded" id='lastName' {...register("lastName", { required: true })} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input type='email' className="px-4 py-1 rounded cursor-not-allowed" readOnly id='email' {...register("email")} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <h1 className='mb-3'>Gender</h1>
                        <div className='flex gap-3'>
                            <div>
                                <input type='radio' id='male'{...register("gender", { required: true })} value='male' />
                                <label className='ml-2 text-lg' htmlFor='male'>
                                    Male
                                </label>
                            </div>
                            <div>
                                <input type='radio' id='female'{...register("gender", { required: true })} value='female' />
                                <label className='ml-2 text-lg' htmlFor='female'>
                                    Female
                                </label>
                            </div>
                            <div>
                                <input type='radio' id='other'{...register("gender", { required: true })} value='other' />
                                <label className='ml-2 text-lg' htmlFor='other'>
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr className='w-full mt-2 bg-black' />
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='companyName'>
                            Company name
                        </label>
                        <input type='text' className="px-4 py-1 rounded" {...register("companyName", { required: true })} id='companyName' />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-3' htmlFor='employeeRange'>
                            Number of employee
                        </label>
                        <select {...register("employeeRange", { required: true })} id='employeeRange' className="px-4 py-1 rounded">
                            {employeeRange
                                .sort((a, b) => a.localeCompare(b))
                                .map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                        </select>
                    </div>

                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-3' htmlFor='companyCategory'>
                            Company Category
                        </label>
                        <select {...register("companyCategory", { required: true })} id='companyCategory' className="px-4 py-1 rounded">
                            {businessCategory
                                .sort((a, b) => a.localeCompare(b))
                                .map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                        </select>
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='roleInCompany'>
                            Your role in company
                        </label>
                        <input type='text' className="px-4 py-1 rounded"   {...register("roleInCompany", { required: true })} id='roleInCompany' />
                    </div>

                    <div className='flex justify-between items-center w-full mt-3'>
                        <div className='flex  w-full max-w-xs'>
                            <input className='mr-3' type='checkbox'  {...register("term")} id='terms' />
                            <label htmlFor='terms'>I agree to terms and conditions</label>
                        </div>
                        <button disabled={!term} className='btn' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployerRegistration;