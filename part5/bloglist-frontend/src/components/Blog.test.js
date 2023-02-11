import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    likes: 2,
    author: 'Arif Wibawa',
    url: 'arif.com'
  }

  render(<Blog blog={blog} />)
  const title = screen.getAllByText('Component testing is done with react-testing-library', { exact: false })
  const author = screen.getAllByText('Arif Wibawa', { exact: false })

  expect(title).toBeDefined()
  expect(author).toBeDefined()
})

test('check class', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    likes: 2,
    author: 'Arif Wibawa',
    url: 'arif.com'
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog-list')

  expect(div).toBeDefined()
})

test('check URL and number of likes when clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    likes: 2,
    author: 'Arif Wibawa',
    url: 'arif.com'
  }

  let component = render(<Blog blog={blog} />)

  const button = component.container.querySelector('button')
  fireEvent.click(button)
  const blogDetails = component.container.querySelector('.blog-list')

  expect(blogDetails).toBeInTheDocument()
})

test('if the Like button is clicked twice, the event handler is also called twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    likes: 2,
    author: 'Arif Wibawa',
    url: 'arif.com'
  }
  const logSpy = jest.spyOn(console, 'log')
  render(<Blog blog={blog} />)

  const likeButton = screen.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(logSpy).toHaveBeenCalledTimes(2)
})

test('blogForm test', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm blog={createBlog} />)

  const titleInput = container.querySelector('input[name="title"]')
  const authorInput = container.querySelector('input[name="author"]')
  const urlInput = container.querySelector('input[name="url"]')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'title')
  await user.type(authorInput, 'author')
  await user.type(urlInput, 'jest.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(2)
  expect(createBlog.mock.calls[0][0]).toBe('title')
  expect(createBlog.mock.calls[0][1]).toBe('author')
  expect(createBlog.mock.calls[0][2]).toBe('jest.com')
})


