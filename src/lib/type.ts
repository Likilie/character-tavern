export interface Card {
    id: number
    name: string
    fullPath: string
    description: string
    starCount: number
    lastActivityAt: string
    createdAt: string
    labels: Label[]
    topics: string[]
    forksCount: number
    rating: number
    ratingCount: number
    projectSpace: string
    creatorId: number
    nTokens: number
    tagline: string
    primaryFormat: string
    related_characters: unknown[]
    related_lorebooks: number[]
    related_prompts: unknown[]
    forks?: unknown[]
    hasGallery: boolean
    nChats: number
    nMessages: number
    definition: unknown
    permissions: unknown
    is_public: boolean
    is_favorite: boolean
    nsfw_image: boolean
    n_public_chats: number
}

export enum SearchSort {
    download_count = "download_count",
    id = "id",
    rating = "rating",
    default = "default",
    rating_count = "rating_count",
    last_activity_at = "last_activity_at",
    trending_downloads = "trending_downloads",
    created_at = "created_at",
    name = "name",
    n_tokens = "n_tokens",
    random = "random",
}

export interface Label {
    title: string
    description: string
}

export enum CacheMode {
    // Uses the browser's standard HTTP cache logic.
    Default = "default",

    // Bypasses the cache: does not load the response from the cache and does not update it.
    NoStore = "no-store",
  
    // Bypasses the cache but updates it with the response for future requests.
    Reload = "reload",
  
    // The response is downloaded from the server if there is no up-to-date version in the cache.
    NoCache = "no-cache",
  
    // Uses the cached response if available, even if it's stale, to save bandwidth.
    ForceCache = "force-cache"
}

export interface TOKEN_JSON {
    description: number
    personality: number
    scenario: number
    mes_example: number
    first_mes: number
    system_prompt: number
    post_history_instructions: number
    total: number
  }
  