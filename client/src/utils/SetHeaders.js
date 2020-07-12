const SetHeaders = () => {
  const token = localStorage.getItem("authToken");

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
};

export default SetHeaders;
