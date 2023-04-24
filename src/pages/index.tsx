import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import { Inter } from 'next/font/google'
import { getBlogs } from '~/services/blog/blog.service'
import { BlogPost } from '~/types/blog.type'
import { useMemo, useState } from 'react'
import BlogPreview from '~/components/BlogPreview'

const inter = Inter({ subsets: ['latin'] })

export default function Home({
  blogData,
  tags,
} : InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [filterWord, setFilterWord] = useState<string[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number[]>([])
  const filteredBlog: BlogPost[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: BlogPost) => {
          return filterWord.every((filter) => blog.tags.includes(filter))
        })
      : blogData
  }, [filterWord, blogData])
  const filterLabel = (tag: any, idx: number) => {
    if (selectedIdx.includes(idx)) {
      setSelectedIdx(selectedIdx.filter((id) => id !== idx))
      setFilterWord(filterWord.filter((filter) => filter !== tag.innerText))
    } else {
      setSelectedIdx([...selectedIdx, idx])
      setFilterWord([...filterWord, tag.innerText])
    }
  }

  return (
    <main className='min-h-screen min-w-screen bg-zinc-800 text-neutral-200'>
      <title>Home Page</title>
      <section>
        <div className='flex flex-col items-center text-center'>
          <h1 className='text-[2rem]'>Welcome to my-blog</h1>
          <p>Amet sint sit in dolore qui esse aute pariatur anim deserunt pariatur quis quis.</p>
        </div>
      </section>

      <section className="flex flex-col items-center text-[1.15rem] mt-12">
        <div className="flex gap-3 mb-12">
          {tags.map((tag: any, idx: number) => {
            return (
              <button
                className={`${
                  selectedIdx.includes(idx)
                    ? 'label-selected bg-sky-300 hover:bg-sky-400 transition-all duration-300'
                    : 'label hover:bg-sky-400 transition-all duration-300'
                } bg-sky-600 px-2 mt-2 font-semibold rounded-xl text-zinc-800`}
                key={idx}
                onClick={(e) => filterLabel(e.target, idx)}
              >
                {tag}
              </button>
            )
          })}
        </div>
        {filteredBlog.map((blog: BlogPost) => {
          return (
            <div
              key={blog.id}
              className='max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-white text-zinc-800 rounded-lg p-4 hover:bg-slate-600 hover:text-neutral-300 transition-all duration-300'>
              <a href={blog.url} target='_blank' rel='noreferrer'>
                <BlogPreview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
            </div>
          );
        })}
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs()
  let tags: string[] = []
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    }
  }
  console.log('tags',tags);
  
  return {
    props: {
      blogData: blogs,
      tags: tags,
    },
  }
}