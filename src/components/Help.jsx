import { useEffect } from "react";

const Help = () => {

    useEffect(() => {
        document.title = "Help";
    }, []);
    return (
        <div className="text-center bg-grey text-gray-800 py-24 px-6" >
            <div style={{ textAlign: 'left', paddingLeft: '40px', }}>
                <h1 style={{ fontSize: '170%', fontWeight: 'bold', }}>Farmer Process</h1>
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>1. Farmers  need to register on our website.Farmers need to register using aadhar card, Uzhavar Sandhai card, Chitta card(Land Records) and other basic details.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>2. Farmers login using registered Email address and password.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>3. Then a profile page will appear , there they can create orders to be sold.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>4. To create orders farmers should have a minimum 0.1 ether.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>5. Farmers can buy ethers at their convenient platform.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>6. Created orders will display in that page, and account details of consumers will be displayed.</h3><br />
            </div>

            <div style={{ textAlign: 'left', paddingLeft: '40px', }}>
                <h1 style={{ fontSize: '170%', fontWeight: 'bold', }}>Consumer Process</h1>
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>1. Consumers need to register on our website.Consumers register using aadhar card.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>2. Consumers login using registered Email address and password.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>3. Then a profile page will appear , there they can buy orders.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>4. To buy orders consumers should have a minimum of greater than selling price.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>5. Consumers can buy ethers at their convenient platform.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>6. Products which are available will be displayed to buy,which are not available will be displayed as closed.</h3><br />
                <h3 style={{ fontSize: '100%', fontWeight: 'bold', }}>7. To confirm their transaction,the transaction details will be displayed in their profile page.</h3>
            </div>
        </div>
    )
}

export default Help;