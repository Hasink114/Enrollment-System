import api from "./api";

export const createSession = async (studentName) => {
    const response = await api.post("/session/create", {
        student_name: studentName,
    });

    return response.data.data;
};