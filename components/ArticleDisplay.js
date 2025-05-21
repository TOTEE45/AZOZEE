function ArticleDisplay({ article }) {
    try {
        const [copyStatus, setCopyStatus] = React.useState('');

        if (!article) {
            return (
                <div className="article-container p-6 text-center text-gray-500" data-name="empty-article">
                    <i className="fas fa-pen-fancy text-4xl mb-4"></i>
                    <p>قم بإدخال موضوع وتوليد مقال جديد</p>
                </div>
            );
        }

        const copyToClipboard = async (text, type) => {
            try {
                await navigator.clipboard.writeText(text);
                setCopyStatus(`تم نسخ ${type}`);
                setTimeout(() => setCopyStatus(''), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                setCopyStatus('فشل النسخ');
            }
        };

        const downloadFile = (content, fileType) => {
            const element = document.createElement('a');
            let file;

            if (fileType === 'html') {
                const htmlContent = `
                    <!DOCTYPE html>
                    <html lang="ar" dir="rtl">
                    <head>
                        <meta charset="UTF-8">
                        <title>${article.title}</title>
                        <meta name="description" content="${article.description}">
                        <meta name="keywords" content="${article.keywords.join(', ')}">
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
                            h1 { text-align: center; }
                        </style>
                    </head>
                    <body>
                        <h1>${article.title}</h1>
                        ${article.content.split('\n').map(p => `<p>${p}</p>`).join('')}
                    </body>
                    </html>
                `;
                file = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
                element.download = `${article.title}.html`;
            } else {
                const textContent = `${article.title}

الوصف:
${article.description}

الكلمات المفتاحية:
${article.keywords.join(', ')}

المحتوى:
${article.content}`;
                file = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
                element.download = `${article.title}.txt`;
            }

            element.href = URL.createObjectURL(file);
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        };

        return (
            <div className="article-container p-6" data-name="article-display">
                <div className="flex justify-between items-center mb-6" data-name="article-header">
                    <h2 className="text-2xl font-bold" data-name="article-title">{article.title}</h2>
                    <div className="flex gap-2" data-name="article-actions">
                        {copyStatus && (
                            <span className="text-green-600 text-sm" data-name="copy-status">
                                {copyStatus}
                            </span>
                        )}
                        <button
                            onClick={() => copyToClipboard(article.content, 'النص')}
                            className="btn-action"
                            title="نسخ النص"
                            data-name="copy-text-btn"
                        >
                            <i className="fas fa-copy"></i> نسخ النص
                        </button>
                        <button
                            onClick={() => copyToClipboard(`<h1>${article.title}</h1>${article.content.split('\n').map(p => `<p>${p}</p>`).join('')}`, 'HTML')}
                            className="btn-action"
                            title="نسخ HTML"
                            data-name="copy-html-btn"
                        >
                            <i className="fas fa-code"></i> نسخ HTML
                        </button>
                        <button
                            onClick={() => downloadFile(article.content, 'txt')}
                            className="btn-action"
                            title="تحميل كملف نصي"
                            data-name="download-txt-btn"
                        >
                            <i className="fas fa-file-alt"></i> تحميل TXT
                        </button>
                        <button
                            onClick={() => downloadFile(article.content, 'html')}
                            className="btn-action"
                            title="تحميل كملف HTML"
                            data-name="download-html-btn"
                        >
                            <i className="fas fa-file-code"></i> تحميل HTML
                        </button>
                    </div>
                </div>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-lg" data-name="meta-info">
                    <div className="mb-3" data-name="description-section">
                        <h3 className="text-sm font-bold text-gray-700 mb-2">الوصف:</h3>
                        <p className="text-gray-600">{article.description}</p>
                    </div>
                    <div data-name="keywords-section">
                        <h3 className="text-sm font-bold text-gray-700 mb-2">الكلمات المفتاحية:</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.keywords.map((keyword, index) => (
                                <span 
                                    key={index}
                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                    data-name={`keyword-${index}`}
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="prose lg:prose-lg" data-name="article-content">
                    {article.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ArticleDisplay component error:', error);
        reportError(error);
        return null;
    }
}
