import React, { useEffect, useState } from "react";
import "../styles/bill.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Bill() {
    const navigate = useNavigate();
    const [bill, setBill] = useState(null);

    useEffect(() => {
        const fetchBill = async () => {
            try {
                const response = await axios.get("http://localhost:5000/Auth/bill");
                console.log(response.data);
                setBill(response.data); // Directly store the bill object
            } catch (error) {
                console.error(error);
            }
        };
        fetchBill();
    }, []);

    const handleGoToDashboard = () => {
        navigate("/User");
    };

    if (!bill) {
        return <h3>Loading bill details...</h3>;
    }

    return (
        <div className="bill">
            <div className="billdetails">
                <h3>Bill</h3>
                <table border={2} className="table">
                    <tbody>
                        <tr>
                            <th>Vehicle ID:</th>
                            <td>{bill.vehicleid}</td>
                        </tr>
                        <tr>
                            <th>Transaction ID:</th>
                            <td>{bill.paymentid}</td>
                        </tr>
                        <tr>
                            <th>User ID:</th>
                            <td>{bill.userid}</td>
                        </tr>
                        <tr>
                            <th>From Date:</th>
                            <td>{bill.from}</td>
                        </tr>
                        <tr>
                            <th>To Date:</th>
                            <td>{bill.to}</td>
                        </tr>
                        <tr>
                            <th>Total Amount:</th>
                            <td>{bill.total}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="bbutton" onClick={handleGoToDashboard}>
                    GO TO USER DASHBOARD
                </button>
            </div>
        </div>
    );
}

export default Bill;
