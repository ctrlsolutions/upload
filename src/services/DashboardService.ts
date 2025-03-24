import axios from "axios";
import { DashboardData } from "@/types/DashboardInterface";
const API_URL = import.meta.env.VITE_API_BASE_URL + "/dashboard/";


const DashboardServices = {
    async getDashboardData(): Promise<DashboardData | null> {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. User might not be logged in.");
            return null;
        }

        console.log("Using token:", token); // Log the token to verify if it changes for different users

        try {
            const response = await axios.get<DashboardData>(`${API_URL}dashboard_data/`, {
                headers: { Authorization: `Token ${token}` }
            });

            console.log("Dashboard Data Response:", response.data); // Log the response to ensure it's correct
            return response.data;
        } catch (error: any) {
            console.error("Error fetching dashboard data:", error.response?.data || error.message);
            return null;
        }
    },

    logout(): void {
        localStorage.removeItem("token");
        console.log("User logged out. Token cleared.");
    }
};

export default DashboardServices;
