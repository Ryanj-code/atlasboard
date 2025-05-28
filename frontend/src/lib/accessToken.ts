let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  // console.log(token);
  accessToken = token;
};

export const getAccessToken = () => accessToken;
