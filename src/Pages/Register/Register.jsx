import { useNavigate, useParams } from "react-router-dom";
import candidate from "../../assets/candidate.svg";
import employee from "../../assets/Employee.png"
import CandidateRegistration from "./CandidateRegistration";
import EmployerRegistration from "./EmployerRegistration";
const Register = () => {
    const navigate = useNavigate();
    const { type } = useParams();
    if (type === "candidate") {
        return <CandidateRegistration />;
    }

    if (type === "employer") {
        return <EmployerRegistration />;
    }
    return (
        <div>
            <h1 className='text-center my-8 text-2xl'>Continue as...</h1>
            <div className="w-4/5 mx-auto flex justify-between">
                <div className="w-1/2 transition-all hover:scale-105" onClick={() => navigate("/register/candidate")}>
                    <div className="flex justify-center">
                        <img className="border" src={candidate} width={400} alt='candidate_img' />
                    </div>
                    <p className='text-center text-xl font-bold my-1'>Candidate</p>
                </div>

                <div className="w-1/2 transition-all hover:scale-105" onClick={() => navigate("/register/employer")}>
                    <div className="flex justify-center">
                        <img className="border" src={employee} width={400} alt='employee_img' />
                    </div>
                    <p className='text-center text-xl font-bold my-1'>Employer</p>
                </div>
            </div>
        </div>
    );
};

export default Register;