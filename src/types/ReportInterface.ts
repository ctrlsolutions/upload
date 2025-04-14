export interface Report {
    id: number;
    created_on: string;
    time_submitted: string;
    formatted_author: string;
    college_code: string;
    college_name: string;
    department_code: string;
    department_name: string;
    report_type: string;
    title: string;
    is_owner: boolean;
}
