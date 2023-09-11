import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Pagination = (props) => {
    const { pageNumber, setPageNumber } = props;
    const handlePageChange = e => {
        if (parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= 500) {
            setPageNumber(parseInt(e.target.value));
        }
    };
    return (_jsx("nav", { "aria-label": "...", children: _jsxs("ul", { className: "pagination py-3", children: [_jsx("li", { className: "page-item", children: _jsx("button", { className: "page-link", onClick: () => {
                            setPageNumber(1);
                            window.scrollTo(0, 0);
                        }, children: "First" }) }), _jsx("li", { className: "page-item", children: _jsx("button", { className: "page-link bi-arrow-left-square", onClick: () => {
                            pageNumber > 1 ? setPageNumber(pageNumber - 1) : "";
                            window.scrollTo(0, 0);
                        } }) }), _jsx("li", { children: _jsxs("button", { className: "page-link", children: ["Page", " ", _jsx("input", { type: "text", value: pageNumber, maxLength: 3, onChange: handlePageChange, style: { width: 40, height: 30 } })] }) }), _jsx("li", { className: "page-item", children: _jsx("button", { className: "page-link bi-arrow-right-square", onClick: () => {
                            pageNumber < 500 ? setPageNumber(pageNumber + 1) : "";
                            window.scrollTo(0, 0);
                        } }) }), _jsx("li", { className: "page-item", children: _jsx("button", { className: "page-link", onClick: () => setPageNumber(500), children: "Last" }) })] }) }));
};
