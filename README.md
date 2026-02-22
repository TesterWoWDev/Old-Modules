# Old TSWoW Modules (Archive)

This repository is a **dump of old / abandoned TSWoW modules**. They’re kept here for reference, code browsing, and salvaging ideas — **do not expect them to work on current TSWoW versions**, and **do not expect support**.

- ✅ Feel free to fork / copy / adapt anything you find useful
- ❌ No guarantees on compatibility, completeness, or correctness
- ❌ No maintenance, bugfixes, or “please update for latest TSWoW” support

---

## What’s in here?

This repo currently contains these module folders:

- `addn-mod`
- `battleroyale`
- `classes-mod-backup`
- `emoji-module`
- `minecraft-mod`
- `player-housing-farming-module`
- `testing`
- `wardonic`

### Module notes

#### `player-housing-farming-module`
A player housing + farming concept is implemented using **phasing** to create **solo player areas**, and includes helpers for **inviting other players to your house** 

#### `emoji-module`
The datascripts include logic that **writes out client asset files** (e.g., `.M2` and `.skin`) into a module assets path — generates/installs “emoji” visuals via custom models/textures.

## Usage (at your own risk)

Typical TSWoW module workflow (high level):

1. Copy a module folder into your TSWoW `modules/` directory.
2. Ensure the module’s `datascripts.conf` / addon / livescripts configs are enabled (if present).
3. Build / run your TSWoW pipeline as you normally would.
4. Fix whatever breaks (because these are old).

> Expect breaking changes across TSWoW versions. Treat these as code samples, not plug-and-play modules.

---

## Support policy

**No support provided.**  
If you open an issue, it will be ignored/closed. If you submit a PR that improves documentation (especially “what this module does”), it may be accepted — but maintenance is not guaranteed.

---

## Contributing

If you want to help make this archive more useful:

- Add a short `README.md` inside each module folder with:
  - What it does
  - How to install
  - How to test
  - Known issues / required TSWoW version (if known)
- Add screenshots, spell IDs, NPC IDs, map coords, etc. where relevant
