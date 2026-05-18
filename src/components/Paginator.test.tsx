import { render, screen } from '@testing-library/react';
import Paginator from './Paginator';
import { MemoryRouter } from 'react-router';
import { PAGINATOR_SPREAD } from '../constant';

const renderPaginator = (
  overrides?: Partial<{
    currentPage: number;
    lastPageNumber: number;
    basePath: string;
  }>
) => {
  render(
    <MemoryRouter>
      <Paginator
        {...{ currentPage: 1, lastPageNumber: 10, basePath: '', ...overrides }}
      />
    </MemoryRouter>
  );
};

describe('Paginator', () => {
  it('renders when currentPage < lastPageNumber', () => {
    renderPaginator();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders when currentPage > lastPageNumber', () => {
    renderPaginator({ currentPage: 10, lastPageNumber: 1 });

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders a "previous" link pointing to page 1', () => {
    renderPaginator();
    const prev = screen.getByLabelText('Previous');
    expect(prev).toHaveAttribute('href', '/page/1');
  });

  it('renders a "next" link pointing to the last page', () => {
    renderPaginator();
    const next = screen.getByLabelText('Next');
    expect(next).toHaveAttribute('href', '/page/10');
  });

  it('clamps the page window at 1 when currentPage is near the start', () => {
    renderPaginator({ currentPage: 1 });
    expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '0' })).not.toBeInTheDocument();
  });

  it('clamps the page window at lastPageNumber when currentPage is at the end', () => {
    renderPaginator({ currentPage: 10 });
    expect(screen.getByRole('link', { name: '10' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '11' })).not.toBeInTheDocument();
  });

  it('uses a custom basePath in all generated hrefs', () => {
    renderPaginator({
      currentPage: 2,
      lastPageNumber: 3,
      basePath: '/articles',
    });
    expect(screen.getByLabelText('Previous')).toHaveAttribute(
      'href',
      '/articles/page/1'
    );
    expect(screen.getByLabelText('Next')).toHaveAttribute(
      'href',
      '/articles/page/3'
    );
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
      'href',
      '/articles/page/2'
    );
  });

  it('renders the correct number of page links based on PAGINATOR_SPREAD', () => {
    renderPaginator({ currentPage: 50, lastPageNumber: 100 });

    expect(screen.getAllByRole('link')).toHaveLength(
      2 * PAGINATOR_SPREAD + 1 + 2
    );
  });
});
