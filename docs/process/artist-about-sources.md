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

## bleachers

Bleachers started in 2013 in Bergenfield, New Jersey, as Jack Antonoff's own band.[\[1\]](<https://en.wikipedia.org/wiki/Bleachers_(band)>) Away from it, Antonoff is one of pop's most in-demand producers, with credits for Taylor Swift, Lana Del Rey, and Lorde and three straight Grammy wins for Producer of the Year from 2022 to 2024.[\[2\]](https://en.wikipedia.org/wiki/Jack_Antonoff) The band's four albums, from 'Strange Desire' (2014) to the self-titled 'Bleachers' (2024), lean on 1980s synthesizers, saxophone, and wide, anthemic arrangements.[\[1\]](<https://en.wikipedia.org/wiki/Bleachers_(band)>)[\[3\]](<https://en.wikipedia.org/wiki/Bleachers_(album)>) A fifth album, 'Everyone for Ten Minutes', arrived in May 2026 on Dirty Hit.[\[4\]](https://en.wikipedia.org/wiki/Everyone_for_Ten_Minutes)

**Sources**

1. https://en.wikipedia.org/wiki/Bleachers_(band)
2. https://en.wikipedia.org/wiki/Jack_Antonoff
3. https://en.wikipedia.org/wiki/Bleachers_(album)
4. https://en.wikipedia.org/wiki/Everyone_for_Ten_Minutes

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
