export function Footer() {
  return (
    <div className="flex flex-col items-center justify-center pb-12 font-light text-gray-500 font-sm">
      <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
      <p>
        Data provided by{" "}
        <a href="https://www.themoviedb.org/" className="underline">
          TMDB
        </a>
      </p>
    </div>
  );
}
