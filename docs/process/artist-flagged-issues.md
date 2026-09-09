# Flagged out-of-scope issues

Facts surfaced during artist-review passes that live in a field outside that pass's scope
(most often `about`, since fast/rapid passes skip it). Not auto-fixed at the time they're
found: logged here for a future review pass to address. Remove an entry once its issue is
fixed. New entries record the artist slug and the affected field, plus a sourced summary
of the correction.

> **Triage pending.** Several entries below predate the direct-to-PostgreSQL editorial
> workflow (ADR-0013) and are likely stale or already fixed. Working each entry against
> the current record (`python -m scripts.show_artist <slug>`), applying the cheap
> corrections via `edit_artist`, and re-routing the full rewrites through the editorial
> process is a dedicated follow-up, not part of artist-authoring roadmap section 6 (which
> only moved this file here). Do not treat the entries as current until that pass runs.

## ayybo (about)

Real name stated as "Aaronis Jackson" — sources confirm Aaron Bonnema.

## die-spitz (about)

Member names "Ava Fine" and "Chloe Inendino" don't match current lineup — should be
Ava Schrobilgen and Chloe de St. Aubin.

## omnom (about)

Real name stated as "Cody Cunningham" — sources confirm Cody Lee.

## lucy-bedroque (about)

Copy uses she/her throughout; Wikipedia states Bedroque uses they/he pronouns.

## mc4d (about, whySee)

Surname stated as "DiBari" — sources confirm the twins' real surname is Drake.

## ink (about, tagline, whySee, whatToExpect, tracks)

Entire record beyond genres/location/socials/similarArtists still describes a fictional Chicago
alternative-rock band. The real Ink (verified via the stored Spotify ID) is Atia Chade Boggs, a
Grammy-nominated R&B/soul/country songwriter from the Atlanta area, co-writer of Beyoncé's "Texas
Hold 'Em" and other Cowboy Carter/Renaissance tracks, signed to Big Loud Records. Genres, location,
and similarArtists were corrected; about/tracks still need a full rewrite in a dedicated pass (about
not currently rendered anyway since aboutVerified is unset).

## the-creekers (about, tagline, whySee, whatToExpect, tracks)

Entire record beyond genres/location/socials/similarArtists still describes a fictional Chicago
alt-rock/folk-rock trio. The real Creekers (verified via the stored Spotify ID) are a six-piece
"Creeker-grass" bluegrass/country/pop band — Anna Blanton, Ashton Bowling, Jagger Bowling, Allen
Hacker, Tanner Horton, Scott Sutton — formed in Leslie County, Kentucky in 2022, signed to Warner
Music Nashville, breakout single "Tennessee." Genres, location, and similarArtists were corrected;
about/tracks still need a full rewrite in a dedicated pass.

## next-of-kin (about, tagline, whySee, whatToExpect, tracks)

Entire record beyond genres/location/socials/similarArtists still describes a fictional LA indie-pop
solo artist. The real Next of Kin (verified via the stored Spotify ID) is an Austin, Texas
alt-country/Americana trio (members include Lili and Madison), EP 'Homemaker', single "Jekyll &
Hyde." Genres, location, and similarArtists were corrected; about/tracks still need a full rewrite in
a dedicated pass.

## los-retros (about)

Real name stated as "Maurilio Suarez" — sources (AllMusic, Stones Throw, Wikipedia) confirm
Mauricio "Mauri" Tapia.

## vandelux (about)

Real name stated as "Evan Higgins" — his own Spotify bio and multiple other sources (SOCAN,
LinkedIn) confirm Evan White.

## the-bends (about, tagline, whySee, whatToExpect, similarArtists, tracks)

Entire record beyond genres/location still describes a fictional Chicago post-punk/shoegaze band.
The real The Bends (verified via the stored Spotify ID) is a Baton Rouge, Louisiana-formed,
Nashville-based alternative rock quartet — Hayden Field, Ian Marmande, Jacob Rhodes, Chase Perkins —
known for the breakout single "Makeup" (boosted by Zach Bryan, 6M+ Spotify streams), reimagining
early-2000s garage rock with catchy choruses. Genres and location were corrected; about/
similarArtists/tracks need a full rewrite in a dedicated pass.

## after (about, tagline, whySee, whatToExpect, similarArtists, tracks)

Entire record beyond genres/location still describes a fictional Chicago SoundCloud rap/trap solo
producer. The real After (verified via the stored Spotify ID, self-tagged "Trip Pop") is an LA pop
duo — Graham Epstein and Justine Dorsey, formed 2023 — described as "Massive Attack meets Michelle
Branch," spanning synth-pop, trip hop, and electropop. Genres and location were corrected; about/
similarArtists/tracks need a full rewrite in a dedicated pass.

## whatmore (about, tagline, whySee, whatToExpect, similarArtists, tracks)

Entire record beyond genres/location still describes a fictional Chicago alternative/folk-rock
band. The real WHATMORE (verified via the stored Spotify ID, corroborated independently by a
Lollapalooza 2026 lineup listing placing them Sunday Aug 2, matching our stored appearance) is a
genre-bending NYC collective — formed 2024 out of LaGuardia High School in Manhattan, first show at
Baby's All Right, member/collaborator Cisco Swank — compared to Brockhampton/Odd Future, spanning
indie pop, alt hip-hop, and pop-punk. Genres and location were corrected; about/similarArtists/
tracks need a full rewrite in a dedicated pass.

## porch-light (about, tagline, whySee, whatToExpect, similarArtists, tracks)

Entire record beyond genres/location still describes a fictional LA bedroom-pop singer-songwriter
(word-for-word identical about/tagline/tracks to stella-lefty's fictional persona, apparently a
copy-paste error). The real Porch Light (verified via the stored Spotify ID, corroborated
independently by a Lollapalooza 2026 lineup listing placing them Sunday Aug 2, matching our stored
appearance) is a Minneapolis indie-rock band — Zac Fogarty, Jackie Uhas, Henry Hughes, Kyle Siemon,
Isaiah Trimbo — pitched as "90s Radiohead meets Paramore/Slow Pulp/Big Thief," top track "Oxygen"
(19M+ streams). Genres and location were corrected; about/similarArtists/tracks need a full rewrite
in a dedicated pass.

## stella-lefty (about, tagline, whySee, whatToExpect, similarArtists, tracks)

Entire record beyond genres/location still describes a fictional LA bedroom-pop singer-songwriter
(word-for-word identical about/tagline/tracks to porch-light's fictional persona, apparently a
copy-paste error). The real Stella Lefty (verified via the stored Spotify ID, corroborated
independently by an Apple Music Lollapalooza 2026 concert listing placing her Sunday Aug 2,
7:45-8:30 PM, Airbnb stage — matching our stored appearance exactly) is Stella Lefkofsky, a viral
country-pop artist (16M+ monthly listeners, hit single "Boston" at 133M+ streams, EP 'Is This
Heaven?' debuted on the Billboard 200 and Top Country Albums charts). Genres were corrected;
location was already accurate. about/similarArtists/tracks need a full rewrite in a dedicated pass.

## case-oats (about, tagline, whySee, whatToExpect, similarArtists, tracks)

Entire record beyond genres/location still describes a fictional Chicago alternative-rock
collective (word-for-word identical about/tagline/tracks to whatmore's fictional persona, apparently
a copy-paste error, down to sharing track titles "Under the Skyline" and "Closer Now"). The real
Case Oats (verified via the stored Spotify ID, corroborated by Block Club Chicago's "Lollapalooza
Local Acts 2026" piece naming them specifically as a Chicago local act on the bill, plus Rolling
Stone/WBEZ/Sun-Times coverage) is a Chicago alt-country band led by Casey Gomez Walker and Spencer
Tweedy (with Max Subar, Jason Ashworth, Scott Daniel), signed to Merge Records, debut album 'Last
Missouri Exit' (2025). Genres were corrected; location was already accurate. about/similarArtists/
tracks need a full rewrite in a dedicated pass.

## day-we-ran (about)

`about` states "Chicago-born alternative rock quartet," but the stored `location` (already verified)
is Lennox Head, Australia. Surfaced incidentally during a `similarArtists`-only pass; `about` itself
wasn't in scope to rewrite this round.

## surfing-for-daisy (about, tagline, whySee, whatToExpect, similarArtists, tracks)

Entire record beyond genres/location was cloned from easy-honey's record (same Charleston, SC
location, same "Peach State" album, same tracks "Steady"/"Spells"/"Gotta Tree"). The real Surfing
for Daisy (verified via the stored Spotify ID, corroborated by a livemusicblog.com piece and an
Asbury Park Vibes profile that both identify the band by its own formation story and state its
Lollapalooza 2026 booking directly) is an Asbury Park, NJ alt-folk-rock/psych band — Nick Francis,
Mike Bernabei, Steven Filippone, Cam Seidel, Dan DiSantis, Kathryn McCarty — known for selling out
The Stone Pony and playing Sea.Hear.Now. Genres and location were corrected; about/similarArtists/
tracks need a full rewrite in a dedicated pass.

## brigitte-calls-me-baby (genres)

Stored genres are Post-Punk, New Wave, Chamber Pop. Sources consulted for the `about`
(Wikipedia, NME) describe the band as post-punk, new wave, and jangle pop, and none support
"chamber pop." Surfaced during the `about` write; genres were not in scope to change.
Candidate swap: jangle pop.

## cassandra-coleman (location)

Stored location is Nashville. Nashville Voyager describes her as "based in Columbia,
Tennessee" and Apple Music lists Columbia, TN as her hometown; only a 2021 HollywoodLife
piece said Nashville. Her interviews describe growing up in rural Tennessee "near the Blue
Ridge Mountains" (East Tennessee), which is not Columbia (Middle Tennessee). Surfaced during
the `about` write; location was not in scope to change. Candidate: Columbia, TN.

## dexter-and-the-moonrocks (location)

Stored location is Abilene, Texas. Wikipedia states verbatim "While various media sources
have listed their hometown as being Abilene, they are from rural Throckmorton County,
Texas" (~70 miles northeast); Songfacts concurs. The Abilene framing traces to a Texas
Monthly headline. Surfaced during the `about` write. Candidate: Throckmorton, Texas.

## cure-for-paranoia (genres)

Stored genres are Alternative Hip-Hop, Neo-Soul, Funk. "Alternative hip-hop" is
consistently supported; the neo-soul and funk tags trace to a Dallas Observer interview
("trippy soul-infused hip-hop... rap, R&B, funk and jazz") that was not re-read this pass.
Worth a check against a current source.

## damaris-bojor (name, tracks)

Stored name is "Damaris Bojor"; sources consistently render it "Dámaris Bójor" with
accents. Stored Quick Picks track "Miro Al Cielo" is more correctly "Miro al Cielo"
(lowercase "al"). Surfaced during the `about` write.

## dj-cassandra (genres)

Stored genres are Disco House, House, Funk. Her official bio describes a "signature
multi-genre style" blending classical training with "modern electronic sounds" and does not
name a house or disco subgenre. The disco-house tags are not contradicted but not
confirmed. Worth a check.

## ethan-regan (location)

Stored location is Raleigh, North Carolina. His own press bio (First Avenue, Duck Club)
says "this Charlotte native." The Raleigh value traces to clture.org, which no longer
loads. The `about` copy uses Charlotte. Candidate: Charlotte, North Carolina.

## fai-laci (genres)

Stored genres are Indie Rock, Garage Rock, Punk Rock. Sources consulted for the `about`
(Big Hassle, Melt FM, Easy Eye Sound) describe punk, glam, classic rock and "alternative
rock"; none use "garage rock." Surfaced during the `about` write. Candidate: revisit the
third genre.
