const express = require("express");

const router = express.Router();

const {
  analyzeProfile,
  fetchAllProfiles,
  fetchSingleProfile,
} = require("../controllers/githubController");

router.post("/analyze/:username", analyzeProfile);

router.get("/profiles", fetchAllProfiles);

router.get("/profiles/:username", fetchSingleProfile);

module.exports = router;