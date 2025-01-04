import React from "react";
import AdminCard from "../Admin_comp/AdminCard";
import AdminChart from "../Admin_comp/AdminChart";
import Admin_navb from "../Admin_comp/Admin_navb";
const AdminDashboard: React.FC = () => {
 
  return (
   <>
   <Admin_navb/>
   <AdminCard />
    <AdminChart/>
   </>
  );
};

export default AdminDashboard;
