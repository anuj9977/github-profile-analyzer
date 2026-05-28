const { fetchGithubProfile } = require("../services/githubService");

const {
  saveProfile,
  getAllProfiles,
  getSingleProfile,
} = require("../models/githubModel");

const analyzeProfile = async (req, res) => {
  try {
    const username = req.params.username;

    const data = await fetchGithubProfile(username);

    const createdDate = new Date(data.created_at);
    const currentDate = new Date();

    const diffTime = Math.abs(currentDate - createdDate);

    const accountAgeDays = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );

    const profileData = {
      username: data.login,
      name: data.name,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      account_age_days: accountAgeDays,
      profile_url: data.html_url,
      avatar_url: data.avatar_url,
    };

    saveProfile(profileData, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database Error",
          error: err,
        });
      }

      res.status(201).json({
        message: "Profile analyzed successfully",
        profileData,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "GitHub User Not Found",
      error: error.message,
    });
  }
};

const fetchAllProfiles = (req, res) => {
  getAllProfiles((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

const fetchSingleProfile = (req, res) => {
  const username = req.params.username;

  getSingleProfile(username, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(results[0]);
  });
};

module.exports = {
  analyzeProfile,
  fetchAllProfiles,
  fetchSingleProfile,
};