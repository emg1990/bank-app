import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search', () => {
  it('should render the collapsed search icon by default', () => {
    const { getByTestId } = render(<Search onSearch={() => {}} />);
    const searchIcon = getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('should expand the search input when the search icon is clicked', () => {
    const { getByTestId } = render(<Search onSearch={() => {}} />);
    const searchIcon = getByTestId('search-icon');
    fireEvent.click(searchIcon);
    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('should call the onSearch callback with the input value when the input value changes', () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(<Search onSearch={onSearch} />);
    const searchIcon = getByTestId('search-icon');
    fireEvent.click(searchIcon);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(onSearch).toHaveBeenCalledWith('test');
  });

  it('should call the onSearch callback with an empty string when the search input is blurred', () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(<Search onSearch={onSearch} />);
    const searchIcon = getByTestId('search-icon');
    fireEvent.click(searchIcon);
    const searchInput = getByTestId('search-input');
    fireEvent.blur(searchInput);
    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('should call the onSearch callback with an empty string when the close icon is clicked', () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(<Search onSearch={onSearch} />);
    const searchIcon = getByTestId('search-icon');
    fireEvent.click(searchIcon);
    const closeIcon = getByTestId('close-icon');
    fireEvent.click(closeIcon);
    expect(onSearch).toHaveBeenCalledWith('');
  });
});