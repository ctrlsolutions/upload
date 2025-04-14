import api from '@/api'
import type { Report } from '@/types/ReportInterface';

const ReportService = {
    async getAllReports() {
        try {
            const response = await api.get('/reports/history/', {
                withCredentials: true, 
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching reports:", error);
            throw error;
        }   
    },
    async deleteAllReports() {
        try {
            await api.delete('/reports/delete-all/', {
            withCredentials: true,
            });
        } catch (error) {
            console.error("Error deleting all reports:", error);
            throw error;
        }
    },

    async deleteMultipleReports(reportIds: number[]) {
        try {
            await api.post('/reports/delete-multiple/', { ids: reportIds }, {
            withCredentials: true,
            });
        } catch (error) {
            console.error("Error deleting selected reports:", error);
            throw error;
        }
    },

};

export default ReportService;
