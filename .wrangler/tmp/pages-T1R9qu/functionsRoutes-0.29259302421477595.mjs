import { onRequestPost as __api_studio_code_js_onRequestPost } from "/Users/mauroferrari/Documents/KINEVA-FIT_LandingPage/functions/api/studio-code.js"
import { onRequestPost as __api_studio_download_js_onRequestPost } from "/Users/mauroferrari/Documents/KINEVA-FIT_LandingPage/functions/api/studio-download.js"
import { onRequest as __downloads_kineva_fit_studio_zip_js_onRequest } from "/Users/mauroferrari/Documents/KINEVA-FIT_LandingPage/functions/downloads/kineva-fit-studio.zip.js"

export const routes = [
    {
      routePath: "/api/studio-code",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_studio_code_js_onRequestPost],
    },
  {
      routePath: "/api/studio-download",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_studio_download_js_onRequestPost],
    },
  {
      routePath: "/downloads/kineva-fit-studio.zip",
      mountPath: "/downloads",
      method: "",
      middlewares: [],
      modules: [__downloads_kineva_fit_studio_zip_js_onRequest],
    },
  ]