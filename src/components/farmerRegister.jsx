import { useEffect, useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'


export default function Farmerregister() {

    useEffect(() => {
        document.title = "Farmer Register";
    }, []);

    // States for registration
    const [details, setDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
    })
    const [aadhar, setAadhar] = useState(null);
    const [chitta, setChitta] = useState(null);
    const [uzhavarCard, SetUzhavarCard] = useState(null);
    const [WalletAddress, setWalletAddress] = useState('');
    const [connected, setConnected] = useState(false);
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setDetails({ ...details, name: e.target.value });
        setSubmitted(false);
    };

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
        setDetails({ ...details, phone: e.target.value })
        setSubmitted(false);
    };
    const handleAddress = (e) => {
        setDetails({ ...details, address: e.target.value })
        setSubmitted(false);
    };

    const handleAadhar = (e) => {
        setAadhar(e.target.files[0]);
        setSubmitted(false);
    };

    const handleChitta = (e) => {
        setChitta(e.target.files[0]);
        setSubmitted(false);
    };

    const handleUzhavarCard = (e) => {
        SetUzhavarCard(e.target.files[0]);
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

    const connectWallet = async (e) => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                })
                setWalletAddress(accounts[0]);
                setConnected(true);
                alert('wallet connected');
                Authenticate();
            }
            catch (error) {
                alert(error);
            }
        }
        else {
            alert('metamask not found. install metamask');
        }

    }
    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.name === '' || details.email === '' || details.password === '' || details.password === '' || details.confirmPassword === '' || details.phone === '' || details.address === '' || aadhar === null || chitta === null || uzhavarCard === null) {
            setError(true);
        }
        else if (details.password.length < 6 || details.password !== details.confirmPassword || details.phone.length !== 10) {
            if (details.password.length < 6 || details.password !== details.confirmPassword) {
                alert('password must greater than or equal to 6 characters and password and confirm password must be same');
            }
            else {
                alert('phone number must equal to 10 numbers');
            }
        }
        else {
            setError(false);
            if (connected === false) {
                alert('connect wallet');
                await connectWallet();
            }
            else {
                const { name, email, password, confirmPassword, phone, address } = details;
                const walletAdd = WalletAddress;

                const res = await fetch("https://agro-blockchain-aa2003-default-rtdb.firebaseio.com/farmerDetails.json",
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
                            walletAdd,
                        })
                    })
                const aadharref = ref(storage, `farmerAadhar/${aadhar.name + v4()}`)
                uploadBytes(aadharref, aadhar).then(() => {
                    alert("file uploaded successfully");
                });
                const chittaref = ref(storage, `farmerChitta/${chitta.name + v4()}`)
                uploadBytes(chittaref, chitta).then(() => {
                    alert("file uploaded successfully");
                });
                const uzhavarCardref = ref(storage, `farmerUzhavarCard/${uzhavarCard.name + v4()}`)
                uploadBytes(uzhavarCardref, uzhavarCard).then(() => {
                    alert("file uploaded successfully");
                });
                alert('finish');
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
                    <h4 style={{ fontWeight: 'bold', paddingLeft: '130px', fontSize: '20px', }}>You are successfully registered as Farmer. Click the <a href='farmerLogin'>link</a> to login</h4>
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
        paddingTop: '10px',
    }
    const formbody = {
        textalign: 'left',
        paddingTop: '10px',
        paddingBottom: '50px',
        paddingRight: '50px',
    }

    const informbody = {
        paddingTop: '20px',
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
    const chittaCss = {
        paddingRight: '127px',
        width: '20%',
        fontWeight: 'bold',
        fontSize: '20px',
    }
    const uzhavarCss = {
        paddingRight: '50px',
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
                <h1 style={{ paddingTop: '100px', paddingLeft: '640px', fontSize: '40px', fontWeight: 'bold', }}>FARMER REGISTRATION</h1>
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
                        <div style={informbody}>
                            <label style={chittaCss}>Chitta Adingal</label>
                            <input onChange={handleChitta} style={input} type="file" />
                        </div>
                        <div style={informbody}>
                            <label style={uzhavarCss}>Uzhavar Sandhai Card</label>
                            <input onChange={handleUzhavarCard} style={input} type="file" />
                        </div>
                        <br />
                        <br />
                        <div style={{ paddingLeft: '180px', }}>
                            <button onClick={handleSubmit} style={foot} type="submit" className="inline-block px-6 py-2.5 bg-green-600
            text-black font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700">
                                Register
                            </button>
                        </div>
                        <h1 style={{ paddingLeft: '50px', fontSize: '20px', fontWeight: 'bold', }}>Already have an account. Click <a href='farmerLogin' style={{ color: 'blue', }}>here</a> to log in</h1>
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
