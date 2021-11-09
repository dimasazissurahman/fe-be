import styles from './form.module.css';
import ReactLoading from 'react-loading';
import { useState } from 'react';
import Button from '@mui/material/Button';



export const FormComponent = (props) => {
    const { setUniversityName,
        universityName,
        optionUniversityName,
        setUniversityCountry,
        universityCountry,
        optionUniversityCountry,
        setIsSearch,
        setIsLoading } = props;

    return (
        <div className={styles['form']}>
            <h3>Filter Parameter Search : </h3>
            {optionUniversityCountry.length > 0 ?
                <>
                    <label>Univeristy Name</label>
                    <input list={"uname"} name={"uname"} placeholder={"Select University Name"} onChange={(e) => setUniversityName(e.target.value)} value={universityName} />
                    <datalist id={"uname"}>
                        {optionUniversityName.map((data, i) => (
                            <option key={i}>{data}</option>
                        ))}
                    </datalist>
                    <label>University Country</label>
                    <input list={"country"} name={"country"} placeholder={"Select Country"} onChange={(e) => setUniversityCountry(e.target.value)} value={universityCountry} />
                    <datalist id={"country"}>
                        {optionUniversityCountry.map((data, i) => (
                            <option key={i}>{data}</option>
                        ))}
                    </datalist>
                    <Button variant="contained" onClick={() => { setIsSearch(true); setIsLoading(true) }} size={"small"} >Search</Button>
                </>
                :
                <div style={{ display: "flex", width: "15%", margin: "auto" }}>
                    <ReactLoading type={"bubbles"} color={"blue"} height={'50px'} width={'50px'} />
                    <h3 style={{ margin: "auto", color: "blue" }}>Loading Form Data</h3>
                    <ReactLoading type={"bubbles"} color={"blue"} height={'50px'} width={'50px'} />
                </div>
            }
        </div>

    )
}

export const FormLoginRegister = (props) => {
    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [confirmPassValue, setConfirmPassValue] = useState("");
    const [fnameValue, setFnameValue] = useState("");
    const {
        isLoginPage,
        handleSubmit,
    } = props;

    return (
        <>
            {isLoginPage ?
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="Input Email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="Input Password" value={passValue} onChange={(e) => setPassValue(e.target.value)} />
                </div>
                :
                <div>
                    <label>Full Name</label>
                    <input type="text" placeholder="Input Full Name" value={fnameValue} onChange={(e) => setFnameValue(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder="Input Email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="Input Password" value={passValue} onChange={(e) => setPassValue(e.target.value)} />
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Input Password" value={confirmPassValue} onChange={(e) => setConfirmPassValue(e.target.value)} />
                </div>
            }
            <button onClick={() => handleSubmit(emailValue, passValue, fnameValue)}>{isLoginPage ? "Login" : "Register"}</button>
        </>
    )
}