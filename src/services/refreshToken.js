const axios = require("axios");
async function refreshAccessToken(refreshToken, clientId, clientSecret) {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    });

    const { access_token, expires_in } = response.data;
    return { accessToken: access_token, expiresIn: expires_in };
  } catch (error) {
    console.error("Error refreshing access token:", error.response.data);
    throw error;
  }
}

module.exports = {
  refreshAccessToken,
};
