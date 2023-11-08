// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";

const api = express();
const API_ENDPOINT = process.env.API_ENDPOINT;
const API_KEY = process.env.API_KEY;

const query = `{ 
    scenes: allScene {
      results {
        id
        sceneName
        sceneImage {
          results {
            fileUrl
            description
          }
        }
        hotspots {
          results {
            ... on Hotspot {
              hotspotName
              pitchstring
              yawstring
            }
          }
        }
      }
    }
  }`;

const router = Router();
router.get("/content", (req, res) => {
  const options = {
    method: "POST",
    url: API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      "X-GQL-Token": API_KEY,
    },
    data: JSON.stringify({ query }),
  };

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

api.use("/api/", router);

export const handler = serverless(api);
