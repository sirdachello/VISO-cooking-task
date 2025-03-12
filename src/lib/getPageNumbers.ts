export default function getPageNumbers(totalPages: number, currentPage: number) {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Maximum number of page numbers to show at once
    const surroundingPages = 2; // Pages to show around the current page
  
    // Case 1: If the total number of pages is small, show all page numbers
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Case 2: Show a range of page numbers with ellipses when necessary
      const startPage = Math.max(1, currentPage - surroundingPages);
      const endPage = Math.min(totalPages, currentPage + surroundingPages);
  
      // Show first page and ellipsis if needed
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push("...");
      }
  
      // Show pages around the current page
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
  
      // Show last page and ellipsis if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };