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
const mostBlogs = (blogs) => {
  const authors = {};
  let maxBlog = [];
  blogs.forEach((blog) => {
    if (!authors[blog.author]) {
      authors[blog.author] = 1;
    } else {
      authors[blog.author] += 1;
    }
    if (!maxBlog.length) {
      maxBlog = [authors[blog.author], blog.author];
    } else {
      if (authors[blog.author] > maxBlog[0]) {
        maxBlog = [authors[blog.author], blog.author];
      }
    }
  });

  const [blog, author] = maxBlog;

  return { author, blog };
};

const mostLikes = (blogs) => {
  const authors = {};
  let likes = [];

  blogs.forEach((blog) => {
    if (!authors[blog.author]) {
      authors[blog.author] = blog.likes;
    } else {
      authors[blog.author] += blog.likes;
    }
    if (!likes.length) {
      likes = [authors[blog.author], blog.author];
    } else {
      if (authors[blog.author] > likes[0]) {
        likes = [authors[blog.author], blog.author];
      }
    }
  });
  const [like, author] = likes;
  return { likes: like, author };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
