type PaginationProps = {
    changePage: (page: number) => void;
    currentPage: number;
    pageNumbers: (string | number)[];
    totalPages: number;
}

export default function Pagination({changePage, currentPage, pageNumbers, totalPages} : PaginationProps) {
    return (
        <div className="join flex justify-center mt-6">
        {/* Previous Button */}
        <button
          className="join-item btn"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {/* Dynamic Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <button key={index} className="join-item btn" disabled>
                {page}
              </button>
            );
          }
          return (
            <button
              key={index}
              className={`join-item btn ${page === currentPage ? "btn-active" : ""}`}
              onClick={() => changePage(Number(page))}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          className="join-item btn"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    )
}