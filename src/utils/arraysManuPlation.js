export const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export const isVideoInList = (videos, id) => {
  return videos.some((video) => video._id === id);
};
