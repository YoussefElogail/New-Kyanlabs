import { IUserProjectReports } from "@/types/types";

export const fields:{
    name: keyof IUserProjectReports;
    type: string;
    label: string;
    required?: string;
    validate: boolean;
    showInCerate?: boolean;
    showInEdit?: boolean;
}[] =
[
    {
        name:"report",
        type: "text",
        label: "Report",
        required: "Report is required",
        validate: true,
        showInCerate: true,
        showInEdit: true
    },
    {
        name:"percentage",
        type: "number",
        label: "percentage",
        required: "Percentage is required",
        validate: true,
        showInCerate: true,
        showInEdit: true
    },
] 

