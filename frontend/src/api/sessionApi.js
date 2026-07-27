import api from "./api";

export const createSession = async (studentName) => {
  const response = await api.post("/session/create", {
    student_name: studentName,
  });

  return response.data;
};

export const getSession = async (sessionId) => {
  const response = await api.get(`/session/${sessionId}`);

  return response.data;
};

export const deleteSession = async (sessionId) => {
  const response = await api.delete(`/session/${sessionId}`);

  return response.data;
};