export const postsScreenArray = [
  {
    id: 1,
    img: require('../image/forrest.jpg'),
    title: 'Ліс',
    location: 'Ukraine',
    comments: 8,
    likes: 153,
  },
  {
    id: 2,
    img: require('../image/sunset.jpg'),
    title: 'Захід на Чорному морі',
    location: 'Ukraine',
    comments: 3,
    likes: 200,
  },
  {
    id: 3,
    img: require('../image/oldhouse.jpg'),
    title: 'Старий будиночок у Венеції',
    location: 'Italy',
    comments: 50,
    likes: 200,
  },
];

export const profilePostArray = [
  {
    id: 1,
    img: require('../image/forrest.jpg'),
    title: 'Ліс',
    location: 'Ukraine',
    comments: 8,
    likes: 153,
  },
  {
    id: 2,
    img: require('../image/sunset.jpg'),
    title: 'Захід на Чорному морі',
    location: 'Ukraine',
    comments: 3,
    likes: 200,
  },
  {
    id: 3,
    img: require('../image/oldhouse.jpg'),
    title: 'Старий будиночок у Венеції',
    location: 'Italy',
    comments: 50,
    likes: 200,
  },
];

export const commentPostArray = {
  id: 1,
  postImage: require('../image/sunset.jpg'),
  title: 'Sunset on the Black Sea',
  location: 'Ukraine',
  comments: 3,
  commentsTexts: [
    {
      id: 10,
      date: '09 червня, 2020',
      time: '08:40',
      userAvatar: require('../image/avatarNo.jpg'),
      text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
    },
    {
      id: 11,
      userAvatar: require('../image/avatarYes.jpg'),
      date: '09 червня, 2020',
      time: '09:14',
      text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
    },
    {
      id: 12,
      date: '09 червня, 2020',
      time: '09:20',
      userAvatar: require('../image/avatarNo.jpg'),
      text: 'Thank you! That was very helpful!',
    },
  ],
};
