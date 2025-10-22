
export interface Movie{
    _id:string
    title: string,
    year: Date,
    gender: string,
    watched: boolean,
    rating: number,
    createdAt: Date
}

// export interface MovieHandle{
//     title: string,
//     year: Date,
//     gender: string,
//     watched: boolean,
//     rating: number,
//     createdAt: Date
// }

export type movieUpdate = Partial<Movie>

