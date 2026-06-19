# Luna Clara — Shopify Store Reference

## Store Info

| Key | Value |
|---|---|
| Store name | luna-clara-designs |
| Store URL | luna-clara-designs.myshopify.com |
| Live theme | Tinker (#160914505956) |
| Partner account | syedxanshah@gmail.com |
| Admin URL | https://admin.shopify.com/store/luna-clara-designs |
| Theme editor | https://luna-clara-designs.myshopify.com/admin/themes/160914505956/editor |

---

## Other Installed Themes

| Theme | ID | Status |
|---|---|---|
| Tinker | 160914505956 | Live |
| Horizon | 160914243812 | Unpublished |
| Craft | 160914637028 | Unpublished |
| Ritual | 160914669796 | Unpublished |
| Atelier | 160914702564 | Unpublished |

---

## Local Theme Files

Theme files are pulled to:
```
C:\Users\xikan\Repo\LunaClaraRepo\shopify-theme\
```

---

## Shopify CLI Commands

### Login
```powershell
shopify auth login
```

### List themes
```powershell
shopify theme list -s luna-clara-designs.myshopify.com
```

### Pull theme files locally
```powershell
shopify theme pull -s luna-clara-designs.myshopify.com --theme 160914505956 --path "C:\Users\xikan\Repo\LunaClaraRepo\shopify-theme"
```

### Push local changes to live store
```powershell
shopify theme push -s luna-clara-designs.myshopify.com --theme 160914505956 --path "C:\Users\xikan\Repo\LunaClaraRepo\shopify-theme"
```

### Start live dev preview
```powershell
shopify theme dev -s luna-clara-designs.myshopify.com --path "C:\Users\xikan\Repo\LunaClaraRepo\shopify-theme"
```

---

## Brand Colors Applied

| Color | Hex | Used for |
|---|---|---|
| Gold | `#C9A84C` | Buttons, links, accents |
| Gold Light | `#E8C97A` | Hover states |
| Cream | `#FDF8F2` | Page + header background |
| Champagne | `#F7E7CE` | Announcement bar background |
| Blush | `#F2B5C0` | Secondary highlights |
| Charcoal | `#2C2C2C` | Text |
| Soft Gray | `#8A8A8A` | Borders, muted text |

---

## Files Edited So Far

| File | What was changed |
|---|---|
| `config/settings_data.json` | Brand colors + Playfair Display / DM Sans fonts |
| `assets/base.css` | Global CSS variables, body font, button overrides |
| `sections/header-announcements.liquid` | Champagne background, gold text |
| `sections/header.liquid` | Cream navbar, gold hover on nav links |

---

## Products (11 total)

Import file: `shopify-products-import.csv`

| SKU | Product | Price |
|---|---|---|
| LC-EAR-001 | Vintage Floral Pearl Earrings | $32 |
| LC-EAR-002 | Starburst Pearl Drop Earrings | $38 |
| LC-NEC-001 | Emerald Halo Necklace | $42 |
| LC-NEC-002 | Golden Rose Locket Necklace | $46 |
| LC-NEC-003 | Shell & Pearl Necklace | $34 |
| LC-BRA-001 | Crystal Wrap Bangle | $48 |
| LC-RNG-001 | Solitaire Crystal Ring | $44 |
| LC-BOX-M01 | Blossom Gift Box | $65 |
| LC-BOX-M02 | Moonlight Gift Box | $72 |
| LC-BOX-L01 | Luna Luxe Box | $110 |
| LC-BOX-L02 | Celestial Gift Box | $125 |

---

## Remaining Shopify Setup

- [ ] Import products CSV
- [ ] Upload logo in Theme Editor → Header
- [ ] Create Collections (Individual Items / Medium Gift Boxes / Large Gift Boxes)
- [ ] Set up Navigation menus
- [ ] Add Pages (About, Contact, Jewelry Care)
- [ ] Enable test payments in Settings → Payments
