# Anchor & Oak — The Father's Table
### Deep Roots. Steady Hearts.

## Deploying to Vercel

### Option A: Drag & Drop (easiest)
1. Go to vercel.com and sign in
2. Click "Add New Project"
3. Click "Deploy" from the bottom of the page — you'll see an upload option
4. Drag this entire folder into the upload area
5. Click Deploy — your site will be live in ~30 seconds

### Option B: Vercel CLI
1. Install Node.js from nodejs.org
2. Open Terminal and run: npm install -g vercel
3. Navigate to this folder: cd path/to/anchor-oak-deploy
4. Run: vercel
5. Follow the prompts — choose "No" for existing project, accept defaults

---

## Adding Your Custom Domain
1. In Vercel dashboard → your project → Settings → Domains
2. Type your domain name and click Add
3. Vercel will show you DNS records to add — two options:
   - **Nameservers** (easiest): Point your domain's nameservers to Vercel
   - **A Record + CNAME**: Add records at your existing domain registrar
4. Wait 5–60 mins for DNS to propagate
5. Vercel automatically adds a free SSL certificate (https)

---

## Configuring PayPal
Once live, open index.html and update these 3 lines near the top of the <script> block:

  const PAYPAL_CLIENT_ID = 'YOUR_CLIENT_ID';
  PAYPAL_LINKS.monthly = 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=YOUR_MONTHLY_PLAN_ID';
  PAYPAL_LINKS.annual  = 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=YOUR_ANNUAL_PLAN_ID';

Then redeploy by dragging the updated folder into Vercel again.

---

## PWA — Making it Installable
Once hosted at your real domain, visitors will see an "Add to Home Screen" 
banner automatically after 3 seconds. iOS users get step-by-step instructions.

No app store required!

---

## Files in this folder
- index.html   → The complete Anchor & Oak app
- vercel.json  → Vercel routing & security headers config
- README.md    → This file
