'use strict'

const db = require('../server/db')
const {Dinosaurs} = require('../server/db/models')
const {User} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const dinos = await Promise.all([
    Dinosaurs.create({
      name: 'Barney',
      price: 100,
      description:
        'Barney is a purple and green Tyrannosaurus in stuffed animal likeness, who comes to life through a child\'s imagination. His theme song is "Barney is a Dinosaur," whose tune is based on "Yankee Doodle". Barney often quotes things as being "Super dee-duper". Episodes frequently end with the song "I Love You", sung to the tune of "This Old Man", which happens to be one of Barney\'s favorite songs. Despite being a carnivorous type dinosaur, Barney likes many different foods such as fruits and vegetables, but his main favorite is a peanut butter and jelly sandwich with a glass of milk. He also loves marching bands and parades. He also has a slight northeastern accent.',
      imageUrl:
        'https://lh3.googleusercontent.com/GJW5UjCfgVWlp5uM2YQ_fBZVaG2x5oP45l_JmcjNQ0Xu7rXaWmibwJmDLuve3RSj6ofGBTBI0_8rXfLReoA'
    }),
    Dinosaurs.create({
      name: 'B.J.',
      price: 50,
      description:
        'B.J. is a seven-year-old yellow Protoceratops, B.J. has been on the show since September 27, 1993. He is the older brother of Baby Bop, whom he frequently calls "Sissy", but calls her by her name on rare occasions. He sings the song "B.J.\'s Song" about himself. He wears a red baseball cap and red sneakers. He lost his hat in the episode "Hats Off to B.J.!", and sometimes says things to hide his fears (for example, in the episode "Barney\'s Halloween Party", he was shocked by the paper spiders and after learning they were fake, he said "I knew that, sort of"). Pickles are his favorite food and he has tried them in various ways, such as on pizza.',
      imageUrl:
        'https://pbs.twimg.com/profile_images/696076242626306048/asVlVqoB_400x400.jpg'
    }),
    Dinosaurs.create({
      name: 'Velociraptor',
      price: 400000,
      description: "Velociraptor (/vɪˈlɒsɪræptər/; meaning 'swift seizer' in Latin) is a genus of dromaeosaurid theropod dinosaur that lived approximately 75 to 71 million years ago during the later part of the Cretaceous Period. Two species are currently recognized, although others have been assigned in the past. The type species is V. mongoliensis; fossils of this species have been discovered in Mongolia. A second species, V. osmolskae, was named in 2008 for skull material from Inner Mongolia, China.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Velociraptor_Restoration.png/220px-Velociraptor_Restoration.png",
      expirationDate: new Date(Date.now() + 120000)
    }),
    Dinosaurs.create({
      name: 'Baby Bop',
      price: 50,
      description:
        'Baby Bop is a green Triceratops, who was originally two years old, but turned three in "Look at Me, I\'m 3!". Baby Bop has been on the show since July 29, 1991. She made her debut in the video "Barney in Concert". She wears a pink bow and pink ballet slippers, and carries a yellow security blanket. She sings the song "My Yellow Blankey" to show how much her security blanket means to her. She likes to eat macaroni and cheese and pizza. She is the younger sister of B.J..',
      imageUrl:
        'https://vignette.wikia.nocookie.net/universalstudios/images/e/e7/Baby_Bop_Sprite_HD.png/revision/latest?cb=20170421214542'
    }),
    Dinosaurs.create({
      name: 'Yoshi',
      price: 250,
      description:
        'Yoshi, once romanized as Yossy, is a fictional anthropomorphic dinosaur who appears in video games published by Nintendo. Yoshi debuted in Super Mario World on the Super Nintendo Entertainment System as Mario and Luigi\'s sidekick.',
      imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/3/39/YoshiMarioParty9.png/175px-YoshiMarioParty9.png'
    }),
    Dinosaurs.create({
      name: 'Birdo',
      price: 250,
      description:
        'Birdo, known in Japan as Catherine, is a fictional character in the Mario franchise. Her first appearance was as an enemy in Yume Kōjō: Doki Doki Panic, which was localized for English-language audiences as Super Mario Bros. 2.',
      imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Birdo-MP9.png/220px-Birdo-MP9.png'
    }),
    Dinosaurs.create({
      name: 'Dry Bones',
      price: 450,
      description:
      'Dry Bones (also known as Skeleton Koopas) are skeletal versions of Koopa Troopas mainly found in towers and castles. These undead Koopas often collapse when attacked, but they soon revive themselves and become normal once again (however there are some methods to permanently defeat them). Dry Bones first appeared in Super Mario Bros. 3, in which sprites of them are edited Koopa Troopa sprites. They have since become a staple in Mario spin-off games. Dry Bones is ordinarily a lightweight character in games and is often accompanied by Boo. The Dry Bones emblem in spin-offs is a side-view of their heads.',
      imageUrl:
      'https://www.mariowiki.com/images/thumb/3/33/MPSR_Dry_Bones.png/479px-MPSR_Dry_Bones.png'
    }),
    Dinosaurs.create({
      name: 'Bowser',
      price: 450,
      description:
      'Bowser, sometimes known as King Koopa (Japanese: 大魔王クッパ, Daimaō Kuppa, which translates into "Great Demon King Koopa" or "Great Sorcerer King Koopa", the latter being used in the manual of Super Mario Bros.), is a major character and the main antagonist of the Mario franchise. Bowser is a large, powerful, fire-breathing Koopa who leads the Koopa Troop, an antagonistic organization of turtle-like creatures, and has been the archenemy of the Mario Bros. since his debut in Super Mario Bros. He has repeatedly kidnapped or attempted to kidnap Princess Peach with the ultimate goal of defeating Mario and taking over the Mushroom Kingdom.',
      imageUrl:
      'https://www.mariowiki.com/images/thumb/7/7e/Bowser_-_Mario_Party_10.png/548px-Bowser_-_Mario_Party_10.png'
    }),
    Dinosaurs.create({
      name: 'Rex',
      price: 650,
      description:
      'Rex is a legendary costume for the Fortnite: Battle Royale game.',
      imageUrl:
      'https://progameguides.com/wp-content/uploads/2017/12/fortnite-outfit-rex.jpg'
    }),
    Dinosaurs.create({
      name: 'Meme Dinosaur',
      price: 1000,
      description:
      'A common sight (and meme) at parties',
      imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71P5XCU88CL._UX385_.jpg'
    }),
    Dinosaurs.create({
      name: 'Godzilla',
      price: 100000,
      description:
      'Godzilla (Japanese: ゴジラ Hepburn: Gojira) (/ɡɒdˈzɪlə/; [ɡoꜜdʑiɾa]) is a monster originating from a series of tokusatsu films of the same name from Japan. The character first appeared in Ishirō Honda\'s 1954 film Godzilla and become a worldwide pop culture icon, appearing in media including 29 films produced by Toho, three Hollywood films, and numerous video games, novels, comic books, television shows. It is often dubbed the "King of the Monsters", a phrase first used in Godzilla, King of the Monsters!, the Americanized version of the original film.',
      imageUrl:
      'https://vignette.wikia.nocookie.net/monster/images/8/8d/Godzilla_2014_RoomMates_Godzilla_Peel_and_Stick_Giant_Wall_Decals.jpg/revision/latest?cb=20160114191906'
    }),
    Dinosaurs.create({
      name: 'Spike',
      price: 1500,
      description:
      'Spike (a.k.a. Gentle Giant Spike, as he is called on the official site, and referred to as by fans) is the tritagonist in The Land Before Time and a major character in the Land Before Time sequels and television series. He is a Stegosaurus,[3] which is referred to as a "Spiketail" in the films and TV series. He is most well known for his laconic behavior; only having uttered a couple of words throughout the series\' run, and for his large appetite.',
      imageUrl:
      'https://vignette.wikia.nocookie.net/landbeforetime/images/9/96/Spike_infobox.png/revision/latest?cb=20180422005006'
    }),
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${dinos.length} dinosaurs`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
