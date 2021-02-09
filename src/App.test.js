import { render, screen } from '@testing-library/react';
import ProfileInfo from './Components/Profile/ProfileInfo/ProfileInfo';

test('renders learn react link', () => {
  render(<ProfileInfo />);
  const linkElement = screen.getByText('preloader');
  expect(linkElement).toBeInTheDocument();
});
