export const analyzeText = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      words: 0,
      characters: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: '0 min',
      readability: 'Easy'
    };
  }

  const trimmedText = text.trim();
  const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
  const characters = text.length;

  // Sentence count: look for . ! ? followed by space or end of string
  const sentences = trimmedText ? (trimmedText.match(/[.!?]+(\s|$)/g) || []).length || 1 : 0;

  // Paragraph count: split by double newlines
  const paragraphs = trimmedText ? trimmedText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;

  // Reading time: 200 words per minute
  const readingTimeSeconds = Math.ceil((words / 200) * 60);
  const readingTime = readingTimeSeconds < 60
    ? `${readingTimeSeconds} sec`
    : `${Math.ceil(readingTimeSeconds / 60)} min`;

  // Readability: based on average sentence length
  // Easy: < 15 words/sentence
  // Moderate: 15-25 words/sentence
  // Advanced: > 25 words/sentence
  const wordsPerSentence = sentences > 0 ? words / sentences : 0;
  let readability = 'Easy';
  if (wordsPerSentence > 25) {
    readability = 'Advanced';
  } else if (wordsPerSentence > 15) {
    readability = 'Moderate';
  }

  return {
    words,
    characters,
    sentences,
    paragraphs,
    readingTime,
    readability,
    wordsPerSentence
  };
};
