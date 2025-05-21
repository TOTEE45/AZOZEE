function ArticleForm({ onGenerate }) {
    try {
        const [topic, setTopic] = React.useState('');
        const [length, setLength] = React.useState('medium');
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');
            
            try {
                const article = await generateArticle(topic, length);
                onGenerate(article);
            } catch (error) {
                console.error('Error generating article:', error);
                setError(error.message || 'حدث خطأ أثناء توليد المقال');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="form-container p-6" data-name="article-form">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" data-name="topic-label">
                            موضوع المقال
                        </label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="أدخل موضوع المقال"
                            required
                            data-name="topic-input"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" data-name="length-label">
                            طول المقال
                        </label>
                        <select
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            data-name="length-select"
                        >
                            <option value="short">قصير</option>
                            <option value="medium">متوسط</option>
                            <option value="long">طويل</option>
                        </select>
                    </div>
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg" data-name="error-message">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                        data-name="generate-button"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center" data-name="loading-state">
                                <i className="fas fa-spinner fa-spin ml-2"></i>
                                <span>جاري التوليد...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center" data-name="button-text">
                                <i className="fas fa-pen-fancy ml-2"></i>
                                <span>توليد المقال</span>
                            </div>
                        )}
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error('ArticleForm component error:', error);
        reportError(error);
        return null;
    }
}
