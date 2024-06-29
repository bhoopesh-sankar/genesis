import { useEffect, useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Consumerregister() {

    useEffect(() => {
        document.title = "Consumer Register";
    }, []);
    const [WalletAddress, setWalletAddress] = useState('');
    const [connected, setConnected] = useState(false);
    const [details, setDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
    })

    const [aadhar, setAadhar] = useState(null);

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setDetails({ ...details, name: e.target.value });
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setDetails({ ...details, email: e.target.value });
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setDetails({ ...details, password: e.target.value });
        setSubmitted(false);
    };
    const handleConfirmPassword = (e) => {
        setDetails({ ...details, confirmPassword: e.target.value });
        setSubmitted(false);
    };

    const handlePhone = (e) => {
        setDetails({ ...details, phone: e.target.value });
        setSubmitted(false);
    };
    const handleAddress = (e) => {
        setDetails({ ...details, address: e.target.value });;
        setSubmitted(false);
    };
    const handleAadhar = (e) => {
        setAadhar(e.target.files[0]);
        setSubmitted(false);
    };

    const Authenticate = async (e) => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                details.email,
                details.password,
            );
            console.log(user);
            alert('authenticated');
        } catch (error) {
            alert(error);
        }
    }

    async function connectWallet() {

        // to check that metamask is installed
        if (window.ethereum) {

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setWalletAddress(accounts[0]);
                setConnected(true);
                alert('wallet connected');
                await Authenticate();
            }
            catch (error) {
                alert('error detected');
            }
        } else {
            alert("metamask doesn't exist. Kindly install the extension");
        }
    }

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (details.name === '' || details.email === '' || details.password === '' || details.confirmPassword === '' || details.phone === '' || details.address === '' || aadhar === null) {
            setError(true);
        }
        else if (details.password.length < 6 || details.password !== details.confirmPassword || details.phone.length !== 10) {
            if (details.password.length < 6 || details.password !== details.confirmPassword) {
                alert('password must greater than or equal to 6 characters and password and confirm password must be same');
            }
            else {
                alert('phone number must equal to 10 numbers');
            }
            setError(true);
        }
        else {
            if (connected === false) {
                alert('connect wallet');
                await connectWallet();
            }
            else {
                setError(false);
                const { name, email, password, confirmPassword, phone, address } = details;
                const WalletAdd = WalletAddress;

                const res = await fetch("https://agro-blockchain-aa2003-default-rtdb.firebaseio.com/consumerDetails.json",
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            password,
                            confirmPassword,
                            phone,
                            address,
                            WalletAdd,
                        })
                    })
                const aadharref = ref(storage, `ConsumerAadhar/${aadhar.name + v4()}`)
                await uploadBytes(aadharref, aadhar).then(() => {
                    alert("file uploaded successfully");
                });
                setSubmitted(true);
            }
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div style={message}>
                <div
                    className="success"
                    style={{
                        display: submitted ? '' : 'none',
                    }}>
                    <h4 style={{ fontWeight: 'bold', paddingLeft: '130px', fontSize: '20px', }}>You are successfully registered as Consumer. Click the <a href="consumerLogin">link</a> to login</h4>
                </div>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div style={message}>
                <div
                    className="error"
                    style={{
                        display: error ? '' : 'none',
                    }}>
                    <h4 style={{ fontWeight: 'bold', paddingLeft: '130px', fontSize: '20px', color: 'red', }}>Please enter all the fields</h4>
                </div>
            </div>

        );
    };

    const wholepage = {
        paddingLeft: '600px',
    }
    const message = {
        paddingTop: '10px'
    }
    const formbody = {
        textalign: 'left',
        paddingTop: '20px',
        paddingBottom: '50px',
        paddingRight: '50px'
    }

    const informbody = {
        paddingTop: '20px'
    }
    const Name = {
        paddingRight: '205px',
        width: '20%',
        fontWeight: 'bold',
        fontSize: '20px',
    }
    const emailCss = {
        paddingRight: '210px',
        width: '20%',
        fontWeight: 'bold',
        fontSize: '20px',
    }
    const passwordCss = {
        paddingRight: '170px',
        width: '20%',
        fontWeight: 'bold',
        fontSize: '20px',
    }
    const confirmPasswordCss = {
        paddingRight: '85px',
        width: '20%',
        fontWeight: 'bold',
        fontSize: '20px',
    }
    const addressCss = {
        paddingRight: '188px',
        width: '20%',
        fontWeight: 'bold',
        fontSize: '20px',
    }
    const phoneCss = {
        paddingRight: '115px',
        width: '20%',
        fontWeight: 'bold',
        fontSize: '20px',
    }
    const aadharCss = {
        paddingRight: '145px',
        width: '20%',
        fontWeight: 'bold',
        fontSize: '20px',
    }
    const input = {
        width: '30%',
        border: '2px solid black',
        borderRadius: '10px',
        fontSize: '20px',
    }
    const foot = {
        border: '2px solid black',
        borderRadius: '12px',
        textalign: 'center',
        background: '#68ed79',
        fontWeight: 'bold',
        fontSize: '20px',
    }

    return (
        <div>
            <div>
                <h1 style={{ paddingTop: '100px', paddingLeft: '626px', fontSize: '40px', fontWeight: 'bold', }}>CONSUMER REGISTRATION</h1>
            </div>
            <div style={wholepage}>
                <div style={formbody}>
                    <form>
                        <div style={informbody}>
                            <label style={Name}>Name</label>
                            <input onChange={handleName} style={input}
                                value={details.name} type="text" />
                        </div>
                        <div style={informbody}>
                            <label style={emailCss}>Email</label>
                            <input onChange={handleEmail} style={input}
                                value={details.email} type="email" />
                        </div>
                        <div style={informbody}>
                            <label style={passwordCss}>Password</label>
                            <input onChange={handlePassword} style={input}
                                value={details.password} type="password" />
                        </div>
                        <div style={informbody}>
                            <label style={confirmPasswordCss}> Confirm Password</label>
                            <input onChange={handleConfirmPassword} style={input}
                                value={details.confirmPassword} type="password" />
                        </div>
                        <div style={informbody}>
                            <label style={phoneCss}>Phone Number</label>
                            <input onChange={handlePhone} style={input}
                                value={details.phone} type="number" />
                        </div>
                        <div style={informbody}>
                            <label style={addressCss}>Address</label>
                            <input onChange={handleAddress} style={input}
                                value={details.address} type="address" />
                        </div>
                        <div style={informbody}>
                            <label style={aadharCss}>Aadhar Card</label>
                            <input onChange={handleAadhar} style={input} type="file" />
                        </div>
                        <br />
                        <br />
                        <div style={{ paddingLeft: '180px', }}>
                            <button onClick={handleSubmit} style={foot} className="inline-block px-6 py-2.5 bg-green-600
            text-black font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700" type="submit">
                                Register
                            </button>
                        </div>
                        <h1 style={{ paddingLeft: '40px', fontSize: '20px', fontWeight: 'bold', }}>Already have an account. Click <a href='consumerLogin' style={{ color: 'blue', }}>here</a> to log in</h1>
                    </form>
                    <div className="messages">
                        {errorMessage()}
                        {successMessage()}
                    </div>
                </div>
            </div>
        </div>
    );
}

