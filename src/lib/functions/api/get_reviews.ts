export async function getReviews(id: number) : Promise<Rating[]> {
    const response = await fetch("https://api.chub.ai/ratings/" + id);
    const data = await response.json() as Root;
    return data.ratings;
}

type Root = {
    ratings: Rating[]
}

export interface Rating {
comment: string
comment_at: string
comment_updated_at: string
created_at: string
parent_id: number | null
project_id: number
rating: number
updated_at: string
user_id: number
}
  