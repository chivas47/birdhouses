# My Bird Houses 🐦

A very simple web app for keeping track of nest boxes: where they are, what they
look like, which birds use them, and when they were last cleaned or repaired.

It is built for someone who is **not comfortable with phones and computers**:
big buttons, one question per screen, plain words, no accounts, no passwords,
nothing to install. It works on a phone first, and on a tablet or computer too.

---

## What it can do

| | |
|---|---|
| 🗺️ **Map** | Every bird house is a pin on the map. Pin colour shows how the box is doing: green = good, yellow = needs a repair, red = broken, grey = not sure. Tap a pin to open it. There is a satellite view, which makes finding a particular tree much easier. |
| ➕ **Adding one** | A four step wizard: move the map so the pin is on the box (or tap *Use my location*) → take a photo of the tree → give it a name → done. |
| 📷 **Photos** | Photos of the tree, taken straight from the phone camera. Several per bird house. They are shrunk down before being saved so the phone does not fill up. |
| 🐦 **Birds** | For each box, record which bird was seen, in which **month and year**, and what it was doing (nesting / just visiting / sleeping inside). 19 common nest box birds to pick from — with pictures, so no typing — plus *Another bird* for anything else. |
| 🔧 **Condition** | Every box has a state: good, needs a repair, broken or gone, not sure. |
| 🧰 **Maintenance** | Record cleaning, repairs, replacements or just a look. The app remembers the date and can update the box's condition at the same time. |
| 📊 **Numbers** | How many boxes there are, how many were used by birds this year, how many need attention, how many were cleaned. Plus the most common birds, the months birds were seen in, and a list of the boxes to go and look at (broken, needing repair, or not cleaned for over a year). |
| 🇬🇧 🇵🇹 **Two languages** | English and Portuguese, chosen on the first screen and changeable in Settings. |

---

## Putting it on the internet (GitHub Pages)

You only do this once.

**The easy way**

1. Go to the repository on github.com.
2. Click **Settings** (top of the page) → **Pages** (left-hand menu).
3. Under *Build and deployment* → *Source*, choose **Deploy from a branch**.
4. Pick the branch you want (for example `main`) and the folder **`/ (root)`**, then **Save**.
5. Wait a minute and refresh. GitHub shows the address, which looks like
   `https://<your-username>.github.io/<repository-name>/`.

**The automatic way** — this repository also contains
`.github/workflows/pages.yml`. If you set *Source* to **GitHub Actions**
instead, the site republishes itself every time the code changes.

Open that address on the phone. Nothing has to be installed.

### Making it look like a real app on the phone

* **Android (Chrome):** open the address → menu (⋮) → *Add to Home screen*.
* **iPhone (Safari):** open the address → the share button → *Add to Home Screen*.

It then has its own icon, opens without the browser bars, and still works when
there is no signal (the map pictures for places already visited are kept too).

---

## Where the information is kept

**On the phone, and nowhere else.** There is no server, no account and no
sign-up. Nothing about the bird houses is ever sent over the internet.

That has one consequence worth knowing: if the phone is lost, or the browser's
data is cleared, the information goes with it. So in **Settings** there is
*Save a copy to my phone*, which writes one file containing everything —
bird houses, birds, repairs and the photos. *Load a saved copy* puts it all
back, on the same phone or a new one. Doing this a couple of times a year is
plenty.

The only thing fetched from the internet is the map imagery itself, from
[OpenStreetMap](https://www.openstreetmap.org/copyright) and Esri.

---

## What is in this repository

```
index.html               the whole app is one page
manifest.webmanifest     lets the phone install it to the home screen
sw.js                    makes it work without internet
assets/css/app.css       all the styling
assets/js/i18n.js        every visible word, in English and Portuguese, plus the bird list
assets/js/store.js       bird houses, sightings and maintenance records
assets/js/photos.js      shrinking and storing photos
assets/js/map.js         the map itself (written from scratch, see below)
assets/js/app.js         the screens, the forms and the numbers
assets/icons/            app icons
```

**No libraries, no build step, no npm.** Editing a file and pushing it is enough
to change the site — there is nothing to compile.

The map is a small purpose-written slippy-map (Web Mercator tiles, drag to pan,
pinch or wheel to zoom) rather than a mapping library loaded from a CDN. That
keeps the app to a handful of small files and means a CDN being unreachable can
never leave the owner staring at a blank map.

---

## Map data attribution

Map tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
Satellite imagery © Esri, Maxar, Earthstar Geographics.
Both are shown in the corner of the map, as their terms require.
