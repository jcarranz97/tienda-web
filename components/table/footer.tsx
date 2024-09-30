// New component for the table footer
interface TableFooterProps {
    numItems: number;
    rowsPerPage: number;
    setRowsPerPage: (value: number) => void;
    setPage: (value: number) => void;
}

export const TableFooter: React.FC<TableFooterProps> = ({ numItems, rowsPerPage, setRowsPerPage, setPage}) => {
    return (
        <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total {numItems} items</span>
            <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                    className="bg-transparent outline-none text-default-400 text-small"
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setPage(1); // Reset the page to 1 when changing the rows per page
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </label>
        </div>
    );
};
