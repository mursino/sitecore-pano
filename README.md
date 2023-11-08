# 🌎 Welcome to the world of Sitecore Pano

This repository contains a working example of using Sitecore Content Hub ONE to display panoramic virtual worlds in the browser with CMS-controlled imagery and hotspots.

- Read more in the blog post [*Headless is Out of This World, Let’s Dive In!*](https://blogs.perficient.com/2023/09/29/headless-is-out-of-this-world-lets-dive-in/).
- See a [working demo](https://sitecorepano.netlify.app/) as well!

## Getting started

### ✅ Requirements

- **Content Hub ONE**: you will need a license to a Content Hub ONE tenant with your API key
- **Netlify**: this solution uses a Netlify function as an API proxy to fetch Content Hub ONE content without exposing API keys in the browser. Basic Netlify hosting and functions can be used for free. You can also test this locally as a developer with the included Netlify SDK package. See below.

### 💾 Installation

```
npm install
```

### 🔁 Sync sample content

Run the following commands from a terminal while in the `/serialization` folder:

Push the content types:

```
ch-one-cli serialization push content-type --id "Hotspot"
ch-one-cli serialization push content-type --id "Scene"
```

Push the content items:

```
ch-one-cli serialization push content-item --content-type "Hotspot" --id "*"
ch-one-cli serialization push content-item --content-type "Scene" --id "*"
```

Push the media items:

```
ch-one-cli serialization push media --id "*"
```

### 👩‍💻 Run locally

Rename `.env.example` to `.env` and fill in your environment variables.

In order to use the Netlify function locally, you will make use of the Netlify SDK via the CLI. You can run the entire app with the local Netlify function through this command:

```
netlify dev
```

### 🚀 Deploy to Netlify

- Add New Site
- Import an existing project
- Deploy with <your Git provider> (e.g. GitHub)
- Select your repository
- Select the **Branch to deploy** or keep as `main`
- Set the **Build command** to `npm run buildprod`
- Set the **Publish directory** to `dist`
- Click **Add environment variables** and add the two variables in the `.env` file with appropriate values
- Click **Deploy**

## Use cases for virtual worlds

- 👩‍🎓 Higher Education - campus tours
- 🏥 Healthcare - hospital facility virtual wayfinding
- 🗽 Tourism - virtual experiences of real-world tourist destinations
