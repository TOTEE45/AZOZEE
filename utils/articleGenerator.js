async function generateArticle(topic, length) {
    try {
        const systemPrompt = `You are an expert article writer. Generate a high-quality article in Arabic about the given topic. The article should be ${length} in length.

Output the article in this exact JSON format:
{
    "title": "عنوان المقال",
    "description": "وصف المقال في 150-160 حرف",
    "keywords": ["كلمة1", "كلمة2", "كلمة3"],
    "content": "محتوى المقال"
}

Rules:
- Write in clear and professional Arabic
- Include an engaging title
- Create SEO-friendly meta description
- Add 5-8 relevant keywords
- Organize content with proper paragraphs
- Ensure factual accuracy`;

        const userPrompt = `Generate an article about: ${topic}`;
        
        let response = await invokeAIAgent(systemPrompt, userPrompt);
        
        // Clean the response
        response = response.trim();
        if (response.startsWith('json')) {
            response = response.replace('json', '');
        }
        if (response.endsWith('')) {
            response = response.replace('', '');
        }
        
        // Parse the JSON response
        const article = JSON.parse(response);
        
        // Validate the response structure
        if (!article.title || !article.content || !article.description || !article.keywords) {
            throw new Error('Invalid article format received');
        }
        
        return article;
    } catch (error) {
        console.error('Error in article generation:', error);
        throw new Error('فشل في توليد المقال. الرجاء المحاولة مرة أخرى.');
    }
}
