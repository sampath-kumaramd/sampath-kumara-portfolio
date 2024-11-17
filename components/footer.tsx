export function Footer() {
  return (
    <div className="block w-full bg-background pb-4 pt-10 text-center text-xs dark:text-white md:absolute md:bottom-0 md:pt-0">
      <p>
        © {new Date().getFullYear()} All rights reserved | Designed & Developed
        by Sampath Kumara.
      </p>
    </div>
  );
}
