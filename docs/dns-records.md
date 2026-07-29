# vcsadvisors.com — DNS Record Inventory

Snapshot taken 2026-07-29, before moving DNS from GoDaddy to Cloudflare.
Verify every record below exists in Cloudflare **before** changing nameservers.

## Email + Microsoft 365 (do not lose these — company email/Teams depend on them)

| Type | Name | Value | Priority | Proxy |
|---|---|---|---|---|
| MX | @ | vcsadvisors-com.mail.protection.outlook.com | 0 | DNS only |
| TXT | @ | `v=spf1 include:spf.protection.outlook.com -all` | — | DNS only |
| CNAME | autodiscover | autodiscover.outlook.com | — | DNS only |
| CNAME | sip | sipdir.online.lync.com | — | DNS only |
| CNAME | lyncdiscover | webdir.online.lync.com | — | DNS only |
| CNAME | enterpriseregistration | enterpriseregistration.windows.net | — | DNS only |
| CNAME | enterpriseenrollment | enterpriseenrollment-s.manage.microsoft.com | — | DNS only |
| SRV | _sipfederationtls._tcp | 100 1 5061 sipfed.online.lync.com | — | DNS only |
| SRV | _sip._tls | 100 1 443 sipdir.online.lync.com | — | DNS only |

Notes:
- No DKIM selectors (selector1/selector2._domainkey) were present. Consider enabling
  DKIM in the Microsoft 365 Defender portal afterwards (it will supply two CNAMEs to add).
- No DMARC record exists. Recommended addition (monitoring mode to start):
  `TXT  _dmarc  "v=DMARC1; p=none; rua=mailto:rocitconsulting1970@gmail.com"`

## Website — current (GoDaddy WordPress, pre-migration)

| Type | Name | Value |
|---|---|---|
| A | @ | 160.153.0.166 (GoDaddy — will be replaced) |
| CNAME | www | vcsadvisors.com |

## Website — after Netlify cutover

Replace the two records above with:

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | @ | 75.2.60.5 (Netlify load balancer) | DNS only |
| CNAME | www | `<your-site-name>.netlify.app` | DNS only |

Then in Netlify: Domain management → add `vcsadvisors.com` and `www.vcsadvisors.com`;
Netlify issues SSL automatically once DNS resolves. Keep these records DNS-only
(gray cloud) — Netlify provides its own CDN and SSL; proxying through Cloudflare
on top adds a second layer that can cause redirect/SSL complications.

## Cutover order (zero downtime)

1. Create Cloudflare account → Add domain `vcsadvisors.com` (Free plan).
2. Cloudflare auto-imports records — verify against the tables above, add anything missing.
   Leave the site's A/www records pointing at GoDaddy for now (site stays up).
3. At GoDaddy → Domain Settings → Nameservers → change to the two nameservers Cloudflare assigns.
4. Wait for Cloudflare to show the domain as **Active** (minutes up to a few hours).
   Email keeps working throughout because the records are identical.
5. Deploy the site on Netlify and verify it at the `*.netlify.app` URL.
6. In Cloudflare, swap the website records to the Netlify values (table above).
7. After the domain serves from Netlify with valid SSL: cancel the GoDaddy
   **WordPress hosting** plan. Keep the **domain registration**.
