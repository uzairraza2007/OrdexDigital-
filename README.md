# Ordex Digital — website

Static site. No database, no backend, no build step. Open `index.html` in a browser, or upload the whole folder to any host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel).

## Files

```
ordex-digital/
├── index.html        Home
├── about.html        About
├── services.html     Services (anchors: #ai-automation, #ai-agents, #workflow-automation,
│                     #ecommerce-automation, #cloud-architecture)
├── projects.html     Portfolio with category filters + case studies
├── blogs.html        Articles + FAQ
├── contact.html      WhatsApp panel + inquiry form
└── assets/
    ├── css/styles.css   All styling. Design tokens are at the top in :root.
    ├── js/main.js       Nav, filters, reveal, WhatsApp links, inquiry form
    └── img/             Logo + project screenshots
```

## Common edits

**WhatsApp number** — change `WHATSAPP_NUMBER` and `DISPLAY_NUMBER` at the top of `assets/js/main.js`. Every button and every displayed number updates. The plain `href="https://wa.me/..."` fallbacks in the HTML (used if JavaScript is off) can be updated with a find-and-replace.

**CTA message** — each WhatsApp button carries its own `data-wa="..."` message in the HTML. Edit the text there.

**Colours, fonts, spacing** — the `:root` block at the top of `assets/css/styles.css`.

**Adding a project** — copy an existing `<article class="case" ...>` block in `projects.html`, drop the screenshot into `assets/img/`, and set `data-category` to one or more of: `ai-automation`, `ai-agents`, `workflow`, `ecommerce`. The filter buttons pick it up automatically.

**Adding a blog post** — copy a `<article class="post">` card and the matching `<article class="case" id="post-...">` full article below it in `blogs.html`.

## Notes

- The inquiry form on `contact.html` stores nothing. It formats the entered values into a WhatsApp message and opens the chat with it prefilled.
- Company email: `Uzair@ordexdigital.com` — it appears in the footer of every page and twice on the contact page (info list + "Email us" button). Find-and-replace it if it ever changes.
- The footer links to the company LinkedIn page (`linkedin.com/company/ordex-digital`). The About and Contact pages link to the personal LinkedIn and Upwork profiles.
- The site is ready to grow into a CMS or backend later: content lives in plain HTML blocks, and the WhatsApp layer is isolated in one JS module.
