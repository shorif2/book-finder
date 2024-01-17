import { useState } from "react";
import bookImage from "../assets/book.png";
import star from "../assets/star.svg";
import BookAction from "./BookAction";
import bookList from "./books.json";

export default function BookShowCase() {
  const [books, setBooks] = useState(bookList);

  function handleSearch(searchText) {
    const searchBook = bookList.filter((book) =>
      book.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
    setBooks(searchBook);
  }
  function handleFilter(text) {
    if (text === "") {
      setBooks(bookList);
    } else if (text === "year_asc") {
      const sortBooks = [...bookList].sort(
        (a, b) => a.published_year - b.published_year
      );
      setBooks(sortBooks);
    } else if (text === "year_desc") {
      const sortBooks = [...bookList].sort(
        (a, b) => b.published_year - a.published_year
      );
      setBooks(sortBooks);
    } else if (text === "name_asc") {
      const sortBooks = [...bookList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setBooks(sortBooks);
    } else {
      const sortBooks = [...bookList].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setBooks(sortBooks);
    }
  }

  function handleStar(id) {
    const mark = books.map((book) => {
      if (book.id === id) {
        return { ...book, favourite: !book.favourite };
      }
      return book;
    });
    setBooks(mark);
  }

  return (
    <main className="my-10 lg:my-14">
      <BookAction onSearch={handleSearch} handleFilter={handleFilter} />
      <div className="container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCart key={book.id} handleStar={handleStar} book={book} />
        ))}
      </div>
    </main>
  );
}

function BookCart({ book, handleStar }) {
  return (
    <>
      <div className="space-y-3">
        {/* thumbnail */}
        <div className="flex items-center justify-center rounded-md border border-[#324251]/30 bg-white p-4">
          <img className="max-w-[144px]" src={bookImage} alt="book name" />
        </div>
        {/* info */}
        <div className="space-y-3">
          <h4 className="text-lg font-bold lg:text-xl">
            {book?.name}({book.published_year})
          </h4>
          <p className="text-xs lg:text-sm">
            By : <span>{book.author}</span>
          </p>
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold lg:text-xl">{book.price}</h4>
            {/* stars */}
            <div className="flex items-center space-x-1">
              <img src={star} />
              <img src={star} />
              <img src={star} />
              <img src={star} />
              <span className="text-xs lg:text-sm">({book.review} Star)</span>
            </div>
            {/* stars ends */}
          </div>

          <div className="flex items-center gap-3 text-xs lg:text-sm">
            <button className="flex min-w-[132px] items-center justify-center gap-1 rounded-md bg-[#1C4336] py-1.5 text-white  transition-all hover:opacity-80 lg:py-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              Add to Cart
            </button>
            <button
              onClick={() => handleStar(book.id)}
              className={`flex min-w-[132px] items-center justify-center gap-1 rounded-md ${
                !book.favourite
                  ? "bg-[#1C4336]/[14%] text-[#1C4336]"
                  : "bg-[#DC2954]/[14%] text-[#DC2954]"
              } py-1.5  transition-all hover:bg-[#1C4336]/[24%] lg:py-1.5`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={book.favourite ? "#DC2954" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              Favourite
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
