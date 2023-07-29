import _ from 'lodash'

export const dummy = (_) => {
  return 1
}

export const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0)
}

export const favouriteBlog = (blogs) => {
  return blogs.reduce((acc, curr) => {
    if (curr.likes > acc.likes) {
      return curr;
    } else {
      return acc;
    }
  }, { likes: 0 })
}

function getMaxKeyValue(obj, key) {
  let maxKey = null;
  let maxValue = -Infinity;

  for (let key in obj) {
    if (obj[key] > maxValue) {
      maxKey = key;
      maxValue = obj[key];
    }
  }

  return {author: maxKey, [key]: maxValue};
}

export const mostBlogs = (blogs) => {
  const blog = _.countBy(blogs, 'author');
  return getMaxKeyValue(blog, 'blogs');
}

export const mostLikes = (blogs) => {
  const freq = new Map();
  for (let blog of blogs) {
    if (freq.has(blog.author)) {
      freq.set(blog.author, freq.get(blog.author) + blog.likes);
    } else {
      freq.set(blog.author, blog.likes);
    }
  }
  return getMaxKeyValue(Object.fromEntries(freq.entries()), 'likes');

}
