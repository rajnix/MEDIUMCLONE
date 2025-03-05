import { signupSchema } from "@rajnixh/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "Sign Up" | "Sign In" }) => {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<signupSchema>({
        username: 'rajnish',
        password: '123456',
        email: 'a@b.com',
    })
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "Sign Up" ? "signup" : "signin"}`, postInput);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")
            // alert the user here that the request failed
        }
    }
    return (

        <div className="h-screen flex justify-center flex-col px-36">
            <div className="text-3xl font-bold  py-5">Create an account</div>
            <div className="flex">

                {type === "Sign In" ? "Don't have an account?" : "Already have an account?"}

                <Link className="pl-2 underline" to={type === "Sign In" ? "/signup" : "/signin"} >
                    {type === "Sign In" ? "Sign Up" : "Sign In"}
                </Link>
            </div>

            <div className="py-3">
                {type==="Sign Up"?<LabelledInput label={'Username'} placeholder="  Enter your username" onChange={(e) => {
                    setPostInput({
                        ...postInput,
                        username: e.target.value
                    })
                }} />:null}
            </div>
            <div className="py-3">
                <LabelledInput label={'E-mail'} placeholder="  r@abc.com" onChange={(e) => {
                    setPostInput({
                        ...postInput,
                        email: e.target.value
                    })
                }} />
            </div>

            <div className="py-3">
                <LabelledInput label={'Password'} type={"password"} placeholder="" onChange={(e) => {
                    setPostInput({
                        ...postInput,
                        password: e.target.value
                    })
                }} />
            </div>
            <div className="py-3">
                <button onClick={sendRequest} className="bg-black text-white  w-full h-10 rounded-md border-2 ">{type}</button>
            </div>


        </div>
    )
}
interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;

}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-black ">{label}</label>
            <input type={type || 'text'} onChange={onChange} id={label} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    )
}