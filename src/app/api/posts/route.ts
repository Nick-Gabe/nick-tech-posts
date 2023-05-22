import posts from '@public/posts.json';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';

  try {
    const regex = new RegExp(search, 'ig');

    const includesSearch = (text: string): boolean => {
      return (
        regex.test(text) || text.toLowerCase().includes(search.toLowerCase())
      );
    };

    const filteredPosts = posts
      .filter((post) => includesSearch(post.full))
      // update description
      .map((post) => {
        if (!search) return post;
        const fullTextWithoutTitle = post.full.replace(post.title, '');
        if (!includesSearch(fullTextWithoutTitle)) return post;

        const allWords = fullTextWithoutTitle.split(' ').map((word) => {
          if (word.includes('\n')) {
            const split = word.split('\n');
            return split[split.length - 1] + '\n';
          }
          return word;
        });

        const start = index - 2;
        const index = allWords.findIndex((word) => includesSearch(word));
        const end = allWords.length - 1;
        let description = allWords.slice(start, end).join(' ');

        description =
          description.length > 100 ? description.slice(0, 100) : description;

        const firstWord = description.split(' ')[0];
        if (firstWord !== post.description.split(' ')[0])
          description = '...' + description;

        return {
          ...post,
          description,
        };
      });

    return new Response(JSON.stringify(filteredPosts));
  } catch (error) {
    return new Response('[]');
  }
}
