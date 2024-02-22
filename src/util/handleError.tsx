import axios from "axios";

export const handleError = (err: any) => {
  if (axios.isAxiosError(err)) {
    console.error(
      "Error data: ",
      err.response?.data,
      "Error status: ",
      err.response?.status,
      "Error headers: ",
      err.response?.headers
    );
  } else if (err.request) {
    console.error("Error request: ", err.request);
  } else {
    console.error("Error: ", err);
  }
};
