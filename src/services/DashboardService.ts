import axios from "axios";
import { DashboardData } from "@/types/DashboardInterface";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getDashboardData = async (): Promise<DashboardData | null> => {
    try {
        const response = await axios.get<DashboardData>(
        `${API_BASE_URL}/dashboard/dashboard_data/`,
    {
        withCredentials: true, // ✅ Ensures cookies are sent with the request
    }
);

    console.log("✅ Dashboard Data:", response.data);
    return response.data;
} catch (error: any) {
        console.error(
        "❌ Error fetching dashboard data:",
        error.response?.data || error.message
        );
        return null;
    }

