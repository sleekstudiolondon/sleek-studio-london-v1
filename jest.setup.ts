import '@testing-library/jest-dom'

jest.mock('next/image', () => {
  return function MockImage(props: any) {
    return require('react').createElement('img', { ...props, alt: props.alt })
  }
})
