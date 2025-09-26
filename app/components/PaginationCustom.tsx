import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function PaginationCustom({
  page,
  count,
  setPage,
}: {
  page: number;
  count: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleNext = () => {
    if (page < count) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const getVisiblePages = () => {
    const pages: number[] = [];

    if (count <= 5) {
      for (let i = 2; i < count; i++) pages.push(i); // skip 1 and last
    } else {
      if (page <= 3) {
        pages.push(2, 3, 4);
      } else if (page >= count - 2) {
        pages.push(count - 3, count - 2, count - 1);
      } else {
        pages.push(page - 1, page, page + 1);
      }
    }

    return pages.filter((p) => p > 1 && p < count); // safety
  };

  return (
    <Pagination className="z-10 col-span-full">
      <PaginationContent className="flex items-center gap-4">
        {/* Prev */}
        <PaginationItem>
          <Button
            disabled={page === 1}
            className="flex items-center gap-2"
            onClick={handlePrev}
          >
            <ArrowLeft className="mr-1" /> Prev
          </Button>
        </PaginationItem>

        {/* First page */}
        <PaginationItem>
          <PaginationLink
            onClick={() => setPage(1)}
            className={page === 1 ? "bg-purple-500  text-white" : ""}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* Ellipsis before middle pages */}
        {page > 4 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

        {/* Middle pages */}
        {getVisiblePages().map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => setPage(p)}
              className={page === p ? "bg-purple-500  text-white" : ""}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis after middle pages */}
        {page < count - 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

        {/* Last page */}
        {count > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => setPage(count)}
              className={page === count ? "bg-purple-500  text-white" : ""}
            >
              {count}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next */}
        <PaginationItem>
          <Button
            disabled={page === count}
            className="flex items-center gap-2"
            onClick={handleNext}
          >
            Next <ArrowRight className="ml-1" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
