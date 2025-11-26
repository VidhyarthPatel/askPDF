export function Header() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#3a00a5] rounded-lg"></div>
                        <span className="text-xl font-bold text-gray-900">AskPDF</span>
                    </div>

                    {/* Y Combinator badge - same as home page */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-gray-700 rounded-full border border-gray-200 cursor-default">
                        <span className="text-sm font-medium">Not backed by</span>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/1200px-Y_Combinator_logo.svg.png"
                            alt="Y Combinator Logo"
                            className="w-4 h-4 rounded-sm"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
