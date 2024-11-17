export function Footer() {
  return (
    <div className="block w-full bg-background py-4 text-center text-xs dark:text-white md:absolute md:bottom-0">
      <p></p>
      <p>
        {' '}
        © {new Date().getFullYear()} All rights reserved. | Designed &
        Developed by Sampath Kumara.
      </p>
    </div>
  );
}
