import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    likes: 2,
    author: 'Arif Wibawa',
    url: 'arif.com'
  }

  render(<Blog blog={blog} />)
  screen.debug()
  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})