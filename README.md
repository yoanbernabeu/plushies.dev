# Plushies.dev // The Tech Plushie Database

![Plushies.dev Banner](./src/assets/ferris.png)

> **Track, collect, and share your softest stack.**

Plushies.dev is an open-source digital collection of developer companions. This platform allows developers to track their physical plushie collection, share it with the community, and discover new tech companions.

## 🚀 Features

- **Tech Plushie Database**: A curated list of plushies from various technologies.
- **User Collections**: "I Have This" button to add plushies to your personal digital shelf.
- **Social Profiles**: Public user profiles displaying collections, ranks (Novice, Collector, Veteran), and GitHub links.
- **Tech Facets**: Browse plushies by technology.
- **Community**: See who else owns a plushie with the "Collector List" on each item.
- **Authentication**: Secure login via GitHub (powered by Supabase).

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) (SSG + Islands Architecture)
- **Styling**: [TailwindCSS](https://tailwindcss.com) (Cyber/Space aesthetic)
- **Frontend**: React (for interactive islands like `LikeButton` and `ProfileGrid`)
- **Backend/Auth**: [Supabase](https://supabase.com) (PostgreSQL + Auth)
- **Deployment**: Vercel / Netlify (Static output)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🤝 Contributing

Contributions are welcome! If you want to add a new plushie to the database:

1. Fork the repository.
2. Create a new markdown file in `src/content/plushies/`.
3. Add the corresponding image in `src/assets/` (Must be **PNG** format).
4. Submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
Made with ❤️ by [YoanDev](https://yoandev.co)
