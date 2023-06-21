import { useState } from "react";
import Input from "../components/Input";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    }


    return (
        <form onSubmit={handleSubmit}>
            <Input type="email" value={email} setValue={setEmail} />
            <Input type="password" value={password} setValue={setPassword} />
            <Input type="submit" value="Se connecter" setValue="" />
        </form>
    );
}

export default Login;