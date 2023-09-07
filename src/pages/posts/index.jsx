import Link from 'next/link';

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/');
  const posts = await res.json();
  console.log(res)
  return {
    props: {
      posts,
    },
  };
}

export default function Posts({posts}){
    return (
        <main className='m-2'>
          <h1 className="text-3xl text-indigo-900 bg-indigo-300 flex justify-center p-3">All Posts</h1>
          {posts.map((post) => (
            <div  className="border-solid border-2 m-2 border-indigo-600/50 p-5" key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <h1 className="text-l font-medium text-indigo-900 title-font mb-2"> {post.title}</h1>
              </Link>
            </div>
          ))}
        </main>
      );
}
