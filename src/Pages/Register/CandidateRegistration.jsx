import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import '../style/style.css';
const CandidateRegistration = () => {
    const [countries, setCountries] = useState([]);
    const { handleSubmit, register, control } = useForm();
    const term = useWatch({ control, name: "term" });

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => setCountries(data));
    }, []);

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div>
            <div className='flex justify-center items-center overflow-auto p-10'>
                <form className='shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between candidate_form' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='w-full text-xl font-bold underline mb-5'>Candidate</h1>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='firstName'>
                            First Name
                        </label>
                        <input type='text' id='firstName' {...register("firstName")} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='lastName'>
                            Last Name
                        </label>
                        <input type='text' id='lastName' {...register("lastName")} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input type='email' id='email' {...register("email")} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <h1 className='mb-3'>Gender</h1>
                        <div className='flex gap-3'>
                            <div>
                                <input type='radio' id='male' {...register("gender")} value='male' />
                                <label className='ml-2 text-lg' htmlFor='male'>
                                    Male
                                </label>
                            </div>
                            <div>
                                <input type='radio' id='female'{...register("gender")} value='female' />
                                <label className='ml-2 text-lg' htmlFor='female'>
                                    Female
                                </label>
                            </div>
                            <div>
                                <input type='radio' id='other'{...register("gender")} value='other' />
                                <label className='ml-2 text-lg' htmlFor='other'>
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr className='w-full mt-2 bg-black' />
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-3' htmlFor='country'>
                            Country
                        </label>
                        <select {...register("country")} id='country'>
                            {countries
                                .sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common))
                                .map(({ name }, index) => (
                                    <option key={index} value={name.common}>{name.common}</option>
                                ))}
                        </select>
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='address'>
                            Street Address
                        </label>
                        <input type='text' {...register("address")} id='address' />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='city'>
                            City
                        </label>
                        <input type='text' {...register("city")} id='city' />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='postcode'>
                            Postal Code
                        </label>
                        <input type='text' {...register("postcode")} id='postcode' />
                    </div>

                    <div className='flex justify-between items-center w-full mt-3'>
                        <div className='flex  w-full max-w-xs'>
                            <input
                                className='mr-3'
                                type='checkbox'
                                {...register("term")}
                                id='terms'
                            />
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

export default CandidateRegistration;