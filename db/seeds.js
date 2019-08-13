const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const { dbURI } = require('../config/environment')

// require the models
const User = require('../models/user')
const Chat = require('../models/chat')
const Gem = require('../models/gem')

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true }, (err, db) => {
  if (err) console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          username: 'jennypham',
          email: 'jennypham@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Midu_-_Summer_2012_%28Explored_1_-_May_24th%29_cropped.jpg',
          lang: 'vi',
          text: 'I know places yeah.',
          userType: 'Local'
        },
        {
          username: 'johnnyuyen',
          email: 'johnnyuyen@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'http://raydarmedia.com/Content/cacheImages/img-55692-0.jpg',
          lang: 'vi',
          text: 'Fishing mogul hit me up.',
          userType: 'Local'
        },
        {
          username: 'jonnyho',
          email: 'jonnyho@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'https://pbs.twimg.com/media/CjU4ZSNUUAEZBOD.jpg',
          lang: 'vi',
          text: 'Reall awesome guy. Everyone loves me.',
          userType: 'Local'
        },
        {
          username: 'alicetran',
          email: 'alicetran@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'https://i.pinimg.com/originals/c6/8f/96/c68f96329dd7e9b7159d6f272ea89a02.jpg',
          lang: 'vi',
          text: 'I know the food and hotels.',
          userType: 'Local'
        },
        {
          username: 'randyvu',
          email: 'randyvu@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'http://www.vietnamesedatingsites.com/images/tips-to-get-date-with-vietnamese-men.jpg',
          lang: 'vi',
          text: 'Michelin starred chef in Hanoi',
          userType: 'Local'
        },
        {
          username: 'tommyhilfigure',
          email: 'tommyhilfigure@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'http://www.thailovelines.com/skins/blue/images/meet-english-man.jpg',
          lang: 'en',
          text: 'Hi I am Tommy I love to wear Tommy Hilfiger.',
          userType: 'Tourist'
        },
        {
          username: 'tomdavis',
          email: 'tomdavis@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'https://i.pinimg.com/236x/56/dd/30/56dd3062dc720dc6a149e4ea4767827e--nowhere-boy-english-men.jpg',
          lang: 'en',
          text: 'I like football',
          userType: 'Tourist'
        },
        {
          username: 'elizabeththompson',
          email: 'elizabeththompson@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'https://i.cbc.ca/1.3912105.1484693236!/fileImage/httpImage/image.jpg_gen/derivatives/square_620/elizabeth-thompson.jpg',
          lang: 'en',
          text: 'English teacher in the area.',
          userType: 'Tourist'
        },
        {
          username: 'peterengland',
          email: 'peterengland@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'https://i.pinimg.com/originals/bc/29/99/bc2999b5a91aa925cef6501abd6c21c3.jpg',
          lang: 'en',
          text: 'I love Vietnam it is so cheap.',
          userType: 'Tourist'
        },
        {
          username: 'davidjones',
          email: 'davidjones@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'https://www.fluentu.com/blog/english/wp-content/uploads/sites/4/2015/08/how-can-i-improve-my-english-speaking-power.jpg',
          lang: 'en',
          text: 'I love travelling.',
          userType: 'Tourist'
        },
        {
          username: 'jeremysmith',
          email: 'jeremysmith@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'https://images-i.jpimedia.uk/imagefetch/c_fill,f_auto,h_840,q_auto:eco,w_1200/https://inews.co.uk/wp-content/uploads/2019/07/1153120184.jpg',
          lang: 'en',
          text: 'i love noodles and market.',
          userType: 'Tourist'
        },
        {
          username: 'jeremyscott',
          email: 'jeremyscott@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'http://i.dailymail.co.uk/i/pix/2015/09/21/00/2C8E4CC600000578-3242021-image-m-56_1442792822099.jpg',
          lang: 'en',
          text: 'Excited for my future travels',
          userType: 'Tourist'
        }
      ])
    })

    .then(users => {
      console.log(`${users.length} users created`)
      return Promise.all([
        Gem.create([
          {
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-markets-in-vietnam/allParagraphs/00/top10Set/0/image.jpg',
            caption: 'Hoi An Central Market in this UNESCO-listed ancient town offers an authentic shopping experience for travellers in Vietnam. Located along the Thu Bon Riverbank, the marketplace is flocked with locals and tourists bargaining purchasing fresh fruits, vegetables, spices, handicrafts, and street snacks.',
            location: 'Hoi An Central Market',
            user: users[8],
            category: 'Markets',
            likes: [
              {
                user: users[9]
              },
              {
                user: users[10]
              },
              {
                user: users[11]
              },
              {
                user: users[7]
              }
            ],
            comments: [
              {
                user: users[10],
                text: 'Awesome!'
              },
              {
                user: users[9],
                text: 'Looks like fun :)'
              }
            ]
          },
          {
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-markets-in-vietnam/allParagraphs/00/top10Set/00/image.jpg',
            caption: 'Han Market is a prominent attraction in Da Nang, having served the local population since the French occupation in the early 20th century. Located at the grand intersection of Tran Phu Street, Bach Dang Street, Hung Vuong Street and Tran Hung Dao Street, visitors can find hundreds of stalls selling just about everything from local produce and coffee beans to T-shirts, jewellery, and accessories.',
            location: 'Han Market',
            user: users[0],
            category: 'Markets',
            likes: [
              {
                user: users[10]
              },
              {
                user: users[9]
              }
            ],
            comments: [
              {
                user: users[6],
                text: 'Great stuff.'
              },
              {
                user: users[7],
                text: 'It is beautiful!'
              }
            ]
          },
          {
            image: 'https://www.holidify.com/images/cmsuploads/compressed/31454200935_b4b70cb5af_b_20180827144238.jpg',
            caption: 'Under the starry Vietnamese sky, the experience of shopping at Hanoi Night Market is one that is unique in every right. A myriad of colours and bubbling crowd will welcome you into this happy affair, where you can also see historic landmarks decorated for this weekly market. The best part about this shopping encounter is perhaps its wide array of delicious Hanoi street food such as bun thang (rice vermicelli soup with shredded chicken, fried egg, and pork), La Vong grilled fish, pho (noodle soup with beef or chicken), banh mi (Vietnamese sandwich), and bun cha (rice noodles served with roasted pork). Other miscellaneous items up for sale are t-shirts, handicrafts, accessories, shoes, sunglasses and souvenirs, which you can buy at prices as low as 25 percent of the original quoted prices, so do not forget to bargain! Many cultural and musical events hosted by the locals are regularly held here, and the entire spectacle of this market is an aesthetic extravaganza.',
            location: 'Hanoi Night Market',
            user: users[1],
            category: 'Markets',
            likes: [
              {
                user: users[10]
              },
              {
                user: users[9]
              }
            ],
            comments: [
              {
                user: users[6],
                text: 'Great stuff.'
              },
              {
                user: users[7],
                text: 'Can not wait to go!'
              }
            ]
          },
          {
            image: 'https://www.holidify.com/images/cmsuploads/compressed/Lemarche%C3%8C%C2%81flottant(CaiRang,Vietnam)_20180827180805.jpg',
            caption: 'If you have had enough of land-based markets, worry not for Vietnam has you covered! Located in the Mekong Delta is Cai Rang which is an entire market-spread based on boats, and the biggest one in the entire delta region. A picturesque bridge serves as the perfect location for some good old photography. If you wish to avoid the rush of customers, you might want to visit this destination during the morning hours. Navigating the market requires you to hire a boat after which you can quickly look into the various goodies up for sale. The market mainly sells fruit, vegetables and fish, but you can also get an authentic pho breakfast here. Visit this destination for an authentic experience.',
            location: 'Cai Rang Floating Market',
            user: users[1],
            category: 'Markets',
            likes: [
              {
                user: users[10]
              },
              {
                user: users[9]
              }
            ],
            comments: [
              {
                user: users[6],
                text: 'Very cool!'
              },
              {
                user: users[4],
                text: 'Awesome!'
              }
            ]
          },
          {
            image: 'https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/07/Chua_Tran_Quoc1.jpg',
            caption: 'Dating back to the 6th century, Tran Quoc Pagoda is one of the oldest temples in Hanoi, Vietnam. ',
            location: 'Tran Quoc Pagoda',
            user: users[9],
            category: 'Temples',
            likes: [
              {
                user: users[11]
              },
              {
                user: users[7]
              },
              {
                user: users[10]
              },
              {
                user: users[8]
              }
            ],
            comments: []
          },
          {
            image: 'https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/07/Cao-Dai-Temple.jpg',
            caption: 'Cao Dai Temple is one of 1,000 Cao Dai Temples, and one of the most well-known temples in Vietnam. Constructed in the 1930s and completed in 1955, Cao Dai temple is a technicolored religious site that attracts hundreds of travelers every day.',
            location: 'Cao Dai Temple',
            user: users[10],
            category: 'Temples',
            likes: [
              {
                user: users[9]
              },
              {
                user: users[11]
              },
              {
                user: users[8]
              },
              {
                user: users[7]
              }
            ],
            comments: [
              {
                user: users[6],
                text: 'WOW!'
              }
            ]
          },
          {
            image: 'https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/07/Mariamman-Hindu-Temple.jpg',
            caption: 'Visit one of the most famous Hindu temples in Vietnam, the Mariamman Hindu Temple of Ho Chi Minh City. It is called Chua Ba Mariamman in Vietnamese and was built at the end of the 19th century as a dedication to the Hindu goddess Mariamman. ',
            location: 'Mariamman Hindu Temple',
            user: users[6],
            category: 'Temples',
            likes: [
              {
                user: users[7]
              },
              {
                user: users[8]
              },
              {
                user: users[9]
              }
            ],
            comments: [
              {
                user: users[10],
                text: 'Send more reccomendations, loved this.'
              },
              {
                user: users[11],
                text: 'Love your photo.'
              },
              {
                user: users[8],
                text: 'Looks like fun, excited to go there.'
              }
            ]
          },
          {
            image: 'https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/07/Thien-Mu-Pagoda.jpg',
            caption: 'Located in the village of Huong Long, this beautiful temple is at a distance of 5 km from the city of Hue. The temple is situated on the banks of the Perfume River and is a very well preserved tourist attraction.',
            location: 'Thien Mu Pagoda',
            user: users[2],
            category: 'Temples',
            likes: [],
            comments: [
              {
                user: users[7],
                text: 'Nice picture.'
              }
            ]
          },
          {
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-beaches-in-vietnam/allParagraphs/00/top10Set/0/image.jpg',
            caption: 'Long Beach (Bai Trong) is a 20-km-long coastal area on Phu Quoc Island, where you can find swanky beachfront resorts, beachfront restaurants, cafés and bars with breathtaking sunset views.',
            location: 'Long Beach (Bai Trong)',
            user: users[8],
            category: 'Beaches',
            likes: [
              {
                user: users[10]
              },
              {
                user: users[11]
              }
            ],
            comments: [
              {
                user: users[10],
                text: 'Love it.'
              },
              {
                user: users[11],
                text: 'Beautiful!'
              },
              {
                user: users[9],
                text: 'Nice!'
              }
            ]
          },
          {
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-beaches-in-vietnam/allParagraphs/00/top10Set/00/image.jpg',
            caption: 'Mui Ne Beach spans 15 km of sandy beaches and rock-free waters, with luxurious beachfront resorts concentrated at the northern end and a traditional fishing village in the south. Located in the Binh Thuan province, the beach attracts throngs of visitors looking for somewhere to swim and enjoy some water sports, but the most popular activity in Mui Ne Beach is kitesurfing.',
            location: 'Mui Ne Beach',
            user: users[10],
            category: 'Beaches',
            likes: [
              {
                user: users[11]
              },
              {
                user: users[7]
              }
            ],
            comments: [
              {
                user: users[11],
                text: 'Nice!'
              },
              {
                user: users[6],
                text: 'Where is this?'
              },
              {
                user: users[8],
                text: 'Cute picture, I love it!'
              }
            ]
          },
          {
            image: 'https://asianwaytravel.com/wp-content/uploads/2018/12/ban-gioc-waterfall-2.jpg',
            caption: 'Ban Gioc Waterfall is a lesser-known destination in North Vietnam compared to Sapa and Ha Long Bay, making a truly hidden gem for nature lovers and adventurers to discover. Located in northeastern of Vietnam, Cao Bang Province, on a height of 30 meters and a width of 300 meters, Ban Gioc is the widest waterfall in Vietnam, creating such impressive sight of nature.',
            location: 'Ban Gioc Waterfall',
            user: users[1],
            category: 'Landscapes',
            likes: [
              {
                user: users[10]
              },
              {
                user: users[8]
              },
              {
                user: users[9]
              }
            ],
            comments: [
              {
                user: users[10],
                text: 'Cannot wait to visit.'
              },
              {
                user: users[7],
                text: 'I hope to visit soon.'
              }
            ]
          },
          {
            image: 'https://asianwaytravel.com/wp-content/uploads/2018/10/Halong_Bay_Sunset.jpg',
            caption: 'As the name describes, Halong is a land where dragon descended into. This is a rather poetic explanation of thousands of limestone islands and islets scattering on an area of 434 sqkm, reflecting on the greenish bay water. Halong Bay’s geographical landscape was the result of complex geological processes taking over 500 million years. Halong is home to beautiful, unique karst caves such as Dau Go Cave, Sung Sot Cave and Thien Cung Cave.',
            location: 'Halong Bay',
            user: users[10],
            category: 'Landscapes',
            likes: [
              {
                user: users[11]
              }
            ],
            comments: [
              {
                user: users[6],
                text: 'Very nice.'
              },
              {
                user: users[7],
                text: 'Lovely!'
              },
              {
                user: users[11],
                text: 'Visited last year, would go again.'
              }
            ]
          },
          {
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-amazing-landscape-vietnam/allParagraphs/00/top10Set/04/image.jpg',
            caption: 'Hiking Sapa’s Fansipan Mountain may require a good level of fitness, but you’ll be rewarded with breathtaking views of mountain ranges and countryside within north-western Vietnam as well as glimpses of Yulong Mountain in China. Located 9 kilometres southwest of Sapa Village, three-day to five-day hiking excursions are available between October and March, where you’ll pass through hill tribe hamlets and dense forest trails, followed by a 2000 metre-tall climb to the top of the mountain.',
            location: 'Fansipan Mountain',
            user: users[5],
            category: 'Landscapes',
            likes: [
              {
                user: users[11]
              },
              {
                user: users[3]
              }
            ],
            comments: [
              {
                user: users[6],
                text: 'Looks great!'
              },
              {
                user: users[7],
                text: 'Nice views!'
              },
              {
                user: users[11],
                text: 'Would definitely go again.'
              }
            ]
          },
          {
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-amazing-landscape-vietnam/allParagraphs/00/top10Set/05/image.jpg',
            caption: 'Home to thousands of endangered flora and fauna species, Cuc Phuong National Park is Vietnam’s largest nature reserve. Set within the Ninh Binh Province, there are dozens of hiking trails within the forest, with guided tours available at USD 25 upwards. The park also houses the ethnic Muong hill tribe, where you can visit traditional stilt houses, waterwheels, bamboo rafts, and expansive rice terraces. It takes between three and four hours to reach Cuc Phuong National Park from Hanoi if you’re travelling by bus, car or motorbike.',
            location: 'Cuc Phuong National Park',
            user: users[6],
            category: 'Landscapes',
            likes: [
              {
                user: users[9]
              },
              {
                user: users[3]
              },{
                user: users[2]
              }
            ],
            comments: [
              {
                user: users[6],
                text: 'Looks great!'
              },
              {
                user: users[7],
                text: 'great stuff.'
              },
              {
                user: users[11],
                text: 'Would definitely go again.'
              }
            ]
          },
          {
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-amazing-landscape-vietnam/allParagraphs/00/top10Set/06/image.jpg',
            caption: 'Located within Dong Thap Province, Tram Chim National Park is a must-visit for avid bird enthusiasts and wildlife photographers. Between late December and early May, over 60,000 birds (particularly the sarus cranes) fly to Tram Chim every year and the best way to see them is by taking a boat through the park. There are three boat routes available, with the shortest route (45 minutes) priced at VND500,000 per boat and the longest (2½ hours) costing VND800,000 per boat. Visitors can enjoy various activities during off-peak seasons, including cycling, trekking, rice harvesting, and fishing.',
            location: 'Tram Chim National Park',
            user: users[6],
            category: 'Landscapes',
            likes: [
              {
                user: users[9]
              },
              {
                user: users[3]
              },{
                user: users[2]
              }
              ,{
                user: users[5]
              }
            ],
            comments: [
              {
                user: users[6],
                text: 'Why is it purple?'
              },
              {
                user: users[7],
                text: 'colorful picture!'
              },
              {
                user: users[11],
                text: 'Is this paradise?'
              }
            ]
          },
          {
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-amazing-landscape-vietnam/allParagraphs/00/top10Set/01/image.jpg',
            caption: 'Ba Vi National Park, located 58 kilometres west of downtown Hanoi, is famed for its three-peaked mountain that juts steeply up into the sky. Featuring numerous forest trails, natural hot springs, and slopes between three mountain summits, the park offers a great escape from the city with fresh air and an atmospheric backdrop of clouds, rainforest, and an array of wildlife. There’s also 11th century Bach Ho Temple at the top of the highest summit, overlooking the surrounding countryside.',
            location: 'Ba Vi National Park',
            user: users[6],
            category: 'Landscapes',
            likes: [
              {
                user: users[6]
              },
              {
                user: users[4]
              },{
                user: users[2]
              }
              ,{
                user: users[5]
              }
            ],
            comments: [
              {
                user: users[6],
                text: 'Such a nice area.'
              },
              {
                user: users[7],
                text: 'I love the lush forest!'
              },
              {
                user: users[11],
                text: 'Best Bridge ever.'
              }
            ]
          },
          {
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/ho-chi-minh-city/top10/top10-ho-chi-minh-nightlife/allParagraphs/00/top10Set/0/image.jpg',
            caption: 'Ho Chi Minh City has one of the most impressive collections of rooftop bars in the world. From the colonial charm of Saigon Saigon to the chic and modern style of the Chill Skybar, there is a rooftop spot to suit any mood in Saigon. Sit back with a cocktail and soak up the stunning view of Ho Chi Minh City from sunset until the early hours of morning',
            location: 'Chill Skybar',
            user: users[7],
            category: 'Others',
            likes: [
              {
                user: users[10]
              },
              {
                user: users[11]
              },
              {
                user: users[8]
              }
            ],
            comments: [
              {
                user: users[6],
                text: 'I am very excited to visit!'
              },
              {
                user: users[8],
                text: 'Great picture.'
              }
            ]
          },
          {
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/ho-chi-minh-city/top10/best-theatre-live-shows-ho-chi-minh/allParagraphs/0/top10Set/0/image.jpg',
            caption: 'The Golden Dragon Water Puppetry Theatre is where you can learn about the culture, traditions and folklore of Vietnamese life during your holiday in Ho Chi Minh City. Located in Tao Dan Park, visitors are entertained by puppets acting on a ‘stage’ of water accompanied by live old-fashioned music played on authentic instruments.',
            location: 'The Golden Dragon Water Puppetry Theatre',
            user: users[0],
            category: 'Others',
            likes: [
              {
                user: users[11]
              },
              {
                user: users[9]
              },
              {
                user: users[8]
              },
              {
                user: users[7]
              }
            ],
            comments: [
              {
                user: users[11],
                text: 'Do you have more recommendation?'
              },
              {
                user: users[6],
                text: 'Wonderful, I went there as well!'
              }
            ]
          }
        ]),
        users
      ])
    })

    .then(data => {
      const [ gems, users ] = data
      console.log(`${gems.length} gems created`)
      return Chat.create([
        {
          title: 'locals',
          image: 'https://farm5.staticflickr.com/4573/38561719246_60354b9d09_o.jpg',
          comments: [
            {
              text: 'Hi, I am planning to visit your beautiful town. Any suggestions for me where to stay?',
              user: users[5]
            },
            {
              text: 'No idea, sorry!',
              user: users[0]
            },
            {
              text: 'You can stay at our hostel, is very close to the beach. You are going to love it!',
              user: users[4]
            },
            {
              text: 'Thanks for the tips! What is the name of the hostel?',
              user: users[5]
            },
            {
              text: 'I think he was referring to the Backpacker Hostel. Check their reviews?',
              user: users[3]
            },
            {
              text: 'Oh 😢! Ok, thanks. Do you have a better suggestion? Travelling solo is never that easy.',
              user: users[5]
            },
            {
              text: 'I am renting my sofa at https://www.couchsurfing.com/ have a look! ',
              user: users[3]
            },
            {
              text: 'I have been to the Backpacker Hostel and it is a nice place!',
              user: users[8]
            },
            {
              text: 'Thank you all! I have made my decision.',
              user: users[5]
            },
            {
              text: 'I am curious now. What is your decision? Couch or hostel?',
              user: users[3]
            }
          ]
        },
        {
          title: 'travellers',
          image: 'https://www.adventureinyou.com/wp-content/uploads/2015/07/solo-female-traveller-INDEPENDENCE-960x640.jpg',
          comments: [
            {
              text: 'Hi guys, I am in Hanoi toinght. Someone wants to go out for a drink?',
              user: users[8]
            },
            {
              text: 'I am in! 🎉🎉🎉 Have you been to the Binh Minh Jazz Club?' ,
              user: users[2]
            },
            {
              text: 'Yeah! I have just arrived in Hanoi from London, it would be nice to meet new people!',
              user: users[5]
            },
            {
              text: 'Fantastic! What about 7PM at the Binh Minh Jazz Club entrance?',
              user: users[1]
            },
            {
              text: 'I will be wearing a funny red hat 😁! See you tonight!!!! ',
              user: users[5]
            },
            {
              text: 'Can i bring my gf?',
              user: users[6]
            },
            {
              text: 'The more the merrier!',
              user: users[1]
            },
            {
              text: 'Here is the link for the venue guys! http://minhjazzvietnam.com/',
              user: users[2]
            },
            {
              text: 'See you shortly! 🎺🎺🎺',
              user: users[6]
            }
          ]
        }
      ])
    })
    .then(chats => {
      console.log(`${chats.length} chats created`)
    })
})
