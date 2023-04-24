import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import BlogHeader from '../../components/BlogHeader'
import { getBlogDetail } from '~/services/blog/blog.service'
import parse from 'html-react-parser'

const BlogPost: NextPage = ({
  blogData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {author, bodyHTML, createdAt, title} = blogData
  return (
    <main className='min-h-screen min-w-screen bg-zinc-800 text-neutral-200'>
      <section className="flex justify-center layout">
        <div className="py-10 max-w-[50%]">
          <h1 className="text-center text-[2rem] font-bold"> {title} </h1>
          <div className="flex justify-center mb-4">
            <BlogHeader createdAt={createdAt} author={author} />
          </div>
          <div className={`flex flex-col`}>{parse(bodyHTML)}</div>
        </div>
      </section>
    </main>
  )
}

export default BlogPost

export const getServerSideProps: GetServerSideProps = async (context) => {
  const route: string[] | string | undefined = context.query.id
  const id = Number(route)
  let blogDetail = await getBlogDetail(id)
  return {
    props: {
      blogData: blogDetail,
    },
  }
}
