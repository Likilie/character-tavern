export async function GetTags() : Promise<Tag[]> {
    const API_URL: string = "https://api.chub.ai/tags";
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
    }
    const data: Root = await response.json() as Root;
    return data.tags;
}

export interface Root {
    tags: Tag[]
  }
  
export interface Tag {
    id: number
    name: string
    non_private_projects_count: number
    title: string
}
  