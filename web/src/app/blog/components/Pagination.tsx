import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath?: string;
}

export default function Pagination({ currentPage, totalPages, basePath = '/blog' }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center space-x-2 mt-12 md:mt-20">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={`${basePath}?page=${currentPage - 1}`}
                    className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    &larr; Prev
                </Link>
            ) : (
                <span className="px-4 py-2 rounded-full border border-gray-200 text-gray-300 cursor-not-allowed">
                    &larr; Prev
                </span>
            )}

            {/* Page Numbers */}
            <div className="flex space-x-1">
                {pages.map((page) => (
                    <Link
                        key={page}
                        href={`${basePath}?page=${page}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${currentPage === page
                                ? 'bg-[#346BFF] text-white font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {page}
                    </Link>
                ))}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={`${basePath}?page=${currentPage + 1}`}
                    className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    Next &rarr;
                </Link>
            ) : (
                <span className="px-4 py-2 rounded-full border border-gray-200 text-gray-300 cursor-not-allowed">
                    Next &rarr;
                </span>
            )}
        </div>
    );
}
