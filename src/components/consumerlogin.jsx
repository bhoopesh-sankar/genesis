import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';


function Consumerlogin(props) {

    useEffect(() => {
        document.title = "Consumer Login";
    }, []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [WalletAddress, setWalletAddress] = useState('');

    const Authenticate = async (e) => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            console.log(user)
            connectWallet();
        } catch (error) {
            alert("Invalid email and password");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError(true);

        } else {
            setError(false);
            Authenticate();
        }
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const errorMessage = () => {
        return (
            <div>
                <div
                    className="error"
                    style={{
                        display: error ? '' : 'none',
                    }}>
                    <h4 style={{ fontSize: '20px', fontWeight: 'bold', paddingLeft: '720px', color: 'red', }}>Please enter all the fields</h4>
                </div>
            </div>

        );
    };

    async function connectWallet() {
        // to check that metamask is installed
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setWalletAddress(accounts[0]);
                window.location.replace('/consumerHome');
            }
            catch (error) {
                alert('error detected');
            }
        } else {
            alert("metamask doesn't exist. Kindly install the extension");
        }
    }
    const emailCss = {
        paddingTop: '150px',
        width: '20%',
        fontWeight: 'bold',
        fontSize: '20px',
    }

    const passwordCss = {
        width: '20%',
        fontWeight: 'bold',
        fontSize: '20px',
    }

    const input = {
        width: '40%',
        border: '2px solid black',
        borderRadius: '5px',
        fontSize: '20px',
    }

    const foot = {
        textalign: 'center',
        background: '#68ed79',
        fontWeight: 'bold',
        fontSize: '20px',
        border: '2px solid black',
        borderRadius: '12px',
    }

    return (
        <div>
            <div>
                <h1 style={{ paddingTop: '150px', paddingLeft: '670px', fontSize: '40px', fontWeight: 'bold', }}>CONSUMER LOGIN</h1>
            </div>
            <br /><br /><br />
            <div style={{ paddingLeft: '640px', }}>
                <div>
                    <label style={emailCss}>EMAIL</label><br />
                    <input style={input} type='email' onChange={handleEmail} value={email}></input>
                </div>
                <br />
                <div>
                    <label style={passwordCss}>PASSWORD</label><br />
                    <input style={input} type='password' onChange={handlePassword} value={password}></input>
                </div>
                <br />
                <br />
                <div onClick={handleSubmit} style={{ paddingLeft: '150px', }}>
                    <button style={foot} className="inline-block px-6 py-2.5 bg-green-600
            text-black font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700">LOGIN</button>
                    <br /><br />
                </div>
            </div>
            <h1 style={{ paddingLeft: '630px', fontSize: '20px', fontWeight: 'bold', }}>Don't have an account. Click <a href='consumerRegister' style={{ color: 'blue', }}>here</a> to register</h1>
            <br />
            <div>
                {errorMessage()}
            </div>



        </div>
    );
}
export default Consumerlogin;