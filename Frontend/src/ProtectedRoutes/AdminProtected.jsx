import React, { useEffect, useState } from "react";
import api from "../Axios/Config";
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const AdminProtected = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const adminCheck = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error("You must be logged in to access this page.");
        navigate("/login");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };

        const { data } = await api.get("/auth/admin", config);

        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
          toast.error("You are not authorized to access this page.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Admin check error:", error);
        toast.error("Unauthorized. Please log in.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    adminCheck();
  }, [navigate]);

  if (loading) return <div className="text-center mt-10 text-xl">Checking Admin Access...</div>;

  return ok ? <Outlet /> : null;
};

export default AdminProtected;
