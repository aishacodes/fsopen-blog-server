const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.length == 0
    ? 0
    : blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0);
};
const favouriteBlog = (blogs) => {
  const highestLikes = Math.max(...blogs.map((blog) => blog.likes));
  const fave = blogs.find((blog) => blog.likes === highestLikes);
  return {
    title: fave.title,
    author: fave.author,
    likes: fave.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
