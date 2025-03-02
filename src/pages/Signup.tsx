import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignupProps {
    users: { username: string; password: string }[];
    setusers: (users: { username: string; password: string }[]) => void;
}

const Signup: React.FC<SignupProps> = (props) => {
    const navigate = useNavigate();
    const users = props.users;
    const setusers = props.setusers;

    const [eusername, setEusername] = useState<string>("");
    const [epassword, setEpassword] = useState<string>("");

    const handleUInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setEusername(evt.target.value);
    };

    const handlePInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setEpassword(evt.target.value);
    };

    const addUser = () => {
        setusers([...users, { username: eusername, password: epassword }]);   
        navigate("/");
    };

    return (
        <div className="bg-black p-10">
            <div className="bg-[#EFEFEF] p-10 border rounded-md">
                <h1 className="text-3xl font-medium">Hey Hi</h1>
                <p>Sign up here :)</p>

                <div className="flex flex-col gap-2 my-2">
                    <input 
                        type="text" 
                        className="w-52 border-black p-1 bg-transparent border rounded-md" 
                        placeholder="username"
                        onChange={handleUInput}
                    />

                    <input 
                        type="password" 
                        className="w-52 border-black p-1 bg-transparent border rounded-md" 
                        placeholder="password"
                        onChange={handlePInput}
                    />

                    <input 
                        type="password" 
                        className="w-52 border-black p-1 bg-transparent border rounded-md" 
                        placeholder="confirm password"
                    />

                    <button className="bg-[#FCA201] w-24 p-1 rounded-md" onClick={addUser}>
                        Sign Up
                    </button>

                    <p>
                        Already have an account? <Link to={"/"} className="underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
