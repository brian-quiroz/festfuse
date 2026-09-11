# About-copy sources

Retained provenance for verified `about` copy: the sources a shipped `about` was
built from, kept so a later [freshness re-review](artist-editorial-process.md#freshness-re-review)
or a challenged fact can be traced without re-researching. Rationale:
[ADR-0020](../decisions/0020-retain-about-copy-sources-after-verification.md).

How it works:

- A slug's section is written in the same commit that sets `aboutVerified: true`
  for it. The sources come straight from the verification the editor just approved.
- Each section reproduces the final `about` copy with `[\[N\]](url)` citation
  markers after the claims each source backs, then a numbered source list. Numbers
  are scoped to that section: every artist starts again at 1.
- Every marker is a link, including repeats of the same number. The rendered marker
  reads `[N]`.
- A source consulted but not used in the copy does not belong here.
- When an artist came through the [deferred-`about` variant](artist-editorial-process.md#deferred-about-variant),
  its [`artist-about-leads.md`](artist-about-leads.md) section moves here on verify.
- This is a permanent record, not a worklist. A section is never removed; a
  re-verify updates it in place. A slug appearing here means its `about` has been
  verified under ADR-0020.
- Integrity rules from the editorial process carry over: cite only a page that was
  opened and read, and a search-result summary is a pointer, not a source.

Relationship to the sibling files: [`artist-about-leads.md`](artist-about-leads.md)
holds raw facts for `about` copy not yet written;
[`artist-flagged-issues.md`](artist-flagged-issues.md) logs out-of-scope sourced
corrections; this file holds the provenance of copy that shipped.

Format, one section per slug:

```
## some-artist-slug

Formed in 2014 in Denton, Texas.[\[1\]](https://example.com/bio) Their third album
'Title' arrived in 2023[\[1\]](https://example.com/bio) and charted at number
12.[\[2\]](https://example.com/review)

**Sources**

1. https://example.com/bio
2. https://example.com/review
```

<!-- Entries begin below. Keep them alphabetical by slug. -->

## aaron-rowe

Aaron Rowe is an Irish singer-songwriter from Monkstown Farm on the south side of Dublin,[\[1\]](https://guitar.com/features/interviews/aaron-rowe-interview/) who boxed competitively for years before turning to music.[\[1\]](https://guitar.com/features/interviews/aaron-rowe-interview/) His debut single 'Hey Ma', released on Columbia Records in May 2025,[\[2\]](<https://en.wikipedia.org/wiki/Hey_Ma_(Aaron_Rowe_song)>) sets acoustic guitar against fiddle to trace leaving home through the people and streets he grew up around.[\[3\]](https://www.clashmusic.com/news/aaron-rowes-hey-ma-is-a-stunning-introduction/) The EP 'Exodus' followed in September 2025, produced by Iain Archer and Todd Clark.[\[4\]](<https://en.wikipedia.org/wiki/Exodus_(Aaron_Rowe_EP)>) He supported Lewis Capaldi across UK arenas that autumn,[\[5\]](https://www.rollingstone.co.uk/music/aaron-rowe-play-next-interview-hey-ma-lewis-capaldi-ed-sheeran-51001/) and Ed Sheeran, who gave him a custom Lowden acoustic, took him on tour through the US and Australia.[\[1\]](https://guitar.com/features/interviews/aaron-rowe-interview/)

**Sources**

1. https://guitar.com/features/interviews/aaron-rowe-interview/
2. https://en.wikipedia.org/wiki/Hey_Ma_(Aaron_Rowe_song)
3. https://www.clashmusic.com/news/aaron-rowes-hey-ma-is-a-stunning-introduction/
4. https://en.wikipedia.org/wiki/Exodus_(Aaron_Rowe_EP)
5. https://www.rollingstone.co.uk/music/aaron-rowe-play-next-interview-hey-ma-lewis-capaldi-ed-sheeran-51001/

## almost-heaven

Almost Heaven is an Austin duo of Stefan Barraza, who began the project alone in El Paso, and drummer Jaelyn Valero.[\[1\]](https://austin.culturemap.com/news/entertainment/almost-heaven-raw-cranium-release/) It became a two-piece after Barraza moved to Austin in 2024.[\[1\]](https://austin.culturemap.com/news/entertainment/almost-heaven-raw-cranium-release/) Their debut EP 'RAW CRANIUM' arrived in January 2026 on Raw Cranium Records, the pair's own imprint,[\[1\]](https://austin.culturemap.com/news/entertainment/almost-heaven-raw-cranium-release/) collecting singles like 'hypnoxia' and 'fever trying to blow'[\[2\]](https://www.austinchronicle.com/columns/in-the-pocket/almost-heaven-manifests-world-domination-with-raw-cranium/) alongside new material.[\[1\]](https://austin.culturemap.com/news/entertainment/almost-heaven-raw-cranium-release/) The sound pulls from LCD Soundsystem, Crystal Castles and Daft Punk into something critics have tied to the bloghouse revival,[\[1\]](https://austin.culturemap.com/news/entertainment/almost-heaven-raw-cranium-release/) and it is built for the warehouse: strobing light, stylized visuals, and Barraza in his signature bug-eyed shades.[\[1\]](https://austin.culturemap.com/news/entertainment/almost-heaven-raw-cranium-release/)[\[2\]](https://www.austinchronicle.com/columns/in-the-pocket/almost-heaven-manifests-world-domination-with-raw-cranium/)

**Sources**

1. https://austin.culturemap.com/news/entertainment/almost-heaven-raw-cranium-release/
2. https://www.austinchronicle.com/columns/in-the-pocket/almost-heaven-manifests-world-domination-with-raw-cranium/

## amyl-and-the-sniffers

Amyl and the Sniffers formed in 2016 in the Melbourne suburb of Balaclava,[\[1\]](https://en.wikipedia.org/wiki/Amyl_and_the_Sniffers) a share-house band whose first EP 'Giddy Up' was written, recorded and released inside a single day.[\[1\]](https://en.wikipedia.org/wiki/Amyl_and_the_Sniffers) Fronted by Amy Taylor, the four-piece plays Australian pub rock with the snarl of Iggy and the Stooges.[\[1\]](https://en.wikipedia.org/wiki/Amyl_and_the_Sniffers) Their self-titled 2019 debut won the ARIA for Best Rock Album,[\[1\]](https://en.wikipedia.org/wiki/Amyl_and_the_Sniffers) and 'Cartoon Darkness', made with Nick Launay at the Foo Fighters' Studio 606 and released in 2024,[\[2\]](https://roughtraderecords.com/wp/2024/08/21/amyl-and-the-sniffers-announce-new-album-cartoon-darkness/) swept Album of the Year, Best Group and Best Rock Album at the 2025 ARIAs.[\[1\]](https://en.wikipedia.org/wiki/Amyl_and_the_Sniffers) Amy Taylor writes it around climate collapse, war, and the numbing pull of life online.[\[2\]](https://roughtraderecords.com/wp/2024/08/21/amyl-and-the-sniffers-announce-new-album-cartoon-darkness/)

**Sources**

1. https://en.wikipedia.org/wiki/Amyl_and_the_Sniffers
2. https://roughtraderecords.com/wp/2024/08/21/amyl-and-the-sniffers-announce-new-album-cartoon-darkness/

## annie-dirusso

Annie DiRusso grew up in Croton-on-Hudson, New York,[\[1\]](https://en.wikipedia.org/wiki/Annie_DiRusso) and moved to Nashville for Belmont University, then stayed for the scene.[\[2\]](https://wnxp.org/annie-dirusso-bursts-through-the-boys-club-on-super-pedestrian/) She built an early audience releasing songs herself in college, including the 2021 tracks 'Nine Months' and 'Coming Soon'.[\[1\]](https://en.wikipedia.org/wiki/Annie_DiRusso) The EP 'God, I Hate This Place' came in 2023,[\[1\]](https://en.wikipedia.org/wiki/Annie_DiRusso) and her debut album 'Super Pedestrian' followed in March 2025,[\[1\]](https://en.wikipedia.org/wiki/Annie_DiRusso) produced by Caleb Wright and co-produced by her bandmate Eden Joel at Drop of Sun in Asheville, much of it written in alternate guitar tunings.[\[2\]](https://wnxp.org/annie-dirusso-bursts-through-the-boys-club-on-super-pedestrian/) Her songs run on 1990s alternative roots, big hooks and bigger volume,[\[2\]](https://wnxp.org/annie-dirusso-bursts-through-the-boys-club-on-super-pedestrian/) and she has opened for Samia, Peach Pit and HAIM.[\[1\]](https://en.wikipedia.org/wiki/Annie_DiRusso)

**Sources**

1. https://en.wikipedia.org/wiki/Annie_DiRusso
2. https://wnxp.org/annie-dirusso-bursts-through-the-boys-club-on-super-pedestrian/

## arcy-drive

Arcy Drive is a four-piece from Northport, New York, on Long Island's North Shore, where the members met in school and worked out their sound jamming in an attic.[\[1\]](https://grandjurymusic.com/artist/arcy-drive/) They call the result 'attic rock', angsty emo run through classic garage rock.[\[1\]](https://grandjurymusic.com/artist/arcy-drive/) Before their first official release they renovated an old school bus and toured the country on it.[\[1\]](https://grandjurymusic.com/artist/arcy-drive/) The EP 'Beach Plum' arrived on Grand Jury Music in 2023,[\[1\]](https://grandjurymusic.com/artist/arcy-drive/) followed by the debut album 'The Pit' in April 2025.[\[2\]](https://thewholekameese.com/2025/04/18/arcy-drive-release-phenomenal-debut-album-the-pit/) They have since played Bonnaroo and Lollapalooza.[\[1\]](https://grandjurymusic.com/artist/arcy-drive/)

**Sources**

1. https://grandjurymusic.com/artist/arcy-drive/
2. https://thewholekameese.com/2025/04/18/arcy-drive-release-phenomenal-debut-album-the-pit/

## asleep-at-the-wheel

Asleep at the Wheel started in 1970 on a farm in Paw Paw, West Virginia,[\[1\]](https://www.asleepatthewheel.com/about)[\[2\]](https://en.wikipedia.org/wiki/Asleep_at_the_Wheel) built around Ray Benson, who grew up playing folk in the Philadelphia suburbs before Western swing took hold.[\[3\]](https://www.texasstandard.org/stories/asleep-at-the-wheel-celebrates-50-years-of-western-swing/) The band moved west to California, then to Austin in 1974 at the urging of Willie Nelson and Doug Sahm,[\[1\]](https://www.asleepatthewheel.com/about) and made the city the genre's home base.[\[1\]](https://www.asleepatthewheel.com/about) More than five decades on, with over 30 records and ten Grammy Awards,[\[1\]](https://www.asleepatthewheel.com/about) they remain the keepers of the Bob Wills and His Texas Playboys songbook:[\[2\]](https://en.wikipedia.org/wiki/Asleep_at_the_Wheel)[\[3\]](https://www.texasstandard.org/stories/asleep-at-the-wheel-celebrates-50-years-of-western-swing/) a fiddle-and-steel dance band[\[1\]](https://www.asleepatthewheel.com/about) that has carried Western swing across generations. Ray Benson is the last of the founding members.[\[1\]](https://www.asleepatthewheel.com/about)

**Sources**

1. https://www.asleepatthewheel.com/about
2. https://en.wikipedia.org/wiki/Asleep_at_the_Wheel
3. https://www.texasstandard.org/stories/asleep-at-the-wheel-celebrates-50-years-of-western-swing/

## audrey-hobert

Audrey Hobert was born in New York City, grew up in Los Angeles, and graduated from NYU in 2021 with a degree in screenwriting.[\[1\]](https://en.wikipedia.org/wiki/Audrey_Hobert) She spent two years as a staff writer on the Nickelodeon sitcom 'The Really Loud House' before turning to music with her childhood friend Gracie Abrams, whom she met at Abrams' fifth-grade graduation.[\[1\]](https://en.wikipedia.org/wiki/Audrey_Hobert) She co-wrote 'Risk' and 'I Love You, I'm Sorry' on Abrams' 2024 album 'The Secret of Us' and directed both videos.[\[1\]](https://en.wikipedia.org/wiki/Audrey_Hobert)[\[3\]](https://www.nylon.com/entertainment/audrey-hobert-sue-me-gracie-abrams-music) In May 2025 she released her debut solo single 'Sue Me' on RCA Records, followed by her 12-track debut album 'Who's the Clown?' that August.[\[2\]](<https://en.wikipedia.org/wiki/Sue_Me_(Audrey_Hobert_song)>)[\[4\]](<https://en.wikipedia.org/wiki/Who%27s_the_Clown%3F>) She landed on the album's title and cover the morning after finishing the song 'Sex and the City'.[\[5\]](https://www.coupdemainmagazine.com/audrey-hobert/20184) Her songwriting leans on deadpan humor and narrative detail, set to guitar-driven pop.[\[1\]](https://en.wikipedia.org/wiki/Audrey_Hobert)

**Sources**

1. https://en.wikipedia.org/wiki/Audrey_Hobert
2. https://en.wikipedia.org/wiki/Sue_Me_(Audrey_Hobert_song)
3. https://www.nylon.com/entertainment/audrey-hobert-sue-me-gracie-abrams-music
4. https://en.wikipedia.org/wiki/Who%27s_the_Clown%3F
5. https://www.coupdemainmagazine.com/audrey-hobert/20184

## bad-nerves

Bad Nerves began at Christmas 2015, when guitarist Will Phillipson texted frontman Bobby Nerves proposing they start a band, and the pair wrote their early songs in a garage.[\[1\]](https://discover.ticketmaster.co.uk/new-music/bad-nerves-band-interview-61578/) The five-piece, rounded out by George Berry, Jonathan Poulton, and Samuel Thompson, released their self-titled debut album in 2020 and its follow-up, 'Still Nervous', in 2024, both recorded in that same garage.[\[1\]](https://discover.ticketmaster.co.uk/new-music/bad-nerves-band-interview-61578/)[\[2\]](https://www.last.fm/music/Bad+Nerves/+wiki)[\[4\]](https://slrmagazine.com/2024/03/02/bad-nerves-announce-new-album-still-nervous-for-release-may-31st/) Their hook-driven, sub-two-minute songs have drawn comparisons to the Ramones, the Strokes, and the Black Keys, and earned them support slots with Royal Blood, the Hives, and Nothing But Thieves.[\[3\]](https://www.messedmag.com/2024/03/14/essex-punks-bad-nerves-talk-breakthrough-year-writing-their-fastest-songs-ever-and-buying-mansions-in-the-future-interview/) In 2024 they signed to Loosegroove Records, the label co-founded by Pearl Jam's Stone Gossard, and the following year Green Day's Billie Joe Armstrong invited them to open shows on his band's South American tour, calling them 'the best band in England right now.'[\[5\]](https://lollipopmagazine.com/2024/10/bad-nerves-sign-with-loosegroove-records-on-fall-tour-news/)[\[6\]](https://es.rollingstone.com/arg-quienes-son-los-bad-nerves-la-banda-inglesa-que-eligio-green-day-para-su-tour-sudamericano/)

**Sources**

1. https://discover.ticketmaster.co.uk/new-music/bad-nerves-band-interview-61578/
2. https://www.last.fm/music/Bad+Nerves/+wiki
3. https://www.messedmag.com/2024/03/14/essex-punks-bad-nerves-talk-breakthrough-year-writing-their-fastest-songs-ever-and-buying-mansions-in-the-future-interview/
4. https://slrmagazine.com/2024/03/02/bad-nerves-announce-new-album-still-nervous-for-release-may-31st/
5. https://lollipopmagazine.com/2024/10/bad-nerves-sign-with-loosegroove-records-on-fall-tour-news/
6. https://es.rollingstone.com/arg-quienes-son-los-bad-nerves-la-banda-inglesa-que-eligio-green-day-para-su-tour-sudamericano/

## balu-brigada

Balu Brigada is the Auckland band of brothers Henry and Pierre Beasley, sons of a Royal New Zealand Ballet dancer and an actress, who both studied music at Auckland University, Pierre in jazz and Henry in pop.[\[1\]](https://en.wikipedia.org/wiki/Balu_Brigada)[\[3\]](https://www.onestowatch.com/en/blog/get-to-know-groove-pop-duo-balu-brigada-live) They formed in their parents' rumpus room in 2016, changed the name from Baloo to sidestep a Disney problem, and moved to New York after signing in 2022 to ARRO, the label co-founded by Twenty One Pilots' Tyler Joseph, through Atlantic and Warner Music Australia.[\[1\]](https://en.wikipedia.org/wiki/Balu_Brigada)[\[2\]](https://www.yahoo.com/entertainment/balu-brigada-breakthrough-hit-cold-165436808.html)[\[3\]](https://www.onestowatch.com/en/blog/get-to-know-groove-pop-duo-balu-brigada-live) Henry coined the tag they use for the sound, 'groove-pop', built on the Frank Ocean, Gorillaz and N.E.R.D records they grew up on.[\[3\]](https://www.onestowatch.com/en/blog/get-to-know-groove-pop-duo-balu-brigada-live) The single 'So Cold' reached number one on the US Alternative Airplay chart in 2025, the first act to top it with a first charted song since Dexter and the Moonrocks.[\[1\]](https://en.wikipedia.org/wiki/Balu_Brigada)[\[2\]](https://www.yahoo.com/entertainment/balu-brigada-breakthrough-hit-cold-165436808.html) The debut album 'Portal' followed in August 2025, and they have toured the world opening for Twenty One Pilots.[\[1\]](https://en.wikipedia.org/wiki/Balu_Brigada)[\[2\]](https://www.yahoo.com/entertainment/balu-brigada-breakthrough-hit-cold-165436808.html)

**Sources**

1. https://en.wikipedia.org/wiki/Balu_Brigada
2. https://www.yahoo.com/entertainment/balu-brigada-breakthrough-hit-cold-165436808.html
3. https://www.onestowatch.com/en/blog/get-to-know-groove-pop-duo-balu-brigada-live

## bella-kay

Bella Kay was born in Houston in 2006 and moved to Orlando as a teenager, where she started posting song clips to social media before her career took off.[\[1\]](https://en.wikipedia.org/wiki/Bella_Kay) Her debut single 'The Sick' (2025) surpassed 100 million streams on Spotify, and the 2026 single 'iloveitiloveitiloveit' reached number 17 on the US Billboard Hot 100 and number 2 on the UK Singles Chart.[\[1\]](https://en.wikipedia.org/wiki/Bella_Kay) Signed to Atlantic Records,[\[2\]](https://www.musicweek.com/radar/read/on-the-radar-bella-kay/094296) she released her debut EP 'sick to my stomach' in November 2025.[\[1\]](https://en.wikipedia.org/wiki/Bella_Kay)[\[3\]](https://theconcertchronicles.com/2025/11/20/bella-kay-releases-debut-ep-sick-to-my-stomach/) She followed it with the EP 'are you mad at me?'.[\[4\]](https://www.officialcharts.com/chart-news/bella-kay-interview-are-you-mad-at-me-new-ep/) Her 13-track debut album 'My Reckless Abandon' arrived in July 2026 and reached number 96 on the Billboard 200.[\[1\]](https://en.wikipedia.org/wiki/Bella_Kay)[\[5\]](https://www.thatericalper.com/2026/07/17/alt-pop-riser-bella-kay-releases-debut-album-my-reckless-abandon/) She has called the album cathartic, built from 'all of my thoughts, the good, bad, confusing, obsessive, honest, and beautiful ones,' and hopes listeners 'recognize themselves and their own experiences' in it.[\[5\]](https://www.thatericalper.com/2026/07/17/alt-pop-riser-bella-kay-releases-debut-album-my-reckless-abandon/) Her music pairs alt-pop production with acoustic guitar and confessional songwriting, and she counts Rihanna, Olivia Rodrigo, and Sabrina Carpenter among her influences.[\[1\]](https://en.wikipedia.org/wiki/Bella_Kay)[\[4\]](https://www.officialcharts.com/chart-news/bella-kay-interview-are-you-mad-at-me-new-ep/)

**Sources**

1. https://en.wikipedia.org/wiki/Bella_Kay
2. https://www.musicweek.com/radar/read/on-the-radar-bella-kay/094296
3. https://theconcertchronicles.com/2025/11/20/bella-kay-releases-debut-ep-sick-to-my-stomach/
4. https://www.officialcharts.com/chart-news/bella-kay-interview-are-you-mad-at-me-new-ep/
5. https://www.thatericalper.com/2026/07/17/alt-pop-riser-bella-kay-releases-debut-album-my-reckless-abandon/

## bleachers

Bleachers started in 2013 in Bergenfield, New Jersey, as Jack Antonoff's own band.[\[1\]](<https://en.wikipedia.org/wiki/Bleachers_(band)>) Away from it, Antonoff is one of pop's most in-demand producers, with credits for Taylor Swift, Lana Del Rey, and Lorde and three straight Grammy wins for Producer of the Year from 2022 to 2024.[\[2\]](https://en.wikipedia.org/wiki/Jack_Antonoff) The band's four albums, from 'Strange Desire' (2014) to the self-titled 'Bleachers' (2024), lean on 1980s synthesizers, saxophone, and wide, anthemic arrangements.[\[1\]](<https://en.wikipedia.org/wiki/Bleachers_(band)>)[\[3\]](<https://en.wikipedia.org/wiki/Bleachers_(album)>) A fifth album, 'Everyone for Ten Minutes', arrived in May 2026 on Dirty Hit.[\[4\]](https://en.wikipedia.org/wiki/Everyone_for_Ten_Minutes)

**Sources**

1. https://en.wikipedia.org/wiki/Bleachers_(band)
2. https://en.wikipedia.org/wiki/Jack_Antonoff
3. https://en.wikipedia.org/wiki/Bleachers_(album)
4. https://en.wikipedia.org/wiki/Everyone_for_Ten_Minutes

## blood-orange

Blood Orange is the alt-R&B and art-pop project of British-born, New York-based songwriter, producer, and multi-instrumentalist Devonté Hynes.[\[2\]](https://en.wikipedia.org/wiki/Dev_Hynes) Before Blood Orange he recorded as Test Icicles and then Lightspeed Champion, debuting the current project with 2011's 'Coastal Grooves'.[\[1\]](https://en.wikipedia.org/wiki/Coastal_Grooves)[\[2\]](https://en.wikipedia.org/wiki/Dev_Hynes) Hynes crafts lush, atmospheric soundscapes that merge 80s funk, soul, and modern R&B with themes of identity and race, and has produced and written for Solange, FKA twigs, Carly Rae Jepsen, and Mariah Carey.[\[3\]](https://www.grammy.com/news/blood-orange-devonte-hynes-interview-new-album-essex-honey/)[\[4\]](https://www.nme.com/reviews/reviews-blood-orange-16507-305190) His 2025 album 'Essex Honey' followed the sudden death of his mother in 2023 and was written back in his home county of Essex; Hynes has said the only reason he makes music is 'excavation.'[\[5\]](https://www.anothermag.com/fashion-beauty/16554/dev-hynes-interview-blood-orange-essex-honey-new-album) Lorde, a close friend and New York neighbor who was working on her own album at the same time, features on the record.[\[6\]](https://www.nme.com/news/music/dev-hynes-brits-2026-interview-lorde-test-icicles-reunion-lightspeed-champion-essex-honey-3932388) After avoiding live performance for years, he toured 'Essex Honey' through 2026, closing with a headline set at London's Rally Festival that August.[\[5\]](https://www.anothermag.com/fashion-beauty/16554/dev-hynes-interview-blood-orange-essex-honey-new-album)[\[6\]](https://www.nme.com/news/music/dev-hynes-brits-2026-interview-lorde-test-icicles-reunion-lightspeed-champion-essex-honey-3932388)

**Sources**

1. https://en.wikipedia.org/wiki/Coastal_Grooves
2. https://en.wikipedia.org/wiki/Dev_Hynes
3. https://www.grammy.com/news/blood-orange-devonte-hynes-interview-new-album-essex-honey/
4. https://www.nme.com/reviews/reviews-blood-orange-16507-305190
5. https://www.anothermag.com/fashion-beauty/16554/dev-hynes-interview-blood-orange-essex-honey-new-album
6. https://www.nme.com/news/music/dev-hynes-brits-2026-interview-lorde-test-icicles-reunion-lightspeed-champion-essex-honey-3932388

## bo-staloch

Bo Staloch was raised in Austin, Texas, singing in his high school's rock band program,[\[1\]](https://www.onestowatch.com/en/blog/bo-staloch-the-garden-interview) and is now based in Nashville.[\[2\]](https://www.thelunacollective.co/journal/qa-bo-staloch)[\[3\]](https://www.udiscovermusic.com/news/bo-staloch-i-wont-be-there-waiting-for-you/) He released his first single 'Springtime Red Tulips' in August 2023[\[2\]](https://www.thelunacollective.co/journal/qa-bo-staloch) and signed to Capitol Records.[\[3\]](https://www.udiscovermusic.com/news/bo-staloch-i-wont-be-there-waiting-for-you/) His debut EP 'The Garden', six songs of indie folk-rock and Americana about self-doubt and letting go of fear, followed in March 2025.[\[1\]](https://www.onestowatch.com/en/blog/bo-staloch-the-garden-interview) He cites Bon Iver, Gregory Alan Isakov, Kings of Leon, and the Lumineers,[\[1\]](https://www.onestowatch.com/en/blog/bo-staloch-the-garden-interview) and his songs move between spare acoustic passages and fuller, anthemic rock.[\[1\]](https://www.onestowatch.com/en/blog/bo-staloch-the-garden-interview) He finished his first headline tour in late 2025 and has taken opening slots for Zach Bryan and Mark Ambor.[\[3\]](https://www.udiscovermusic.com/news/bo-staloch-i-wont-be-there-waiting-for-you/)[\[4\]](https://www.euphoriazine.com/blog/2025/05/introducing-introducing-bo-staloch/)[\[5\]](https://www.afterglowatx.com/blog/2025/11/6/concert-review-bo-staloch-at-antones)

**Sources**

1. https://www.onestowatch.com/en/blog/bo-staloch-the-garden-interview
2. https://www.thelunacollective.co/journal/qa-bo-staloch
3. https://www.udiscovermusic.com/news/bo-staloch-i-wont-be-there-waiting-for-you/
4. https://www.euphoriazine.com/blog/2025/05/introducing-introducing-bo-staloch/
5. https://www.afterglowatx.com/blog/2025/11/6/concert-review-bo-staloch-at-antones

## brandon-flowers

Brandon Flowers has fronted The Killers since 2001.[\[1\]](https://en.wikipedia.org/wiki/Brandon_Flowers) His two solo albums so far, 'Flamingo' (2010) and 'The Desired Effect' (2015), both topped the UK Albums Chart[\[1\]](https://en.wikipedia.org/wiki/Brandon_Flowers) in a synth-pop and new wave mode with heartland rock at the edges.[\[1\]](https://en.wikipedia.org/wiki/Brandon_Flowers) He spent part of his childhood in Nephi, Utah, where his father played him Johnny Cash and Waylon Jennings records,[\[1\]](https://en.wikipedia.org/wiki/Brandon_Flowers)[\[2\]](https://www.deseret.com/entertainment/2026/06/23/brandon-flowers-announces-new-solo-album-thrasher/) and his third solo album 'Thrasher', out August 2026 on Island Records, is a full country turn recorded in Nashville with guitarist David Rawlings and 85-year-old harmonica player Charlie McCoy,[\[2\]](https://www.deseret.com/entertainment/2026/06/23/brandon-flowers-announces-new-solo-album-thrasher/)[\[3\]](https://www.nme.com/news/music/brandon-flowers-interview-thrasher-childhood-the-killers-future-3963378) led by the single 'Plans'.[\[2\]](https://www.deseret.com/entertainment/2026/06/23/brandon-flowers-announces-new-solo-album-thrasher/) Flowers has said The Killers plan a new record in 2027.[\[2\]](https://www.deseret.com/entertainment/2026/06/23/brandon-flowers-announces-new-solo-album-thrasher/)

**Sources**

1. https://en.wikipedia.org/wiki/Brandon_Flowers
2. https://www.deseret.com/entertainment/2026/06/23/brandon-flowers-announces-new-solo-album-thrasher/
3. https://www.nme.com/news/music/brandon-flowers-interview-thrasher-childhood-the-killers-future-3963378

## brigitte-calls-me-baby

Brigitte Calls Me Baby came up through Chicago clubs, a five-piece formed in 2021 around singer Wes Leavins.[\[1\]](https://en.wikipedia.org/wiki/Brigitte_Calls_Me_Baby)[\[2\]](https://chicago.suntimes.com/music/2024/06/23/brigitte-calls-me-baby-review-concert-lincoln-hall-chicago-wes-leavins-set-list) Leavins sings in a vibrato-heavy croon that critics tie to Elvis Presley, Roy Orbison, and Morrissey,[\[1\]](https://en.wikipedia.org/wiki/Brigitte_Calls_Me_Baby)[\[2\]](https://chicago.suntimes.com/music/2024/06/23/brigitte-calls-me-baby-review-concert-lincoln-hall-chicago-wes-leavins-set-list) and NME has likened the group to the Smiths and the Strokes.[\[1\]](https://en.wikipedia.org/wiki/Brigitte_Calls_Me_Baby) The EP 'This House Is Made of Corners' came in 2023, then the debut album 'The Future Is Our Way Out' in August 2024 on ATO Records,[\[1\]](https://en.wikipedia.org/wiki/Brigitte_Calls_Me_Baby)[\[3\]](https://www.nme.com/reviews/album/brigitte-calls-me-baby-the-future-is-our-way-out-album-review-radar-3779027) and 'Irreversible' in 2026.[\[1\]](https://en.wikipedia.org/wiki/Brigitte_Calls_Me_Baby) The band spent part of 2025 opening for Morrissey.[\[1\]](https://en.wikipedia.org/wiki/Brigitte_Calls_Me_Baby)

**Sources**

1. https://en.wikipedia.org/wiki/Brigitte_Calls_Me_Baby
2. https://chicago.suntimes.com/music/2024/06/23/brigitte-calls-me-baby-review-concert-lincoln-hall-chicago-wes-leavins-set-list
3. https://www.nme.com/reviews/album/brigitte-calls-me-baby-the-future-is-our-way-out-album-review-radar-3779027

## britton

Britton, born Ashlee Britton Robinson, grew up in Toledo, Ohio,[\[4\]](https://music.apple.com/us/artist/britton/250599027) and moved to Los Angeles about five years ago to focus on songwriting.[\[2\]](https://www.rivalmagazinela.com/rival-online/the-quiet-intensity-of-brittons-loving-you-almost-killed-me) She wrote behind the scenes for other pop artists before stepping out on her own, and she writes, records, and produces her own material.[\[2\]](https://www.rivalmagazinela.com/rival-online/the-quiet-intensity-of-brittons-loving-you-almost-killed-me) She blends R&B and electronic influences into layered alt-pop,[\[3\]](https://fault-magazine.com/2026/02/britton-embraces-the-beauty-of-emotional-collapse-in-loving-you-almost-killed-me/)[\[4\]](https://music.apple.com/us/artist/britton/250599027) and in July 2025 she signed a worldwide deal with Position Music around the single 'clawmarks',[\[1\]](https://www.musicconnection.com/position-music-signs-artist-songwriter-britton-to-worldwide-record-deal/) with a TikTok following already past 1.4 million.[\[1\]](https://www.musicconnection.com/position-music-signs-artist-songwriter-britton-to-worldwide-record-deal/)[\[3\]](https://fault-magazine.com/2026/02/britton-embraces-the-beauty-of-emotional-collapse-in-loving-you-almost-killed-me/) Her debut album 'Loving You Almost Killed Me', released in February 2026,[\[4\]](https://music.apple.com/us/artist/britton/250599027) follows the loop of a relationship through falling in love, erosion, and the pull to begin again, ending with no clean resolution.[\[2\]](https://www.rivalmagazinela.com/rival-online/the-quiet-intensity-of-brittons-loving-you-almost-killed-me)

**Sources**

1. https://www.musicconnection.com/position-music-signs-artist-songwriter-britton-to-worldwide-record-deal/
2. https://www.rivalmagazinela.com/rival-online/the-quiet-intensity-of-brittons-loving-you-almost-killed-me
3. https://fault-magazine.com/2026/02/britton-embraces-the-beauty-of-emotional-collapse-in-loving-you-almost-killed-me/
4. https://music.apple.com/us/artist/britton/250599027

## bunt

Bunt is Levi Wijk, a producer from Stuttgart, Germany, who folds banjo and fiddle into festival-ready house music.[\[1\]](<https://en.wikipedia.org/wiki/Bunt_(DJ)>)[\[4\]](https://livemusic.au/bunt-announces-landmark-2026-australian-in-the-round-tour/) The project began around 2014 as a duo with Nico Crispin, who left in 2021.[\[1\]](<https://en.wikipedia.org/wiki/Bunt_(DJ)>)[\[2\]](https://www.thelineofbestfit.com/features/interviews/bunt-hype-hustle) Wijk started out on sunlit folk remixes before settling into the vocal-forward mix of acoustic texture and dance production usually filed as folktronica.[\[2\]](https://www.thelineofbestfit.com/features/interviews/bunt-hype-hustle) He signed to Arista Records in early 2023,[\[1\]](<https://en.wikipedia.org/wiki/Bunt_(DJ)>) and 'Clouds', a single with Nate Traveller, became his breakout that year.[\[1\]](<https://en.wikipedia.org/wiki/Bunt_(DJ)>)[\[2\]](https://www.thelineofbestfit.com/features/interviews/bunt-hype-hustle) He tours a show billed 'In The Round', with the booth in the center of the room and the crowd on all sides.[\[3\]](https://www.teensmedia.net/blog/bunt)[\[4\]](https://livemusic.au/bunt-announces-landmark-2026-australian-in-the-round-tour/)[\[5\]](https://crowdsurfermag.com/2026/07/20/in-the-round-with-bunt/)

**Sources**

1. https://en.wikipedia.org/wiki/Bunt_(DJ)
2. https://www.thelineofbestfit.com/features/interviews/bunt-hype-hustle
3. https://www.teensmedia.net/blog/bunt
4. https://livemusic.au/bunt-announces-landmark-2026-australian-in-the-round-tour/
5. https://crowdsurfermag.com/2026/07/20/in-the-round-with-bunt/

## calder-allen

Calder Allen is a fifth-generation Austin songwriter and the grandson of Terry Allen, the artist and outlaw-country writer behind 'Lubbock (on Everything)'; his grandmother Jo Harvey Allen, his father Bale Creek Allen and his uncle Bukka Allen all make music too.[\[1\]](https://www.austinmonthly.com/calder-allen-is-carrying-the-torch-for-a-lineage-of-great-austin-songwriters/)[\[2\]](https://atwoodmagazine.com/cadh-calder-allen-dreamers-drifters-and-hiders-album-interview-music-feature/) He calls his own sound 'really confused country, a very chaotic country': roots songwriting about mental health, meaning and the outdoors, the last traced to the fly-fishing films that first drew him to music.[\[1\]](https://www.austinmonthly.com/calder-allen-is-carrying-the-torch-for-a-lineage-of-great-austin-songwriters/)[\[2\]](https://atwoodmagazine.com/cadh-calder-allen-dreamers-drifters-and-hiders-album-interview-music-feature/) He released his debut 'The Game' in 2022, then left Austin for Montana before coming back.[\[1\]](https://www.austinmonthly.com/calder-allen-is-carrying-the-torch-for-a-lineage-of-great-austin-songwriters/) The second album 'Dreamers, Drifters and Hiders' (2024) was made with Charlie Sexton, the Bob Dylan guitarist who had once produced his grandfather, at Arlyn Studios.[\[1\]](https://www.austinmonthly.com/calder-allen-is-carrying-the-torch-for-a-lineage-of-great-austin-songwriters/)[\[2\]](https://atwoodmagazine.com/cadh-calder-allen-dreamers-drifters-and-hiders-album-interview-music-feature/) He has shared stages with Cody Jinks, the Red Clay Strays and the Steel Woods.[\[2\]](https://atwoodmagazine.com/cadh-calder-allen-dreamers-drifters-and-hiders-album-interview-music-feature/)

**Sources**

1. https://www.austinmonthly.com/calder-allen-is-carrying-the-torch-for-a-lineage-of-great-austin-songwriters/
2. https://atwoodmagazine.com/cadh-calder-allen-dreamers-drifters-and-hiders-album-interview-music-feature/

## cannons

Cannons came together in Los Angeles in 2013,[\[1\]](<https://en.wikipedia.org/wiki/Cannons_(band)>)[\[2\]](https://www.hollywoodbowl.com/musicdb/artists/10261/cannons) after guitarist Ryan Clapham and multi-instrumentalist Paul Davis, friends since childhood, met singer Michelle Joy through a Craigslist ad.[\[1\]](<https://en.wikipedia.org/wiki/Cannons_(band)>) Their 2019 single 'Fire for You' reached number one on Billboard's Alternative Airplay chart[\[1\]](<https://en.wikipedia.org/wiki/Cannons_(band)>) and broke through after a sync in Netflix's 'Never Have I Ever',[\[1\]](<https://en.wikipedia.org/wiki/Cannons_(band)>)[\[2\]](https://www.hollywoodbowl.com/musicdb/artists/10261/cannons) which led to a deal with Columbia Records.[\[1\]](<https://en.wikipedia.org/wiki/Cannons_(band)>) Their albums include 'Shadows' (2019), 'Fever Dream' (2022), 'Heartbeat Highway' (2023) and 'Everything Glows' (2026).[\[1\]](<https://en.wikipedia.org/wiki/Cannons_(band)>) 'Bad Dream' and 'Loving You' both climbed into the top three of Alternative Airplay.[\[1\]](<https://en.wikipedia.org/wiki/Cannons_(band)>) In 2026 the trio co-headlined the Afterglow Tour with Bob Moses.[\[1\]](<https://en.wikipedia.org/wiki/Cannons_(band)>)[\[2\]](https://www.hollywoodbowl.com/musicdb/artists/10261/cannons)

**Sources**

1. https://en.wikipedia.org/wiki/Cannons_(band)
2. https://www.hollywoodbowl.com/musicdb/artists/10261/cannons

## cassandra-coleman

Cassandra Coleman grew up in rural Tennessee, near the Blue Ridge Mountains.[\[1\]](https://nashvillevoyager.com/interview/rising-stars-meet-cassandra-coleman-of-columbia/)[\[2\]](https://www.onestowatch.com/en/blog/cassandra-coleman-proves-coming-of-age-isnt-just-for-teenagers-qa) She reached the live rounds of 'American Idol' in 2021, then kept working as a barista while writing songs.[\[1\]](https://nashvillevoyager.com/interview/rising-stars-meet-cassandra-coleman-of-columbia/) Her debut single 'Coming of Age' arrived in June 2025 on Warner Records, recorded with Jack Antonoff and members of Bleachers at Electric Lady Studios.[\[2\]](https://www.onestowatch.com/en/blog/cassandra-coleman-proves-coming-of-age-isnt-just-for-teenagers-qa)[\[3\]](https://www.melodicmag.com/news/cassandra-coleman-shares-her-coming-of-age-story-on-debut-single/) Warner released her debut album 'End of Your Love' in 2026.[\[4\]](https://music.apple.com/us/artist/cassandra-coleman/1600330632) Her music moves between indie folk and dream pop, with Florence Welch, Bon Iver and AURORA among the touchstones.[\[4\]](https://music.apple.com/us/artist/cassandra-coleman/1600330632)

**Sources**

1. https://nashvillevoyager.com/interview/rising-stars-meet-cassandra-coleman-of-columbia/
2. https://www.onestowatch.com/en/blog/cassandra-coleman-proves-coming-of-age-isnt-just-for-teenagers-qa
3. https://www.melodicmag.com/news/cassandra-coleman-shares-her-coming-of-age-story-on-debut-single/
4. https://music.apple.com/us/artist/cassandra-coleman/1600330632

## charli-xcx

Charli XCX has spent over a decade at the forefront of pop, writing hits for other artists, including Icona Pop's 'I Love It' and Iggy Azalea's 'Fancy', while building a genre-spanning solo catalogue of her own.[\[1\]](<https://en.wikipedia.org/wiki/I_Love_It_(Icona_Pop_song)>)[\[2\]](<https://en.wikipedia.org/wiki/Fancy_(Iggy_Azalea_song)>) After working with the experimental PC Music collective from 2015, she pushed pop toward its glitchy, auto-tuned extreme on the 2017 mixtape 'Pop 2', then pulled back toward a more mainstream, 1980s-inflected synth-pop on 2022's 'Crash'.[\[5\]](https://en.wikipedia.org/wiki/Charli_XCX) Her 2024 album 'BRAT' became a cultural phenomenon, its neon-green aesthetic defining 'brat summer' and earning three Grammys, including Best Dance/Electronic Album, and five BRIT Awards, including Album of the Year.[\[3\]](https://www.thefader.com/2025/02/26/every-award-charli-xcx-brat-won-brit-grammys)[\[5\]](https://en.wikipedia.org/wiki/Charli_XCX) She followed it in 2026 with 'Music, Fashion, Film', a multimedia studio album produced with A.G. Cook and Finn Keane that marks a turn toward a more guitar-driven sound.[\[4\]](<https://en.wikipedia.org/wiki/Music,_Fashion,_Film>)

**Sources**

1. https://en.wikipedia.org/wiki/I_Love_It_(Icona_Pop_song)
2. https://en.wikipedia.org/wiki/Fancy_(Iggy_Azalea_song)
3. https://www.thefader.com/2025/02/26/every-award-charli-xcx-brat-won-brit-grammys
4. https://en.wikipedia.org/wiki/Music,_Fashion,_Film
5. https://en.wikipedia.org/wiki/Charli_XCX

## charlotte-lawrence

Charlotte Lawrence is the daughter of television producer Bill Lawrence and actress Christa Miller,[\[1\]](https://en.wikipedia.org/wiki/Charlotte_Lawrence) born in Los Angeles in 2000 and playing classical piano from age five.[\[1\]](https://en.wikipedia.org/wiki/Charlotte_Lawrence) She featured on Kaskade's 'Cold as Stone', released her first EP 'Young' in 2018,[\[1\]](https://en.wikipedia.org/wiki/Charlotte_Lawrence) and signed to Atlantic Records the following year.[\[1\]](https://en.wikipedia.org/wiki/Charlotte_Lawrence) Her song 'Joke's on You' appeared on the 2020 'Birds of Prey' soundtrack,[\[1\]](https://en.wikipedia.org/wiki/Charlotte_Lawrence)[\[2\]](https://atwoodmagazine.com/somewhere-charlotte-lawrence-album-review/) and a second EP, 'Charlotte', followed in 2021.[\[1\]](https://en.wikipedia.org/wiki/Charlotte_Lawrence)[\[2\]](https://atwoodmagazine.com/somewhere-charlotte-lawrence-album-review/) She released her debut album 'Somewhere', which includes an 'Ophelia' co-write with Gracie Abrams, in June 2025.[\[2\]](https://atwoodmagazine.com/somewhere-charlotte-lawrence-album-review/) She also models, signed to IMG.[\[1\]](https://en.wikipedia.org/wiki/Charlotte_Lawrence)

**Sources**

1. https://en.wikipedia.org/wiki/Charlotte_Lawrence
2. https://atwoodmagazine.com/somewhere-charlotte-lawrence-album-review/

## chelsea-jordan

Chelsea Jordan grew up in Baltimore[\[1\]](https://www.onestowatch.com/en/blog/chelsea-jordan-is-just-like-you-q-a)[\[3\]](https://atwoodmagazine.com/cjpc-chelsea-jordan-picky-choosy-song-review/) and went to USC for lacrosse before a songwriting class turned her toward music.[\[2\]](https://hypebae.com/2026/2/chelsea-jordan-interview-singer-musician-ep-album-tour-release-date) She built a following with fashion content online,[\[2\]](https://hypebae.com/2026/2/chelsea-jordan-interview-singer-musician-ep-album-tour-release-date)[\[3\]](https://atwoodmagazine.com/cjpc-chelsea-jordan-picky-choosy-song-review/) then broke out as a singer with 'TORONTO' in 2024, a TikTok hit that led to a deal with Arista Records.[\[2\]](https://hypebae.com/2026/2/chelsea-jordan-interview-singer-musician-ep-album-tour-release-date)[\[6\]](https://open.spotify.com/album/0EfxAiIo0Bmwqc25eJ5X14) She signed with the label in November 2025 and released 'level out' as her major-label debut.[\[4\]](https://www.thatericalper.com/2025/11/05/soulful-pop-rb-artist-chelsea-jordan-signs-with-arista-records-and-drops-new-single-level-out/) Her self-released 'halfwaythru' has passed 2.5 million Spotify streams.[\[2\]](https://hypebae.com/2026/2/chelsea-jordan-interview-singer-musician-ep-album-tour-release-date)[\[4\]](https://www.thatericalper.com/2025/11/05/soulful-pop-rb-artist-chelsea-jordan-signs-with-arista-records-and-drops-new-single-level-out/) Her debut EP 'better when i'm lonely' was followed by the six-song 'better late than not at all' in March 2026.[\[1\]](https://www.onestowatch.com/en/blog/chelsea-jordan-is-just-like-you-q-a)[\[2\]](https://hypebae.com/2026/2/chelsea-jordan-interview-singer-musician-ep-album-tour-release-date) She has toured North America opening for Ruel,[\[5\]](https://www.thelunacollective.co/journal/review-chelsea-jordan) and names Amy Winehouse, Olivia Dean and Lola Young as touchstones.[\[2\]](https://hypebae.com/2026/2/chelsea-jordan-interview-singer-musician-ep-album-tour-release-date)

**Sources**

1. https://www.onestowatch.com/en/blog/chelsea-jordan-is-just-like-you-q-a
2. https://hypebae.com/2026/2/chelsea-jordan-interview-singer-musician-ep-album-tour-release-date
3. https://atwoodmagazine.com/cjpc-chelsea-jordan-picky-choosy-song-review/
4. https://www.thatericalper.com/2025/11/05/soulful-pop-rb-artist-chelsea-jordan-signs-with-arista-records-and-drops-new-single-level-out/
5. https://www.thelunacollective.co/journal/review-chelsea-jordan
6. https://open.spotify.com/album/0EfxAiIo0Bmwqc25eJ5X14

## chloe-qisha

Chloe Qisha was born in Malaysia around 1998[\[1\]](https://en.wikipedia.org/wiki/Chloe_Qisha) and moved to England at sixteen for boarding school,[\[1\]](https://en.wikipedia.org/wiki/Chloe_Qisha)[\[2\]](https://www.rollingstone.co.uk/music/chloe-qisha-future-of-music-cover-feature-48513/) later taking a psychology degree and a master's in communication.[\[1\]](https://en.wikipedia.org/wiki/Chloe_Qisha) She started posting covers on YouTube during university, an A&R representative got in touch,[\[2\]](https://www.rollingstone.co.uk/music/chloe-qisha-future-of-music-cover-feature-48513/) and by 2024 she had launched a music career from London.[\[1\]](https://en.wikipedia.org/wiki/Chloe_Qisha)[\[2\]](https://www.rollingstone.co.uk/music/chloe-qisha-future-of-music-cover-feature-48513/) Her self-titled debut EP came out in November 2024,[\[1\]](https://en.wikipedia.org/wiki/Chloe_Qisha)[\[2\]](https://www.rollingstone.co.uk/music/chloe-qisha-future-of-music-cover-feature-48513/) followed by 'Modern Romance' in May 2025[\[1\]](https://en.wikipedia.org/wiki/Chloe_Qisha)[\[2\]](https://www.rollingstone.co.uk/music/chloe-qisha-future-of-music-cover-feature-48513/) and its single '21st Century Cool Girl'.[\[1\]](https://en.wikipedia.org/wiki/Chloe_Qisha)[\[2\]](https://www.rollingstone.co.uk/music/chloe-qisha-future-of-music-cover-feature-48513/) She works with producer Rob Milton, known for Holly Humberstone and The 1975,[\[2\]](https://www.rollingstone.co.uk/music/chloe-qisha-future-of-music-cover-feature-48513/) and calls her style nostalgic alternative pop,[\[1\]](https://en.wikipedia.org/wiki/Chloe_Qisha) drawing on ABBA, Talking Heads and Caroline Polachek.[\[2\]](https://www.rollingstone.co.uk/music/chloe-qisha-future-of-music-cover-feature-48513/) In late 2025 she was named to BBC Radio 1's Sound of 2026 longlist.[\[3\]](https://www.thelineofbestfit.com/news/geese-chloe-qisha-and-jim-legxacy-lead-bbc-radio-1s-sound-of-2026-longlist)

**Sources**

1. https://en.wikipedia.org/wiki/Chloe_Qisha
2. https://www.rollingstone.co.uk/music/chloe-qisha-future-of-music-cover-feature-48513/
3. https://www.thelineofbestfit.com/news/geese-chloe-qisha-and-jim-legxacy-lead-bbc-radio-1s-sound-of-2026-longlist

## claire-rosinkranz

Claire Rosinkranz, born in California in 2004, comes from a musical family: her father Ragnar is an Icelandic composer and violinist, her mother a piano teacher, and she chased dance before she moved that drive to music.[\[1\]](https://en.wikipedia.org/wiki/Claire_Rosinkranz)[\[2\]](https://www.clashmusic.com/features/looking-for-a-good-life-claire-rosinkranz-interviewed/) She and Ragnar co-wrote and produced 'Backyard Boy', which went viral on TikTok in 2020, while the world was stuck inside on its phones, and won her a record deal at sixteen, with Ragnar playing bass, drums, guitar and synths.[\[1\]](https://en.wikipedia.org/wiki/Claire_Rosinkranz)[\[2\]](https://www.clashmusic.com/features/looking-for-a-good-life-claire-rosinkranz-interviewed/)[\[3\]](https://royaltyexchange.com/blog/claire-rosinkranz-and-ragnar-a-father-daughter-duo-shaping-indie-pop) She signed to Republic's Slowplay imprint and now records for Purple Monkey.[\[1\]](https://en.wikipedia.org/wiki/Claire_Rosinkranz) Her sound has moved from bedroom pop toward brighter, guitar-forward alt-pop. The debut album 'Just Because' (2023), which she has called 'word vomit' more than a planned record, was followed by 'My Lover' (2026), and she has opened for Maroon 5 and Alex Warren.[\[1\]](https://en.wikipedia.org/wiki/Claire_Rosinkranz)[\[2\]](https://www.clashmusic.com/features/looking-for-a-good-life-claire-rosinkranz-interviewed/)

**Sources**

1. https://en.wikipedia.org/wiki/Claire_Rosinkranz
2. https://www.clashmusic.com/features/looking-for-a-good-life-claire-rosinkranz-interviewed/
3. https://royaltyexchange.com/blog/claire-rosinkranz-and-ragnar-a-father-daughter-duo-shaping-indie-pop

## cmat

Ciara Mary-Alice Thompson grew up in Dunboyne, County Meath, and dropped out of Trinity College Dublin at 18 on medical advice, moving to Denmark for a three-month songwriting camp before returning to build her career as CMAT.[\[1\]](https://en.wikipedia.org/wiki/CMAT)[\[7\]](https://www.irishexaminer.com/lifestyle/artsandculture/arid-40808079.html) A 2018 songwriting workshop with Charli XCX became a turning point: XCX told her she was 'really good at music' but didn't yet know what she was doing, and needed to leave Manchester for London or back home to Dublin, advice CMAT calls the best she ever received.[\[7\]](https://www.irishexaminer.com/lifestyle/artsandculture/arid-40808079.html) Her music pairs country songwriting structures with indie-pop arrangements and narrative lyrics.[\[1\]](https://en.wikipedia.org/wiki/CMAT) Her 2022 debut album, 'If My Wife New I'd Be Dead', won the Choice Music Prize for Irish Album of the Year.[\[2\]](https://www.hotpress.com/culture/choice-music-prize-cmat-wins-album-of-the-year-for-if-my-wife-new-id-be-dead-for-22955850) Its 2023 follow-up, 'Crazymad, for Me', earned a Mercury Prize nomination and a BRIT Award nomination for International Artist of the Year.[\[3\]](<https://en.wikipedia.org/wiki/Crazymad,_for_Me>)[\[4\]](https://www.rte.ie/entertainment/2024/0124/1428422-rising-irish-star-cmat-nominated-for-a-brit-award/) Her 2025 album 'Euro-Country' expanded her sound with full-band production and went on to win her a second Choice Music Prize and the Ivor Novello Award for Best Album, beating Lily Allen, Olivia Dean and Wolf Alice, plus a second Mercury Prize nomination.[\[5\]](https://en.wikipedia.org/wiki/Euro-Country)[\[8\]](https://www.irishtimes.com/culture/music/2026/03/05/cmat-wins-choice-music-prize-album-of-the-year-for-euro-country/)[\[9\]](https://www.rte.ie/entertainment/2026/0521/1574622-cmat-wins-ivor-novello-award-for-best-album/) On stage, she performs backed by a live band, leading crowds through camp theatrical choreography and the 'Dunboyne County two-step,' a nod to her hometown.[\[6\]](https://www.nme.com/reviews/live/cmat-glastonbury-2025-live-review-photos-setlist-3873182)

**Sources**

1. https://en.wikipedia.org/wiki/CMAT
2. https://www.hotpress.com/culture/choice-music-prize-cmat-wins-album-of-the-year-for-if-my-wife-new-id-be-dead-for-22955850
3. https://en.wikipedia.org/wiki/Crazymad,_for_Me
4. https://www.rte.ie/entertainment/2024/0124/1428422-rising-irish-star-cmat-nominated-for-a-brit-award/
5. https://en.wikipedia.org/wiki/Euro-Country
6. https://www.nme.com/reviews/live/cmat-glastonbury-2025-live-review-photos-setlist-3873182
7. https://www.irishexaminer.com/lifestyle/artsandculture/arid-40808079.html
8. https://www.irishtimes.com/culture/music/2026/03/05/cmat-wins-choice-music-prize-album-of-the-year-for-euro-country/
9. https://www.rte.ie/entertainment/2026/0521/1574622-cmat-wins-ivor-novello-award-for-best-album/

## coleman-jennings

Coleman Jennings was born in New York, spent his early childhood in Connecticut, and moved to Texas with his family at seven.[\[1\]](https://www.kut.org/texasstandard/2024-01-12/coleman-jennings-roaddogs-ut-austin-student-country-artist) While studying English at the University of Texas at Austin,[\[1\]](https://www.kut.org/texasstandard/2024-01-12/coleman-jennings-roaddogs-ut-austin-student-country-artist)[\[3\]](https://savingcountrymusic.com/album-review-coleman-jennings-lead-you-home/) he turned a campus covers group into Coleman Jennings and the Roaddogs[\[1\]](https://www.kut.org/texasstandard/2024-01-12/coleman-jennings-roaddogs-ut-austin-student-country-artist) and wrote and produced their 2022 EP 'Know No Leash'.[\[1\]](https://www.kut.org/texasstandard/2024-01-12/coleman-jennings-roaddogs-ut-austin-student-country-artist) His songs pull Western folk, honky tonk and outlaw country together with old-time and bluegrass,[\[2\]](https://musicrow.com/2025/09/coleman-jennings-inks-with-big-loud-texas-mercury-records/)[\[3\]](https://savingcountrymusic.com/album-review-coleman-jennings-lead-you-home/) and he points to Blaze Foley and Townes Van Zandt as models.[\[3\]](https://savingcountrymusic.com/album-review-coleman-jennings-lead-you-home/) In September 2025 he signed with Big Loud Texas and Mercury Records[\[2\]](https://musicrow.com/2025/09/coleman-jennings-inks-with-big-loud-texas-mercury-records/) and released 'Head Spinning', his major-label debut single and only the second song he had written, produced by Dave Cobb.[\[2\]](https://musicrow.com/2025/09/coleman-jennings-inks-with-big-loud-texas-mercury-records/) Cobb also produced his debut album 'Lead You Home', which came out in June 2026.[\[3\]](https://savingcountrymusic.com/album-review-coleman-jennings-lead-you-home/)

**Sources**

1. https://www.kut.org/texasstandard/2024-01-12/coleman-jennings-roaddogs-ut-austin-student-country-artist
2. https://musicrow.com/2025/09/coleman-jennings-inks-with-big-loud-texas-mercury-records/
3. https://savingcountrymusic.com/album-review-coleman-jennings-lead-you-home/

## common-people

Common People formed in Los Angeles in 2022,[\[3\]](https://eastof8th.com/2026/06/01/common-people-share-fuzzy-new-single-blue-eyes/) five USC students who first met through the Lambda Chi Alpha fraternity[\[2\]](https://dailytrojan.com/2026/02/27/common-people-are-anything-but-ordinary/) and built their own stages to play a campus scene otherwise given over to DJs.[\[1\]](https://www.onestowatch.com/en/blog/common-people-chat-games-ep-working-with-cage-the-elephants-brad-shulz-early-days-at-usc-and-more-q-a) Nicky Winegardner sings, with Asher Thomson and Sam Belzer on guitars, Konrad Ulich on bass and Cormac Cadden on drums.[\[3\]](https://eastof8th.com/2026/06/01/common-people-share-fuzzy-new-single-blue-eyes/) They began writing and recording in earnest in the summer of 2024, and their early demos reached Brad Shultz of Cage the Elephant,[\[2\]](https://dailytrojan.com/2026/02/27/common-people-are-anything-but-ordinary/)[\[3\]](https://eastof8th.com/2026/06/01/common-people-share-fuzzy-new-single-blue-eyes/) who signed them to his label Parallel Vision, in partnership with Big Loud Rock, and produced their music himself.[\[2\]](https://dailytrojan.com/2026/02/27/common-people-are-anything-but-ordinary/) The debut single 'Thank You' arrived in July 2025,[\[2\]](https://dailytrojan.com/2026/02/27/common-people-are-anything-but-ordinary/) followed by the EP 'Games' in April 2026[\[1\]](https://www.onestowatch.com/en/blog/common-people-chat-games-ep-working-with-cage-the-elephants-brad-shulz-early-days-at-usc-and-more-q-a) and the single 'Blue Eyes'.[\[3\]](https://eastof8th.com/2026/06/01/common-people-share-fuzzy-new-single-blue-eyes/) They have opened for Cage the Elephant and toured with Rainbow Kitten Surprise.[\[1\]](https://www.onestowatch.com/en/blog/common-people-chat-games-ep-working-with-cage-the-elephants-brad-shulz-early-days-at-usc-and-more-q-a)

**Sources**

1. https://www.onestowatch.com/en/blog/common-people-chat-games-ep-working-with-cage-the-elephants-brad-shulz-early-days-at-usc-and-more-q-a
2. https://dailytrojan.com/2026/02/27/common-people-are-anything-but-ordinary/
3. https://eastof8th.com/2026/06/01/common-people-share-fuzzy-new-single-blue-eyes/

## cure-for-paranoia

Cure for Paranoia is a Dallas hip-hop collective led by rapper Cameron McCloud, a preschool teacher[\[2\]](https://austin.culturemap.com/news/entertainment/tiny-desk-contest-cure-paranoia/) who started it about a decade ago after finding that making music with friends helped him more than the medication he was on.[\[3\]](https://www.jambase.com/article/cure-for-paranoia-tiny-desk-contest-2026-winners-video) He named the project on a road trip to Colorado, and it grew from solo work into a full band after he told its origin story to the biggest crowd he had played and the clip went viral.[\[1\]](https://www.thecurrent.org/feature/2026/06/29/interview-cure-for-paranoia-on-winning-the-tiny-desk-contest-and-keeping-eyes-on-dallas) Their alternative hip-hop runs on that live band: the audition that won NPR's 2026 Tiny Desk Contest gathered eleven musicians around a tiny desk set in front of Dallas's giant eyeball sculpture.[\[2\]](https://austin.culturemap.com/news/entertainment/tiny-desk-contest-cure-paranoia/) The winning song 'No Brainer' moves from wordplay about mental illness and identity into a criticism of racism in the United States,[\[2\]](https://austin.culturemap.com/news/entertainment/tiny-desk-contest-cure-paranoia/) and it took the contest on the group's third attempt, sending them out as headliners on NPR's Tiny Desk Contest On the Road tour.[\[3\]](https://www.jambase.com/article/cure-for-paranoia-tiny-desk-contest-2026-winners-video)

**Sources**

1. https://www.thecurrent.org/feature/2026/06/29/interview-cure-for-paranoia-on-winning-the-tiny-desk-contest-and-keeping-eyes-on-dallas
2. https://austin.culturemap.com/news/entertainment/tiny-desk-contest-cure-paranoia/
3. https://www.jambase.com/article/cure-for-paranoia-tiny-desk-contest-2026-winners-video

## dallas-wax

Dallas Wax is a New York five-piece[\[1\]](https://offtherecordpress.com/reviews/dallas-wax-is-taking-new-york-city-by-storm) that frontman Ryan Dallas Wax started with a batch of demos, pulling the band together for a first rehearsal in late 2023 after meeting bassist Alfonso Hernandez at NYU.[\[2\]](https://offtherecordpress.com/interviews/2024/3/27/dallas-wax-on-their-first-single-release-ahead-of-sold-out-show) They call the sound 'stepson rock', which Wax defines as the reverse of dad rock, and the band cites Led Zeppelin, Black Sabbath, Oasis and Steely Dan.[\[2\]](https://offtherecordpress.com/interviews/2024/3/27/dallas-wax-on-their-first-single-release-ahead-of-sold-out-show) The debut single 'Mud' arrived in February 2024,[\[2\]](https://offtherecordpress.com/interviews/2024/3/27/dallas-wax-on-their-first-single-release-ahead-of-sold-out-show) followed by the EP 'The Air We Breathe' and singles like 'Girl Like Me'.[\[3\]](https://clunkmag.com/dallas-wax-interview/) Hernandez has since been replaced on bass by Kutter Reddan, and the band has toured the US ahead of a debut album.[\[3\]](https://clunkmag.com/dallas-wax-interview/)

**Sources**

1. https://offtherecordpress.com/reviews/dallas-wax-is-taking-new-york-city-by-storm
2. https://offtherecordpress.com/interviews/2024/3/27/dallas-wax-on-their-first-single-release-ahead-of-sold-out-show
3. https://clunkmag.com/dallas-wax-interview/

## damaris-bojor

Damaris Bojor spent years as a visual artist, a painter and muralist, before turning to music in 2022.[\[2\]](https://latination.com/damaris-bojor/)[\[3\]](https://noro.mx/musica/damaris-bojor-album-folkpirana-sonora/) The Hermosillo, Sonora singer-songwriter coined the term 'Folkpirano' for what she makes: campirano, the regional string music of the sierras of Sonora and Sinaloa, crossed with American folk and country.[\[1\]](https://kxci.org/2026/02/kxci-baila-el-pueblo-artist-spotlight-damaris-bojor/) The arrangements stay spare, built on guitar, twelve-string, bass and the occasional harmonica and percussion.[\[1\]](https://kxci.org/2026/02/kxci-baila-el-pueblo-artist-spotlight-damaris-bojor/) Her debut album 'Folkpirana', produced by Ivan de la Rioja and Felipe Garcia at Onda Sonora, arrived in May 2025,[\[3\]](https://noro.mx/musica/damaris-bojor-album-folkpirana-sonora/) following the singles 'Nube de Paso' and 'Volar' with Juan Cirerol.[\[1\]](https://kxci.org/2026/02/kxci-baila-el-pueblo-artist-spotlight-damaris-bojor/) She made her United States debut at SXSW and has played the Festival Internacional Cervantino and the Festival Alfonso Ortiz Tirado.[\[3\]](https://noro.mx/musica/damaris-bojor-album-folkpirana-sonora/)

**Sources**

1. https://kxci.org/2026/02/kxci-baila-el-pueblo-artist-spotlight-damaris-bojor/
2. https://latination.com/damaris-bojor/
3. https://noro.mx/musica/damaris-bojor-album-folkpirana-sonora/

## dexter-and-the-moonrocks

Dexter and the Moonrocks formed in 2021 in rural Throckmorton County, Texas,[\[1\]](https://en.wikipedia.org/wiki/Dexter_and_the_Moonrocks)[\[3\]](https://www.songfacts.com/articles/3-fun-facts-about-breakout-alternative-rock-group-dexter-and-the-moonrocks/) around singer James Tuffs and his cousins Ryan and Ty Anderson, friends since eighth grade, with drummer Ryan Fox answering an online ad.[\[1\]](https://en.wikipedia.org/wiki/Dexter_and_the_Moonrocks)[\[3\]](https://www.songfacts.com/articles/3-fun-facts-about-breakout-alternative-rock-group-dexter-and-the-moonrocks/) They coined 'western space grunge' for the result: country lyricism set to a 1990s alternative and grunge guitar sound.[\[1\]](https://en.wikipedia.org/wiki/Dexter_and_the_Moonrocks)[\[2\]](https://www.melodicmag.com/features/on-your-radar-dexter-and-the-moonrocks/) They signed to Severance Records, a Big Loud Records offshoot on which they are the flagship act, and released the EPs 'Western Space Grunge' (2024), 'Happy to Be Here' (2025) and 'Donkey Flats' (2025).[\[1\]](https://en.wikipedia.org/wiki/Dexter_and_the_Moonrocks) 'Sad in Carolina' topped Billboard's Alternative Airplay chart, and the 2026 single 'Freakin' Out' became their first Hot 100 entry, peaking at number 33.[\[1\]](https://en.wikipedia.org/wiki/Dexter_and_the_Moonrocks) Their debut album 'Friends That I Don't Like' followed on October 2, 2026.[\[1\]](https://en.wikipedia.org/wiki/Dexter_and_the_Moonrocks)

**Sources**

1. https://en.wikipedia.org/wiki/Dexter_and_the_Moonrocks
2. https://www.melodicmag.com/features/on-your-radar-dexter-and-the-moonrocks/
3. https://www.songfacts.com/articles/3-fun-facts-about-breakout-alternative-rock-group-dexter-and-the-moonrocks/

## dj-cassandra

Cassandra Shankman, who performs as DJ Cassandra, was born in Texas and raised between Austin and London.[\[1\]](https://soundsbycassandra.com/) A classically and jazz-trained pianist with a composition and film studies degree from the University of Texas at Austin, she began DJing in 2016 and blends that training with electronic sound.[\[1\]](https://soundsbycassandra.com/) Her separate work as a composer and orchestrator has appeared in films and commercials for directors including Terrence Malick, and she also writes therapeutic music that helps patients with neurological conditions regain mobility through devices used in hospitals.[\[1\]](https://soundsbycassandra.com/) She held official artist slots for five sets across the 2024 and 2025 Austin City Limits Music Festival and has performed alongside or opened for Willie Nelson, Maren Morris and RUN DMC.[\[1\]](https://soundsbycassandra.com/) In 2025 she became the first woman named Best DJ at the Austin Music Awards in its 43 years,[\[1\]](https://soundsbycassandra.com/)[\[2\]](https://cbsaustin.com/features/we-are-austin/dj-cassandra-makes-history-as-first-woman-to-win-best-dj-at-austin-music-awards) and she co-founded Picardy, a web app for learning music theory.[\[1\]](https://soundsbycassandra.com/)[\[2\]](https://cbsaustin.com/features/we-are-austin/dj-cassandra-makes-history-as-first-woman-to-win-best-dj-at-austin-music-awards)

**Sources**

1. https://soundsbycassandra.com/
2. https://cbsaustin.com/features/we-are-austin/dj-cassandra-makes-history-as-first-woman-to-win-best-dj-at-austin-music-awards

## don-west

Don West was born and raised on Sydney's northern beaches, around Manly, where he still does most of his writing.[\[1\]](https://beat.com.au/meet-don-west-the-sydneys-new-coastal-soul-star-wracking-up-millions-of-monthly-listeners/) He opened for Lime Cordiale in 2019 before releasing anything of his own, then built an audience through triple j Unearthed.[\[3\]](<https://en.wikipedia.org/wiki/Don_West_(singer)>) His manager coined the tag 'coastal soul' for a sound that runs Marvin Gaye and Curtis Mayfield alongside contemporary revival acts like Jalen Ngonda and Thee Sacred Souls.[\[1\]](https://beat.com.au/meet-don-west-the-sydneys-new-coastal-soul-star-wracking-up-millions-of-monthly-listeners/)[\[2\]](https://beat.com.au/december-tour-sees-don-west-showcase-his-distinctive-soul-revival-sound/) A debut EP arrived in November 2024, followed by the album 'Give Me All Your Love' in November 2025, which reached number 25 on the ARIA Albums Chart.[\[3\]](<https://en.wikipedia.org/wiki/Don_West_(singer)>) He signed a deal with Kobalt Music in December 2025, has played SXSW Sydney and Byron Bay Bluesfest, and models for IMG.[\[3\]](<https://en.wikipedia.org/wiki/Don_West_(singer)>)

**Sources**

1. https://beat.com.au/meet-don-west-the-sydneys-new-coastal-soul-star-wracking-up-millions-of-monthly-listeners/
2. https://beat.com.au/december-tour-sees-don-west-showcase-his-distinctive-soul-revival-sound/
3. https://en.wikipedia.org/wiki/Don_West_(singer)

## elijah-delgado

Elijah Delgado is a native Austinite who was making up songs in his head at six for his mother to write down, and learned his first chords from his father.[\[1\]](https://www.kut.org/life-arts/2026-03-18/elijah-delgado-austin-tx-south-by-southwest-sxsw-2026-official-music-showcase) As a teenager he busked covers and originals on South Congress.[\[1\]](https://www.kut.org/life-arts/2026-03-18/elijah-delgado-austin-tx-south-by-southwest-sxsw-2026-official-music-showcase) He calls what he makes 'indie rock lullabies', a blend of indie rock, indie folk and pop, and his 2021 debut EP 'When I Was On Cloud 9' has passed 700,000 Spotify streams.[\[2\]](https://sonicguild.org/artist/elijah-delgado/) He has opened for Better Than Ezra, Bartees Strange and Zach Person, played Old Settler's Music Festival and Blues on the Green, and won Sonic Guild artist grants in 2024 and 2025.[\[2\]](https://sonicguild.org/artist/elijah-delgado/) After years of going to SXSW as a fan, he gave his first official showcase there in March 2026.[\[1\]](https://www.kut.org/life-arts/2026-03-18/elijah-delgado-austin-tx-south-by-southwest-sxsw-2026-official-music-showcase)

**Sources**

1. https://www.kut.org/life-arts/2026-03-18/elijah-delgado-austin-tx-south-by-southwest-sxsw-2026-official-music-showcase
2. https://sonicguild.org/artist/elijah-delgado/

## elle-coves

Elle Coves was born in Freiburg, Germany to Spanish parents and raised near the Black Forest, then moved to Ireland at 13.[\[2\]](https://www.nme.com/features/music-interviews/elle-coves-new-single-interview-summer-radar-3467927) She counts Cork as home and finishes her songs in London studios.[\[3\]](https://www.hotpress.com/music/elle-coves-myself-and-lewis-capaldi-arm-wrestled-it-took-about-three-seconds-i-lost-23007315) She started writing at 14 after meeting Conor O'Donohoe of the band Wild Youth, who became her manager and told her to write a song a day.[\[2\]](https://www.nme.com/features/music-interviews/elle-coves-new-single-interview-summer-radar-3467927)[\[3\]](https://www.hotpress.com/music/elle-coves-myself-and-lewis-capaldi-arm-wrestled-it-took-about-three-seconds-i-lost-23007315) Her first single 'Before I Fall Apart' is still her most-streamed song, and 'Summer', released in July, spread across TikTok.[\[1\]](https://readdork.com/features/elle-coves-interview-mar24/)[\[2\]](https://www.nme.com/features/music-interviews/elle-coves-new-single-interview-summer-radar-3467927) She has opened for Lewis Capaldi, and her music moves between flirty synth-pop and acoustic ballads, drawing on Taylor Swift, Haim and Maggie Rogers.[\[2\]](https://www.nme.com/features/music-interviews/elle-coves-new-single-interview-summer-radar-3467927)[\[4\]](https://staccatofy.com/pop/elle-coves-no-good-at-hanging-up-review/) Her debut EP 'Selfishly' arrived in 2024, followed by 'No Good at Hanging Up' in 2025 on Outlier Recordings and Columbia Records.[\[4\]](https://staccatofy.com/pop/elle-coves-no-good-at-hanging-up-review/)[\[5\]](https://music.apple.com/us/artist/elle-coves/1687094318)

**Sources**

1. https://readdork.com/features/elle-coves-interview-mar24/
2. https://www.nme.com/features/music-interviews/elle-coves-new-single-interview-summer-radar-3467927
3. https://www.hotpress.com/music/elle-coves-myself-and-lewis-capaldi-arm-wrestled-it-took-about-three-seconds-i-lost-23007315
4. https://staccatofy.com/pop/elle-coves-no-good-at-hanging-up-review/
5. https://music.apple.com/us/artist/elle-coves/1687094318

## emma-ogier

Emma Ogier was born in Houston and is now based in Nashville.[\[1\]](https://breakingandentering.net/2026/06/01/emma-ogier-believing-new-single/) She found songwriting during the pandemic, turning teenage isolation into music that sits between alternative pop and Americana.[\[1\]](https://breakingandentering.net/2026/06/01/emma-ogier-believing-new-single/) Her singles 'Baby Don't Hurt Me' and 'Believing', the latter out in June 2026 on Lost Highway Records, were both produced by David Baron, who has also worked with The Lumineers and Jade Bird.[\[1\]](https://breakingandentering.net/2026/06/01/emma-ogier-believing-new-single/) With her longtime collaborator Eden Joel she released 'Rocksteady/HeavyMetal', which reframes a breakup as the start of a friendship.[\[2\]](https://www.thelineofbestfit.com/news/emma-ogier-and-eden-joel-collab-on-post-breakup-friendship-anthem-rocksteady-heavymetal) She has sung harmony with Bright Eyes on their 2005-albums anniversary shows, and she is at work on a debut album.[\[2\]](https://www.thelineofbestfit.com/news/emma-ogier-and-eden-joel-collab-on-post-breakup-friendship-anthem-rocksteady-heavymetal)

**Sources**

1. https://breakingandentering.net/2026/06/01/emma-ogier-believing-new-single/
2. https://www.thelineofbestfit.com/news/emma-ogier-and-eden-joel-collab-on-post-breakup-friendship-anthem-rocksteady-heavymetal

## ethan-regan

Ethan Regan is a Charlotte, North Carolina singer-songwriter who plays the instruments and then produces, mixes and masters his own records.[\[1\]](https://first-avenue.com/performer/ethan-regan/)[\[2\]](https://theduckclub.com/artist/ethan-regan/) He does not work to a formula: a track might turn on a breezy chord progression or open up into a horn section or a wall of strings.[\[1\]](https://first-avenue.com/performer/ethan-regan/) His self-produced 2025 EP 'honey honey honey', six songs on Columbia Records, drew wider attention with 'get by' and 'spaceman'.[\[1\]](https://first-avenue.com/performer/ethan-regan/)[\[3\]](https://music.apple.com/us/album/honey-honey-honey-ep/1823072798) He has passed nearly 100 million streams, headlined his 'I Almost Graduated' Tour, and shared bills with Sam Barber, Rainbow Kitten Surprise, Chelsea Cutler and Jeremy Zucker.[\[1\]](https://first-avenue.com/performer/ethan-regan/) He is releasing a run of 2026 singles for Columbia ahead of a debut album, 'YOUNG REGAN'.[\[1\]](https://first-avenue.com/performer/ethan-regan/)

**Sources**

1. https://first-avenue.com/performer/ethan-regan/
2. https://theduckclub.com/artist/ethan-regan/
3. https://music.apple.com/us/album/honey-honey-honey-ep/1823072798

## fai-laci

Fai Laci grew out of Luke Faillaci's solo project: he recorded the 2022 EP 'Conversation' on his own in a college bedroom, then built a Boston five-piece in early 2024 with Michael Goldblatt, Zack Putnam, Cal Hamandi and Anthony Cervone.[\[1\]](https://www.bighassle.com/fai-laci) A second EP, 'Knock at My Door', followed in 2024, and the two EPs together passed 15 million streams.[\[1\]](https://www.bighassle.com/fai-laci) The band signed to Easy Eye Sound and recorded its debut album 'Elephant in the Room' in Nashville, with the label's founder, Dan Auerbach, producing.[\[1\]](https://www.bighassle.com/fai-laci)[\[3\]](https://easyeyesound.com/collections/fai-laci) Released in June 2026, its ten tracks pair the urgency of punk and the stomp of glam with classic-rock theatricality, moving between brazen rockers and bruised-heart ballads.[\[2\]](https://www.melt-fm.com/artist-profiles/fai-laci-interview)[\[3\]](https://easyeyesound.com/collections/fai-laci)

**Sources**

1. https://www.bighassle.com/fai-laci
2. https://www.melt-fm.com/artist-profiles/fai-laci-interview
3. https://easyeyesound.com/collections/fai-laci

## fakemink

Fakemink is Vincenzo Bhatia, born in 2005 in Ilford, East London, and raised in Basildon, Essex, where he started building tracks on a pirated copy of FL Studio at nine and began rapping at fifteen.[\[1\]](https://en.wikipedia.org/wiki/Fakemink)[\[2\]](https://www.onestowatch.com/en/blog/meet-fakemink) He released the mixtape 'London's Saviour' in December 2023 under an earlier name, 9090gate, then broke through with 'Easter Pink' in January 2025, a track Pitchfork called 'bloghouse meets cloud rap' and The Guardian likened to 'euphoric flips of songs from the Skins soundtrack'.[\[1\]](https://en.wikipedia.org/wiki/Fakemink)[\[3\]](https://en.wikipedia.org/wiki/Easter_Pink) He puts records out on his own imprint, EtnaVeraVela, and press credits him alongside EsDeeKid and Jim Legxacy as a leading figure of the UK underground rap scene tagged 'UK Ug', though he says he is 'not a part of any genre, truly'.[\[2\]](https://www.onestowatch.com/en/blog/meet-fakemink)[\[4\]](https://www.dazeddigital.com/music/article/69279/1/uk-ug-gen-z-brits-reinvented-rap-2025-fakemink-esdeekid-jim-legxacy) The EP 'The Boy Who Cried Terrified' arrived on his 21st birthday in January 2026, with production from Burial among others, ahead of the album 'Terrified' in May 2026, which charted in Australia, Ireland and New Zealand.[\[1\]](https://en.wikipedia.org/wiki/Fakemink)[\[5\]](https://en.wikipedia.org/wiki/The_Boy_Who_Cried_Terrified) Drake brought him out at Wireless in July 2025, and he has since played Coachella and Rolling Loud.[\[1\]](https://en.wikipedia.org/wiki/Fakemink)

**Sources**

1. https://en.wikipedia.org/wiki/Fakemink
2. https://www.onestowatch.com/en/blog/meet-fakemink
3. https://en.wikipedia.org/wiki/Easter_Pink
4. https://www.dazeddigital.com/music/article/69279/1/uk-ug-gen-z-brits-reinvented-rap-2025-fakemink-esdeekid-jim-legxacy
5. https://en.wikipedia.org/wiki/The_Boy_Who_Cried_Terrified

## fancy-hagood

Fancy Hagood, born Jake Hagood in 1991 in Bentonville, Arkansas, first reached listeners without his name attached: the 2015 single 'Goodbye' was released as the anonymous project 'Who Is Fancy', and he revealed himself on 'The Tonight Show' that April after the song reached the Billboard Mainstream Top 40.[\[1\]](https://en.wikipedia.org/wiki/Fancy_Hagood) That run came with major-label backing from Scooter Braun, Scott Borchetta and Dr. Luke, and when it stalled he moved back to Nashville, took the name Fancy Hagood, and turned toward country.[\[1\]](https://en.wikipedia.org/wiki/Fancy_Hagood) His independent albums 'Southern Curiosity' (2021) and 'American Spirit' (2024) work through growing up queer in the South over what one writer called a blend of country and his pop training.[\[1\]](https://en.wikipedia.org/wiki/Fancy_Hagood)[\[2\]](https://rainbowrodeomag.com/fancy-hagood-american-spirit/) 'American Spirit', produced by Jarrad K, features Michelle Branch, Watkins Family Hour and a co-write with Sean McConnell.[\[3\]](https://americana-uk.com/fancy-hagood-american-spirit) He has opened for Meghan Trainor, Ariana Grande and Elle King, and has collaborated with Kacey Musgraves and Devon Gilfillian.[\[1\]](https://en.wikipedia.org/wiki/Fancy_Hagood)

**Sources**

1. https://en.wikipedia.org/wiki/Fancy_Hagood
2. https://rainbowrodeomag.com/fancy-hagood-american-spirit/
3. https://americana-uk.com/fancy-hagood-american-spirit

## faouzia

Faouzia Ouihya, performing mononymously as Faouzia, was born in Casablanca, Morocco, and moved to Canada at one, settling in Carman, Manitoba.[\[1\]](https://en.wikipedia.org/wiki/Faouzia) She started writing songs and playing piano at six, and her vocals carry the Arabic tonalities she grew up on through singers like Umm Kulthum and Fairuz, set against cinematic dark-pop production.[\[1\]](https://en.wikipedia.org/wiki/Faouzia) Her 2020 duet with John Legend, 'Minefields', later featured on her 2022 EP 'CITIZENS', which she framed as a prequel to a debut album still to come.[\[1\]](https://en.wikipedia.org/wiki/Faouzia)[\[2\]](https://thehoneypop.com/2025/11/07/exclusive-interview-how-faouzias-film-noir-turns-heartache-into-high-drama/) That album, 'FILM NOIR', arrived in November 2025 as her first full-length release and her first made fully independent of a label, blending jazz, orchestral arrangements, and Arabic vocals; she has called finishing it independently what she is proudest of.[\[2\]](https://thehoneypop.com/2025/11/07/exclusive-interview-how-faouzias-film-noir-turns-heartache-into-high-drama/) Its track 'UNETHICAL' broke into the UK's Official Independent Singles Breakers Chart.[\[3\]](https://www.officialcharts.com/songs/faouzia-unethical/) Live, her sets lean on powerhouse vocals over a small band, with occasional stripped-down piano moments.[\[4\]](https://weliveentertainment.com/we-live-entertainment/concert-review-faouzia-proves-shes-pops-next-great-voice-fonda-theatre/)[\[5\]](https://justonemoreconcert.com/2026/08/19/faouzia-returns-to-toronto-independent-and-re-invigorated/)

**Sources**

1. https://en.wikipedia.org/wiki/Faouzia
2. https://thehoneypop.com/2025/11/07/exclusive-interview-how-faouzias-film-noir-turns-heartache-into-high-drama/
3. https://www.officialcharts.com/songs/faouzia-unethical/
4. https://weliveentertainment.com/we-live-entertainment/concert-review-faouzia-proves-shes-pops-next-great-voice-fonda-theatre/
5. https://justonemoreconcert.com/2026/08/19/faouzia-returns-to-toronto-independent-and-re-invigorated/

## fcukers

Fcukers are a New York trio: Shanny Wise, once the frontwoman of The Shacks, on vocals, Jackson Walker Lewis on bass and production after five years in Spud Cannon, and Ben Scharf on drums.[\[1\]](https://en.wikipedia.org/wiki/Fcukers)[\[2\]](https://www.nylon.com/entertainment/fcukers-band-new-york-city-music) They formed in late 2022 and played their first show at Baby's All Right in March 2023, rebuilding the sound of '90s dance acts like Deee-Lite and The Chemical Brothers as modern party music.[\[2\]](https://www.nylon.com/entertainment/fcukers-band-new-york-city-music) Early tracks caught Junior Sanchez, who remixed them for his Brobot label, and the band went on to remix the James Murphy single 'Los Angeles'.[\[2\]](https://www.nylon.com/entertainment/fcukers-band-new-york-city-music)[\[3\]](https://ninjatune.net/release/fcukers/baggyss) They signed to Ninja Tune's Technicolour imprint in 2024 and released the EP 'Baggy$$' that September, which won a 2025 Libera Award for Best Dance Record; its track 'Homie Don't Shake' samples Beck.[\[1\]](https://en.wikipedia.org/wiki/Fcukers)[\[3\]](https://ninjatune.net/release/fcukers/baggyss) The debut album 'Ö' followed in March 2026.[\[1\]](https://en.wikipedia.org/wiki/Fcukers) They have played Governors Ball, Bonnaroo and Primavera Sound and opened for Tame Impala.[\[1\]](https://en.wikipedia.org/wiki/Fcukers)[\[2\]](https://www.nylon.com/entertainment/fcukers-band-new-york-city-music)

**Sources**

1. https://en.wikipedia.org/wiki/Fcukers
2. https://www.nylon.com/entertainment/fcukers-band-new-york-city-music
3. https://ninjatune.net/release/fcukers/baggyss

## fightmaster

E.R. Fightmaster is a nonbinary actor and musician based in Los Angeles, best known on screen as Dr. Kai Bartley on 'Grey's Anatomy', the show's first nonbinary doctor, with earlier roles in 'Shrill' and 'Work in Progress' and the 2025 film 'Sorry, Baby'.[\[1\]](https://en.wikipedia.org/wiki/E._R._Fightmaster) They came up through Chicago's Second City and hold a degree in women's and gender studies from DePaul.[\[1\]](https://en.wikipedia.org/wiki/E._R._Fightmaster) The solo project FIGHTMASTER started in 2023, drawing on indie rock, folk and pop across the EPs 'Violence' (2023) and 'Bloodshed Baby' (2024).[\[1\]](https://en.wikipedia.org/wiki/E._R._Fightmaster)[\[2\]](https://fightmaster1.bandcamp.com/album/tolerance) The debut album 'Tolerance' arrived in June 2026, led by the single 'All Or Nothing'.[\[2\]](https://fightmaster1.bandcamp.com/album/tolerance) Fightmaster also records as half of the duo Twin and co-hosts the sports podcast 'Jockular', and on the road has opened for Orla Gartland and supported Lucy Dacus and Lord Huron.[\[1\]](https://en.wikipedia.org/wiki/E._R._Fightmaster)

**Sources**

1. https://en.wikipedia.org/wiki/E._R._Fightmaster
2. https://fightmaster1.bandcamp.com/album/tolerance

## finn-wolfhard

Finn Wolfhard, born in Vancouver in 2002 and known for 'Stranger Things', has kept a band going since he was a teenager.[\[1\]](https://en.wikipedia.org/wiki/Finn_Wolfhard) He fronted Calpurnia, who put out the EP 'Scout' on Royal Mountain in 2018 and turned up in Weezer's 'Take On Me' video before splitting in 2019.[\[1\]](https://en.wikipedia.org/wiki/Finn_Wolfhard)[\[2\]](<https://en.wikipedia.org/wiki/Calpurnia_(band)>) With Calpurnia's drummer Malcolm Craig he then started the duo the Aubreys.[\[1\]](https://en.wikipedia.org/wiki/Finn_Wolfhard) He challenged himself to write around fifty songs and kept the most personal for a record under his own name, the solo debut 'Happy Birthday' (June 2025, AWAL), made in Chicago with producer Kai Slater and tracked to four- and eight-track tape 'because I wanted it to feel as handmade as possible'.[\[3\]](https://www.grammy.com/news/finn-wolfhard-interview-debut-album-happy-birthday/)[\[4\]](https://consequence.net/2025/06/finn-wolfhard-happy-birthday-stranger-things/) He cites Pavement, Stereolab, Feist and Guided By Voices for the melodicism, and says music lets him project how he feels 'straight from the source' in a way acting does not.[\[3\]](https://www.grammy.com/news/finn-wolfhard-interview-debut-album-happy-birthday/) A second album, 'Fire from the Hip', followed in 2026.[\[1\]](https://en.wikipedia.org/wiki/Finn_Wolfhard)

**Sources**

1. https://en.wikipedia.org/wiki/Finn_Wolfhard
2. https://en.wikipedia.org/wiki/Calpurnia_(band)
3. https://www.grammy.com/news/finn-wolfhard-interview-debut-album-happy-birthday/
4. https://consequence.net/2025/06/finn-wolfhard-happy-birthday-stranger-things/

## gabriel-jacoby

Gabriel Jacoby was born in rural Anderson, South Carolina in 1998, the eldest of seven, and moved to Tampa, Florida at nine.[\[1\]](https://en.wikipedia.org/wiki/Gabriel_Jacoby)[\[3\]](https://www.nme.com/the-cover/gabriel-jacoby-07-09-2026-3967277) He taught himself guitar, piano and production, and counts Prince, D'Angelo, Anderson .Paak and Maxwell among his influences.[\[1\]](https://en.wikipedia.org/wiki/Gabriel_Jacoby)[\[3\]](https://www.nme.com/the-cover/gabriel-jacoby-07-09-2026-3967277) He signed to Pulse Records and relocated to Los Angeles in 2024, though he still identifies with Tampa and returns to Florida to write.[\[3\]](https://www.nme.com/the-cover/gabriel-jacoby-07-09-2026-3967277) He started releasing music in 2022 and put out his debut EP 'gutta child' in November 2025, eight self-produced tracks he describes as fusing 'blues, funk, Florida krank, and R&B into a singular Southern identity', which NME summed up as 'Tampa krank, backwoods blues and head-nodding R&B'.[\[1\]](https://en.wikipedia.org/wiki/Gabriel_Jacoby)[\[2\]](https://thegarnettereport.com/art/music/gabriel-jacoby-releases-debut-ep-gutta-child/)[\[3\]](https://www.nme.com/the-cover/gabriel-jacoby-07-09-2026-3967277) Its song 'bootleg' features the Tampa rapper Tom G.[\[1\]](https://en.wikipedia.org/wiki/Gabriel_Jacoby) Jacoby co-wrote Shaboozey's 'Chrome (Bonus)' in 2025, was named a Shazam Fast Forward artist, and toured North America as direct support for Khamari on the sold-out 'To Dry a Tear' run before headlining his own dates in early 2026.[\[1\]](https://en.wikipedia.org/wiki/Gabriel_Jacoby)[\[2\]](https://thegarnettereport.com/art/music/gabriel-jacoby-releases-debut-ep-gutta-child/)

**Sources**

1. https://en.wikipedia.org/wiki/Gabriel_Jacoby
2. https://thegarnettereport.com/art/music/gabriel-jacoby-releases-debut-ep-gutta-child/
3. https://www.nme.com/the-cover/gabriel-jacoby-07-09-2026-3967277

## geese

Geese are a Brooklyn band that singer Cameron Winter started with schoolmates in 2016, signed to Partisan and PIAS in 2020.[\[1\]](<https://en.wikipedia.org/wiki/Geese_(band)>) Their records keep mutating: the wiry post-punk of 'Projector' (2021), the country-funk and classic-rock swerve of '3D Country' (2023), and 'Getting Killed' (2025), made in Los Angeles with Kenny Beats while the city burned in the January wildfires.[\[1\]](<https://en.wikipedia.org/wiki/Geese_(band)>)[\[3\]](https://www.blackbirdspyplane.com/p/cameron-winter-interview-geese-the-urge-to-respond) Winter describes the method as finding something to filter through the band and then 'working backwards to try and un-plagiarize it', and says the aim is to match the world rather than escape it.[\[3\]](https://www.blackbirdspyplane.com/p/cameron-winter-interview-geese-the-urge-to-respond) His howling, theatrical vocal read as a joke to some until the solo album 'Heavy Metal' (December 2024) recast it as the real thing, taking a Pitchfork Best New Music and a high place on that site's 2025 list.[\[2\]](<https://en.wikipedia.org/wiki/Heavy_Metal_(album)>)[\[4\]](https://stereogum.com/2323412/premature-evaluation-geese-getting-killed/reviews/premature-evaluation) Geese have since played Coachella and Lollapalooza and won International Group of the Year at the 2026 Brit Awards.[\[1\]](<https://en.wikipedia.org/wiki/Geese_(band)>)

**Sources**

1. https://en.wikipedia.org/wiki/Geese_(band)
2. https://en.wikipedia.org/wiki/Heavy_Metal_(album)
3. https://www.blackbirdspyplane.com/p/cameron-winter-interview-geese-the-urge-to-respond
4. https://stereogum.com/2323412/premature-evaluation-geese-getting-killed/reviews/premature-evaluation

## girlfriend

Girlfriend is Kenya Edwards, an R&B singer-songwriter raised in Sardis, Mississippi, an hour south of Memphis, and now based in Los Angeles.[\[1\]](https://www.dredgezine.com/featuresarchive/artist-spotlight-girlfriend)[\[2\]](https://dailymemphian.com/subscriber/article/62164) She recorded her first song for a middle-school class project, and the reaction from classmates made her 'the girl who does music'.[\[3\]](https://www.billboard.com/music/rb-hip-hop/girlfriend-rb-artist-of-the-month-may-2026-1236256198/)[\[4\]](https://www.ladygunn.com/music/in-conversation-with-girlfriend-the-artist-who-turns-emotions-into-music/) She has a psychology degree from Rhodes College.[\[2\]](https://dailymemphian.com/subscriber/article/62164) Her sound reaches back to R&B from the late 2000s and early 2010s, an era she credits for taking production risks, and her touchstones run from Janet Jackson and Usher's 'Confessions' to Rihanna's 'Anti', Stephen Marley and Lil Wayne's wordplay.[\[3\]](https://www.billboard.com/music/rb-hip-hop/girlfriend-rb-artist-of-the-month-may-2026-1236256198/) She raps as much as she sings, and engineers, produces and plays on her own records.[\[3\]](https://www.billboard.com/music/rb-hip-hop/girlfriend-rb-artist-of-the-month-may-2026-1236256198/) Her collaborations include 'Bon Voyage' with Tierra Whack and the duet 'All U Need' with Jaymin.[\[3\]](https://www.billboard.com/music/rb-hip-hop/girlfriend-rb-artist-of-the-month-may-2026-1236256198/)[\[5\]](https://www.vipermag.com/2025/05/26/girlfriend-interview/) The EP 'It's Complicated' arrived in April 2025 on Encore Recordings, and her debut album 'Honey Water' followed in January 2026: ten tracks produced with Kenneth 'KP' Paige, Malik Ninety Five and Mike Baretz, which she has described as balancing Southern sweetness with knowing when enough is enough.[\[6\]](https://music.apple.com/us/album/its-complicated/1809467900)[\[7\]](https://music.apple.com/us/album/honey-water/1858611265)[\[8\]](https://www.shatterthestandards.com/p/album-review-honey-water-by-girlfriend)[\[3\]](https://www.billboard.com/music/rb-hip-hop/girlfriend-rb-artist-of-the-month-may-2026-1236256198/) She was BET's Amplified Artist for March 2026 and Billboard's Up-and-Coming R&B Artist of the Month that May, and has toured with Ella Mai.[\[9\]](https://www.paramountpressexpress.com/bet/releases/?view=112552-bet-spotlights-rising-rb-voice-girlfriend-as-bet-amplified-artist-for-march-2026)[\[3\]](https://www.billboard.com/music/rb-hip-hop/girlfriend-rb-artist-of-the-month-may-2026-1236256198/)

**Sources**

1. https://www.dredgezine.com/featuresarchive/artist-spotlight-girlfriend
2. https://dailymemphian.com/subscriber/article/62164
3. https://www.billboard.com/music/rb-hip-hop/girlfriend-rb-artist-of-the-month-may-2026-1236256198/
4. https://www.ladygunn.com/music/in-conversation-with-girlfriend-the-artist-who-turns-emotions-into-music/
5. https://www.vipermag.com/2025/05/26/girlfriend-interview/
6. https://music.apple.com/us/album/its-complicated/1809467900
7. https://music.apple.com/us/album/honey-water/1858611265
8. https://www.shatterthestandards.com/p/album-review-honey-water-by-girlfriend
9. https://www.paramountpressexpress.com/bet/releases/?view=112552-bet-spotlights-rising-rb-voice-girlfriend-as-bet-amplified-artist-for-march-2026

## grace-ives

Grace Ives grew up in Gowanus, Brooklyn, the child of a cinematographer and a music-industry creative director, and started making tracks alone in her dorm room at SUNY Purchase after transferring from art school.[\[1\]](https://en.wikipedia.org/wiki/Grace_Ives) She built her early songs on a Roland MC-505, the drum machine M.I.A. came up on, and kept them short: after two minutes of hearing something, she has said, her neck starts to hurt.[\[1\]](https://en.wikipedia.org/wiki/Grace_Ives)[\[2\]](https://www.thefader.com/2019/07/11/grace-ives-gen-f-interview) The 2016 EP 'Really Hot' and the 2019 album '2nd', on the New York label Dots Per Inch, drew notice, and Stereogum named her one of its best new bands of 2019.[\[1\]](https://en.wikipedia.org/wiki/Grace_Ives)[\[2\]](https://www.thefader.com/2019/07/11/grace-ives-gen-f-interview) Her second album 'Janky Star' (2022) earned Pitchfork's Best New Music and a 'Lullaby' performance on Jimmy Kimmel Live!.[\[1\]](https://en.wikipedia.org/wiki/Grace_Ives) 'Girlfriend' followed in March 2026 on True Panther and Capitol, produced with Ariel Rechtshaid and John DeBold and again taking Best New Music.[\[3\]](https://en.wikipedia.org/wiki/Girlfriend_(Grace_Ives_album)) She has toured in support of Lykke Li.[\[1\]](https://en.wikipedia.org/wiki/Grace_Ives)

**Sources**

1. https://en.wikipedia.org/wiki/Grace_Ives
2. https://www.thefader.com/2019/07/11/grace-ives-gen-f-interview
3. https://en.wikipedia.org/wiki/Girlfriend_(Grace_Ives_album)

## grocery-bag

Grocery Bag is an Austin four-piece: Bella Martinez, Jimmy Mercado, Dillon Aitala and Logan Kerman, all multi-instrumentalists.[\[1\]](https://kcsufm.com/2025/05/austin-tx-band-grocery-bag-pens-nonsense-lyrics-and-were-peer-pressured-to-keep-their-last-minute-name/)[\[2\]](https://www.sonicguild.org/artist/grocery-bag) The band came together by accident when Martinez booked a show without a group and asked the other three to fill in, and the name came from a vintage sign in her father's garage that they got talked into keeping.[\[1\]](https://kcsufm.com/2025/05/austin-tx-band-grocery-bag-pens-nonsense-lyrics-and-were-peer-pressured-to-keep-their-last-minute-name/) They build songs around a guitar riff first and treat the words as almost beside the point, running classic garage rock through a modern psychedelic filter.[\[1\]](https://kcsufm.com/2025/05/austin-tx-band-grocery-bag-pens-nonsense-lyrics-and-were-peer-pressured-to-keep-their-last-minute-name/)[\[3\]](https://kutx.org/artist-of-the-month/grocery-bag/) Their self-released debut album 'Break You' arrived in November 2023.[\[4\]](https://grocerybag.bandcamp.com/album/break-you) Still unsigned, they have opened locally for Osees, Frankie and the Witch Fingers and Psychedelic Porn Crumpets, and have played Levitation.[\[2\]](https://www.sonicguild.org/artist/grocery-bag)[\[3\]](https://kutx.org/artist-of-the-month/grocery-bag/)

**Sources**

1. https://kcsufm.com/2025/05/austin-tx-band-grocery-bag-pens-nonsense-lyrics-and-were-peer-pressured-to-keep-their-last-minute-name/
2. https://www.sonicguild.org/artist/grocery-bag
3. https://kutx.org/artist-of-the-month/grocery-bag/
4. https://grocerybag.bandcamp.com/album/break-you

## happy-landing

Happy Landing formed in Oxford, Mississippi in 2020, five friends who met at the University of Mississippi: Matty Hendley on lead vocals and guitar, Keegan Christensen on keys, Jacob Christensen on drums, Andrew Gardner on fiddle and Wilson Moyer on bass.[\[1\]](https://first-avenue.com/performer/happy-landing/)[\[2\]](https://oxfordeagle.com/2022/04/23/happy-landing-on-the-fast-track-and-taking-the-double-decker-stage/) Hendley started writing songs in earnest during a semester in New York interning at CBS, realized music had taken over, and came home to start a band.[\[3\]](https://thedmonline.com/inside-the-creation-of-local-band-happy-landing/) They call what they do 'skate folk', a mix of southern rock, punk and folk, and the tag is half a joke about how they dress.[\[1\]](https://first-avenue.com/performer/happy-landing/)[\[3\]](https://thedmonline.com/inside-the-creation-of-local-band-happy-landing/) The debut EP 'She's Got Brooklyn' came out in August 2020 with a backyard release party, a self-titled EP followed in 2022, and the debut album 'Golden' arrived in 2024, with a second album 'Big Sun' due in 2026.[\[1\]](https://first-avenue.com/performer/happy-landing/)[\[2\]](https://oxfordeagle.com/2022/04/23/happy-landing-on-the-fast-track-and-taking-the-double-decker-stage/)[\[3\]](https://thedmonline.com/inside-the-creation-of-local-band-happy-landing/) They have played Bonnaroo, Lollapalooza and Summerfest.[\[1\]](https://first-avenue.com/performer/happy-landing/)

**Sources**

1. https://first-avenue.com/performer/happy-landing/
2. https://oxfordeagle.com/2022/04/23/happy-landing-on-the-fast-track-and-taking-the-double-decker-stage/
3. https://thedmonline.com/inside-the-creation-of-local-band-happy-landing/

## houndmouth

Houndmouth formed in New Albany, Indiana, across the river from Louisville, in the summer of 2011.[\[1\]](https://en.wikipedia.org/wiki/Houndmouth) The original four-piece shared lead vocals; keyboardist and singer Katie Toupin left in 2016, and the band now runs as Matt Myers, Caleb Hickman and Zac Anderson.[\[1\]](https://en.wikipedia.org/wiki/Houndmouth)[\[2\]](https://jambands.com/news/2016/04/08/katie-toupin-leaves-houndmouth/) 'Sedona', from 2015's 'Little Neon Limelight' on Rough Trade, reached number one on the adult alternative chart and went platinum, and the band built its name on the Americana circuit with stops at ACL, Bonnaroo, Lollapalooza and Newport Folk.[\[1\]](https://en.wikipedia.org/wiki/Houndmouth)[\[3\]](https://www.vpm.org/listen/2024-11-09/matt-myers-houndmouth-band-interview/) After the major-label 'Golden Age' on Reprise in 2018, they recorded 'Good for You' (2021) back in the room where they had cut their first EP, calling it a return to roots;[\[3\]](https://www.vpm.org/listen/2024-11-09/matt-myers-houndmouth-band-interview/) 'Lordy' followed in 2026, both of those albums on Dualtone.[\[1\]](https://en.wikipedia.org/wiki/Houndmouth)

**Sources**

1. https://en.wikipedia.org/wiki/Houndmouth
2. https://jambands.com/news/2016/04/08/katie-toupin-leaves-houndmouth/
3. https://www.vpm.org/listen/2024-11-09/matt-myers-houndmouth-band-interview/

## hunx-and-his-punx

Hunx and His Punx is the band Seth Bogart, who performs as Hunx, started in the Bay Area around 2008 after leaving the electroclash group Gravy Train!!!!.[\[1\]](https://en.wikipedia.org/wiki/Hunx_and_His_Punx)[\[2\]](https://en.wikipedia.org/wiki/Seth_Bogart) The core trio is Bogart, Shannon Shaw of Shannon and the Clams, and drummer Erin Emslie, playing queer garage punk that owes as much to 1960s girl groups and bubblegum as to punk.[\[1\]](https://en.wikipedia.org/wiki/Hunx_and_His_Punx) 'Gay Singles' (2010) collected the early 7-inches, and 'Too Young to Be in Love' (2011) and 'Street Punk' (2013) came out on Hardly Art.[\[1\]](https://en.wikipedia.org/wiki/Hunx_and_His_Punx) Bogart spent the years after making visual art and ceramics, running the streetwear label Wacky Wacko, and releasing solo records including 'Hairdresser Blues'.[\[2\]](https://en.wikipedia.org/wiki/Seth_Bogart) The band reunited in 2019, toured with Bikini Kill and opened for the B-52s, and after delays from the pandemic and the 2025 Eaton Fire that took Bogart's home studio, released 'Walk Out on This World' on Get Better Records in August 2025, its first album in twelve years.[\[1\]](https://en.wikipedia.org/wiki/Hunx_and_His_Punx)[\[3\]](https://newnoisemagazine.com/hunx-and-his-punx-sign-to-get-better-records-and-announce-new-album/)

**Sources**

1. https://en.wikipedia.org/wiki/Hunx_and_His_Punx
2. https://en.wikipedia.org/wiki/Seth_Bogart
3. https://newnoisemagazine.com/hunx-and-his-punx-sign-to-get-better-records-and-announce-new-album/

## huston-tillotson-jazz-collective

The Huston-Tillotson University Jazz Collective is an all-student ensemble from Huston-Tillotson University, founded in 1875 as Austin's first college and still the city's only HBCU.[\[1\]](https://www.austinchronicle.com/music/2022-10-14/acl-interview-on-the-shoulders-of-giants-the-huston-tillotson-university-jazz-collective-makes-acl-d/) The jazz program was rebuilt quickly: band director William Oliver arrived in 2021 to find a handful of students who wanted to play jazz, brought in Dr. Jeremy George as director of jazz studies in 2022, and that same year an ACL booker caught a couple of shows and put the group on the festival.[\[2\]](https://austinfreepress.org/high-note/) It has played ACL every year since, moving from a Friday opening slot to Sunday.[\[2\]](https://austinfreepress.org/high-note/)[\[4\]](https://kutx.org/words-on-music/black-history-month/from-austin-to-the-national-stage-huston-tillotson-jazz-orchestra-makes-its-mark/) The repertoire skips the standard conservatory canon for arrangements that run from Earth, Wind and Fire to current pop, and its alumni include Count Basie Orchestra singer Carmen Bradford and Ray Charles arranger James Polk.[\[1\]](https://www.austinchronicle.com/music/2022-10-14/acl-interview-on-the-shoulders-of-giants-the-huston-tillotson-university-jazz-collective-makes-acl-d/) Billed at competitions as the Huston-Tillotson Jazz Orchestra, the same students placed third at the National Collegiate Jazz Competition at Jazz at Lincoln Center in January 2026, behind Temple and Michigan State, as the smallest school and the only all-undergraduate group in the field.[\[3\]](https://htu.edu/huston-tillotson-university-jazz-orchestra-places-third-at-2026-national-collegiate-jazz-competition/)[\[4\]](https://kutx.org/words-on-music/black-history-month/from-austin-to-the-national-stage-huston-tillotson-jazz-orchestra-makes-its-mark/)

**Sources**

1. https://www.austinchronicle.com/music/2022-10-14/acl-interview-on-the-shoulders-of-giants-the-huston-tillotson-university-jazz-collective-makes-acl-d/
2. https://austinfreepress.org/high-note/
3. https://htu.edu/huston-tillotson-university-jazz-orchestra-places-third-at-2026-national-collegiate-jazz-competition/
4. https://kutx.org/words-on-music/black-history-month/from-austin-to-the-national-stage-huston-tillotson-jazz-orchestra-makes-its-mark/

## its-murph

it's murph is Garrett Murphy, a DJ and producer who grew up in the Nashville suburbs and got into dance music seeing Porter Robinson live.[\[1\]](https://music.apple.com/us/artist/its-murph/1650216419)[\[2\]](https://edmidentity.com/2024/07/06/its-murph-electric-forest-interview/) He studied the music industry at USC and played his first big set, the Do LaB stage at Coachella, in 2023, just before graduating.[\[2\]](https://edmidentity.com/2024/07/06/its-murph-electric-forest-interview/) His first single as it's murph, 'Food for the Soul', came out that year and turned into a small viral hit.[\[1\]](https://music.apple.com/us/artist/its-murph/1650216419)[\[3\]](https://relentlessbeats.com/2025/11/its-murph-taking-over-the-van-buren-for-his-through-my-system-tour) Apple Music describes the sound as the punch of EDM crossed with a breezy Balearic feel; he makes house, cites Porter Robinson, Fred again.. and Flume, and cut the dancefloor track 'Down Low' with Sorana.[\[1\]](https://music.apple.com/us/artist/its-murph/1650216419)[\[2\]](https://edmidentity.com/2024/07/06/its-murph-electric-forest-interview/) His debut album 'Weightless' arrived in 2025, he toured it as the 'Through My System' run, and he splits his time between Los Angeles and Nashville.[\[1\]](https://music.apple.com/us/artist/its-murph/1650216419)[\[2\]](https://edmidentity.com/2024/07/06/its-murph-electric-forest-interview/)[\[3\]](https://relentlessbeats.com/2025/11/its-murph-taking-over-the-van-buren-for-his-through-my-system-tour) He has played Electric Forest, Bonnaroo, Lightning in a Bottle and III Points.[\[1\]](https://music.apple.com/us/artist/its-murph/1650216419)[\[2\]](https://edmidentity.com/2024/07/06/its-murph-electric-forest-interview/)

**Sources**

1. https://music.apple.com/us/artist/its-murph/1650216419
2. https://edmidentity.com/2024/07/06/its-murph-electric-forest-interview/
3. https://relentlessbeats.com/2025/11/its-murph-taking-over-the-van-buren-for-his-through-my-system-tour

## izzy-escobar

Izzy Escobar is a Cuban-Italian singer-songwriter from Massachusetts, now based in New York, classically trained on violin and piano.[\[1\]](https://www.iheart.com/content/2026-07-14-who-is-izzy-escobar-watch-her-new-hate-to-be-the-one-video/)[\[2\]](https://justlistentothis.co.uk/news/izzy-escobar-releases-new-single-hate-to-be-the-one/) She built an audience posting spontaneous piano performances online, running up millions of views, and press has picked up on a voice that moves between quiet intimacy and anthemic power.[\[1\]](https://www.iheart.com/content/2026-07-14-who-is-izzy-escobar-watch-her-new-hate-to-be-the-one-video/)[\[2\]](https://justlistentothis.co.uk/news/izzy-escobar-releases-new-single-hate-to-be-the-one/) Her debut project, the acoustic EP 'Sunny in London', came out on Artist House and included the single 'Gangster's Wife'.[\[2\]](https://justlistentothis.co.uk/news/izzy-escobar-releases-new-single-hate-to-be-the-one/) In 2026 she released 'Hate to Be The One', a breakup song written for her by Diane Warren, which reached the Shazam top ten in the US and Canada and was used in HBO's 'Hacks'; her track 'Evergreen Avenue' appears on the soundtrack to 'The Devil Wears Prada 2', alongside Lady Gaga, Dua Lipa and Laufey.[\[1\]](https://www.iheart.com/content/2026-07-14-who-is-izzy-escobar-watch-her-new-hate-to-be-the-one-video/)[\[2\]](https://justlistentothis.co.uk/news/izzy-escobar-releases-new-single-hate-to-be-the-one/) Forbes, Billboard and the BBC have all covered her, with Forbes dubbing her 'your pop queen in 2026'.[\[1\]](https://www.iheart.com/content/2026-07-14-who-is-izzy-escobar-watch-her-new-hate-to-be-the-one-video/)

**Sources**

1. https://www.iheart.com/content/2026-07-14-who-is-izzy-escobar-watch-her-new-hate-to-be-the-one-video/
2. https://justlistentothis.co.uk/news/izzy-escobar-releases-new-single-hate-to-be-the-one/

## jess-williamson

Jess Williamson was born in Lewisville, Texas and grew up in the Dallas area. She went to the University of Texas at Austin to study photojournalism and did not start writing songs or playing instruments until her senior year.[\[3\]](https://www.dallasobserver.com/music/dallas-native-jess-williamson-from-plains-comes-home-ahead-of-new-solo-release-16710745/) She put out 'Native State' (2014) and 'Heart Song' (2016) on her own Brutal Honest imprint, then signed to Mexican Summer for 'Cosmic Wink' (2018) and 'Sorceress' (2020).[\[1\]](https://en.wikipedia.org/wiki/Jess_Williamson) Her fifth album, 'Time Ain't Accidental' (2023), sets minimalist modern-country ballads against saxophone and loose beats; it drew universal acclaim and topped Stereogum's best country albums of the year.[\[2\]](https://en.wikipedia.org/wiki/Time_Ain%27t_Accidental)[\[3\]](https://www.dallasobserver.com/music/dallas-native-jess-williamson-from-plains-comes-home-ahead-of-new-solo-release-16710745/) In 2022 she formed the duo Plains with Katie Crutchfield of Waxahatchee and released 'I Walked with You a Ways'.[\[1\]](https://en.wikipedia.org/wiki/Jess_Williamson) Now based in Los Angeles, she has a sixth album, 'A Mile South of Heaven', due in October 2026.[\[1\]](https://en.wikipedia.org/wiki/Jess_Williamson)

**Sources**

1. https://en.wikipedia.org/wiki/Jess_Williamson
2. https://en.wikipedia.org/wiki/Time_Ain%27t_Accidental
3. https://www.dallasobserver.com/music/dallas-native-jess-williamson-from-plains-comes-home-ahead-of-new-solo-release-16710745/

## jesse-welles

Jesse Welles, born Jesse Wells in 1992 in Ozark, Arkansas, grew up on his mother's Crosby, Stills and Nash and Fleetwood Mac records and found Dylan and harder folk on his own.[\[1\]](https://en.wikipedia.org/wiki/Jesse_Welles)[\[2\]](https://www.cbsnews.com/news/jesse-welles-keeping-the-spirit-of-american-folk-music-alive/) He fronted rock bands through the 2010s, including Welles, whose 2018 album 'Red Trees and White Trashes' came out on 300 Entertainment with Dave Cobb producing.[\[1\]](https://en.wikipedia.org/wiki/Jesse_Welles) In 2024 he started filming short, plainspoken protest songs alone in the Arkansas hills, on healthcare, war and money, and they went viral.[\[1\]](https://en.wikipedia.org/wiki/Jesse_Welles)[\[2\]](https://www.cbsnews.com/news/jesse-welles-keeping-the-spirit-of-american-folk-music-alive/) His albums 'Middle' (2025) and the live-and-field-recording set 'Under the Powerlines' brought four nominations at the 2026 Grammys, across the folk, Americana and roots categories.[\[1\]](https://en.wikipedia.org/wiki/Jesse_Welles)[\[2\]](https://www.cbsnews.com/news/jesse-welles-keeping-the-spirit-of-american-folk-music-alive/) He has since performed with John Fogerty and recorded with Joan Baez, and released the album 'Masks Off' in 2026.[\[1\]](https://en.wikipedia.org/wiki/Jesse_Welles)[\[2\]](https://www.cbsnews.com/news/jesse-welles-keeping-the-spirit-of-american-folk-music-alive/)

**Sources**

1. https://en.wikipedia.org/wiki/Jesse_Welles
2. https://www.cbsnews.com/news/jesse-welles-keeping-the-spirit-of-american-folk-music-alive/

## joe-jordan

Joe Jordan is a singer-songwriter from Woonsocket, Rhode Island who spent years playing bars and honky-tonks around the Northeast before turning toward songwriting.[\[1\]](https://www.joejordanmusic.com/bio)[\[2\]](https://www.puretone.com/artists/joe-jordan) He co-wrote 'Front Seat' for Rayne Johnson, a piano ballad that reached number 34 on Billboard's Country Airplay chart in 2020 and has passed 100 million streams, and started releasing his own music in 2023.[\[2\]](https://www.puretone.com/artists/joe-jordan)[\[3\]](https://en.wikipedia.org/wiki/Rayne_Johnson) His indie folk-country songs, among them 'Spiraling Down' and 'Don't Tell Alley', have pushed his catalog past 150 million streams.[\[1\]](https://www.joejordanmusic.com/bio) He signed to Atlantic Records in 2024, left the following year, and partnered with the New York label Rix Records in 2026, working out of the Cincinnati company Mountain Road Records.[\[1\]](https://www.joejordanmusic.com/bio) His debut album 'The Heart Sessions', which he calls the most honest thing he has made, songs about love, heartbreak, addiction, faith and healing, is due in August 2026.[\[1\]](https://www.joejordanmusic.com/bio)

**Sources**

1. https://www.joejordanmusic.com/bio
2. https://www.puretone.com/artists/joe-jordan
3. https://en.wikipedia.org/wiki/Rayne_Johnson

## joshua-jensen

Joshua Jensen grew up in a large, musical Arizona family that used singing as a kind of prayer, with his grandfather's guitar at every gathering.[\[1\]](https://atwoodmagazine.com/jjhp-joshua-jensen-hoping-debut-single-interview-music-premiere/)[\[2\]](https://noisescapemagazine.com/news/interview-joshua-jensen) He moved to New York to study jazz at The New School, where he worked with the bassist Reggie Workman, and spent several years writing with other artists before starting his own project.[\[2\]](https://noisescapemagazine.com/news/interview-joshua-jensen) His playing runs from classical piano, which he trained in under Fei Xu, to jazz, gospel and old American folk, and he cites film composers like Aaron Copland and Max Richter alongside Joni Mitchell and Stevie Wonder.[\[1\]](https://atwoodmagazine.com/jjhp-joshua-jensen-hoping-debut-single-interview-music-premiere/)[\[2\]](https://noisescapemagazine.com/news/interview-joshua-jensen) Atwood Magazine premiered his debut single 'Hoping' in July 2026, calling it a slow-burning folk-rock prayer against despair; he recorded it with one guitar, two microphones and a field sample from back home, and shot the video in the Arizona mountains with his sisters.[\[1\]](https://atwoodmagazine.com/jjhp-joshua-jensen-hoping-debut-single-interview-music-premiere/)[\[2\]](https://noisescapemagazine.com/news/interview-joshua-jensen)

**Sources**

1. https://atwoodmagazine.com/jjhp-joshua-jensen-hoping-debut-single-interview-music-premiere/
2. https://noisescapemagazine.com/news/interview-joshua-jensen

## kevin-atwater

Kevin Atwater is a singer-songwriter from Downers Grove, Illinois, now based in New York, who trained on classical piano and clarinet as a kid and taught himself guitar.[\[1\]](https://en.wikipedia.org/wiki/Kevin_Atwater_(singer))[\[2\]](https://outwritenewsmag.org/2022/10/queer-next-up-kevin-atwater/) He first built a following of about a million on TikTok making comedy videos and fan edits, then started posting music, and his 2022 single 'star tripping' went viral there.[\[1\]](https://en.wikipedia.org/wiki/Kevin_Atwater_(singer))[\[2\]](https://outwritenewsmag.org/2022/10/queer-next-up-kevin-atwater/) He calls what he does 'folk with a queer twist', writing openly about queer experience, and cites Sufjan Stevens, Phoebe Bridgers, Nick Drake, Joni Mitchell and Adrianne Lenker.[\[1\]](https://en.wikipedia.org/wiki/Kevin_Atwater_(singer))[\[2\]](https://outwritenewsmag.org/2022/10/queer-next-up-kevin-atwater/) The bedroom-recorded EP 'retriever' came out in early 2022, followed by the EP 'Downers Grove' in 2023, and his debut album 'Achilles' arrived in 2025 on Mutual Friends, which he backed with a month-long US headline tour plus Canada and UK dates; 'Blush Red' followed in 2026.[\[1\]](https://en.wikipedia.org/wiki/Kevin_Atwater_(singer))

**Sources**

1. https://en.wikipedia.org/wiki/Kevin_Atwater_(singer)
2. https://outwritenewsmag.org/2022/10/queer-next-up-kevin-atwater/

## kings-of-leon

Kings of Leon started as a family band in 1999: three Followill brothers, Caleb, Nathan and Jared, joined by their cousin Matthew, playing Southern boogie and garage rock.[\[1\]](https://en.wikipedia.org/wiki/Kings_of_Leon) 'Only by the Night' (2008) made them a stadium band, and 'Use Somebody' took Record of the Year at the 2010 Grammys, one of four the band has won.[\[2\]](https://www.grammy.com/artists/kings-leon/7815/) Their ninth album, 'Can We Please Have Fun' (2024), was their first on their own label, LoveTap, made with producer Kid Harpoon, and pulled back toward the rawness of their early years.[\[3\]](https://www.nme.com/features/music-interviews/kings-of-leon-can-we-please-have-fun-3753952) A tenth album, 'O My Beloved', was announced in September 2026: after Caleb broke his foot and the band called off a European tour, he picked up an acoustic guitar, and what came out was a stripped-down, more personal turn from the band's usual sound.[\[4\]](https://www.local10.com/entertainment/2026/09/10/kings-of-leon-reveal-a-new-more-personal-acoustic-songwriting-direction-with-album-o-my-beloved/)

**Sources**

1. https://en.wikipedia.org/wiki/Kings_of_Leon
2. https://www.grammy.com/artists/kings-leon/7815/
3. https://www.nme.com/features/music-interviews/kings-of-leon-can-we-please-have-fun-3753952
4. https://www.local10.com/entertainment/2026/09/10/kings-of-leon-reveal-a-new-more-personal-acoustic-songwriting-direction-with-album-o-my-beloved/

## labrinth

Labrinth is Timothy Lee McKenzie, born in Hackney, London, in 1989. He was doing production and remix work and sleeping in the studio when Simon Cowell signed him to Syco in 2010, the first act in six years to join the label without going through one of Cowell's talent shows.[\[1\]](https://en.wikipedia.org/wiki/Labrinth)[\[2\]](https://music.apple.com/us/artist/labrinth/205732582)[\[3\]](https://www.thegentlemansjournal.com/article/labrinth-interview-im-interested-in-going-to-other-galaxies/) He had just written and produced Tinie Tempah's UK number one 'Pass Out', and his own singles kept the run going: 'Earthquake' with Tempah reached number two in 2011 and 'Beneath Your Beautiful' with Emeli Sandé went to number one a year later.[\[1\]](https://en.wikipedia.org/wiki/Labrinth) The solo albums are 'Electronic Earth' (2012), 'Imagination & the Misfit Kid' (2019) and 'Ends & Begins' (2023, Columbia), the last a set of sci-fi love songs about his relationship that he has called 'Natural Born Killers in space', with the two-part 'Cosmic Opera' following in 2026.[\[1\]](https://en.wikipedia.org/wiki/Labrinth)[\[2\]](https://music.apple.com/us/artist/labrinth/205732582)[\[3\]](https://www.thegentlemansjournal.com/article/labrinth-interview-im-interested-in-going-to-other-galaxies/) He is a third of LSD alongside Sia and Diplo, whose album came out in 2019.[\[1\]](https://en.wikipedia.org/wiki/Labrinth) His widest audience comes from scoring HBO's 'Euphoria', where 'All for Us' and 'I'm Tired', both with Zendaya, run through the series; 'All for Us' won him a Primetime Emmy for original music and lyrics.[\[1\]](https://en.wikipedia.org/wiki/Labrinth)[\[3\]](https://www.thegentlemansjournal.com/article/labrinth-interview-im-interested-in-going-to-other-galaxies/) He also has a Grammy nomination as a producer on The Weeknd's 'Beauty Behind the Madness'.[\[1\]](https://en.wikipedia.org/wiki/Labrinth)

**Sources**

1. https://en.wikipedia.org/wiki/Labrinth
2. https://music.apple.com/us/artist/labrinth/205732582
3. https://www.thegentlemansjournal.com/article/labrinth-interview-im-interested-in-going-to-other-galaxies/

## laszewo

Łaszewo, styled with the Polish spelling but pronounced la-ZAY-woah, is an electronic trio from Santa Barbara, California: producers Matt Ehrlich and Justin De La Fuente with singer Keeva Bouley, who came together in 2018 after a chance meeting.[\[1\]](https://hq.rostr.cc/insider/news/%C5%82aszewo-sign-with-wme-payday-publishing-boom-records)[\[2\]](https://www.last.fm/music/%C5%81aszewo/+wiki) Their music blends EDM, indie and pop, energetic on the dancefloor and introspective off it.[\[1\]](https://hq.rostr.cc/insider/news/%C5%82aszewo-sign-with-wme-payday-publishing-boom-records) The debut single 'Up In Flames' ran up millions of streams, 'Til U Hate Me' went viral, and their first album 'In Color' arrived in 2024.[\[1\]](https://hq.rostr.cc/insider/news/%C5%82aszewo-sign-with-wme-payday-publishing-boom-records) Their remix of Lola Young's 'messy' has passed 60 million Spotify streams, they have teamed with DLG. on 'Roll With It' and YDG on 'hey lil mama', and they have played EDC Orlando and Splash House.[\[3\]](https://music.apple.com/us/album/roll-with-it-single/1777581100)[\[4\]](https://dancingastronaut.com/2025/10/ydg-and-laszewo-unite-on-new-collaboration-hey-lil-mama/) In 2025 they signed with WME, Boom.Records and Payday and announced a first European tour.[\[1\]](https://hq.rostr.cc/insider/news/%C5%82aszewo-sign-with-wme-payday-publishing-boom-records)[\[4\]](https://dancingastronaut.com/2025/10/ydg-and-laszewo-unite-on-new-collaboration-hey-lil-mama/)

**Sources**

1. https://hq.rostr.cc/insider/news/%C5%82aszewo-sign-with-wme-payday-publishing-boom-records
2. https://www.last.fm/music/%C5%81aszewo/+wiki
3. https://music.apple.com/us/album/roll-with-it-single/1777581100
4. https://dancingastronaut.com/2025/10/ydg-and-laszewo-unite-on-new-collaboration-hey-lil-mama/

## lauren-sanderson

Lauren Sanderson was born in 1996 in Fort Wayne, Indiana and is based in Los Angeles.[\[1\]](https://en.wikipedia.org/wiki/Lauren_Sanderson)[\[2\]](https://shorefire.com/roster/lauren-sanderson/bio) She built a following first as a YouTube personality, and her career took off after a 2015 TEDx talk, 'For God's Sake, Just Love Them', about coming out to her parents.[\[1\]](https://en.wikipedia.org/wiki/Lauren_Sanderson)[\[2\]](https://shorefire.com/roster/lauren-sanderson/bio) She self-released the EPs 'Center of Expression' (2016) and 'Spaces' (2017), the latter reaching number one on the iTunes R&B chart, then signed to Epic Records for 'Dont Panic!' (2018) before going independent again.[\[1\]](https://en.wikipedia.org/wiki/Lauren_Sanderson) Her albums include 'Midwest Kids Can Make It Big' (2020), which Zane Lowe premiered on Apple Music, 'Death of a Fantasy' (2022) and 'Lauren' (2026), and her confessional music moves between alt-pop, hip-hop and R&B, with features from PnB Rock and G Flip.[\[1\]](https://en.wikipedia.org/wiki/Lauren_Sanderson)[\[2\]](https://shorefire.com/roster/lauren-sanderson/bio) She has passed 100 million streams and headlined tours across the US, UK and Europe.[\[2\]](https://shorefire.com/roster/lauren-sanderson/bio)

**Sources**

1. https://en.wikipedia.org/wiki/Lauren_Sanderson
2. https://shorefire.com/roster/lauren-sanderson/bio

## left-lucid

Left Lucid is the alias of Lucas Ogden, an Austin DJ and producer who has played music since childhood but only started producing in his college dorm room, then went to Los Angeles to study at Icon Collective.[\[1\]](https://www.beatport.com/artist/left-lucid/1136053) He works in indie pop and electronic music, cites ODESZA and Flume, and says he aims for a recognizable sound that ties seemingly different tracks together.[\[1\]](https://www.beatport.com/artist/left-lucid/1136053)[\[2\]](https://www.viberate.com/artist/left-lucid/) His self-released catalog runs from 'Pieces', 'In Too Deep', 'Let Go' and 'Nintendo Dreams' (2022) through 'THINK!' (2023) to more recent singles like 'keeping u close', several of them made with his frequent collaborator Landon Ryle.[\[1\]](https://www.beatport.com/artist/left-lucid/1136053)[\[2\]](https://www.viberate.com/artist/left-lucid/)

**Sources**

1. https://www.beatport.com/artist/left-lucid/1136053
2. https://www.viberate.com/artist/left-lucid/

## leon-knight

Leon Knight is a producer, songwriter and guitarist, a former visual-effects artist who learned to make records in his father's home studio in a soul-sampling, 'College Dropout'-era Kanye style.[\[1\]](https://ghostcultmag.com/leon-knight-shares-his-new-single-yes-i-do-ft-dewayne/)[\[3\]](https://www.newsweek.com/entertainment/leon-knights-unc-core-is-reviving-old-school-11156398) His own music turns that toward what he calls 'Unc Funk': vintage drum machines and synths under a classic rock-and-roll rhythm and loud guitar solos, with Prince, Rick James and the Gap Band on one side and Steve Vai and Van Halen on the other.[\[2\]](https://litehouse.media/2025/11/05/leon-knight-dewayne-unite-for-funk-anthem-yes-i-do/)[\[3\]](https://www.newsweek.com/entertainment/leon-knights-unc-core-is-reviving-old-school-11156398) His debut record 'Can It Please Be Tomorrow?' came out in 2023 with the singles 'Hard Pass' and 'Dirty Dancer'.[\[1\]](https://ghostcultmag.com/leon-knight-shares-his-new-single-yes-i-do-ft-dewayne/) In 2025 he released 'Yes I Do', a track that started as a one-hour studio jam with the rock artist DE'WAYNE, on Knightmare Records, with production help from Powers Pleasant.[\[2\]](https://litehouse.media/2025/11/05/leon-knight-dewayne-unite-for-funk-anthem-yes-i-do/)[\[3\]](https://www.newsweek.com/entertainment/leon-knights-unc-core-is-reviving-old-school-11156398) His first headline show was at the Echo in Los Angeles.[\[3\]](https://www.newsweek.com/entertainment/leon-knights-unc-core-is-reviving-old-school-11156398)

**Sources**

1. https://ghostcultmag.com/leon-knight-shares-his-new-single-yes-i-do-ft-dewayne/
2. https://litehouse.media/2025/11/05/leon-knight-dewayne-unite-for-funk-anthem-yes-i-do/
3. https://www.newsweek.com/entertainment/leon-knights-unc-core-is-reviving-old-school-11156398

## leon-thomas

Leon Thomas is a Brooklyn singer, songwriter and producer who spent years as a hitmaker for other artists, co-writing SZA's 'Snooze' (Best R&B Song at the 2024 Grammys) and working with Drake, Ariana Grande and Kanye West.[\[1\]](https://en.wikipedia.org/wiki/Leon_Thomas_III)[\[3\]](https://www.grammy.com/news/leon-thomas-iii-interview-new-album-mutt/) He grew up acting, best known as André Harris on Nickelodeon's 'Victorious'.[\[1\]](https://en.wikipedia.org/wiki/Leon_Thomas_III) When he turned to producing, people who looked him up saw only the child star, so he worked as half of the duo the Rascals and stayed off the covers before stepping out as a solo artist.[\[3\]](https://www.grammy.com/news/leon-thomas-iii-interview-new-album-mutt/)[\[4\]](https://www.huffpost.com/entry/leon-thomas-mutt-interview_n_675a2f77e4b02802b83c4d36) Signed to Ty Dolla $ign's EZMNY and Motown, he released 'Electric Dusk' in 2023 and then 'Mutt' in September 2024, a jazz, rock and neo-soul record named after his dog and built as 'a metaphor for control in relationships'.[\[1\]](https://en.wikipedia.org/wiki/Leon_Thomas_III)[\[3\]](https://www.grammy.com/news/leon-thomas-iii-interview-new-album-mutt/)[\[4\]](https://www.huffpost.com/entry/leon-thomas-mutt-interview_n_675a2f77e4b02802b83c4d36) Its title track hit number six on the Hot 100 and drew a Freddie Gibbs remix, and the EP 'Pholks' came out of his Tiny Desk set.[\[1\]](https://en.wikipedia.org/wiki/Leon_Thomas_III)[\[2\]](<https://en.wikipedia.org/wiki/Mutt_(Leon_Thomas_album)>) 'Mutt' brought six nominations at the 2026 Grammys and won Best R&B Album, and he has since toured behind Bruno Mars.[\[1\]](https://en.wikipedia.org/wiki/Leon_Thomas_III)[\[2\]](<https://en.wikipedia.org/wiki/Mutt_(Leon_Thomas_album)>)

**Sources**

1. https://en.wikipedia.org/wiki/Leon_Thomas_III
2. https://en.wikipedia.org/wiki/Mutt_(Leon_Thomas_album)
3. https://www.grammy.com/news/leon-thomas-iii-interview-new-album-mutt/
4. https://www.huffpost.com/entry/leon-thomas-mutt-interview_n_675a2f77e4b02802b83c4d36

## levity

Levity is a Chicago electronic trio, John Hauldren, PJ Carberry and Josh Tarum, formed in 2019.[\[1\]](https://www.positionmusic.com/levity) They work in playful, bass-driven dubstep, trap and future bass, and came up remixing Tinashe, Louis the Child, Quinn XCII and Chelsea Cutler.[\[1\]](https://www.positionmusic.com/levity)[\[2\]](https://music.apple.com/us/artist/levity/1505353688) A viral set at Electric Forest was the turning point, and the debut EP 'Escapism, Vol. 1' followed in September 2024, with 'Flip It', featuring Dem Jointz, among their best-known tracks.[\[2\]](https://music.apple.com/us/artist/levity/1505353688)[\[3\]](https://www.villagevoice.com/behind-the-scenes-with-levity-bass-musics-fastest-rising-trio-and-biggest-fans/) They describe themselves as fans first, a posture that shows in how they treat opening acts and build a set.[\[3\]](https://www.villagevoice.com/behind-the-scenes-with-levity-bass-musics-fastest-rising-trio-and-biggest-fans/) Since then they have moved up festival bills to Coachella and Ultra.[\[3\]](https://www.villagevoice.com/behind-the-scenes-with-levity-bass-musics-fastest-rising-trio-and-biggest-fans/)

**Sources**

1. https://www.positionmusic.com/levity
2. https://music.apple.com/us/artist/levity/1505353688
3. https://www.villagevoice.com/behind-the-scenes-with-levity-bass-musics-fastest-rising-trio-and-biggest-fans/

## live

Live formed in York, Pennsylvania in 1984 around singer Ed Kowalczyk, guitarist Chad Taylor, bassist Patrick Dahlheimer and drummer Chad Gracey.[\[1\]](https://en.wikipedia.org/wiki/Live_(band)) Their second album, 'Throwing Copper' (1994), produced by Talking Heads' Jerry Harrison, reached number one on the Billboard 200, sold eight million copies in the US and carried 'Selling the Drama', 'I Alone' and 'Lightning Crashes', which spent ten weeks atop the Mainstream Rock chart.[\[1\]](https://en.wikipedia.org/wiki/Live_(band))[\[2\]](https://en.wikipedia.org/wiki/Throwing_Copper) The band played Woodstock '94, followed 'Throwing Copper' with the number-one debut 'Secret Samadhi' (1997), and has sold more than twenty million albums worldwide.[\[1\]](https://en.wikipedia.org/wiki/Live_(band))[\[2\]](https://en.wikipedia.org/wiki/Throwing_Copper) Kowalczyk left the band in 2009 and rejoined in 2016, and has fronted it since.[\[1\]](https://en.wikipedia.org/wiki/Live_(band))

**Sources**

1. https://en.wikipedia.org/wiki/Live_(band)
2. https://en.wikipedia.org/wiki/Throwing_Copper

## lluvii

Lluvii is an Austin quartet: Carol Gonzalez (vocals, guitar), Ryan Gordon (bass), Kaylin Martinez (drums) and Felix Kimbrell (keys).[\[1\]](https://kvrx.org/app/blog/local-live/lluvii-displays-their-emerging-sound-on-local-live-march-3-2024/)[\[2\]](https://rhythmpassport.com/daily-discovery-lluvii-up-all-night/) Gonzalez started it as a solo project, writing the first songs while on a Pacific Ocean research trip, and her roommates Gordon and Martinez, who she knew from the Denton noise band Manifest Destiny's Child, built the material out with her; Kimbrell joined after a house party and the group came together in late 2023.[\[1\]](https://kvrx.org/app/blog/local-live/lluvii-displays-their-emerging-sound-on-local-live-march-3-2024/) Gordon and Martinez are also the rhythm section of Luna Luna.[\[3\]](https://www.austinchronicle.com/music/2022-10-07/luna-luna-moves-from-dallas-origins-to-riverside-headquarters-to-acl-fest-debut/) The band calls its sound 'neo soul art rock',[\[4\]](https://lluvii.bandcamp.com/album/tierra-y-luz) writes by jamming together in a room, and pulls in afrobeat grooves, Latin psychedelia and prog;[\[1\]](https://kvrx.org/app/blog/local-live/lluvii-displays-their-emerging-sound-on-local-live-march-3-2024/)[\[2\]](https://rhythmpassport.com/daily-discovery-lluvii-up-all-night/) members name Stevie Wonder, Red Hot Chili Peppers, Paramore and the Colombian singer Totó La Momposina as touchstones.[\[1\]](https://kvrx.org/app/blog/local-live/lluvii-displays-their-emerging-sound-on-local-live-march-3-2024/) The debut EP 'Pacifico' arrived in December 2023, named for Gonzalez's research trip, and the nine-track 'Tierra y Luz' followed in August 2024, self-released and produced by Beto Martinez at his Lechehouse studio in Buda.[\[1\]](https://kvrx.org/app/blog/local-live/lluvii-displays-their-emerging-sound-on-local-live-march-3-2024/)[\[4\]](https://lluvii.bandcamp.com/album/tierra-y-luz)

**Sources**

1. https://kvrx.org/app/blog/local-live/lluvii-displays-their-emerging-sound-on-local-live-march-3-2024/
2. https://rhythmpassport.com/daily-discovery-lluvii-up-all-night/
3. https://www.austinchronicle.com/music/2022-10-07/luna-luna-moves-from-dallas-origins-to-riverside-headquarters-to-acl-fest-debut/
4. https://lluvii.bandcamp.com/album/tierra-y-luz

## lola-young

Lola Young grew up in South London and won the under-16 category of Open Mic UK in 2016.[\[1\]](https://en.wikipedia.org/wiki/Lola_Young) Her voice is raspy and her writing is conversational, closer to talking than performing.[\[1\]](https://en.wikipedia.org/wiki/Lola_Young) Her second album, 'This Wasn't Meant For You Anyway' (2024), carried 'Messy', which spent four weeks at number one in the UK, the longest run there by a British woman since Adele, and reached number 14 on the Billboard Hot 100.[\[2\]](https://www.officialcharts.com/chart-news/lola-young-messy-number-1-week-4-kendrick-lamar-lady-gaga-abracadabra/)[\[3\]](https://en.wikipedia.org/wiki/Messy_(Lola_Young_song)) 'Messy' won Best Pop Solo Performance at the 2026 Grammys, and Young took British Breakthrough Artist at the Brits the same year.[\[4\]](https://www.grammy.com/video/lola-young-wins-best-pop-solo-performance-messy/)[\[5\]](https://en.wikipedia.org/wiki/Brit_Awards_2026) Her third album followed in September 2025, debuting at number three on the UK Albums Chart.[\[1\]](https://en.wikipedia.org/wiki/Lola_Young)

**Sources**

1. https://en.wikipedia.org/wiki/Lola_Young
2. https://www.officialcharts.com/chart-news/lola-young-messy-number-1-week-4-kendrick-lamar-lady-gaga-abracadabra/
3. https://en.wikipedia.org/wiki/Messy_(Lola_Young_song)
4. https://www.grammy.com/video/lola-young-wins-best-pop-solo-performance-messy/
5. https://en.wikipedia.org/wiki/Brit_Awards_2026

## lorde

Ella Yelich-O'Connor, performing as Lorde, released her debut album 'Pure Heroine' in 2013 at sixteen; it is now certified six times platinum in the US.[\[1\]](https://en.wikipedia.org/wiki/Pure_Heroine)[\[2\]](https://www.riaa.com/gold-platinum/) Its 2017 follow-up, 'Melodrama', was nominated for the Grammy for Album of the Year and later placed on Rolling Stone's list of the 500 greatest albums of all time.[\[3\]](https://en.wikipedia.org/wiki/Melodrama_(Lorde_album)) 'Solar Power' (2021) turned toward folk and psych-pop; reviews were mixed, with NME calling it a 'dazzling hat-trick from a master of her craft.'[\[4\]](https://en.wikipedia.org/wiki/Solar_Power_(album)) 'Virgin' followed on June 27, 2025, returning to pulsing synthesizers and distorted guitars, made with producer Jim-E Stack rather than her longtime collaborator Jack Antonoff; Lorde has said she 'came into her own power' making it, calling it an attempt to heal parts of herself from her teenage years.[\[5\]](https://en.wikipedia.org/wiki/Virgin_(Lorde_album))[\[6\]](https://billboardphilippines.com/music/features/lorde-virgin-interview-feature-2025/) It debuted at number two on the Billboard 200 and gave her a first UK number-one album.[\[5\]](https://en.wikipedia.org/wiki/Virgin_(Lorde_album)) She has since headlined major festivals, including the opening night of Lollapalooza 2026 in Chicago.[\[7\]](https://www.cbsnews.com/chicago/news/lollapalooza-grant-park-headliners-lorde-naperville-john-summit/)

**Sources**

1. https://en.wikipedia.org/wiki/Pure_Heroine
2. https://www.riaa.com/gold-platinum/
3. https://en.wikipedia.org/wiki/Melodrama_(Lorde_album)
4. https://en.wikipedia.org/wiki/Solar_Power_(album)
5. https://en.wikipedia.org/wiki/Virgin_(Lorde_album)
6. https://billboardphilippines.com/music/features/lorde-virgin-interview-feature-2025/
7. https://www.cbsnews.com/chicago/news/lollapalooza-grant-park-headliners-lorde-naperville-john-summit/

## lp

LP is Laura Pergolizzi, born in 1981 in Huntington Station, New York and based in Los Angeles since 2010.[\[1\]](<https://en.wikipedia.org/wiki/LP_(singer)>) They spent years writing for other artists, with cuts for Rihanna ('Cheers (Drink to That)'), Christina Aguilera ('Beautiful People'), the Backstreet Boys, Cher and Céline Dion, before their own career took hold.[\[1\]](<https://en.wikipedia.org/wiki/LP_(singer)>) Signed to Warner since 2011, LP released 'Forever for Now' (2014) and then broke through with 'Lost on You' (2016), whose title single reached number one across much of Europe and went Diamond in France.[\[1\]](<https://en.wikipedia.org/wiki/LP_(singer)>) 'Heart to Mouth' (2018), 'Churches' (2021) and 'Love Lines' (2023) followed, and the eighth album 'Room 12' arrived in September 2026 behind the singles 'Shelly', 'Love Is All I Have' and 'Mi Corazón', an acoustic ballad LP wrote with PJ Bianco about, in their words, 'two of the biggest, hardest things I ever did in my life: coming out and becoming a musician'.[\[2\]](https://www.stereoboard.com/content/view/252540/9) LP plays guitar, ukulele and harmonica, is known for the whistling hooks in their songs, and in 2012 became the first woman named a Martin Guitar ambassador.[\[1\]](<https://en.wikipedia.org/wiki/LP_(singer)>) Their 2026 touring marks ten years of 'Lost on You' with full performances of the album.[\[2\]](https://www.stereoboard.com/content/view/252540/9)

**Sources**

1. https://en.wikipedia.org/wiki/LP_(singer)
2. https://www.stereoboard.com/content/view/252540/9

## lykke-li

Lykke Li, born Li Lykke Timotej Zachrisson in Ystad, Sweden, in 1986, grew up between a Portuguese mountaintop and stretches in Lisbon, Morocco, Nepal and India before starting her career in Stockholm and later moving to the United States.[\[1\]](https://en.wikipedia.org/wiki/Lykke_Li) Björn Yttling of Peter Bjorn and John produced her debut 'Youth Novels' (2008), and 'Wounded Rhymes' (2011) carried 'I Follow Rivers', which topped charts across continental Europe and, in the Magician's remix, became her signature song.[\[1\]](https://en.wikipedia.org/wiki/Lykke_Li)[\[2\]](https://en.wikipedia.org/wiki/I_Follow_Rivers) 'I Never Learn' (2014), 'So Sad So Sexy' (2018) and 'Eyeye' (2022) kept circling heartbreak and loss. 'So Sad So Sexy' in particular grew out of the period after her mother's death.[\[1\]](https://en.wikipedia.org/wiki/Lykke_Li) Along the way she wrote 'Possibility' for the 'Twilight: New Moon' soundtrack, formed the supergroup LIV in 2016, and worked with Mark Ronson and David Lynch.[\[1\]](https://en.wikipedia.org/wiki/Lykke_Li)[\[3\]](https://www.nme.com/features/music-interviews/lykke-li-the-afterparty-interview-3943472) Her sixth album 'The Afterparty', a 25-minute, string-laced record she has framed as her last, arrived in May 2026 on Neon Gold; written around turning 40, it turns over questions of who to trust and how to live.[\[1\]](https://en.wikipedia.org/wiki/Lykke_Li)[\[3\]](https://www.nme.com/features/music-interviews/lykke-li-the-afterparty-interview-3943472)

**Sources**

1. https://en.wikipedia.org/wiki/Lykke_Li
2. https://en.wikipedia.org/wiki/I_Follow_Rivers
3. https://www.nme.com/features/music-interviews/lykke-li-the-afterparty-interview-3943472

## macy-todd

Macy Todd grew up in Georgia, spent a stretch in Austin and is now based in Nashville.[\[1\]](https://www.onestowatch.com/en/blog/macy-todd-on-defying-genres-not-being-afraid-to-get-mean-and-creating-debut-ep-pretty-ruthless-q-a) She traces her start on guitar to Brandi Carlile's 'The Story' and counts Patty Griffin, Paul McCartney's 'Ram', Jeff Buckley and Hayley Williams' 'Petals for Armor' among her influences, and she resists settling into one genre, moving between pop, country, folk and Americana.[\[1\]](https://www.onestowatch.com/en/blog/macy-todd-on-defying-genres-not-being-afraid-to-get-mean-and-creating-debut-ep-pretty-ruthless-q-a) Her debut EP 'pretty ruthless' came out in July 2026 on Atlantic, six songs about being in your twenties and about aging as a woman in the music business.[\[1\]](https://www.onestowatch.com/en/blog/macy-todd-on-defying-genres-not-being-afraid-to-get-mean-and-creating-debut-ep-pretty-ruthless-q-a)[\[2\]](https://music.apple.com/us/album/pretty-ruthless-ep/6783024576) She wrote it with collaborators including her childhood friend Lauren Scott, who co-wrote 'bad bad love', and the Nashville songwriter Emily Weisband.[\[1\]](https://www.onestowatch.com/en/blog/macy-todd-on-defying-genres-not-being-afraid-to-get-mean-and-creating-debut-ep-pretty-ruthless-q-a) She has toured with Willow Avalon and Zinadelphia, played Whiskey Jam during CMA Fest and performed a writers' round at the Bluebird Cafe.[\[1\]](https://www.onestowatch.com/en/blog/macy-todd-on-defying-genres-not-being-afraid-to-get-mean-and-creating-debut-ep-pretty-ruthless-q-a)

**Sources**

1. https://www.onestowatch.com/en/blog/macy-todd-on-defying-genres-not-being-afraid-to-get-mean-and-creating-debut-ep-pretty-ruthless-q-a
2. https://music.apple.com/us/album/pretty-ruthless-ep/6783024576

## marlon-funaki

Marlon Funaki is a 23-year-old Japanese and Mexican American solo artist from Redlands, California, who writes, records, and produces his own alternative rock, threaded with psychedelic tones and jazz-inflected guitar.[\[1\]](https://www.ticketmaster.com/marlon-funaki-tickets/artist/3086229)[\[2\]](https://audiotree.bandcamp.com/album/marlon-funaki-on-audiotree-live) He sold his Xbox for his first electric guitar as a teenager and later busked on the streets of Redlands to fund rides home.[\[1\]](https://www.ticketmaster.com/marlon-funaki-tickets/artist/3086229)[\[2\]](https://audiotree.bandcamp.com/album/marlon-funaki-on-audiotree-live) He released the EP 'The Universal Language' in 2020 and his debut full-length album, 'Monterey Village', in 2022, followed by the 2025 EP 'Overdue', the same year he was named Luck Reunion's 'Artist on the Rise.'[\[1\]](https://www.ticketmaster.com/marlon-funaki-tickets/artist/3086229)[\[3\]](https://hq.rostr.cc/insider/news/marlon-funaki-signs-with-warner-records)[\[4\]](https://www.okeechobeefest.com/artists/marlon-funaki) He signed to Warner Records in January 2026, releasing 'Let You In' as his major-label debut single, and has shared stages with acts as different as Palace and Billy Currington.[\[1\]](https://www.ticketmaster.com/marlon-funaki-tickets/artist/3086229)[\[3\]](https://hq.rostr.cc/insider/news/marlon-funaki-signs-with-warner-records)[\[4\]](https://www.okeechobeefest.com/artists/marlon-funaki) Live, he fronts a four-piece band that solidified in early 2024, and more than one reviewer has described his shows as pulling audiences in with an electric calm that leaves rooms buzzing with energy.[\[4\]](https://www.okeechobeefest.com/artists/marlon-funaki)[\[2\]](https://audiotree.bandcamp.com/album/marlon-funaki-on-audiotree-live)[\[5\]](https://kcpr.org/marlon-funaki-music-evolution/)

**Sources**

1. https://www.ticketmaster.com/marlon-funaki-tickets/artist/3086229
2. https://audiotree.bandcamp.com/album/marlon-funaki-on-audiotree-live
3. https://hq.rostr.cc/insider/news/marlon-funaki-signs-with-warner-records
4. https://www.okeechobeefest.com/artists/marlon-funaki
5. https://kcpr.org/marlon-funaki-music-evolution/

## marzz

Marzz, born Laria McCormick, is a non-binary R&B singer from Louisville, Kentucky, who started singing as a child in the church where their mother and grandmother were in leadership, and began writing around age 11 to work through their parents' divorce.[\[1\]](https://www.leoweekly.com/music/make-room-for-marzz-15757035/)[\[2\]](https://www.whas11.com/article/news/local/marzz-louisville-music-r-b-music/417-64505fd4-3d92-4a20-a750-66a6ec7f50bf)[\[3\]](https://www.rollingstone.com/music/music-features/marzz-countless-times-love-letterz-interview-1339999/) In late 2019 Timbaland reposted an R&B freestyle they had put on Instagram, then flew them to Los Angeles, where the two recorded four songs together.[\[1\]](https://www.leoweekly.com/music/make-room-for-marzz-15757035/)[\[4\]](https://theknockturnal.com/rising-rb-starlet-marzz-talks-origins-identity-growth-and-love-letterz-with-the-knockturnal/amp) Two landed on the debut EP 'Love Letterz', released in June 2021 on Keep Cool and RCA, which Marzz has described as being about 'exploring, figuring out self, loving myself, and understanding who I am as a person'.[\[2\]](https://www.whas11.com/article/news/local/marzz-louisville-music-r-b-music/417-64505fd4-3d92-4a20-a750-66a6ec7f50bf)[\[4\]](https://theknockturnal.com/rising-rb-starlet-marzz-talks-origins-identity-growth-and-love-letterz-with-the-knockturnal/amp) Its standout track, the heartbreak song 'Countless Times', has passed three million streams.[\[3\]](https://www.rollingstone.com/music/music-features/marzz-countless-times-love-letterz-interview-1339999/) Marzz performed on the BET Amplified stage at the Soul Train Awards and in 2022 was named a SiriusXM Future Five artist and one of Billboard's R&B Rookies.[\[2\]](https://www.whas11.com/article/news/local/marzz-louisville-music-r-b-music/417-64505fd4-3d92-4a20-a750-66a6ec7f50bf) They cite Jhené Aiko as a major influence, along with gospel and soul singers like Lauryn Hill, Erykah Badu and Kim Burrell, and resist genre: 'whatever the beat or wherever the beat is taking me, that's where I go'.[\[1\]](https://www.leoweekly.com/music/make-room-for-marzz-15757035/)[\[2\]](https://www.whas11.com/article/news/local/marzz-louisville-music-r-b-music/417-64505fd4-3d92-4a20-a750-66a6ec7f50bf)[\[4\]](https://theknockturnal.com/rising-rb-starlet-marzz-talks-origins-identity-growth-and-love-letterz-with-the-knockturnal/amp)

**Sources**

1. https://www.leoweekly.com/music/make-room-for-marzz-15757035/
2. https://www.whas11.com/article/news/local/marzz-louisville-music-r-b-music/417-64505fd4-3d92-4a20-a750-66a6ec7f50bf
3. https://www.rollingstone.com/music/music-features/marzz-countless-times-love-letterz-interview-1339999/
4. https://theknockturnal.com/rising-rb-starlet-marzz-talks-origins-identity-growth-and-love-letterz-with-the-knockturnal/amp

## max-mcnown

Max McNown was born in West Linn, Oregon, in 2001 and raised in Bend in a competitive athletic family, with no country music around him growing up; an NF concert was the first live show he saw.[\[1\]](https://en.wikipedia.org/wiki/Max_McNown)[\[3\]](https://www.euphoriazine.com/blog/2025/02/interviews-max-mcnown/) He moved to California in 2022, taught himself a handful of chords and started writing, later signing to Fugitive Recordings and basing himself in Nashville.[\[1\]](https://en.wikipedia.org/wiki/Max_McNown)[\[2\]](https://maximumvolumemusic.com/max-mcnown-announces-third-studio-album/)[\[3\]](https://www.euphoriazine.com/blog/2025/02/interviews-max-mcnown/) 'A Lot More Free', the title track of his 2023 debut EP, was a slow-building hit that reached number one on TikTok's Breakthrough USA chart and pushed past 400 million streams.[\[2\]](https://maximumvolumemusic.com/max-mcnown-announces-third-studio-album/) His full-lengths are 'Wandering' (2024), 'Night Diving' (2025) and 'Leave On a Light' (2026), the last billed as a tribute to his wife and family, and 'Better Me for You (Brown Eyes)' reached number 26 on the Hot 100.[\[1\]](https://en.wikipedia.org/wiki/Max_McNown)[\[2\]](https://maximumvolumemusic.com/max-mcnown-announces-third-studio-album/) He places himself in a country-folk lineage he sums up as hunting in a forest 'made up of Noah Kahan, Zach Bryan, and Tyler Childers', and he has sold out two nights at the Ryman and played Lollapalooza, Stagecoach and C2C.[\[2\]](https://maximumvolumemusic.com/max-mcnown-announces-third-studio-album/)[\[3\]](https://www.euphoriazine.com/blog/2025/02/interviews-max-mcnown/)

**Sources**

1. https://en.wikipedia.org/wiki/Max_McNown
2. https://maximumvolumemusic.com/max-mcnown-announces-third-studio-album/
3. https://www.euphoriazine.com/blog/2025/02/interviews-max-mcnown/

## molly-santana

Molly Santana, born Mya Parks in 2004, is a rapper from Fontana, California, of Japanese and African American descent who first drew a following as a fashion influencer before turning to music around 2021.[\[1\]](https://www.complex.com/music/a/treyalston/molly-santana-drake-ran-atlanta-what-to-know)[\[2\]](https://en.wikipedia.org/wiki/Molly_Santana) She signed to Victor Victor Worldwide and Capitol, releasing the EPs 'Molly's World' (2021), 'Neptune' (2022) and 'Mélange' (2023), the album 'Molly Santana' (2024) and 'Molly and Her Week of Wonders' (2025); her music blends trap and rage rap, and she names Playboi Carti, Chief Keef, Bladee and Yung Lean among her influences.[\[2\]](https://en.wikipedia.org/wiki/Molly_Santana) She went independent in 2026.[\[1\]](https://www.complex.com/music/a/treyalston/molly-santana-drake-ran-atlanta-what-to-know) That May she appeared alongside Future on 'Ran to Atlanta', a track from Drake's album 'Iceman' on which Drake raps her name; it reached number two on the Hot 100 and added roughly ten million monthly listeners to her streaming numbers within days.[\[1\]](https://www.complex.com/music/a/treyalston/molly-santana-drake-ran-atlanta-what-to-know)[\[2\]](https://en.wikipedia.org/wiki/Molly_Santana)[\[3\]](https://thesource.com/2026/05/18/molly-santana-is-a-rising-star-on-drake-and-futures-ran-to-atlanta/) She has opened for Don Toliver and Ski Mask the Slump God, brought out North West during a set at Rolling Loud in Orlando, and has an album called 'Black Punk' on the way.[\[1\]](https://www.complex.com/music/a/treyalston/molly-santana-drake-ran-atlanta-what-to-know)[\[3\]](https://thesource.com/2026/05/18/molly-santana-is-a-rising-star-on-drake-and-futures-ran-to-atlanta/)

**Sources**

1. https://www.complex.com/music/a/treyalston/molly-santana-drake-ran-atlanta-what-to-know
2. https://en.wikipedia.org/wiki/Molly_Santana
3. https://thesource.com/2026/05/18/molly-santana-is-a-rising-star-on-drake-and-futures-ran-to-atlanta/

## montclair

Montclair is an Austin band of half-siblings Casen, Anna, Jackson and Clay.[\[1\]](https://montclair.bandcamp.com/album/heart-is-alive) Its folk-rock moves from the surf-rock groove of 'Pastel Lies' to the wistful folk guitar of 'Passing Through', with lyrics about self-discovery and emerging adulthood.[\[2\]](https://do512.com/artists/montclair) The band self-released the EP 'Passing Through' and, in April 2025, the ten-track debut album 'Heart is Alive!', led by its upbeat title track and the heavier 'Coming to the Rescue'.[\[1\]](https://montclair.bandcamp.com/album/heart-is-alive)[\[2\]](https://do512.com/artists/montclair) Known as an energetic live act with a following across Texas, Montclair has played House of Blues Houston and a sold-out Antone's in Austin, and shared stages with Echosmith, Dayglow, Giant Rooks, The Wldlfe and Briscoe.[\[2\]](https://do512.com/artists/montclair)

**Sources**

1. https://montclair.bandcamp.com/album/heart-is-alive
2. https://do512.com/artists/montclair

## nat-myers

Nat Myers is a Korean-American country-blues singer, songwriter and poet from northern Kentucky, born in 1990.[\[1\]](https://en.wikipedia.org/wiki/Nat_Myers)[\[2\]](https://www.pbs.org/newshour/show/acclaimed-blues-musician-nat-myers-faces-battle-with-a-rare-cancer) He came to the blues through poetry, and plays fingerpicked pre-war Delta blues on a National resonator guitar, drawing on Blind Lemon Jefferson, Charley Patton, Robert Petway and Tommy McClennan alongside Camus and Homer.[\[2\]](https://www.pbs.org/newshour/show/acclaimed-blues-musician-nat-myers-faces-battle-with-a-rare-cancer)[\[3\]](https://shorefire.com/releases/entry/nat-myers-debut-album-yellow-peril-easy-eye-sound) Dan Auerbach signed him to Easy Eye Sound and produced his debut 'Yellow Peril' (2023) with Pat McLaughlin and Alvin Youngblood Hart, and Jason Momoa directed the video for 'Ramble No More'.[\[1\]](https://en.wikipedia.org/wiki/Nat_Myers)[\[3\]](https://shorefire.com/releases/entry/nat-myers-debut-album-yellow-peril-easy-eye-sound) The album's title is his response to the anti-Asian hate that surged during the pandemic.[\[1\]](https://en.wikipedia.org/wiki/Nat_Myers)[\[3\]](https://shorefire.com/releases/entry/nat-myers-debut-album-yellow-peril-easy-eye-sound) American Songwriter wrote that his music 'reverberates with the sound of a deep bluesman from the 20s and 30s'.[\[2\]](https://www.pbs.org/newshour/show/acclaimed-blues-musician-nat-myers-faces-battle-with-a-rare-cancer)

**Sources**

1. https://en.wikipedia.org/wiki/Nat_Myers
2. https://www.pbs.org/newshour/show/acclaimed-blues-musician-nat-myers-faces-battle-with-a-rare-cancer
3. https://shorefire.com/releases/entry/nat-myers-debut-album-yellow-peril-easy-eye-sound

## natasha-bedingfield

Natasha Bedingfield was born in London in 1981 to New Zealand parents and grew up between London and Auckland.[\[1\]](https://en.wikipedia.org/wiki/Natasha_Bedingfield) As a teenager she and her siblings Daniel and Nikola formed the dance act the DNA Algorithm, and she studied psychology for a year at the University of Greenwich and recorded for Hillsong Church UK before signing to Phonogenic in 2003.[\[1\]](https://en.wikipedia.org/wiki/Natasha_Bedingfield) Her debut album 'Unwritten' (2004) entered the UK chart at number one; 'These Words' gave her a UK number one and 'Unwritten' became one of the most played songs on US radio, while 'Pocketful of Sunshine' reached number five on the Billboard Hot 100.[\[1\]](https://en.wikipedia.org/wiki/Natasha_Bedingfield) She was nominated for a Grammy for 'Unwritten' and has sold more than 20 million records, following the early albums with 'Strip Me' (2010) and 'Roll with Me' (2019).[\[1\]](https://en.wikipedia.org/wiki/Natasha_Bedingfield) 'Unwritten' found a second life after featuring in the 2023 film 'Anyone But You', and she performed it at the 2024 Paris Olympics;[\[1\]](https://en.wikipedia.org/wiki/Natasha_Bedingfield) her single 'Dot Dot Dot', written with Brett Hitte of Frenship, arrived in August 2026 as her first solo release in years.[\[2\]](https://www.yahoo.com/entertainment/music/articles/natasha-bedingfield-drops-first-solo-233124623.html)

**Sources**

1. https://en.wikipedia.org/wiki/Natasha_Bedingfield
2. https://www.yahoo.com/entertainment/music/articles/natasha-bedingfield-drops-first-solo-233124623.html

## new-constellations

New Constellations is a Portland, Oregon duo, Harlee Case and Josh Smith, who met in high school and started the band a decade later, in 2015, after reconnecting online.[\[1\]](https://en.wikipedia.org/wiki/New_Constellations)[\[2\]](https://telluridenews.com/arts_and_entertainment/article_15b4d623-cf7a-483f-8f21-09522006d473.html) Their music is shimmering, 1980s-leaning dream pop with an R&B undertow, kept as a side project for years until it could support them full time.[\[1\]](https://en.wikipedia.org/wiki/New_Constellations)[\[2\]](https://telluridenews.com/arts_and_entertainment/article_15b4d623-cf7a-483f-8f21-09522006d473.html) The 2021 single 'Hot Blooded' was the breakthrough, passing 120 million Spotify streams by 2025.[\[1\]](https://en.wikipedia.org/wiki/New_Constellations) The EP 'Lean In' followed in 2023, and the debut album 'It Comes in Waves' is due in May 2026 on Nettwerk.[\[1\]](https://en.wikipedia.org/wiki/New_Constellations) Case sums up the writing as pushing 'a message of being yourself and doing what you want to do'.[\[2\]](https://telluridenews.com/arts_and_entertainment/article_15b4d623-cf7a-483f-8f21-09522006d473.html)

**Sources**

1. https://en.wikipedia.org/wiki/New_Constellations
2. https://telluridenews.com/arts_and_entertainment/article_15b4d623-cf7a-483f-8f21-09522006d473.html

## night-tapes

Night Tapes are a London dream-pop trio: Iiris Vesik, who moved from Tallinn, Estonia after releasing a solo album there, on vocals and synths, plus Max Doohan on drums, once of Another Sky, and the jazz-trained guitarist Sam Richards, who both produce.[\[1\]](https://en.wikipedia.org/wiki/Night_Tapes)[\[2\]](https://www.nme.com/the-cover/night-tapes-08-09-2025-3890670) The three began as housemates jamming late at night in South London, which is where the name came from, and cut their first EP quietly enough not to disturb the neighbours.[\[1\]](https://en.wikipedia.org/wiki/Night_Tapes) Their music sets Vesik's layered vocals over minimalist drum loops and synths with trip-hop and ambient textures,[\[1\]](https://en.wikipedia.org/wiki/Night_Tapes) and they name Talk Talk, Jon Hopkins and Björk as reference points, calling their approach feeling-based, with logic kept out of it.[\[2\]](https://www.nme.com/the-cover/night-tapes-08-09-2025-3890670) They signed to Nettwerk in 2022, released the EPs 'Perfect Kindness' (2023) and 'assisted memories' (2024), and made the debut album 'portals//polarities' (2025) mostly on tour, working in field recordings from Los Angeles, Estonia and Mexico.[\[1\]](https://en.wikipedia.org/wiki/Night_Tapes)[\[2\]](https://www.nme.com/the-cover/night-tapes-08-09-2025-3890670) Their 2023 single 'drifting' is their biggest track so far.[\[1\]](https://en.wikipedia.org/wiki/Night_Tapes)

**Sources**

1. https://en.wikipedia.org/wiki/Night_Tapes
2. https://www.nme.com/the-cover/night-tapes-08-09-2025-3890670

## night-traveler

Night Traveler is an Austin duo, Adam Fischer and Hunter Glaske, who both write, play and produce their own material.[\[1\]](https://nighttravelermusic.com/pages/about) They started the project in 2018 and released the single '1984' about two months later; it drew more than 100,000 streams in its first month.[\[1\]](https://nighttravelermusic.com/pages/about)[\[3\]](https://www.last.fm/music/NIGHT+TRAVELER/+wiki) Their sound is guitar-forward and 80s-tinged, built on pocket grooves and confessional lyrics about love and loss, and has drawn comparisons to the War on Drugs and the Paper Kites.[\[1\]](https://nighttravelermusic.com/pages/about)[\[2\]](https://www.melodicmag.com/news/night-traveler-releases-love-nobody-else-leading-up-to-second-full-length-album/) They have recorded in unusual places, from lakeside retreats to a remote cabin in New Mexico, releasing 'Dreams You Don't Forget' in 2021 and 'Hotspot' in 2024, which Musicbed named its album of the year.[\[1\]](https://nighttravelermusic.com/pages/about) Their music has been picked up by popular outlets including MTV and 'Monday Night Football',[\[2\]](https://www.melodicmag.com/news/night-traveler-releases-love-nobody-else-leading-up-to-second-full-length-album/) and the pair opened for Stevie Nicks on some of her 2025 dates and were named a Gibson Spotlight artist for 2026.[\[1\]](https://nighttravelermusic.com/pages/about)

**Sources**

1. https://nighttravelermusic.com/pages/about
2. https://www.melodicmag.com/news/night-traveler-releases-love-nobody-else-leading-up-to-second-full-length-album/
3. https://www.last.fm/music/NIGHT+TRAVELER/+wiki

## noga-erez

Noga Erez is an Israeli musician, born in Tel Aviv in 1989 and raised in Caesarea, who studied composition at the Jerusalem Academy of Music and Dance.[\[1\]](https://en.wikipedia.org/wiki/Noga_Erez) She makes her records with her partner Ori Rousso, mixing electronic pop, hip-hop and alternative music under rapped, pointed lyrics about politics, power and life online.[\[1\]](https://en.wikipedia.org/wiki/Noga_Erez) After 'Off the Radar' (2017) and 'Kids' (2021) on City Slang, her third album 'The Vandalist' (2024) was her first for a major label, on Neon Gold and Atlantic;[\[1\]](https://en.wikipedia.org/wiki/Noga_Erez)[\[2\]](https://en.wikipedia.org/wiki/The_Vandalist) recorded partly over five months in Madrid, it moves between English, Hebrew and Spanish and features Robbie Williams, Dillom and Flyana Boss.[\[2\]](https://en.wikipedia.org/wiki/The_Vandalist) She has worked with Missy Elliott on 'Nails' and appeared with Florence and the Machine,[\[1\]](https://en.wikipedia.org/wiki/Noga_Erez) and in 2026 she became the first Israeli artist to play Coachella, on a run that has also taken in Lollapalooza and Austin City Limits.[\[1\]](https://en.wikipedia.org/wiki/Noga_Erez)

**Sources**

1. https://en.wikipedia.org/wiki/Noga_Erez
2. https://en.wikipedia.org/wiki/The_Vandalist

## palace

Palace formed in London in 2012 around singer Leo Wyndham, with Rupert Turner on guitar, Matt Hodges on drums and, since 2018, Harry Deacon on bass.[\[1\]](<https://en.wikipedia.org/wiki/Palace_(band)>) They released their first single, 'Veins', in 2014,[\[2\]](https://www.nme.com/news/music/palace-talk-ferocious-beautiful-new-album-ultrasound-there-is-often-great-hope-to-be-found-in-difficult-times-3612584) and the monthly Palace Presents night they ran at the George Tavern from 2016 grew into their own label and a wider community.[\[3\]](https://www.broadwayworld.com/san-francisco/article/Palace-to-Release-Fifth-Studio-Album-Ox-20260721) AllMusic describes the group's sound as 'languid and atmospheric' and guitar-based, and both AllMusic and Equipboard tag it as indie rock and blues-rock.[\[4\]](https://www.allmusic.com/artist/palace-mn0003303810)[\[5\]](https://equipboard.com/band/palace#about) The debut album 'So Long Forever' (2016) was produced by Adam Jaffrey, who has stayed with them since;[\[2\]](https://www.nme.com/news/music/palace-talk-ferocious-beautiful-new-album-ultrasound-there-is-often-great-hope-to-be-found-in-difficult-times-3612584)[\[3\]](https://www.broadwayworld.com/san-francisco/article/Palace-to-Release-Fifth-Studio-Album-Ox-20260721) 'Life After' (2019), 'Shoals' (2022) and 'Ultrasound' (2024) followed, the last written around a miscarriage Wyndham and his partner went through, with the band reaching for something 'heavy but contained' and citing Cocteau Twins, Massive Attack and Neil Young.[\[1\]](<https://en.wikipedia.org/wiki/Palace_(band)>)[\[2\]](https://www.nme.com/news/music/palace-talk-ferocious-beautiful-new-album-ultrasound-there-is-often-great-hope-to-be-found-in-difficult-times-3612584) Their fifth album 'Ox', recorded in Deptford with Jaffrey and drawing on the Band, Townes Van Zandt and Edward Hopper, arrives in September 2026 on the band's own Palace Presents through AWAL, led by the single 'Kid'.[\[3\]](https://www.broadwayworld.com/san-francisco/article/Palace-to-Release-Fifth-Studio-Album-Ox-20260721)

**Sources**

1. https://en.wikipedia.org/wiki/Palace_(band)
2. https://www.nme.com/news/music/palace-talk-ferocious-beautiful-new-album-ultrasound-there-is-often-great-hope-to-be-found-in-difficult-times-3612584
3. https://www.broadwayworld.com/san-francisco/article/Palace-to-Release-Fifth-Studio-Album-Ox-20260721
4. https://www.allmusic.com/artist/palace-mn0003303810
5. https://equipboard.com/band/palace#about

## paloma-morphy

Paloma Morphy, born Andrea Paloma Barrios Gómez Álvarez Morphy in Mexico City in 2000, worked as a criminal-defense lawyer before quitting to make music.[\[1\]](https://en.wikipedia.org/wiki/Paloma_Morphy)[\[2\]](https://modernmuze.com/who-is-paloma-morphy-the-2025-latin-grammys-best-new-artist/) She started posting covers on TikTok in 2022 on a friend's suggestion, going from 13 followers to thousands in weeks, and released her first track 'La idiota soy yo' that November.[\[2\]](https://modernmuze.com/who-is-paloma-morphy-the-2025-latin-grammys-best-new-artist/)[\[3\]](https://los40.com.mx/2025/08/08/paloma-morphy-abre-su-corazon-en-au-y-se-prepara-para-conquistar-mexico-desde-el-lunario-entrevista/) She sings in Spanish, and her alt-pop pairs bright melodies with blunt lyrics; critics have likened her to Lorde, Billie Eilish, Julieta Venegas and Natalia Lafourcade.[\[1\]](https://en.wikipedia.org/wiki/Paloma_Morphy)[\[3\]](https://los40.com.mx/2025/08/08/paloma-morphy-abre-su-corazon-en-au-y-se-prepara-para-conquistar-mexico-desde-el-lunario-entrevista/) Her debut album 'Au' came out in May 2025 on Sony Music México and has passed 20 million Spotify streams, carried by the breakout 'lo que un día fue'.[\[2\]](https://modernmuze.com/who-is-paloma-morphy-the-2025-latin-grammys-best-new-artist/)[\[3\]](https://los40.com.mx/2025/08/08/paloma-morphy-abre-su-corazon-en-au-y-se-prepara-para-conquistar-mexico-desde-el-lunario-entrevista/) Billboard named her a Latin Artist on the Rise, and in November 2025 she won Best New Artist at the Latin Grammys, telling the room, 'If you have a song you're embarrassed to upload, do it'.[\[1\]](https://en.wikipedia.org/wiki/Paloma_Morphy)[\[2\]](https://modernmuze.com/who-is-paloma-morphy-the-2025-latin-grammys-best-new-artist/) Her single 'la mexicana' takes on gender-based violence in Mexico.[\[2\]](https://modernmuze.com/who-is-paloma-morphy-the-2025-latin-grammys-best-new-artist/)

**Sources**

1. https://en.wikipedia.org/wiki/Paloma_Morphy
2. https://modernmuze.com/who-is-paloma-morphy-the-2025-latin-grammys-best-new-artist/
3. https://los40.com.mx/2025/08/08/paloma-morphy-abre-su-corazon-en-au-y-se-prepara-para-conquistar-mexico-desde-el-lunario-entrevista/

## parcels

Parcels are an Australian five-piece, Louie Swain, Patrick Hetherington, Noah Hill, Anatole Serret and Jules Crommelin, who formed in the coastal town of Byron Bay and moved to Berlin together as teenagers, sharing a cramped flat in Friedrichshain.[\[1\]](<https://en.wikipedia.org/wiki/Parcels_(band)>)[\[3\]](https://www.the-berliner.com/music-clubs/berlin-parcels-10-years-feature-interview-loved/) They signed to Kitsuné in 2015 and record through Because Music, and describe their sound as 'sort of a blend between electropop and disco-soul', built around a live band rather than the city's techno scene.[\[1\]](<https://en.wikipedia.org/wiki/Parcels_(band)>)[\[3\]](https://www.the-berliner.com/music-clubs/berlin-parcels-10-years-feature-interview-loved/) In 2017 they co-wrote and recorded 'Overnight' with Daft Punk, the duo's last song produced together before their 2021 split.[\[1\]](<https://en.wikipedia.org/wiki/Parcels_(band)>) The self-titled 'Parcels' (2018) carried 'Tieduprightnow', the double album 'Day/Night' followed in 2021, and two 'Live' volumes caught the band on analog tape at Berlin's Hansa Studios.[\[1\]](<https://en.wikipedia.org/wiki/Parcels_(band)>) A decade in, with three members still in Berlin, two back in Australia and more than a billion streams behind them, they made the loose, warm third album 'Loved' (2025, Because Music) across sessions in Berlin, Mexico and Australia.[\[1\]](<https://en.wikipedia.org/wiki/Parcels_(band)>)[\[2\]](<https://en.wikipedia.org/wiki/Loved_(Parcels_album)>)[\[3\]](https://www.the-berliner.com/music-clubs/berlin-parcels-10-years-feature-interview-loved/)

**Sources**

1. https://en.wikipedia.org/wiki/Parcels_(band)
2. https://en.wikipedia.org/wiki/Loved_(Parcels_album)
3. https://www.the-berliner.com/music-clubs/berlin-parcels-10-years-feature-interview-loved/

## paris-paloma

Paris Paloma is a singer-songwriter from Ashbourne, Derbyshire, who studied Fine Art and History of Art at Goldsmiths, University of London, before releasing her first singles in 2020.[\[1\]](https://en.wikipedia.org/wiki/Paris_Paloma)[\[2\]](https://sites.gold.ac.uk/art-degree-shows/paris-phillips/) Pre-release snippets of her 2023 single 'labour' went viral on TikTok, and after it came out the song soundtracked a wave of videos of women describing their own experiences with sexism.[\[3\]](https://en.wikipedia.org/wiki/Labour_(song)) It has since passed a billion streams on Spotify and earned an RIAA Gold certification, though it peaked outside the Hot 100 itself, reaching number 9 on Hot Alternative Songs.[\[4\]](https://www.broadwayworld.com/bwwmusic/article/Paris-Paloma-Releases-THE-FATAL-FLAW-Album-Plans-World-Tour-20260904)[\[5\]](https://www.riaa.com/gold-platinum/)[\[3\]](https://en.wikipedia.org/wiki/Labour_(song)) Her 2024 debut album, 'Cacophony', built on those themes with lush, layered vocal arrangements on Nettwerk Music Group.[\[6\]](https://en.wikipedia.org/wiki/Cacophony_(Paris_Paloma_album)) Her second album, 'The Fatal Flaw', followed in September 2026, its title drawn from the opening line of Donna Tartt's 'The Secret History', backed by her biggest tour yet.[\[4\]](https://www.broadwayworld.com/bwwmusic/article/Paris-Paloma-Releases-THE-FATAL-FLAW-Album-Plans-World-Tour-20260904) Her recorded work centers on acoustic guitar, choral vocal layering, and lyrics referencing historical art and folklore.[\[1\]](https://en.wikipedia.org/wiki/Paris_Paloma)

**Sources**

1. https://en.wikipedia.org/wiki/Paris_Paloma
2. https://sites.gold.ac.uk/art-degree-shows/paris-phillips/
3. https://en.wikipedia.org/wiki/Labour_(song)
4. https://www.broadwayworld.com/bwwmusic/article/Paris-Paloma-Releases-THE-FATAL-FLAW-Album-Plans-World-Tour-20260904
5. https://www.riaa.com/gold-platinum/
6. https://en.wikipedia.org/wiki/Cacophony_(Paris_Paloma_album)

## radio-free-alice

Radio Free Alice is a Melbourne band led by singer and guitarist Noah Learmonth, with Jules Paradiso on guitar, Michael Phillips on bass and saxophone and Lochie Dowd on drums.[\[1\]](https://www.nme.com/features/music-interviews/radio-free-alice-band-interview-australia-radar-3767181)[\[4\]](https://au.rollingstone.com/music/music-features/radio-free-alice-future-of-music-2026-interview-96059/) Learmonth and Paradiso met at 14 at a Sydney high school, and the band came together around 2022 after they moved to Melbourne.[\[1\]](https://www.nme.com/features/music-interviews/radio-free-alice-band-interview-australia-radar-3767181)[\[4\]](https://au.rollingstone.com/music/music-features/radio-free-alice-future-of-music-2026-interview-96059/) They take their name from R.E.M.'s first single,[\[2\]](https://soyoungmagazine.com/melbourne-five-piece-radio-free-alice-share-debut-ep/) and their sound from 1980s post-punk and new wave: they cite early New Order, the Jam and the Housemartins, and Phillips's saxophone nods to jazz players like Sonny Rollins and Stan Getz.[\[1\]](https://www.nme.com/features/music-interviews/radio-free-alice-band-interview-australia-radar-3767181) The self-titled debut EP arrived in November 2023,[\[2\]](https://soyoungmagazine.com/melbourne-five-piece-radio-free-alice-share-debut-ep/) with further EPs since, most recently 'Empty Words', produced by Ali Chant.[\[4\]](https://au.rollingstone.com/music/music-features/radio-free-alice-future-of-music-2026-interview-96059/) 'Look What You've Done', which Learmonth calls a song about 'a marriage that's completely deteriorating but continues on anyway', is among their best-known.[\[3\]](https://www.backseatmafia.com/ep-review-the-brilliant-radio-free-alice-unveil-swaggering-self-titled-debut-ep-rest-assured-the-future-of-rocknroll-is-secure/) They signed to WME for booking alongside their local label Double Drummer,[\[5\]](https://www.backseatmafia.com/track-look-what-youve-done-radio-free-alice-dial-down-the-pace-and-unveil-scorching-new-single-tour-dates-and-signing-to-the-massive-wme-agency/) played SXSW in Austin, were listed on the NME 100, and supported the Killers at a Melbourne arena in 2024.[\[4\]](https://au.rollingstone.com/music/music-features/radio-free-alice-future-of-music-2026-interview-96059/)

**Sources**

1. https://www.nme.com/features/music-interviews/radio-free-alice-band-interview-australia-radar-3767181
2. https://soyoungmagazine.com/melbourne-five-piece-radio-free-alice-share-debut-ep/
3. https://www.backseatmafia.com/ep-review-the-brilliant-radio-free-alice-unveil-swaggering-self-titled-debut-ep-rest-assured-the-future-of-rocknroll-is-secure/
4. https://au.rollingstone.com/music/music-features/radio-free-alice-future-of-music-2026-interview-96059/
5. https://www.backseatmafia.com/track-look-what-youve-done-radio-free-alice-dial-down-the-pace-and-unveil-scorching-new-single-tour-dates-and-signing-to-the-massive-wme-agency/

## rebecca-black

Rebecca Black was born in 1997 in Irvine, California and is based in Los Angeles.[\[1\]](https://en.wikipedia.org/wiki/Rebecca_Black) Her 2011 single 'Friday', made with the pay-to-play outfit ARK Music Factory after her mother put up 4,000 dollars for the video, went viral and drew heavy mockery; she has spoken since about the depression and cyberbullying that followed.[\[1\]](https://en.wikipedia.org/wiki/Rebecca_Black) She started her own label, RB Records, and over the decade remade herself as a pop artist, marking ten years of 'Friday' in 2021 with a hyperpop remix produced by Dylan Brady of 100 gecs.[\[1\]](https://en.wikipedia.org/wiki/Rebecca_Black) The EP 'Rebecca Black Was Here' (2021) and her debut album 'Let Her Burn' (2023) leaned into hyperpop and electronic production,[\[1\]](https://en.wikipedia.org/wiki/Rebecca_Black) and 'Age of the Exhibitionist' (2026), her second album, is mostly dance-pop with hyperpop and R&B edges and lyrics about lust and sexuality.[\[2\]](https://en.wikipedia.org/wiki/Age_of_the_Exhibitionist) She also DJs, with a Boiler Room set in 2024 and an American Music Awards after-party in 2025, and she opened for Katy Perry on the 2025 Lifetimes Tour.[\[1\]](https://en.wikipedia.org/wiki/Rebecca_Black) Black came out as queer in 2020,[\[1\]](https://en.wikipedia.org/wiki/Rebecca_Black) and mounted a North American headline tour in 2026.[\[3\]](https://consequence.net/2026/07/rebecca-black-2026-north-american-tour/)

**Sources**

1. https://en.wikipedia.org/wiki/Rebecca_Black
2. https://en.wikipedia.org/wiki/Age_of_the_Exhibitionist
3. https://consequence.net/2026/07/rebecca-black-2026-north-american-tour/

## rio-kosta

Rio Kosta is a Los Angeles duo, the producer and songwriter Mike Del Rio and the drummer Kosta Galanopoulos, who met backstage at a festival and started writing together during the pandemic at Del Rio's home studio.[\[1\]](https://twntythree.com/rio-kostas-debut-album-unicorn-has-arrived-featuring-new-single-mountain-top/)[\[5\]](https://twntythree.com/rio-kosta-debut-with-double-a-side-singles-ancients-its-starting/) Del Rio, born Michael Gonzalez in Queens, had already co-founded the duo POWERS, written for Kylie Minogue and Selena Gomez, and executive-produced LP's platinum album 'Lost on You'.[\[2\]](https://en.wikipedia.org/wiki/Mike_Del_Rio) As Rio Kosta the two make psychedelic pop they describe as 'intergalactic children at play': loose grooves and stacked vocal harmonies with world-music touch points, often compared to Khruangbin.[\[1\]](https://twntythree.com/rio-kostas-debut-album-unicorn-has-arrived-featuring-new-single-mountain-top/)[\[5\]](https://twntythree.com/rio-kosta-debut-with-double-a-side-singles-ancients-its-starting/) Their single 'Ancients' was built on a loop from a cassette of Kosta's father's 1970s Greek band,[\[4\]](https://www.astrophemagazine.com/astrophe-magazine/ancient-echoes-rio-kosta-in-conversation)[\[5\]](https://twntythree.com/rio-kosta-debut-with-double-a-side-singles-ancients-its-starting/) and their track 'Mountain Top' appears on the EA Sports FC 26 soundtrack.[\[3\]](https://www.fifplay.com/fc-26/soundtrack/rio-kosta-mountain-top/) The debut album 'Unicorn', thirteen tracks, came out in July 2025, by which point the project had passed three million streams.[\[1\]](https://twntythree.com/rio-kostas-debut-album-unicorn-has-arrived-featuring-new-single-mountain-top/)

**Sources**

1. https://twntythree.com/rio-kostas-debut-album-unicorn-has-arrived-featuring-new-single-mountain-top/
2. https://en.wikipedia.org/wiki/Mike_Del_Rio
3. https://www.fifplay.com/fc-26/soundtrack/rio-kosta-mountain-top/
4. https://www.astrophemagazine.com/astrophe-magazine/ancient-echoes-rio-kosta-in-conversation
5. https://twntythree.com/rio-kosta-debut-with-double-a-side-singles-ancients-its-starting/

## rochelle-jordan

Rochelle Jordan was born in England to Jamaican parents, moved to the Toronto area at four, and is now based in Los Angeles.[\[2\]](https://www.kexp.org/read/2021/7/12/midnight-perfect-world-rochelle-jordan/)[\[3\]](https://www.nme.com/features/music-interviews/rochelle-jordan-through-the-wall-interview-3900624) Toronto's moody R&B shaped her early work,[\[2\]](https://www.kexp.org/read/2021/7/12/midnight-perfect-world-rochelle-jordan/) and her sound has since drawn in UK garage, two-step and Chicago and Detroit house under a sultry vocal.[\[3\]](https://www.nme.com/features/music-interviews/rochelle-jordan-through-the-wall-interview-3900624) The producer KLSH found her through YouTube covers and has produced every one of her records.[\[3\]](https://www.nme.com/features/music-interviews/rochelle-jordan-through-the-wall-interview-3900624)[\[4\]](https://atwoodmagazine.com/rjpc-rochelle-jordan-play-with-the-changes-interview-music-2021/) Her 2014 debut '1021' drew comparisons to Aaliyah.[\[3\]](https://www.nme.com/features/music-interviews/rochelle-jordan-through-the-wall-interview-3900624) After it she went quiet for about seven years, returning in 2021 with 'Play With The Changes' on TOKiMONSTA's Young Art label.[\[3\]](https://www.nme.com/features/music-interviews/rochelle-jordan-through-the-wall-interview-3900624)[\[4\]](https://atwoodmagazine.com/rjpc-rochelle-jordan-play-with-the-changes-interview-music-2021/) Her old song 'Lowkey' went viral on TikTok in 2024, and her third album 'Through the Wall' followed in 2025 on Empire, shortlisted for the 2026 Polaris Music Prize.[\[1\]](https://en.wikipedia.org/wiki/Rochelle_Jordan)[\[3\]](https://www.nme.com/features/music-interviews/rochelle-jordan-through-the-wall-interview-3900624) Drake name-dropped her on 'Club Paradise', and she co-wrote and sang on Childish Gambino's 'Telegraph Ave.'.[\[3\]](https://www.nme.com/features/music-interviews/rochelle-jordan-through-the-wall-interview-3900624)

**Sources**

1. https://en.wikipedia.org/wiki/Rochelle_Jordan
2. https://www.kexp.org/read/2021/7/12/midnight-perfect-world-rochelle-jordan/
3. https://www.nme.com/features/music-interviews/rochelle-jordan-through-the-wall-interview-3900624
4. https://atwoodmagazine.com/rjpc-rochelle-jordan-play-with-the-changes-interview-music-2021/

## rodrigo-y-gabriela

Rodrigo y Gabriela are the Mexican guitarists Rodrigo Sánchez and Gabriela Quintero, who met as teenagers in Mexico City and played together in the thrash-metal band Tierra Ácida before switching to acoustic guitars.[\[1\]](https://en.wikipedia.org/wiki/Rodrigo_y_Gabriela) After a record deal fell through in 1997 they left for the coast and then for Dublin, where they busked on Grafton Street and built a following, signing to ATO in 2005; their 2006 self-titled album went to number one in Ireland.[\[1\]](https://en.wikipedia.org/wiki/Rodrigo_y_Gabriela) Their instrumental music runs nuevo flamenco through acoustic rock and metal, with a hard percussive attack on the body of the guitar, and Metallica is an avowed influence.[\[1\]](https://en.wikipedia.org/wiki/Rodrigo_y_Gabriela) They won a Grammy for the 2019 album 'Mettavolution', headlined the West Holts stage at Glastonbury in 2010, played the White House for President Obama, and contributed to Hans Zimmer's score for 'Pirates of the Caribbean: On Stranger Tides'.[\[1\]](https://en.wikipedia.org/wiki/Rodrigo_y_Gabriela) Their album 'OurHome' (2026), self-produced at a studio in Tokyo with guests Marty Friedman and the pianist Hiromi, returns to all-acoustic playing after a more electric 2023 record.[\[2\]](https://consequence.net/2026/06/rodrigo-y-gabriela-ourhome-monster/) The two were a couple for years and remain musical partners.[\[1\]](https://en.wikipedia.org/wiki/Rodrigo_y_Gabriela)

**Sources**

1. https://en.wikipedia.org/wiki/Rodrigo_y_Gabriela
2. https://consequence.net/2026/06/rodrigo-y-gabriela-ourhome-monster/

## rubio

Rubio is the solo project of the Chilean songwriter and producer Francisca Straube, who took up drums at eleven in Colina, outside Santiago, and played in the bands Miss Garrison, Fármacos and Picnic Kibun before going solo.[\[2\]](https://www.cnnchile.com/cultura/rubio-francisca-straube-entrevista-lollapalooza-musica-chile_20250929/) She studied music and composition at UNIACC in Santiago and later did an electronic-music-production course in Barcelona.[\[2\]](https://www.cnnchile.com/cultura/rubio-francisca-straube-entrevista-lollapalooza-musica-chile_20250929/) Her label calls her music 'dark avant-pop', built from EDM, trip-hop and Andean roots music with reggaeton, dembow and trap;[\[1\]](https://famacollective.com/artists/rubio) she cites Radiohead, James Blake and PJ Harvey.[\[3\]](https://www.kexp.org/read/2023/7/18/el-sonido-live-get-to-know-rubio-in-three-albums/) The Rubio persona, a group of white androgynous beings arriving on Earth, is drawn from the band Blonde Redhead.[\[2\]](https://www.cnnchile.com/cultura/rubio-francisca-straube-entrevista-lollapalooza-musica-chile_20250929/) After the albums 'Pez' (2018), 'Mango Negro' (2020) and 'Venus & Blue' (2023) she scored the 2022 film 'La Caída', whose soundtrack helped it win two International Emmy Awards and earned her Mexico's Diosa de Plata for best original song.[\[1\]](https://famacollective.com/artists/rubio)[\[2\]](https://www.cnnchile.com/cultura/rubio-francisca-straube-entrevista-lollapalooza-musica-chile_20250929/) She has played Lollapalooza and Primavera Sound and performed a Tiny Desk concert in 2025.[\[1\]](https://famacollective.com/artists/rubio)[\[2\]](https://www.cnnchile.com/cultura/rubio-francisca-straube-entrevista-lollapalooza-musica-chile_20250929/)

**Sources**

1. https://famacollective.com/artists/rubio
2. https://www.cnnchile.com/cultura/rubio-francisca-straube-entrevista-lollapalooza-musica-chile_20250929/
3. https://www.kexp.org/read/2023/7/18/el-sonido-live-get-to-know-rubio-in-three-albums/

## rufus-du-sol

RÜFÜS DU SOL formed in Sydney in 2010: Tyrone Lindqvist, Jon George and James Hunt, later based in Los Angeles.[\[1\]](<https://en.wikipedia.org/wiki/R%C3%BCf%C3%BCs_Du_Sol>)[\[2\]](https://www.nme.com/news/music/rufus-du-sol-win-best-dance-electronic-recording-at-2022-grammys-3197009)[\[3\]](https://floodmagazine.com/104069/perfect-day-in-la-rufus-du-sol/) They built their sound with vocals that rise into melodic house over live playing, treating the stage lighting as a fourth band member and drawing on acts like the Chemical Brothers and the Presets.[\[4\]](https://au.rollingstone.com/music/music-features/rufus-du-sol-james-hunt-jon-george-interview-87668/) 'Alive', from 'Surrender' (2021), won Best Dance/Electronic Recording at the 2022 Grammys.[\[2\]](https://www.nme.com/news/music/rufus-du-sol-win-best-dance-electronic-recording-at-2022-grammys-3197009) By a breakthrough 2016 Coachella set, watching the crowd spill out past the tent, Hunt has said it was clear the band had arrived.[\[4\]](https://au.rollingstone.com/music/music-features/rufus-du-sol-james-hunt-jon-george-interview-87668/) The fifth album, 'Inhale / Exhale', followed in 2024 on the band's own label, Rose Avenue Records, and its tour became the highest-selling electronic tour ever, with 750,000 tickets sold to 1.5 million fans worldwide.[\[4\]](https://au.rollingstone.com/music/music-features/rufus-du-sol-james-hunt-jon-george-interview-87668/)[\[5\]](https://relentlessbeats.com/2024/10/album-review-rufus-du-sols-fifth-album-inhale-exhale/)

**Sources**

1. https://en.wikipedia.org/wiki/Rüfüs_Du_Sol
2. https://www.nme.com/news/music/rufus-du-sol-win-best-dance-electronic-recording-at-2022-grammys-3197009
3. https://floodmagazine.com/104069/perfect-day-in-la-rufus-du-sol/
4. https://au.rollingstone.com/music/music-features/rufus-du-sol-james-hunt-jon-george-interview-87668/
5. https://relentlessbeats.com/2024/10/album-review-rufus-du-sols-fifth-album-inhale-exhale/

## rum-jungle

Rum Jungle are a four-piece from Newcastle, New South Wales, Benny McIntyre (vocals and guitar), Josh Giles (guitar), Michael Kolmajer (bass) and Frazer McDonald (drums), who started jamming on a balcony after McIntyre moved out of a share house and took the band name from an old poster for a group his father had played in.[\[1\]](https://en.wikipedia.org/wiki/Rum_Jungle)[\[2\]](https://read-gem.com/2025/02/21/interview-rum-jungle/) McIntyre pulled in McDonald, a 15-year-old he knew from a burger-shop job, on drums.[\[2\]](https://read-gem.com/2025/02/21/interview-rum-jungle/) Their music, which they loosely call alt-indie rock, layers pop melodies over psych-tinged guitars, and early triple j airplay, including a cover of Rihanna's 'Stay', built the audience.[\[1\]](https://en.wikipedia.org/wiki/Rum_Jungle)[\[3\]](https://www.grimygoods.com/2025/03/12/music-artists-you-should-know-rum-jungle/) After the EPs 'Crazy Days' (2017), 'Sun & Smoke' (2018), 'Everything Is Easy' (2022) and 'Hold Me in the Water' (2023), the debut album 'Recency Bias' arrived in February 2025 and reached number nine on the ARIA chart, cut with producer Simon Dobson on the Central Coast.[\[1\]](https://en.wikipedia.org/wiki/Rum_Jungle)[\[2\]](https://read-gem.com/2025/02/21/interview-rum-jungle/) The second album 'Marginalia' followed in June 2026, and they put their records out themselves.[\[1\]](https://en.wikipedia.org/wiki/Rum_Jungle)

**Sources**

1. https://en.wikipedia.org/wiki/Rum_Jungle
2. https://read-gem.com/2025/02/21/interview-rum-jungle/
3. https://www.grimygoods.com/2025/03/12/music-artists-you-should-know-rum-jungle/

## rusowsky

Rusowsky is Ruslán Mediavilla, born in 1999 and raised in Fuenlabrada on the southern edge of Madrid, the son of a Belarusian mother who led a folk band back home.[\[1\]](https://en.wikipedia.org/wiki/Rusowsky)[\[4\]](https://www.rockdelux.com/en/en-portada/rusowsky--yo-no-tengo-ni-idea-de-producir---en-portada) He trained at a conservatory and reached a professional level on piano, then turned away from both classical performance and learning studio technique, treating his limits as a method rather than a gap.[\[1\]](https://en.wikipedia.org/wiki/Rusowsky)[\[4\]](https://www.rockdelux.com/en/en-portada/rusowsky--yo-no-tengo-ni-idea-de-producir---en-portada) He is a founder of Rusia-IDK, the Madrid collective and label around Ralphie Choo, TRISTÁN!, mori and DRUMMIE, whose freeform take on pop pulls hip-hop, flamenco, reggaeton and shoegaze together.[\[3\]](https://www.dazeddigital.com/music/article/62220/1/meet-rusia-idk-the-avant-pop-collective-shaping-madrids-party-scene-ralphie-choo)[\[4\]](https://www.rockdelux.com/en/en-portada/rusowsky--yo-no-tengo-ni-idea-de-producir---en-portada) C. Tangana pulled him in to co-produce 'Bien:(' during lockdown, on a borrowed laptop that shut off every half hour.[\[4\]](https://www.rockdelux.com/en/en-portada/rusowsky--yo-no-tengo-ni-idea-de-producir---en-portada) His debut album 'DAISY' (May 2025, Warner), self-produced across 13 tracks with Jean Dawson, Ravyn Lenae, Kevin Abstract, La Zowi and Las Ketchup, went to number one in Spain, led by the double-platinum single 'malibU'.[\[1\]](https://en.wikipedia.org/wiki/Rusowsky)[\[2\]](<https://en.wikipedia.org/wiki/Daisy_(Rusowsky_album)>)

**Sources**

1. https://en.wikipedia.org/wiki/Rusowsky
2. https://en.wikipedia.org/wiki/Daisy_(Rusowsky_album)
3. https://www.dazeddigital.com/music/article/62220/1/meet-rusia-idk-the-avant-pop-collective-shaping-madrids-party-scene-ralphie-choo
4. https://www.rockdelux.com/en/en-portada/rusowsky--yo-no-tengo-ni-idea-de-producir---en-portada

## ryan-beatty

Ryan Beatty grew up in Clovis, California and is based in Los Angeles.[\[1\]](https://en.wikipedia.org/wiki/Ryan_Beatty) He started on YouTube in 2011 as a teenage pop singer, then stepped back and returned in an alt-R&B mode with the self-released 'Boy in Jeans' (2018) and 'Dreaming of David' (2020) on Benny Blanco's Mad Love label.[\[1\]](https://en.wikipedia.org/wiki/Ryan_Beatty) Around then he sang on Brockhampton's 'Saturation' records and Tyler, the Creator's 'Igor', and worked with Kevin Abstract.[\[1\]](https://en.wikipedia.org/wiki/Ryan_Beatty) 'Calico' (2023), co-produced with Ethan Gruska and released on Elektra, was a quiet folk record, its lead single 'Ribbons' featuring Justin Vernon of Bon Iver.[\[1\]](https://en.wikipedia.org/wiki/Ryan_Beatty)[\[2\]](<https://en.wikipedia.org/wiki/Calico_(album)>) In 2024 he co-wrote four songs on Beyoncé's 'Cowboy Carter', which won the Grammy for Album of the Year.[\[1\]](https://en.wikipedia.org/wiki/Ryan_Beatty) His fourth album 'Sweet Fortune' (2026), with Clairo contributing production and vocals, followed the single 'Secret Language'.[\[1\]](https://en.wikipedia.org/wiki/Ryan_Beatty)

**Sources**

1. https://en.wikipedia.org/wiki/Ryan_Beatty
2. https://en.wikipedia.org/wiki/Calico_(album)

## saint-motel

Saint Motel is a Los Angeles band that formed in 2007: A.J. Jackson on vocals, guitar and piano, Aaron Sharp on lead guitar, Dak Lerdamornpong on bass and Greg Erwin on drums.[\[1\]](https://en.wikipedia.org/wiki/Saint_Motel)[\[3\]](https://www.songfacts.com/blog/interviews/a-j-jackson-of-saint-motel) Jackson and Sharp met studying film at Chapman University, and cinema has run through the band's work ever since.[\[3\]](https://www.songfacts.com/blog/interviews/a-j-jackson-of-saint-motel) Their indie pop is built on horn and brass grooves and tongue-in-cheek lyrics;[\[3\]](https://www.songfacts.com/blog/interviews/a-j-jackson-of-saint-motel) 'My Type' (2014) was a slow-building hit that reached the Top 30 across Europe and went platinum in Italy, and 'saintmotelevision' (2016) shipped with a virtual-reality version of every track, a first for a band.[\[1\]](https://en.wikipedia.org/wiki/Saint_Motel) They played Coachella in 2015.[\[1\]](https://en.wikipedia.org/wiki/Saint_Motel) Jackson has since pulled the group toward orchestral pop with real strings, and the twin 2025 albums 'Saint Motel & the Symphony in the Sky' and 'Afterglow', both about impermanence and the Japanese idea of 'mono no aware', rework and extend that catalog.[\[2\]](https://www.studioone.org/news/2025-10-10/saint-motel-and-cinematic-orchestral-pop-art-that-celebrates-the-beauty-of-the-impermanence-of-existence)[\[3\]](https://www.songfacts.com/blog/interviews/a-j-jackson-of-saint-motel)

**Sources**

1. https://en.wikipedia.org/wiki/Saint_Motel
2. https://www.studioone.org/news/2025-10-10/saint-motel-and-cinematic-orchestral-pop-art-that-celebrates-the-beauty-of-the-impermanence-of-existence
3. https://www.songfacts.com/blog/interviews/a-j-jackson-of-saint-motel

## sasha-keable

Sasha Keable is a British-Colombian singer from Eltham, south London, who grew up on her father's printed-out guitar tabs and her Colombian family's cumbia and went to the BRIT School alongside King Krule.[\[2\]](https://www.dazeddigital.com/music/article/67006/1/sasha-keable-beyonce-act-right-single-studio-meltdown-festival)[\[3\]](https://crackmagazine.net/article/profiles/sasha-keable-cover-story-interview/) Signed to Polydor at seventeen, she broke through co-writing and singing on Disclosure's 'Voices' in 2013 and released the EPs 'Black Book' (2013) and 'Lemongrass and Limeleaves' (2014), but felt boxed in: 'what they really wanted me to do was pop'.[\[1\]](https://en.wikipedia.org/wiki/Sasha_Keable)[\[3\]](https://crackmagazine.net/article/profiles/sasha-keable-cover-story-interview/) She left the label, spent years away, and came back independent, releasing further EPs including 'Man' (2019), 'Intermission' (2021), which carried 'Killing Me' with Jorja Smith, and 'Act Right'.[\[1\]](https://en.wikipedia.org/wiki/Sasha_Keable)[\[3\]](https://crackmagazine.net/article/profiles/sasha-keable-cover-story-interview/) Her 2024 single 'Hold Up' was a TikTok hit, and Beyoncé named her one of the best artists she heard that year.[\[2\]](https://www.dazeddigital.com/music/article/67006/1/sasha-keable-beyonce-act-right-single-studio-meltdown-festival)[\[3\]](https://crackmagazine.net/article/profiles/sasha-keable-cover-story-interview/) She played an NPR Tiny Desk in 2025 and was nominated for the BBC Sound of 2026.[\[1\]](https://en.wikipedia.org/wiki/Sasha_Keable) Her R&B carries gospel, soul and drum and bass, over influences like Donny Hathaway and Lauryn Hill.[\[1\]](https://en.wikipedia.org/wiki/Sasha_Keable)[\[3\]](https://crackmagazine.net/article/profiles/sasha-keable-cover-story-interview/)

**Sources**

1. https://en.wikipedia.org/wiki/Sasha_Keable
2. https://www.dazeddigital.com/music/article/67006/1/sasha-keable-beyonce-act-right-single-studio-meltdown-festival
3. https://crackmagazine.net/article/profiles/sasha-keable-cover-story-interview/

## sg-goodman

S.G. Goodman is a songwriter from Hickman, in the rural far west of Kentucky, the daughter of a farmer, raised Southern Baptist and singing first in church.[\[1\]](<https://en.wikipedia.org/wiki/S.G._Goodman>)[\[2\]](https://atwoodmagazine.com/pbts-sg-goodman-planting-by-the-signs-album-interview-music-feature/) She studied philosophy at Murray State and still lives in Murray.[\[1\]](<https://en.wikipedia.org/wiki/S.G._Goodman>) Her solo debut 'Old Time Feeling' (2020) was co-produced by Jim James of My Morning Jacket, and 'Teeth Marks' followed on Verve Forecast in 2022.[\[1\]](<https://en.wikipedia.org/wiki/S.G._Goodman>)[\[2\]](https://atwoodmagazine.com/pbts-sg-goodman-planting-by-the-signs-album-interview-music-feature/) For 'Planting by the Signs' (2025) she reunited with her longtime collaborator Matthew Rowan and built the record around the old Appalachian practice of timing farm work and daily life to the moon.[\[2\]](https://atwoodmagazine.com/pbts-sg-goodman-planting-by-the-signs-album-interview-music-feature/) Her Americana runs through folk, country and indie rock, and being a queer artist from rural Kentucky shapes the writing.[\[1\]](<https://en.wikipedia.org/wiki/S.G._Goodman>)[\[2\]](https://atwoodmagazine.com/pbts-sg-goodman-planting-by-the-signs-album-interview-music-feature/) The Americana Music Association named her Emerging Artist of the Year in 2023, she has toured with My Morning Jacket and Jason Isbell, and Tyler Childers covered her song 'Space and Time'.[\[1\]](<https://en.wikipedia.org/wiki/S.G._Goodman>)[\[2\]](https://atwoodmagazine.com/pbts-sg-goodman-planting-by-the-signs-album-interview-music-feature/)

**Sources**

1. https://en.wikipedia.org/wiki/S.G._Goodman
2. https://atwoodmagazine.com/pbts-sg-goodman-planting-by-the-signs-album-interview-music-feature/

## sienna-spiro

Sienna Spiro was born in London in 2005, the daughter of the jeweller Glenn Spiro, whose clients include Jay-Z and Beyoncé.[\[1\]](https://en.wikipedia.org/wiki/Sienna_Spiro)[\[2\]](https://www.nylon.com/entertainment/sienna-spiro-interview-visitor-debut-album-die-on-this-hill-tiktok-new-tour) She started on TikTok covers as a teenager, went viral in 2022 with a version of Finneas's 'Break My Heart Again', and left the ELAM performing-arts school at sixteen for music, signing to Capitol.[\[1\]](https://en.wikipedia.org/wiki/Sienna_Spiro)[\[2\]](https://www.nylon.com/entertainment/sienna-spiro-interview-visitor-debut-album-die-on-this-hill-tiktok-new-tour) Her sound is pop built on jazz and soul, and she is blunt about the mood: 'My music, it's quite sad, it's quite miserable'.[\[2\]](https://www.nylon.com/entertainment/sienna-spiro-interview-visitor-debut-album-die-on-this-hill-tiktok-new-tour) 'Die on This Hill', which she found while trying to learn 'Bohemian Rhapsody' and cut with executive producer Omer Fedi, reached number nine in the UK and the top twenty of the Hot 100.[\[1\]](https://en.wikipedia.org/wiki/Sienna_Spiro)[\[2\]](https://www.nylon.com/entertainment/sienna-spiro-interview-visitor-debut-album-die-on-this-hill-tiktok-new-tour) The EP 'Sink Now, Swim Later' (2025) came first, then the debut album 'Visitor' in July 2026, and she has drawn public praise from SZA, Elton John and Sam Smith.[\[1\]](https://en.wikipedia.org/wiki/Sienna_Spiro)[\[2\]](https://www.nylon.com/entertainment/sienna-spiro-interview-visitor-debut-album-die-on-this-hill-tiktok-new-tour)

**Sources**

1. https://en.wikipedia.org/wiki/Sienna_Spiro
2. https://www.nylon.com/entertainment/sienna-spiro-interview-visitor-debut-album-die-on-this-hill-tiktok-new-tour

## skrillex

Sonny Moore grew up between San Francisco and the Highland Park neighborhood of Los Angeles before reinventing himself as Skrillex.[\[1\]](https://en.wikipedia.org/wiki/Skrillex) He sang in the post-hardcore band From First to Last before going solo, then pushed a loud, drop-heavy dubstep into the American mainstream with EPs like 'Scary Monsters and Nice Sprites', which won three Grammys in 2012 on the way to nine total, more than any other electronic act has won.[\[1\]](https://en.wikipedia.org/wiki/Skrillex)[\[2\]](https://www.grammy.com/artists/skrillex/6363/) He released two albums a day apart in 2023, 'Quest for Fire' and 'Don't Get Too Close', then a sprawling, 34-track 2025 record spanning EDM, techno and drum and bass.[\[3\]](https://relentlessbeats.com/2025/04/skrillex-unveils-new-album-fck-u-skrillex-you-think-ur-andy-warhol-but-your-not3/) At Ultra Miami 2025, his first main-stage set there in a decade, he brought out Damian Marley for 'Make It Bun Dem' and Flowdan for 'Rumble' and a posse cut with Chase &amp; Status, Bou, IRAH and Takura.[\[4\]](https://www.nme.com/news/music/watch-skrillex-return-ultra-first-time-decade-damian-marley-young-niko-3850674)

**Sources**

1. https://en.wikipedia.org/wiki/Skrillex
2. https://www.grammy.com/artists/skrillex/6363/
3. https://relentlessbeats.com/2025/04/skrillex-unveils-new-album-fck-u-skrillex-you-think-ur-andy-warhol-but-your-not3/
4. https://www.nme.com/news/music/watch-skrillex-return-ultra-first-time-decade-damian-marley-young-niko-3850674

## skye-newman

Skye Newman is a singer-songwriter from Eltham in South East London, born in 2003, who takes the SE9 postcode as a running title.[\[1\]](https://en.wikipedia.org/wiki/Skye_Newman)[\[2\]](https://www.nme.com/features/music-interviews/skye-newman-se9-part-1-interview-radar-3905047) An aunt who sings jazz and blues got her started; she was writing songs at eleven, was in studios by thirteen, and signed to Columbia after a video of hers went viral.[\[2\]](https://www.nme.com/features/music-interviews/skye-newman-se9-part-1-interview-radar-3905047) Her debut single 'Hairdresser' (2025), about a one-sided friendship, reached number 15 in the UK, and the follow-up 'Family Matters', about drug addiction and grief, went to number five, making her the first British woman in over a decade to land her first two singles in the top 20.[\[1\]](https://en.wikipedia.org/wiki/Skye_Newman)[\[2\]](https://www.nme.com/features/music-interviews/skye-newman-se9-part-1-interview-radar-3905047) She released the EPs 'SE9 Part 1' (2025) and 'SE9 Part 2' (2026), won the BBC Sound of 2026 poll, and toured as support for Lewis Capaldi and Harry Styles while playing festivals from Reading and Leeds to Lollapalooza.[\[1\]](https://en.wikipedia.org/wiki/Skye_Newman)[\[3\]](https://www.nme.com/news/music/reading-leeds-2026-check-out-the-full-stage-times-3963739)[\[4\]](https://www.setlist.fm/setlists/skye-newman-53ee5b69.html)

**Sources**

1. https://en.wikipedia.org/wiki/Skye_Newman
2. https://www.nme.com/features/music-interviews/skye-newman-se9-part-1-interview-radar-3905047
3. https://www.nme.com/news/music/reading-leeds-2026-check-out-the-full-stage-times-3963739
4. https://www.setlist.fm/setlists/skye-newman-53ee5b69.html

## snow-strippers

Snow Strippers are the American electronic duo of vocalist Tatiana Schwaninger and producer Graham Perez, who moved to Detroit and started the project together in 2021.[\[1\]](https://en.wikipedia.org/wiki/Snow_Strippers)[\[2\]](https://magazine.032c.com/magazine/almost-a-threat-snow-strippers) They put out the 20-track debut album 'The Snow Strippers' in 2022, then built a discography of mixtapes and EPs through the New York label Surf Gang, including 'April Mixtape 3' and the ongoing 'Night Killaz' series.[\[3\]](https://music.apple.com/ng/album/the-snow-strippers/1632378457)[\[4\]](https://surfgang.nyc/releases/april-mixtape-3) Their sound pairs distorted synths and heavy basslines with deadpan vocal hooks and high-tempo dance beats, an update on 2000s indie sleaze for a new generation of concertgoers.[\[1\]](https://en.wikipedia.org/wiki/Snow_Strippers)[\[5\]](https://parklifedc.com/2026/01/12/live-review-snow-strippers-930-club-1-8-26/) A sold-out show at Washington DC's 9:30 Club in January 2026 drew mosh pits and crowd surfing, with one reviewer calling their stage presence 'as electric as their sound.'[\[5\]](https://parklifedc.com/2026/01/12/live-review-snow-strippers-930-club-1-8-26/)[\[6\]](https://uclaradio.com/snow-strippers-930-club-1-8-26/)

**Sources**

1. https://en.wikipedia.org/wiki/Snow_Strippers
2. https://magazine.032c.com/magazine/almost-a-threat-snow-strippers
3. https://music.apple.com/ng/album/the-snow-strippers/1632378457
4. https://surfgang.nyc/releases/april-mixtape-3
5. https://parklifedc.com/2026/01/12/live-review-snow-strippers-930-club-1-8-26/
6. https://uclaradio.com/snow-strippers-930-club-1-8-26/

## sofi-tukker

Brooklyn's SOFI TUKKER build genre-blending dance-pop out of a friendship that started when Tucker Halpern struck up a conversation with Sophie Hawley-Weld after her set at a Brown University art show.[\[1\]](https://www.wbur.org/onlyagame/2019/03/15/sofi-tukker-halpern-drinkee-brown) 'We have no idea what genre we're making half the time,' Hawley-Weld has said, and their music runs Brazilian rhythms like bossa nova and baião through disco, techno and jazz.[\[4\]](https://atwoodmagazine.com/sftk-sofi-tukker-interview-music-feature-2023/)[\[2\]](https://en.wikipedia.org/wiki/Sofi_Tukker) 'Drinkee' earned a Grammy nomination for Best Dance Recording in 2017, and their debut album 'Treehouse' another for Best Dance/Electronic Album in 2019.[\[1\]](https://www.wbur.org/onlyagame/2019/03/15/sofi-tukker-halpern-drinkee-brown)[\[3\]](https://www.grammy.com/artists/sofi-tukker/20153/) The duo has four albums now, from 'Treehouse' (2018) through 'Wet Tennis' (2022) and 'BREAD' (2024) to 'butter' (2025), which leaned further into Brazilian genres with features from Seu Jorge and Liniker.[\[2\]](https://en.wikipedia.org/wiki/Sofi_Tukker)

**Sources**

1. https://www.wbur.org/onlyagame/2019/03/15/sofi-tukker-halpern-drinkee-brown
2. https://en.wikipedia.org/wiki/Sofi_Tukker
3. https://www.grammy.com/artists/sofi-tukker/20153/
4. https://atwoodmagazine.com/sftk-sofi-tukker-interview-music-feature-2023/

## solomon-hicks

Solomon Hicks, who also performs as King Solomon Hicks, was born in Harlem in 1995 and started guitar at six with his mother as his first teacher.[\[1\]](https://en.wikipedia.org/wiki/Solomon_Hicks) At thirteen he was playing lead in the Cotton Club's seventeen-piece band, and he trained at the Harlem School of the Arts and the Harbor Conservatory in jazz, classical and Afro-Cuban music.[\[1\]](https://en.wikipedia.org/wiki/Solomon_Hicks) His electric blues pulls in jazz, gospel, soul and funk.[\[1\]](https://en.wikipedia.org/wiki/Solomon_Hicks)[\[2\]](https://www.americanbluesscene.com/2020/03/king-solomon-hicks-debuts-with-harlem/) The debut album 'Harlem' (2020), on Provogue, won the 2021 Blues Music Award for best emerging artist, and he has shared stages with Bruce Springsteen, B.B. King and Beth Hart.[\[1\]](https://en.wikipedia.org/wiki/Solomon_Hicks)[\[2\]](https://www.americanbluesscene.com/2020/03/king-solomon-hicks-debuts-with-harlem/) His second album 'How Did I Ever Get This Blue?' is billed as a sequel to 'Harlem'. It came out in January 2026 on Mascot, produced by Kirk Yano in Austin, with guests including the drummer Chris Layton, the turntablist DJ Logic and the slide guitarist Joanna Connor.[\[3\]](https://bluesrockreview.com/2026/01/solomon-hicks-how-did-i-ever-get-this-blue-review.html)[\[4\]](https://www.mascotlabelgroup.com/blogs/news/new-album-from-solomon-hicks)

**Sources**

1. https://en.wikipedia.org/wiki/Solomon_Hicks
2. https://www.americanbluesscene.com/2020/03/king-solomon-hicks-debuts-with-harlem/
3. https://bluesrockreview.com/2026/01/solomon-hicks-how-did-i-ever-get-this-blue-review.html
4. https://www.mascotlabelgroup.com/blogs/news/new-album-from-solomon-hicks

## solya

Solya, born Solya Ava Lowe in 2006, grew up mostly in Abilene, in West Texas, and plays piano, guitar and synth.[\[1\]](https://en.wikipedia.org/wiki/Solya) She started putting out music in 2023, and her single 'Tear Me Apart' spread slowly online over about a year.[\[1\]](https://en.wikipedia.org/wiki/Solya)[\[2\]](https://floodmagazine.com/218790/solya-queen-of-texas-breaking/) She comes out of the Abilene scene Texas Monthly has called the new y'allternative sound,[\[3\]](https://buddymagazine.com/solya-embraces-her-west-texas-roots-both-the-beauty-and-backlash-on-queen-of-texas-debut-lp-tour/) and critics have likened her to a goth Lana Del Rey with a bit of country twang, over warm Americana, dreamy indie rock and retro pop harmonies,[\[4\]](https://www.kpbs.org/events/2026/09/16/solya-soma) with Cocteau Twins and Patsy Cline among her touchstones.[\[1\]](https://en.wikipedia.org/wiki/Solya) She signed to the independent label Version III in 2024, after the EPs 'Fever Dream' (2023) and the bedroom-recorded 'Jewel Box' (2024).[\[1\]](https://en.wikipedia.org/wiki/Solya)[\[3\]](https://buddymagazine.com/solya-embraces-her-west-texas-roots-both-the-beauty-and-backlash-on-queen-of-texas-debut-lp-tour/) Her debut album 'Queen of Texas' came out in March 2026, recorded to tape in Lockhart, Texas by Danny Reisch, a producer known for Khruangbin and Local Natives, with Jason Chronis of Tele Novella.[\[1\]](https://en.wikipedia.org/wiki/Solya)[\[3\]](https://buddymagazine.com/solya-embraces-her-west-texas-roots-both-the-beauty-and-backlash-on-queen-of-texas-debut-lp-tour/)[\[4\]](https://www.kpbs.org/events/2026/09/16/solya-soma) It reached number seventeen on Billboard's Emerging Artists chart, and its songs deal with heartbreak, identity and growing up queer in a small Southern town.[\[1\]](https://en.wikipedia.org/wiki/Solya)[\[2\]](https://floodmagazine.com/218790/solya-queen-of-texas-breaking/)[\[4\]](https://www.kpbs.org/events/2026/09/16/solya-soma)

**Sources**

1. https://en.wikipedia.org/wiki/Solya
2. https://floodmagazine.com/218790/solya-queen-of-texas-breaking/
3. https://buddymagazine.com/solya-embraces-her-west-texas-roots-both-the-beauty-and-backlash-on-queen-of-texas-debut-lp-tour/
4. https://www.kpbs.org/events/2026/09/16/solya-soma

## stella-lefty

Stella Lefty is Stella Lefkofsky, raised in the Chicago suburb of Glencoe and now based in Los Angeles, the daughter of the Groupon and Tempus co-founder Eric Lefkofsky.[\[1\]](https://en.wikipedia.org/wiki/Stella_Lefty)[\[3\]](https://www.songwriteruniverse.com/stella-lefty-boston-ep-songs/) She has written songs since she was five or six and grew up on Taylor Swift, and started posting them online as a college student.[\[3\]](https://www.songwriteruniverse.com/stella-lefty-boston-ep-songs/) After 'Kiss Me' and then 'Thinking 'Bout You' caught on, she moved to LA and signed to Atlantic's country imprint Outpost.[\[1\]](https://en.wikipedia.org/wiki/Stella_Lefty)[\[2\]](https://savingcountrymusic.com/making-sense-of-stella-lefty-and-new-song-boston/) She wrote the chorus of her breakout 'Boston', pedal steel over a pop hook, at a piano on a Nashville writing trip, meaning it only as a social clip; it climbed into the top five of the Hot 100 and, because it echoes Noah Kahan's 'Stick Season', now carries a writing credit for him.[\[1\]](https://en.wikipedia.org/wiki/Stella_Lefty)[\[2\]](https://savingcountrymusic.com/making-sense-of-stella-lefty-and-new-song-boston/)[\[3\]](https://www.songwriteruniverse.com/stella-lefty-boston-ep-songs/) The independent EP 'Tragic, Really' (2025) gave way to 'Is This Heaven?' (2026), a Field of Dreams reference she calls the most herself she has sounded, which reached number nine on the Top Country Albums chart.[\[1\]](https://en.wikipedia.org/wiki/Stella_Lefty)[\[3\]](https://www.songwriteruniverse.com/stella-lefty-boston-ep-songs/) Her debut album 'Long Way Home' followed in August 2026, with her boyfriend, the country singer Vincent Mason, duetting on 'Something to Lose'.[\[1\]](https://en.wikipedia.org/wiki/Stella_Lefty)[\[3\]](https://www.songwriteruniverse.com/stella-lefty-boston-ep-songs/)

**Sources**

1. https://en.wikipedia.org/wiki/Stella_Lefty
2. https://savingcountrymusic.com/making-sense-of-stella-lefty-and-new-song-boston/
3. https://www.songwriteruniverse.com/stella-lefty-boston-ep-songs/

## steve-aoki

Steve Aoki was born in Miami in 1977, grew up a skater kid in Newport Beach, California, and is a son of the Benihana founder Rocky Aoki.[\[1\]](https://en.wikipedia.org/wiki/Steve_Aoki)[\[2\]](https://podcasts.apple.com/us/podcast/steve-aoki/id1345682353?i=1000773695264) He found his footing in the straight-edge hardcore punk scene, and launched Dim Mak Records in 1996 out of living-room shows at his college house, later moving into electronic music through DJing and remixes.[\[1\]](https://en.wikipedia.org/wiki/Steve_Aoki)[\[2\]](https://podcasts.apple.com/us/podcast/steve-aoki/id1345682353?i=1000773695264) Named after a martial-arts concept from Bruce Lee, the label was an early home to Bloc Party, the Kills, Klaxons and the Bloody Beetroots.[\[1\]](https://en.wikipedia.org/wiki/Steve_Aoki) His own music is electro and big-room house that crosses freely into pop, rock and hip-hop, with collaborators from BTS to Linkin Park to Fall Out Boy.[\[1\]](https://en.wikipedia.org/wiki/Steve_Aoki) The debut album 'Wonderland' (2012) drew a Grammy nomination, and Pollstar named him the highest-grossing electronic act in North America that year.[\[1\]](https://en.wikipedia.org/wiki/Steve_Aoki) He tours relentlessly, around 250 shows a year, and the live show is a spectacle of crowd surfing, champagne and cake thrown into the audience.[\[1\]](https://en.wikipedia.org/wiki/Steve_Aoki) A 2016 documentary, I'll Sleep When I'm Dead, followed him on the road, and his Aoki Foundation funds brain research.[\[1\]](https://en.wikipedia.org/wiki/Steve_Aoki)

**Sources**

1. https://en.wikipedia.org/wiki/Steve_Aoki
2. https://podcasts.apple.com/us/podcast/steve-aoki/id1345682353?i=1000773695264

## suki-waterhouse

Suki Waterhouse, born in Hammersmith, London, in 1992, is an English model and actress, most recently the keyboardist in 'Daisy Jones & the Six', who has run a music career alongside it.[\[1\]](https://en.wikipedia.org/wiki/Suki_Waterhouse) She put out early singles from 2016 and released her debut album 'I Can't Let Go' on Sub Pop in 2022, followed by 'Memoir of a Sparklemuffin' in 2024 and 'Loveland' on Island in 2026.[\[1\]](https://en.wikipedia.org/wiki/Suki_Waterhouse)[\[3\]](https://northerntransmissions.com/suki-waterhouse-memoir-of-a-sparklemuffin/) Her 2017 single 'Good Looking' became a sleeper hit five years later when it went viral on TikTok, going Gold in the UK and double platinum in Canada.[\[1\]](https://en.wikipedia.org/wiki/Suki_Waterhouse)[\[2\]](<https://en.wikipedia.org/wiki/Good_Looking_(song)>) She wrote much of 'Memoir' during the last months of a pregnancy, then played Coachella and opened for Taylor Swift at Wembley in 2024, and has since taken the songs to festivals like Lollapalooza and Hinterland.[\[1\]](https://en.wikipedia.org/wiki/Suki_Waterhouse)[\[5\]](https://www.clashmusic.com/live/live-report-lollapalooza-2026/)[\[6\]](https://shadestudios.com/music/f/hinterland-day-4-suki-waterhouse-and-geese-impress) Her music is dream pop with an LA garage-rock streak, pulled toward smoky, nostalgic writing about fame, scrutiny and romance.[\[1\]](https://en.wikipedia.org/wiki/Suki_Waterhouse)[\[3\]](https://northerntransmissions.com/suki-waterhouse-memoir-of-a-sparklemuffin/) On stage she is polished and a little theatrical, a stylish, self-aware presence rooted in her modelling years, and the sets move between dreamy and kinetic.[\[4\]](https://dailybruin.com/2026/07/24/suki-waterhouses-cheeky-loveland-tour-enchants-the-hollywood-forever-cemetery)[\[6\]](https://shadestudios.com/music/f/hinterland-day-4-suki-waterhouse-and-geese-impress)

**Sources**

1. https://en.wikipedia.org/wiki/Suki_Waterhouse
2. https://en.wikipedia.org/wiki/Good_Looking_(song)
3. https://northerntransmissions.com/suki-waterhouse-memoir-of-a-sparklemuffin/
4. https://dailybruin.com/2026/07/24/suki-waterhouses-cheeky-loveland-tour-enchants-the-hollywood-forever-cemetery
5. https://www.clashmusic.com/live/live-report-lollapalooza-2026/
6. https://shadestudios.com/music/f/hinterland-day-4-suki-waterhouse-and-geese-impress

## temper-city

Temper City is a Los Angeles trio of Israeli musicians: singer Eytan Peled with Chen Kordova on guitar and Aviv Barenholtz on drums, the last two also the production duo Sync, who have worked together since they were twelve and produced for Israeli stars Noa Kirel and Netta Barzilai.[\[1\]](https://en.wikipedia.org/wiki/Self_Aware)[\[3\]](https://music.apple.com/us/artist/temper-city/1872869285) They formed in 2021 and put out early tracks like 'Why So Serious' and 'Where We Are' through NoCopyrightSounds.[\[1\]](https://en.wikipedia.org/wiki/Self_Aware)[\[2\]](https://en.wikipedia.org/wiki/Temper_City) Their debut single 'Self Aware' (February 2026), on Thirty Knots, is dark, rhythmic alt-rock in the lineage of Cage the Elephant and the Neighbourhood; it reached number 35 on the Billboard Hot 100, which the band says makes them the first Israeli band to chart there.[\[1\]](https://en.wikipedia.org/wiki/Self_Aware)[\[3\]](https://music.apple.com/us/artist/temper-city/1872869285) The single 'Reverse Psychology' followed later in 2026.[\[1\]](https://en.wikipedia.org/wiki/Self_Aware)[\[3\]](https://music.apple.com/us/artist/temper-city/1872869285)

**Sources**

1. https://en.wikipedia.org/wiki/Self_Aware
2. https://en.wikipedia.org/wiki/Temper_City
3. https://music.apple.com/us/artist/temper-city/1872869285

## sunday-1994

Sunday (1994) is a transatlantic band built around Paige Turner, who is based in Los Angeles, and Lee Newell, from Slough in England, with a third member who performs only as X.[\[2\]](https://www.rollingstone.co.uk/music/sunday-1994-play-next-interview-43974/)[\[3\]](https://atwoodmagazine.com/sdtvc-sunday-1994-band-music-interview-tv-car-chase-2024/) Turner and Newell met in 2014 writing songs for other artists and for advertisements, and Newell had earlier fronted the indie band Viva Brother.[\[1\]](<https://en.wikipedia.org/wiki/Sunday_(1994)>)[\[2\]](https://www.rollingstone.co.uk/music/sunday-1994-play-next-interview-43974/) They began releasing their own music as Sunday (1994) in 2024, led by 'Tired Boy', the first song Turner learned to play on guitar.[\[2\]](https://www.rollingstone.co.uk/music/sunday-1994-play-next-interview-43974/) The six-track EP 'Sunday (1994)' followed in May 2024 on Arista and RCA, trailed later that year by a deluxe edition fronted by 'TV Car Chase', and a second EP, 'Devotion', arrived in May 2025.[\[1\]](<https://en.wikipedia.org/wiki/Sunday_(1994)>)[\[3\]](https://atwoodmagazine.com/sdtvc-sunday-1994-band-music-interview-tv-car-chase-2024/) Their music runs distorted guitars and shoegaze textures under a cinematic sense of longing, in the lineage of Mazzy Star and Alvvays.[\[3\]](https://atwoodmagazine.com/sdtvc-sunday-1994-band-music-interview-tv-car-chase-2024/)[\[4\]](https://vein.es/tour-diaries-dreamscapes-paige-turner-of-sunday-1994-on-a-breakout-year/) They write and film on physical media rather than digital because, as Newell puts it, they want it to be tangible and real.[\[2\]](https://www.rollingstone.co.uk/music/sunday-1994-play-next-interview-43974/)[\[3\]](https://atwoodmagazine.com/sdtvc-sunday-1994-band-music-interview-tv-car-chase-2024/) Clips posted to TikTok built a following fast enough that the band has sold out shows on both sides of the Atlantic and toured Europe opening for The Last Dinner Party.[\[2\]](https://www.rollingstone.co.uk/music/sunday-1994-play-next-interview-43974/)[\[3\]](https://atwoodmagazine.com/sdtvc-sunday-1994-band-music-interview-tv-car-chase-2024/)[\[4\]](https://vein.es/tour-diaries-dreamscapes-paige-turner-of-sunday-1994-on-a-breakout-year/)

**Sources**

1. https://en.wikipedia.org/wiki/Sunday_(1994)
2. https://www.rollingstone.co.uk/music/sunday-1994-play-next-interview-43974/
3. https://atwoodmagazine.com/sdtvc-sunday-1994-band-music-interview-tv-car-chase-2024/
4. https://vein.es/tour-diaries-dreamscapes-paige-turner-of-sunday-1994-on-a-breakout-year/

## the-4411

The 4411 is an Austin band of Cogan McBride (vocals), Tomas Gerlach (drums), Alan Holmquist (guitar) and Nick Speer (bass).[\[2\]](https://www.austinchronicle.com/music/record-reviews/the-4411-chase-the-feeling-of-a-never-ending-summer/) McBride and Gerlach, lifelong friends, started it during the pandemic while still in high school, and rounded out the lineup as roommates at Texas State University.[\[1\]](https://theduckclub.com/artist/the-4411/)[\[4\]](https://ktswblog.net/2025/02/24/the-4411-talks-success-and-touring/) Their folk-leaning indie rock, with sweeping arrangements and story-driven lyrics, has drawn comparisons to the Paper Kites.[\[1\]](https://theduckclub.com/artist/the-4411/)[\[2\]](https://www.austinchronicle.com/music/record-reviews/the-4411-chase-the-feeling-of-a-never-ending-summer/) The single 'As You Please' (2023) led to their first tour and shaped the debut EP 'We Killed the Sun' (2025);[\[1\]](https://theduckclub.com/artist/the-4411/)[\[3\]](https://the4411.bandcamp.com/) a second EP, 'Haven't Seen You in So Long' (2026), carries 'Sunset Calling' and 'In Due Time'.[\[2\]](https://www.austinchronicle.com/music/record-reviews/the-4411-chase-the-feeling-of-a-never-ending-summer/)

**Sources**

1. https://theduckclub.com/artist/the-4411/
2. https://www.austinchronicle.com/music/record-reviews/the-4411-chase-the-feeling-of-a-never-ending-summer/
3. https://the4411.bandcamp.com/
4. https://ktswblog.net/2025/02/24/the-4411-talks-success-and-touring/

## the-chainsmokers

The Chainsmokers are Alex Pall and Drew Taggart, an electronic pop duo who formed in New York in 2012 after their manager introduced them.[\[1\]](https://en.wikipedia.org/wiki/The_Chainsmokers)[\[2\]](https://stereogum.com/2283569/the-number-ones-the-chainsmokers-closer-feat-halsey/columns/the-number-ones) Taggart had grown up in Maine and interned at a record label while at Syracuse, and Pall was DJing around the city.[\[2\]](https://stereogum.com/2283569/the-number-ones-the-chainsmokers-closer-feat-halsey/columns/the-number-ones) Their first attention came from the 2014 novelty single '#Selfie', which reached number 16, and 'Roses' gave them a first top ten hit in 2016.[\[2\]](https://stereogum.com/2283569/the-number-ones-the-chainsmokers-closer-feat-halsey/columns/the-number-ones) 'Closer', with Halsey, followed it to number one on the Billboard Hot 100 and held there for twelve weeks.[\[2\]](https://stereogum.com/2283569/the-number-ones-the-chainsmokers-closer-feat-halsey/columns/the-number-ones) 'Don't Let Me Down', with Daya, won the 2017 Grammy for Best Dance Recording, and 'Something Just Like This', with Coldplay, was nominated the following year.[\[2\]](https://stereogum.com/2283569/the-number-ones-the-chainsmokers-closer-feat-halsey/columns/the-number-ones)[\[3\]](https://www.grammy.com/artists/chainsmokers/20109/) Their debut album 'Memories...Do Not Open' entered the Billboard 200 at number one in 2017.[\[1\]](https://en.wikipedia.org/wiki/The_Chainsmokers) They have kept up a steady output since, through the albums 'So Far So Good' and 'Summertime Friends' and the 2024 EP 'No Hard Feelings', and Taggart said in a 2023 interview that the duo still feels like it is 'just getting started'.[\[1\]](https://en.wikipedia.org/wiki/The_Chainsmokers)[\[4\]](https://dancingastronaut.com/2023/01/the-chainsmokers-get-candid-on-call-her-daddy-guest-interview-theres-a-lot-of-things-we-regret-doing/)

**Sources**

1. https://en.wikipedia.org/wiki/The_Chainsmokers
2. https://stereogum.com/2283569/the-number-ones-the-chainsmokers-closer-feat-halsey/columns/the-number-ones
3. https://www.grammy.com/artists/chainsmokers/20109/
4. https://dancingastronaut.com/2023/01/the-chainsmokers-get-candid-on-call-her-daddy-guest-interview-theres-a-lot-of-things-we-regret-doing/

## the-moriah-sisters

The Moriah Sisters are an Austin gospel group built around the sisters Janice Lee and Cynthia Reliford, who sing with fellow members of Greater Mount Moriah Primitive Baptist Church, where the group formed in the mid-1990s.[\[3\]](https://thedailytexan.com/2023/10/03/austin-gospel-quartet-the-moriah-sisters-on-acl-empowering-people-to-love/) Their sound mixes contemporary gospel with the older quartet-gospel style, backed by Jonathan Davis on piano and organ and Lee's son Calvin Shepard Jr. on drums.[\[1\]](https://www.fox7austin.com/news/fox-7-unplugged-the-moriah-sisters)[\[3\]](https://thedailytexan.com/2023/10/03/austin-gospel-quartet-the-moriah-sisters-on-acl-empowering-people-to-love/) They are a monthly staple of the gospel brunch at Stubb's Bar-B-Q, alternating with other gospel acts, have taken part in the American Artists Project alongside the soprano Mela Sarajane Dailey, and turn up on FOX 7 Austin for the holidays.[\[1\]](https://www.fox7austin.com/news/fox-7-unplugged-the-moriah-sisters)[\[3\]](https://thedailytexan.com/2023/10/03/austin-gospel-quartet-the-moriah-sisters-on-acl-empowering-people-to-love/) Their albums are 'Walk by Faith / At the Gate' (2011) and 'We Come a Long Way' (2017), and they made their ACL debut in 2023.[\[2\]](https://music.apple.com/us/artist/the-moriah-sisters/1266062300)[\[3\]](https://thedailytexan.com/2023/10/03/austin-gospel-quartet-the-moriah-sisters-on-acl-empowering-people-to-love/)

**Sources**

1. https://www.fox7austin.com/news/fox-7-unplugged-the-moriah-sisters
2. https://music.apple.com/us/artist/the-moriah-sisters/1266062300
3. https://thedailytexan.com/2023/10/03/austin-gospel-quartet-the-moriah-sisters-on-acl-empowering-people-to-love/

## the-war-on-drugs

The War on Drugs formed in Philadelphia in 2005 around Adam Granduciel and Kurt Vile, who left after the debut 'Wagonwheel Blues' (2008) for his solo career, leaving Granduciel the constant member and the one who builds most of the records himself.[\[1\]](<https://en.wikipedia.org/wiki/The_War_on_Drugs_(band)>)[\[2\]](https://music.apple.com/us/artist/the-war-on-drugs/282078681) Their yearning, wall-of-sound rock runs Springsteen and Dylan through krautrock and ambient texture.[\[2\]](https://music.apple.com/us/artist/the-war-on-drugs/282078681) 'Slave Ambient' (2011) and 'Lost in the Dream' (2014) came out on Secretly Canadian, with 'Red Eyes' and 'Under the Pressure' among the signature songs.[\[1\]](<https://en.wikipedia.org/wiki/The_War_on_Drugs_(band)>)[\[2\]](https://music.apple.com/us/artist/the-war-on-drugs/282078681) The move to Atlantic brought 'A Deeper Understanding' (2017), which won Best Rock Album at the 2018 Grammys, and 'I Don't Live Here Anymore' (2021), and 'Harmonia's Dream' was nominated for Best Rock Song in 2023.[\[1\]](<https://en.wikipedia.org/wiki/The_War_on_Drugs_(band)>) After the 2024 live album 'Live Drugs Again', the single 'Who's That' arrived in September 2026, written at Granduciel's Southern California studio as a song about self-doubt, anxiety and depression and billed as the band's first new studio recording in four years, with a mostly self-recorded sixth album close behind.[\[2\]](https://music.apple.com/us/artist/the-war-on-drugs/282078681)[\[3\]](https://consequence.net/2026/09/the-war-on-drugs-whos-that-new-song/)

**Sources**

1. https://en.wikipedia.org/wiki/The_War_on_Drugs_(band)
2. https://music.apple.com/us/artist/the-war-on-drugs/282078681
3. https://consequence.net/2026/09/the-war-on-drugs-whos-that-new-song/

## the-xx

The xx formed in 2005 at a school in south London, where Romy Madley Croft, Oliver Sim and Jamie Smith, later known as Jamie xx, had been friends since childhood.[\[1\]](https://en.wikipedia.org/wiki/The_xx)[\[3\]](https://www.anothermanmag.com/library/9914/oliver-sim) Their self-titled debut arrived in 2009 on Young Turks and won the 2010 Mercury Prize, a record built on space and restraint, with Madley Croft and Sim's voices circling each other over Smith's spare electronics.[\[1\]](https://en.wikipedia.org/wiki/The_xx)[\[3\]](https://www.anothermanmag.com/library/9914/oliver-sim) 'Coexist' followed in 2012 and reached number one in the UK, as did 'I See You' in 2017, which the band recorded across New York, Marfa, Reykjavik, Los Angeles and London and led with the single 'On Hold'.[\[1\]](https://en.wikipedia.org/wiki/The_xx)[\[2\]](https://www.timeout.com/london/blog/london-trio-the-xx-announce-new-album-i-see-you-111016) Between xx records each member released solo work, Jamie xx's 'In Colour' in 2015 and then Sim's 'Hideous Bastard' and Madley Croft's 'Mid Air', and the band has credited the success of 'In Colour' with renewing its confidence.[\[1\]](https://en.wikipedia.org/wiki/The_xx)[\[3\]](https://www.anothermanmag.com/library/9914/oliver-sim) They reconvened for Jamie xx's 2024 Glastonbury set and a 2025 festival appearance, then played their first full show together in eight years in 2026, with a fourth album in development.[\[1\]](https://en.wikipedia.org/wiki/The_xx)

**Sources**

1. https://en.wikipedia.org/wiki/The_xx
2. https://www.timeout.com/london/blog/london-trio-the-xx-announce-new-album-i-see-you-111016
3. https://www.anothermanmag.com/library/9914/oliver-sim

## thomas-day

Thomas Day is a pop singer-songwriter from Brentwood, Tennessee, near Nashville, who started in musical theater at nine and was a field-goal kicker good enough for college scholarship offers before he chose music.[\[1\]](https://www.nashville.com/thomas-day-announces-full-length-project-out-october-27th/)[\[3\]](https://www.maxpreps.com/news/24F-bXi60UyTszJbUS0UtA/tennessee-high-school-football-kicker-thomas-day-advances-on-americas-got-talent.htm) He auditioned for America's Got Talent in 2020 with Finneas's 'Break My Heart Again', and built a following with TikTok covers of Adele, Bruno Mars, Lewis Capaldi and Sam Smith.[\[2\]](https://music.apple.com/us/artist/thomas-day/1576542827)[\[3\]](https://www.maxpreps.com/news/24F-bXi60UyTszJbUS0UtA/tennessee-high-school-football-kicker-thomas-day-advances-on-americas-got-talent.htm) He signed to Arista in 2021 and put out the album 'Love Me for Another Day' (2023), songs he has said he 'wrote and recorded when I was 18 and 19, trying to figure out the kind of artist I want to be', followed by the EPs 'Angel Boy' (2024) and 'kids' (2025).[\[1\]](https://www.nashville.com/thomas-day-announces-full-length-project-out-october-27th/)[\[2\]](https://music.apple.com/us/artist/thomas-day/1576542827) His earnest pop is about the ups and downs of young adulthood, and he has toured Europe and the US opening for Joshua Bassett.[\[2\]](https://music.apple.com/us/artist/thomas-day/1576542827)[\[4\]](https://www.broadwayworld.com/bwwmusic/article/Thomas-Day-Releases-Angel-Boy-EP-20240913)

**Sources**

1. https://www.nashville.com/thomas-day-announces-full-length-project-out-october-27th/
2. https://music.apple.com/us/artist/thomas-day/1576542827
3. https://www.maxpreps.com/news/24F-bXi60UyTszJbUS0UtA/tennessee-high-school-football-kicker-thomas-day-advances-on-americas-got-talent.htm
4. https://www.broadwayworld.com/bwwmusic/article/Thomas-Day-Releases-Angel-Boy-EP-20240913

## turnstile

Turnstile formed in Baltimore in 2010 out of the city's hardcore scene, with Brendan Yates moving from behind the drums to the front as a singer who had never sung before.[\[1\]](<https://en.wikipedia.org/wiki/Turnstile_(band)>)[\[2\]](https://www.blackbirdspyplane.com/p/turnstile-interview-brendan-yates-never-enough-2025) The band, now Yates, Franz Lyons, Daniel Fang, Pat McCrory and Meg Mills, released 'Nonstop Feeling' in 2015 and 'Time & Space' in 2018 before 'Glow On' in 2021 pushed their mix of hardcore, alternative rock and pop hooks onto the Billboard 200 and earned three Grammy nominations.[\[1\]](<https://en.wikipedia.org/wiki/Turnstile_(band)>) 'Never Enough' followed in June 2025 on Roadrunner, reaching number nine on the Billboard 200 and the top ten in five countries, with guest turns from Hayley Williams, Faye Webster, Shabaka Hutchings and Dev Hynes and production from A.G. Cook.[\[1\]](<https://en.wikipedia.org/wiki/Turnstile_(band)>)[\[2\]](https://www.blackbirdspyplane.com/p/turnstile-interview-brendan-yates-never-enough-2025) At the 2026 Grammy Awards the band won Best Rock Album and Best Metal Performance, from five nominations that made them the first act nominated in the rock, alternative and metal fields in the same year.[\[1\]](<https://en.wikipedia.org/wiki/Turnstile_(band)>) Brendan Yates co-directed a fifty-minute film to accompany 'Never Enough'.[\[2\]](https://www.blackbirdspyplane.com/p/turnstile-interview-brendan-yates-never-enough-2025) Turnstile has toured arenas with My Chemical Romance and Blink-182 while keeping the physical, communal feel of a hardcore show.[\[1\]](<https://en.wikipedia.org/wiki/Turnstile_(band)>)[\[2\]](https://www.blackbirdspyplane.com/p/turnstile-interview-brendan-yates-never-enough-2025)

**Sources**

1. https://en.wikipedia.org/wiki/Turnstile_(band)
2. https://www.blackbirdspyplane.com/p/turnstile-interview-brendan-yates-never-enough-2025

## twenty-one-pilots

Tyler Joseph and Josh Dun formed twenty one pilots in their hometown of Columbus, Ohio, in 2009.[\[1\]](https://en.wikipedia.org/wiki/Twenty_One_Pilots) Joseph has described their mix of rap, rock and electropop as what critics call 'schizoid pop.'[\[2\]](https://www.gulf-times.com/story/475491/twenty-one-pilots-and-the-duos-schizoid-pop) 'Car Radio' grew out of a real theft: after Joseph left his car unlocked one day, running late for class, thieves took the radio, GPS and CDs he couldn't afford to replace, and he wrote about what it meant to lose the noise that had been keeping his own thoughts at bay.[\[3\]](https://www.songfacts.com/facts/twenty-one-pilots/car-radio) 'Blurryface' (2015) went six-times platinum behind the top-five hits 'Stressed Out' and 'Ride', and 'Stressed Out' won Best Pop Duo/Group Performance at the 2017 Grammys, which the two accepted in their underwear on a pact made while watching an earlier ceremony together.[\[4\]](https://en.wikipedia.org/wiki/Blurryface)[\[5\]](https://www.grammy.com/video/twenty-one-pilots-2017-grammys-win-underwear-acceptance-speech/)[\[6\]](https://www.eonline.com/news/828800/twenty-one-pilots-goes-pantsless-to-accept-the-award-for-best-pop-duo-group-performance-at-the-2017-grammys) 'Heathens', written to sound like a Suicide Squad recruit warning how dangerous the team really is, led the film's 2016 soundtrack and matched 'Stressed Out' as their highest Hot 100 peak, at number two.[\[7\]](<https://en.wikipedia.org/wiki/Heathens_(Twenty_One_Pilots_song)>) 'Blurryface', 'Trench' (2018), 'Scaled and Icy' (2021) and 'Clancy' (2024) all connect to one story set in a fictional city, Dema, which the 2025 album 'Breach' brought to a close.[\[1\]](https://en.wikipedia.org/wiki/Twenty_One_Pilots)[\[8\]](<https://en.wikipedia.org/wiki/Breach_(Twenty_One_Pilots_album)>)

**Sources**

1. https://en.wikipedia.org/wiki/Twenty_One_Pilots
2. https://www.gulf-times.com/story/475491/twenty-one-pilots-and-the-duos-schizoid-pop
3. https://www.songfacts.com/facts/twenty-one-pilots/car-radio
4. https://en.wikipedia.org/wiki/Blurryface
5. https://www.grammy.com/video/twenty-one-pilots-2017-grammys-win-underwear-acceptance-speech/
6. https://www.eonline.com/news/828800/twenty-one-pilots-goes-pantsless-to-accept-the-award-for-best-pop-duo-group-performance-at-the-2017-grammys
7. https://en.wikipedia.org/wiki/Heathens_(Twenty_One_Pilots_song)
8. https://en.wikipedia.org/wiki/Breach_(Twenty_One_Pilots_album)

## underscores

Underscores is April Harper Grey, a musician and producer born in San Francisco in 2000 who studied music at NYU and now lives in Chicago.[\[1\]](<https://en.wikipedia.org/wiki/Underscores_(musician)>) She started out posting dubstep to SoundCloud as a teenager and built the underscores project around constant reinvention and detailed sound design, pulling emo, pop-punk, folk and dubstep into what began as hyperpop; by 2023 she was telling NME that 'hyperpop is officially dead'.[\[1\]](<https://en.wikipedia.org/wiki/Underscores_(musician)>) The debut album 'Fishmonger' (2021) led to a support slot with 100 gecs.[\[1\]](<https://en.wikipedia.org/wiki/Underscores_(musician)>) 'Wallsocket' (2023), on Mom + Pop, is a concept album set in an invented Michigan town, following three young women through questions of class, suburbia and trans identity.[\[1\]](<https://en.wikipedia.org/wiki/Underscores_(musician)>)[\[2\]](https://en.wikipedia.org/wiki/Wallsocket) She featured on Danny Brown's 'Copycats' in 2025, released her third album 'U' in 2026, and has opened for Porter Robinson and Charli XCX.[\[1\]](<https://en.wikipedia.org/wiki/Underscores_(musician)>)[\[3\]](<https://en.wikipedia.org/wiki/Copycats_(song)>)

**Sources**

1. https://en.wikipedia.org/wiki/Underscores_(musician)
2. https://en.wikipedia.org/wiki/Wallsocket
3. https://en.wikipedia.org/wiki/Copycats_(song)

## villanelle

Villanelle is a London trio of Gene Gallagher, Ben Taylor and Jack Schiavo, who met by chance in the summer of 2023.[\[1\]](https://www.nme.com/features/music-interviews/villanelle-interview-gene-gallagher-measly-means-ep-radar-3943577) Gallagher is the son of Liam Gallagher, and the band played its first shows opening the 2024 'Definitely Maybe' anniversary tour at his invitation.[\[1\]](https://www.nme.com/features/music-interviews/villanelle-interview-gene-gallagher-measly-means-ep-radar-3943577) Their music leans on 1990s grunge and alternative rock, with the heavy riffs of Smashing Pumpkins and Black Sabbath in the background and an early single, 'Hinge', that NME called Nirvana-indebted.[\[1\]](https://www.nme.com/features/music-interviews/villanelle-interview-gene-gallagher-measly-means-ep-radar-3943577) The debut EP 'Measly Means' arrived in May 2026 with five tracks, among them 'Placebo', 'Hinge' and 'Opportunity Arising', which Gallagher describes as a softer turn away from the band's usual heavy riffs.[\[2\]](https://readdork.com/news/villanelle-measly-means-ep-release) Its first vinyl run sold out on pre-order, and another thousand copies were pressed for independent shops in the UK and North America.[\[2\]](https://readdork.com/news/villanelle-measly-means-ep-release) NME placed the band on its NME 100 list of new artists, and they have toured with Miles Kane, headlined The Lexington in London, and taken a 'Punchbag' tour around university venues.[\[1\]](https://www.nme.com/features/music-interviews/villanelle-interview-gene-gallagher-measly-means-ep-radar-3943577)

**Sources**

1. https://www.nme.com/features/music-interviews/villanelle-interview-gene-gallagher-measly-means-ep-radar-3943577
2. https://readdork.com/news/villanelle-measly-means-ep-release

## vwillz

Vwillz, born Victor Williams, is an independent singer, rapper and producer from Colorado Springs, now based in Nashville, who built his audience himself without a label.[\[1\]](https://first-avenue.com/performer/vwillz/)[\[3\]](https://music.apple.com/us/album/york/1815508320)[\[4\]](https://www.westword.com/music/vwillz-on-before-the-storm-day-11736837/) He picked up guitar as a kid after hearing a cousin play Green Day's 'Good Riddance (Time of Your Life)' at a family gathering, and has said pursuing music was 'unstated but a foregone conclusion'.[\[4\]](https://www.westword.com/music/vwillz-on-before-the-storm-day-11736837/) He broke out in 2020 with 'Emo Rhapsody', a self-produced track that sets a piano ballad against trap drums and borrows the hook cadence of Queen's 'Bohemian Rhapsody' to address his mother about his regrets, pitched to anyone who feels they do not fit.[\[2\]](https://blog.lyricallemonade.com/p/emo-rhapsody-vwillz/)[\[4\]](https://www.westword.com/music/vwillz-on-before-the-storm-day-11736837/) His sound since has widened from emo rap into a blend of hip-hop, pop, alternative rock, folk and country, going for what his booking bio calls a 'late-night-drive atmosphere' of introspective ballads and big hooks.[\[1\]](https://first-avenue.com/performer/vwillz/) The self-released album 'York' (June 2025) runs nine songs in about nineteen minutes, and other tracks in rotation include 'Falling Slowly', 'Sundown' and 'Darkside'.[\[1\]](https://first-avenue.com/performer/vwillz/)[\[3\]](https://music.apple.com/us/album/york/1815508320)

**Sources**

1. https://first-avenue.com/performer/vwillz/
2. https://blog.lyricallemonade.com/p/emo-rhapsody-vwillz/
3. https://music.apple.com/us/album/york/1815508320
4. https://www.westword.com/music/vwillz-on-before-the-storm-day-11736837/

## world-famous-pets

World Famous Pets is a band of four: singer Edie Brickell of Edie Brickell & New Bohemians, drummer and producer Matt Chamberlain, bassist Kaveh Rastegar and guitarist Mason Stoops.[\[1\]](https://stereogum.com/2503846/edie-brickell-matt-chamberlain-kaveh-rastegar-mason-stoops-announce-debut-album-as-world-famous-pets/music)[\[2\]](https://relix.com/news/detail/world-famous-pets-edie-brickell-matt-chamberlain-kaveh-rastegar-and-mason-stoops-share-new-song-and-tour-info) Brickell and Chamberlain first recorded together more than 35 years ago on New Bohemians' 'Ghost of a Dog', and the project started when the two found themselves touring together again on Paul Simon's 'A Quiet Celebration' run and Chamberlain suggested bringing Rastegar and Stoops into the studio for six days just to play.[\[1\]](https://stereogum.com/2503846/edie-brickell-matt-chamberlain-kaveh-rastegar-mason-stoops-announce-debut-album-as-world-famous-pets/music)[\[2\]](https://relix.com/news/detail/world-famous-pets-edie-brickell-matt-chamberlain-kaveh-rastegar-and-mason-stoops-share-new-song-and-tour-info) What came out is loose and improvised: Brickell describes four 'monster players who improvise in song form', moving 'like a river of music, not knowing what's around the bend'.[\[2\]](https://relix.com/news/detail/world-famous-pets-edie-brickell-matt-chamberlain-kaveh-rastegar-and-mason-stoops-share-new-song-and-tour-info) The self-titled debut, folk-pop with room to wander, is due 25 September 2026 on Shuffle Records, trailed by the singles 'Maybe Somehow' and 'I Guess It's You', with the same follow-the-music approach carried to the stage.[\[1\]](https://stereogum.com/2503846/edie-brickell-matt-chamberlain-kaveh-rastegar-mason-stoops-announce-debut-album-as-world-famous-pets/music)[\[2\]](https://relix.com/news/detail/world-famous-pets-edie-brickell-matt-chamberlain-kaveh-rastegar-and-mason-stoops-share-new-song-and-tour-info)

**Sources**

1. https://stereogum.com/2503846/edie-brickell-matt-chamberlain-kaveh-rastegar-mason-stoops-announce-debut-album-as-world-famous-pets/music
2. https://relix.com/news/detail/world-famous-pets-edie-brickell-matt-chamberlain-kaveh-rastegar-and-mason-stoops-share-new-song-and-tour-info

## young-miko

María Victoria Ramírez de Arellano grew up in Añasco, on the west side of Puerto Rico, and studied drawing at university before turning to tattooing and, eventually, music as Young Miko.[\[1\]](https://en.wikipedia.org/wiki/Young_Miko)[\[2\]](https://www.primerahora.com/entretenimiento/musica/notas/young-miko-del-futbol-al-genero-urbano/) She played soccer as a teenager and saved everything she earned as a tattoo artist to pay for her first-ever studio session.[\[1\]](https://en.wikipedia.org/wiki/Young_Miko)[\[2\]](https://www.primerahora.com/entretenimiento/musica/notas/young-miko-del-futbol-al-genero-urbano/) The 2022 EP 'Trap Kitty' established her as a rising force in Latin trap, and within a year she was opening shows for Karol G, appearing on Bad Bunny's 'Nadie sabe lo que va a pasar mañana' and Tainy's 'Data', and reaching the Billboard Hot 100 for the first time on a duet with Feid.[\[1\]](https://en.wikipedia.org/wiki/Young_Miko)[\[3\]](https://es.rollingstone.com/arg-future-of-music-young-miko/) The 2024 album 'Att.' earned a Grammy nomination for Best Música Urbana Album, and her Bizarrap session that same year reached number one in Spain and the top five across Latin America.[\[1\]](https://en.wikipedia.org/wiki/Young_Miko)[\[4\]](https://en.wikipedia.org/wiki/Young_Miko:_Bzrp_Music_Sessions,_Vol._58) 'Sometimes I feel the car is going too fast,' she has said of the pace of her rise, which took her from 10,000 Instagram followers to over 30 million monthly Spotify listeners in three years.[\[3\]](https://es.rollingstone.com/arg-future-of-music-young-miko/) Her second album, 'Do Not Disturb', followed in November 2025, with a deluxe edition the next year, and she has become known as one of the few openly queer women reshaping reggaetón and Latin trap toward greater inclusivity.[\[1\]](https://en.wikipedia.org/wiki/Young_Miko)[\[3\]](https://es.rollingstone.com/arg-future-of-music-young-miko/)

**Sources**

1. https://en.wikipedia.org/wiki/Young_Miko
2. https://www.primerahora.com/entretenimiento/musica/notas/young-miko-del-futbol-al-genero-urbano/
3. https://es.rollingstone.com/arg-future-of-music-young-miko/
4. https://en.wikipedia.org/wiki/Young_Miko:_Bzrp_Music_Sessions,_Vol._58

## yousuke-yukimatsu

Yousuke Yukimatsu, styled ¥ØU$UK€ ¥UK1MAT$U, was born in Osaka in 1979 and grew up on his father's classic rock before starting to DJ in 2008 at a friend's party.[\[1\]](https://en.wikipedia.org/wiki/Yousuke_Yukimatsu)[\[3\]](https://www.exitfest.org/en/yousuke-yukimatsu-sets-that-transcend-the-mind-speak-to-the-heart-and-are-remembered-forever) He came up through the 2010s Osaka and Kobe underground, and a 2014 set that impressed DJ Nobu led to a Future Terror booking in Tokyo that made his name; he has been based in the city since 2020.[\[1\]](https://en.wikipedia.org/wiki/Yousuke_Yukimatsu)[\[3\]](https://www.exitfest.org/en/yousuke-yukimatsu-sets-that-transcend-the-mind-speak-to-the-heart-and-are-remembered-forever)[\[4\]](https://astralpeople.com/tours/yousuke-yukimatsu) He founded the Zone Unknown party series, which has hosted Arca, Kamixlo and Palmistry, and he built a name for sets that never repeat and run from gabber and noise to trap, house and pop.[\[1\]](https://en.wikipedia.org/wiki/Yousuke_Yukimatsu)[\[3\]](https://www.exitfest.org/en/yousuke-yukimatsu-sets-that-transcend-the-mind-speak-to-the-heart-and-are-remembered-forever) Working construction at the time, he turned to DJing full time after being treated for a malignant brain tumor in 2016.[\[1\]](https://en.wikipedia.org/wiki/Yousuke_Yukimatsu)[\[2\]](https://midnightrebels.com/from-construction-worker-to-electronic-music-icon-yousuke-yukimatsus-rise/) An early-2025 Boiler Room set in Tokyo, played shirtless and drenched in sweat, passed twelve million views and made him one of the year's breakout DJs, with festival dates from Berlin Atonal to Coachella and Montreux following.[\[1\]](https://en.wikipedia.org/wiki/Yousuke_Yukimatsu)[\[2\]](https://midnightrebels.com/from-construction-worker-to-electronic-music-icon-yousuke-yukimatsus-rise/)

**Sources**

1. https://en.wikipedia.org/wiki/Yousuke_Yukimatsu
2. https://midnightrebels.com/from-construction-worker-to-electronic-music-icon-yousuke-yukimatsus-rise/
3. https://www.exitfest.org/en/yousuke-yukimatsu-sets-that-transcend-the-mind-speak-to-the-heart-and-are-remembered-forever
4. https://astralpeople.com/tours/yousuke-yukimatsu
