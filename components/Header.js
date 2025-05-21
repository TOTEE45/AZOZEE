function Header() {
    try {
        return (
            <header className="bg-white shadow-sm py-4 mb-6" data-name="header">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-gray-800" data-name="header-title">
                        مولد المقالات الحصرية
                    </h1>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
