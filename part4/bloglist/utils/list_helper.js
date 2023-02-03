const blog = require("../models/blog")
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)

  return likes
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let highestItem = {}

  for (let i=0; i < blogs.length; i++) {
    if (mostLikes < blogs[i].likes) {
      mostLikes = blogs[i].likes
      highestItem = blogs[i]
    }
  }
  return highestItem;

}

const mostBlogs = (listOfBlogs) => {
  const author= _.head(_(listOfBlogs)
  .countBy('author')
  .entries()
  .maxBy(_.last));
  
  let blogs = 0

  for (let i of listOfBlogs) {
    if (i.author === author) {
      blogs+=1
    }
  }

  return {
    author,
    blogs,
  }

}

const mostLikes = (listOfBlogs) => {
  const likesCounter = _(listOfBlogs)
  .groupBy("author")
  .map((objs, key) => ({
    author: key,
    likes: _.sumBy(objs, "likes"),
  }))
  .value();

  return likesCounter.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  });
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}