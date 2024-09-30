import {
    Pagination,
} from "@nextui-org/react";

// New component for pagination controls
interface PaginationControlsProps {
    page: number;
    numItems: number;
    rowsPerPage: number;
    setPage: (page: number) => void;
    loading: boolean;
}


const calculatePages = (totalItems: number, rowsPerPage: number): number => {
    const pages = Math.ceil(totalItems / rowsPerPage);
    return pages > 0 ? pages : 1; // Ensure pages is always at least 1
};


export const PaginationControls: React.FC<PaginationControlsProps> = ({ page, numItems, rowsPerPage, setPage, loading }) => {
    // When loading, don't show the pagination controls
    // and return null instead
    // Live calculation of the number of pages
    const pages = calculatePages(numItems, rowsPerPage);

    return loading ? null : (
        <div className="flex w-full justify-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(newPage) => setPage(newPage)}
            />
        </div>
    );
};