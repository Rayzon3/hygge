export interface Post {
    identifier: string
    title: string
    slug: string
    subName: string
    createdAt: string
    updatedAt: string
    username: string
    body?: string
    url: string
    totalVotes?: number
    countComment?: number
    userVote?: number 
}

export interface User{
    username: string
    email: string
    createdAt: string
    updatedAt: string
}