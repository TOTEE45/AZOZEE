function App() {
    try {
        const [article, setArticle] = React.useState(null);

        const handleGenerate = (newArticle) => {
            setArticle(newArticle);
        };

        return (
            <div data-name="app">
                <Header />
                <main className="container mx-auto px-4 pb-8" data-name="main-content">
                    <div className="article-layout">
                        <div data-name="form-section">
                            <ArticleForm onGenerate={handleGenerate} />
                        </div>
                        <div data-name="display-section">
                            <ArticleDisplay article={article} />
                        </div>
                    </div>
                </main>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
