const apiURL = process.env.REACT_APP_API_URL;

if (!apiURL) {
  throw new Error(
    `Please add to the .env file a variable "REACT_APP_API_URL" with url to the Api and restart! 
     Example "REACT_APP_API_URL=https://api.com/v1"`
  );
}
export const fetchToken = () =>
  fetch(`${apiURL}/Authorization/SignIn`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) {
      try {
        const data = await response.json();
        return data.AuthorizationToken.Token;
      } catch (error) {
        return Promise.reject(
          new Error(
            `Some error occurred in the json response: "${error.toString()}"`
          )
        );
      }
    } else {
      return Promise.reject({
        message: `Some error occurred on the server side, status code: "${response?.status}"`,
        status: response?.status,
      });
    }
  });

const mediaListBody = {
  MediaListId: 3,
  IncludeCategories: false,
  IncludeImages: true,
  IncludeMedia: false,
  PageNumber: 1,
  PageSize: 15,
};

export const getMediaList = (token, MediaListId) => {
  mediaListBody.MediaListId = parseInt(MediaListId);
  return fetch(`${apiURL}/Media/GetMediaList`, {
    method: 'POST',
    body: JSON.stringify(mediaListBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      try {
        const data = await response.json();
        return data;
      } catch (error) {
        return Promise.reject(
          new Error(
            `Some error occurred in the json response: "${error.toString()}"`
          )
        );
      }
    } else {
      return Promise.reject({
        message: `Some error occurred on the server side, status code: "${response?.status}"`,
        status: response?.status,
      });
    }
  });
};

export const getMediaPlayInfo = (id, token) =>
  fetch(`${apiURL}/Media/GetMediaPlayInfo`, {
    method: 'POST',
    body: JSON.stringify({
      MediaId: parseInt(id),
      StreamType: 'TRIAL',
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      try {
        const data = await response.json();
        return data;
      } catch (error) {
        return Promise.reject(
          new Error(
            `Some error occurred in the json response: "${error.toString()}"`
          )
        );
      }
    } else {
      return Promise.reject({
        message: `Some error occurred on the server side, status code: "${response?.status}"`,
        status: response?.status,
      });
    }
  });
