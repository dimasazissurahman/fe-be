import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FormLoginRegister } from "../../component/form/form"
import { AppContext } from "../../component/provider/Provider";
import { useHistory } from 'react-router-dom';

export const AuthPage = ({ match }) => {
    const [isLoginPage, setIsLoginPage] = useState(false);
    const { setUserData } = useContext(AppContext);
    let history = useHistory();

    useEffect(() => {
        if (match.params.page === "login") {
            setIsLoginPage(true);
        }
        else if (match.params.page === "register") {
            setIsLoginPage(false);
        }
    }, [match.params.page]);

    const handleSubmit = async (emailValue, passValue, fnameValue) => {
        if (isLoginPage) {
            try {
                const result = await axios.post('/login', { email: emailValue, password: passValue });
                if (result.status === 200) {
                    console.log(result.data);
                    setUserData(result.data);
                    localStorage.setItem("userObject", JSON.stringify(result.data));
                    history.push("/");
                }
            } catch (error) {
                alert("Login Failed Please Check Email or Password!", error);
            }
        }
        else {
            try {
                const result = await axios.post('/register', { fname: fnameValue, email: emailValue, password: passValue });
                console.log(result);
            } catch (error) {
                alert("Register Failed! Please check all input are filled", error);
            }
        }
    }

    return (
        <div>
            <FormLoginRegister
                isLoginPage={isLoginPage}
                handleSubmit={(emailValue, passValue, fnameValue) => handleSubmit(emailValue, passValue, fnameValue)}
            />
        </div>
    )
}