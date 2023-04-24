export function discussionGraphQL(discussionCategoryId: string | undefined) {
  return `{
        repository(owner: "kyphans", name: "MyBlog") {
            discussions(first: 100, categoryId: "${discussionCategoryId}") {
              nodes {
                title
                url
                number
                bodyHTML
                bodyText
                createdAt
                lastEditedAt
                author {
                  login
                  url
                  avatarUrl
                }
                labels(first: 100) {
                  nodes {
                    name,
                    color
                  }
                }
              }
            }
          }
    }`
}

export function discussionDetailGraphQL(postId: number | undefined) {
  return `{
    repository(owner: "kyphans", name: "MyBlog") {
      discussion(number: ${postId}) {
        title
        bodyHTML
        createdAt
        author {
          login
          url
          avatarUrl
        }
      }
    }
  }`
}
