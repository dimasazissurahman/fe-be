import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../component/loading/loadingPage";
import { Header } from "../../component/header/Header";

export const SubscribePage = () => {
    const [emailValue, setEmailValue] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/getEmail');
            setData(res.data);
        }
        getData();
    }, []);

    const handleSubscribe = async () => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const checkDuplicate = data.filter(item => emailValue.includes(item.email));
        console.log(checkDuplicate);
        if (regexp.test(emailValue) && checkDuplicate.length === 0) {
            const res = await axios.post('/postEmail', { email: emailValue });
            alert(res.data);
            setEmailValue("");
            window.location.reload();
        }
        else {
            alert('Email already exist or Email not valid');
        }
    }

    if (!data) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <div>
                <label>Email :</label>
                <input type="email" id="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder={"Ex: admin@gmail.com"} />
                <button onClick={() => handleSubscribe()}>Enter</button>
            </div>
        </>
    )
}