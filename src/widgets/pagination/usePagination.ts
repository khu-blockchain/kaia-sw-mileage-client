import { useState, useMemo } from "react";

interface PaginationConfig {
  itemsPerPage?: number;
  maxVisiblePages?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  visiblePages: number[];
  ellipsisInfo: {
    showStartEllipsis: boolean;
    showEndEllipsis: boolean;
    showFirstPage: boolean;
    showLastPage: boolean;
  };
}

export interface PaginationActions {
  goToPage: (page: number) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  setCurrentPage: (page: number) => void;
}

const usePagination = <T>(
  data: T[],
  config: PaginationConfig = {},
  totalCount?: number,
): {
  currentData: T[];
  totalItems: number;
  paginationInfo: PaginationInfo;
  paginationActions: PaginationActions;
} => {
  const { itemsPerPage = 10, maxVisiblePages = 5 } = config;
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지네이션 계산
  const paginationInfo = useMemo(() => {
    const totalItems = totalCount ?? data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return {
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      currentData,
      currentPage,
    };
  }, [data, currentPage, itemsPerPage]);

  // 표시할 페이지 번호 계산
  const visiblePages = useMemo(() => {
    const { totalPages } = paginationInfo;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 maxVisiblePages개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지를 중심으로 페이지 계산
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // 끝쪽에 도달했을 때 시작 페이지 조정
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }, [currentPage, paginationInfo.totalPages, maxVisiblePages]);

  // Ellipsis 표시 여부
  const ellipsisInfo = useMemo(() => {
    const { totalPages } = paginationInfo;
    const showStartEllipsis = visiblePages[0] > 2;
    const showEndEllipsis =
      visiblePages[visiblePages.length - 1] < totalPages - 1;
    const showFirstPage = !visiblePages.includes(1);
    const showLastPage = !visiblePages.includes(totalPages);

    return {
      showStartEllipsis,
      showEndEllipsis,
      showFirstPage,
      showLastPage,
    };
  }, [visiblePages, paginationInfo.totalPages]);

  // 페이지 변경 함수들
  const goToPage = (page: number) => {
    if (page >= 1 && page <= paginationInfo.totalPages) {
      setCurrentPage(page);
    }
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(paginationInfo.totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  return {
    currentData: paginationInfo.currentData,
    totalItems: paginationInfo.totalItems,
    paginationInfo: {
      currentPage: paginationInfo.currentPage,
      totalPages: paginationInfo.totalPages,
      visiblePages,
      ellipsisInfo,
    },
    paginationActions: {
      goToPage,
      goToFirstPage,
      goToLastPage,
      goToPreviousPage,
      goToNextPage,
      setCurrentPage,
    },
  };
};

export default usePagination;