import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { getPrismicClient } from "../../../prismicio";
import { asText } from "@prismicio/helpers";

import styles from "./styles.module.scss";
import { PrismicDocument } from "@prismicio/types";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Post | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = getPrismicClient({
    previewData,
    req: undefined,
  });

  const page = await client.getAllByType("page");

  const posts = page.map((post) => {
    let updated = new Date(post.last_publication_date).toLocaleDateString(
      undefined,
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
    return {
      slug: post.uid,
      title: asText(post.data.title),
      excerpt:
        post.data.content.find(
          (content: PrismicDocument) => content.type === "paragraph"
        )?.text ?? "",
      updatedAt: updated,
    };
  });

  return {
    props: { posts }, // Will be passed to the page component as props
  };
};
