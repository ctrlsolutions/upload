export interface UserProfile {
    first_name: string;
    email: string;
    middle_name: string;
    last_name: string;
    role: string;
}

export interface DashboardData {
user: UserProfile;
}
