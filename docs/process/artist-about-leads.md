# About-copy leads

Raw, unverified facts captured during the
[deferred-`about` variant](artist-editorial-process.md#deferred-about-variant) of the
stage-3 research pass: while genres and location were being researched for an artist,
facts that will plausibly seed its eventual `about` copy, taken only from sources
already open for that research. Rationale: [ADR-0018](../decisions/0018-about-copy-leads-during-deferred-about-passes.md).

These are leads, not content:

- Every line carries the source URL the fact came from.
- Nothing here is verified. When the `about` is written it is re-checked same-day
  against a live source (a Non-negotiable in the editorial process), exactly as if the
  lead were an editor-supplied skeleton.
- No fact here was researched for its own sake: the rule is zero extra web requests
  beyond what genres and location needed.
- When an artist's `about` is verified, move its section to
  [`artist-about-sources.md`](artist-about-sources.md), trimmed to the sources
  actually used ([ADR-0020](../decisions/0020-retain-about-copy-sources-after-verification.md)).
  A slug with no section here either has a verified `about` already or has not been
  through a deferred-`about` round yet.

Format, one section per slug:

```
## some-artist-slug

- Formed in 2014 in Denton, Texas. Source: https://example.com/bio
- Third album 'Title' released 2023, charted at #12. Source: https://example.com/review
```

<!-- Entries begin below. Keep them alphabetical by slug. -->

## rum-jungle

- Four-piece from Newcastle, New South Wales: Benny McIntyre (vocals, guitar), Josh Giles (guitar), Michael Kolmajer (bass), Frazer McDonald (drums). Source: https://en.wikipedia.org/wiki/Rum_Jungle
- Surf rock and alt-pop — floating pop melodies over psych guitars and chilled groove beats; came up through triple j Unearthed. Source: https://equipboard.com/band/rum-jungle
- Four EPs ('Everything Is Easy', 'Crazy Days', 'Sun & Smoke') before the debut album 'Recency Bias' (February 2025); second album 'Marginalia' (2026); played Splendour in the Grass. Source: https://en.wikipedia.org/wiki/Rum_Jungle

## rusowsky

- Real name Ruslan Mediavilla; Spanish, born in Valladolid (1999), raised in Fuenlabrada, Madrid; Belarusian heritage; classical piano from age four, attended a conservatory. Source: https://en.wikipedia.org/wiki/Daisy_(Rusowsky_album)
- A central figure of Madrid's Rusia IDK avant-pop collective (with Ralphie Choo, TRISTÁN!); "genre-melting pop" with "bedroom-club production," influences ranging from Cocteau Twins and Broadcast to Drain Gang and Bon Iver. Source: https://variety.com/2025/music/album-reviews/rusowsky-daisy-album-review-1236408217/
- Debut album 'DAISY' (23 May 2025, Warner), 13 tracks with features from Jean Dawson, Ravyn Lenae, Kevin Abstract and Las Ketchup; has drawn the attention of Rosalía and C. Tangana. Source: https://variety.com/2025/music/album-reviews/rusowsky-daisy-album-review-1236408217/

## vwillz

- From Colorado Springs, Nashville-based; built his audience independently with emotionally honest, genre-bending songwriting; "late-night-drive atmosphere." Source: https://first-avenue.com/performer/vwillz/
- Rooted in emo rap — appears on Wikipedia's list of emo rap artists, and his 2020 breakout single is "Emo Rhapsody" — with a current sound broadened across pop, alternative rock, folk and country. Source: https://blog.lyricallemonade.com/p/emo-rhapsody-vwillz/
- Album 'York' (2025); hundreds of millions of streams; tracks "Falling Slowly," "Sundown," "Darkside." Source: https://www.viberate.com/artist/vwillz/

## world-famous-pets

- A collaborative project of Edie Brickell (Edie Brickell & New Bohemians; married to Paul Simon), drummer/producer Matt Chamberlain, bassist Kaveh Rastegar (Kneebody) and guitarist Mason Stoops. Source: https://stereogum.com/2503846/edie-brickell-matt-chamberlain-kaveh-rastegar-mason-stoops-announce-debut-album-as-world-famous-pets/music
- Began on stage during Paul Simon's 2025 "A Quiet Celebration" tour; built on improvisation, "fluid and responsive rather than fixed." Source: https://relix.com/news/detail/world-famous-pets-edie-brickell-matt-chamberlain-kaveh-rastegar-and-mason-stoops-share-new-song-and-tour-info
- Self-titled debut album (25 September 2026, Shuffle Records); early shows including the Troubadour in Los Angeles. Source: https://www.gratefulweb.com/articles/world-famous-pets-set-debut-album-share-new-song-i-guess-its-you/

## yousuke-yukimatsu

- Born May 1979 in Osaka, Tokyo-based since 2020; came up in the 2010s Osaka and Kobe underground. Source: https://en.wikipedia.org/wiki/Yousuke_Yukimatsu
- An unpredictable, eclectic DJ moving through techno, breakbeat, IDM, ambient, gabber and noise; a deconstructed-club sensibility (RateYourMusic tags his 'Boiler Room: Tokyo' set that way). Source: https://rateyourmusic.com/release/djmix/you_uk%E2%82%AC-yuk1mat_u/boiler-room-tokyo/
- A 2014 set alongside DJ Nobu (leading to a Future Terror booking) established him; founder of the Zone Unknown party series (has hosted Arca, Kamixlo, Palmistry); a 2025 breakout with sets at Berlin Atonal, Berghain and Coachella. Source: https://en.wikipedia.org/wiki/Yousuke_Yukimatsu
