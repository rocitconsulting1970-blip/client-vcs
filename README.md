# VCS Advisors — Static Site

Static mirror of [vcsadvisors.com](https://vcsadvisors.com) ("Fractional C-Suite Leadership"), migrated off GoDaddy WordPress hosting. The `site/` directory is the deployable site; `netlify.toml` configures redirects, headers, and the publish directory for Netlify.

## Pages

| Page | Path |
|---|---|
| Home | `/` |
| About Us | `/elementor-48/` |
| vCFO Services | `/services2/` |
| vCHRO Services | `/vcio-ciso-services/` |
| vCRO Services | `/vcio-ciso-services-2/` |
| vCIO/CISO Services | `/vcio-ciso-services-3/` |
| vCMO Services | `/vcmo-services/` |
| Thank You (form success) | `/thank-you/` |

Path names are inherited from the original WordPress install so existing links keep working.

## Contact form

The homepage contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/) (form name: `Contact`). After deploying, enable form detection in the Netlify dashboard and add an email notification under **Forms → Notifications**.

## Local preview

```
python3 -m http.server 8765 -d site
```

Then open http://localhost:8765/. A static server is required (opening `index.html` directly won't work) because the site uses root-relative URLs.

## Notes

- All assets (fonts, images, CSS, JS) are self-contained — no dependency on GoDaddy or any WordPress server.
- Fonts were previously served from a GoDaddy staging domain and localized here; background images referenced in Elementor CSS were localized as well.
