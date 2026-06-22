import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h4 className="mt-5">404. Not found</h4>
      <p className="mt-2">Page you looking for do not exist</p>
      <Link href="/" className="mt-2 btn btn-outline-warning">
        Return to Home Page
      </Link>
    </>
  );
}
