import React,{ useEffect,useState } from "react";
import api from "../Axios/Config";
import { Navigate, Outlet } from 'react-router-dom';



const AdminProtected = () => {

    const token = localStorage.getItem('token')

    const config = {
        headers :{
            Authorization : `${token}`
        }
    }
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);


    const adminCheck = async () => {
        try {
            const { data } = await api.get('/auth/admin', config); 
            if (data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        adminCheck();
    }, []);
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!ok) {
        return <Navigate to='/login' />;
    }

    return <Outlet />;

}

export default AdminProtected
