import Link from 'next/link';

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/` + params.id
  );
  const resComments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}/comments/`
  );
  const postData = await res.json();
  const commentData = await resComments.json();
  return {
    props: {
      postData,
      commentData,
    },
  };
}

export default function PostsInfo({ postData, commentData }) {
  return (
    <main className="container px-5 py-24 mx-auto p-5">
      <h1 className="text-2xl font-medium text-gray-900 title-font mb-2">
        {postData.id} / {postData.title}
      </h1>
      <p className="font-semibold title-font text-gray-700">{postData.body}</p>
      <ul>
        {commentData.map((comment) => (
          <li
            className="border-solid border-2 m-2 border-indigo-600/50 p-5"
            key={comment.id}
          >
            <h2 className="text-l font-medium text-indigo-900 title-font mb-2">
              {comment.name}
            </h2>

            <p className="leading-relaxed">{comment.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
