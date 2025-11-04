import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  // Si hacemos build para GH Pages: 
  // vite build --mode production, cogerá "/GamesHub_P05/"
  // Para vite dev o preview en local, cogerá "/"
  //! Local (vite dev) en Vite és por defecto mode === "development"
  //! Build (vite build) en Vite és por defecto mode === "production"
  const isGitHubPages = mode === "production";
  return {
    base: isGitHubPages ? "/GameHub_P05/" : "/",
  }
})