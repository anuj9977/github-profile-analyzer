const db = require("../config/db");

const saveProfile = (data, callback) => {
  const query = `
    INSERT INTO github_profiles
    (username, name, bio, public_repos, followers, following,
     account_age_days, profile_url, avatar_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      data.username,
      data.name,
      data.bio,
      data.public_repos,
      data.followers,
      data.following,
      data.account_age_days,
      data.profile_url,
      data.avatar_url,
    ],
    callback
  );
};

const getAllProfiles = (callback) => {
  db.query("SELECT * FROM github_profiles", callback);
};

const getSingleProfile = (username, callback) => {
  db.query(
    "SELECT * FROM github_profiles WHERE username=?",
    [username],
    callback
  );
};

module.exports = {
  saveProfile,
  getAllProfiles,
  getSingleProfile,
};