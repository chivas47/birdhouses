# Meine Nistkästen 🐦

A very simple web app for keeping track of nest boxes: where they are, what they
look like, which birds use them, and when they were last cleaned or repaired.

It is built for **an older person in Germany who is not comfortable with phones
and computers**: it opens in German, with big buttons, one question per screen,
plain words, no accounts, no passwords and nothing to install. It works on a
phone first, and on a tablet or computer too.

---

## What it can do

| | |
|---|---|
| 🗺️ **Map** | Every bird house is a pin on the map. Pin colour shows how the box is doing: green = good, yellow = needs a repair, red = broken, grey = not sure. Tap a pin to open it. There is a satellite view, which makes finding a particular tree much easier. |
| ➕ **Adding one** | A four step wizard: move the map so the pin is on the box (or tap *Use my location*) → take a photo of the tree → give it a name → done. |
| 📷 **Photos** | Photos of the tree, taken straight from the phone camera. Several per bird house. They are shrunk down before being saved so the phone does not fill up. |
| 🖼️ **Photo shelf** | A whole tab of its own. Walk round and photograph as many trees as you like — from the camera, or picked out of the phone's own pictures — without deciding anything. Each waiting photo is then shown large with one green button: *put this with a nest box*. Pick the box from a list, or turn the photo straight into a **new** nest box. A small number on the tab says how many are still waiting; nothing is ever thrown away by accident, and the waiting photos go into the backup like everything else. |
| 🐦 **Birds** | For each box, record which bird was seen, in which **month and year**, and what it was doing (nesting / just visiting / sleeping inside). **104 birds and other lodgers found in Germany** to pick from — with pictures, so no typing at all is needed — plus *Anderer Vogel* for anything else. |
| 🔧 **Condition** | Every box has a state: good, needs a repair, broken or gone, not sure. |
| 🗂️ **One box, two subjects** | Opening a nest box gives two clearly separate cards, each with its own coloured heading and its own button. **Zustand und Reparaturen** says in a sentence what, if anything, needs doing (and warns when a box has not been seen to for over a year), then lists the jobs already done. **Vögel in diesem Nistkasten** says which birds have been in it this year, then lists every sighting by year. Photos and the plain facts follow underneath. |
| 🧰 **Maintenance** | Record cleaning, repairs, replacements or just a look. The app remembers the date and can update the box's condition at the same time. |
| 📊 **Numbers** | How many boxes there are, how many were used by birds this year, how many need attention, how many were cleaned. Plus the most common birds, the months birds were seen in, and a list of the boxes to go and look at (broken, needing repair, or not cleaned for over a year). |
| 🔎 **Finding a bird** | Birds already written down come first, then the fourteen commonest; the rest are folded away by group (nest box nesters, woodpeckers, garden and woodland birds, large birds and birds of prey, water birds, other guests). A search box finds a bird by name in any of the three languages, and understands everyday names too — *Spatz*, *Dompfaff*, *Distelfink*, *Eule*, *Greifvogel*. |
| 🔠 **Text size** | *Einstellungen → Schriftgröße → Groß* makes the whole app — buttons and all — a size larger. |
| 🇩🇪 🇬🇧 🇵🇹 **Three languages** | The app starts in **German** every time, with nothing to choose first. English and Portuguese are in Settings, for anyone else who picks up the phone. |

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
bird houses, birds, repairs, and every photo, the ones still waiting on the
photo shelf included. *Load a saved copy* puts it all
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
assets/js/i18n.js        every visible word, in German, English and Portuguese,
                         plus the list of birds
assets/js/store.js       bird houses, sightings, maintenance records and the
                         shelf of photos not yet given to a bird house
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

---

## The bird list

`assets/js/i18n.js` holds every bird in one array. An entry looks like this:

```js
{ id: 'nuthatch', g: 'common', de: 'Kleiber', en: 'Nuthatch', pt: 'Trepadeira-azul',
  c: ['#6f8fb5', '#5d7ea6', '#f2e2c9'] }
```

* `id` is what gets written into a saved sighting, so **existing ids are never
  renamed** — renaming one would orphan the records already on someone's phone.
* `g` decides which group the bird appears under: `common`, `nest`, `specht`,
  `garden`, `big`, `water`, `other`.
* `c` is the three colours of the little drawn bird — body, head, cheek. Use `e`
  with an emoji instead for the ones a drawn songbird would misrepresent: owls,
  birds of prey, ducks, bats, bees.

Everyday German names that are not the book name live in the `ALT` table just
below the array, and are searched alongside the three official names.

To add a bird, add one line. Nothing else needs changing.
