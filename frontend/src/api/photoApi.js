import api from "./api";

export const uploadPhoto = async (sessionId, file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/photo/upload/${sessionId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getUploadedPhoto = (sessionId) => {
  return `${api.defaults.baseURL}/photo/image/${sessionId}`;
};