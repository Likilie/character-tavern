export async function getCharacterInfo(author: string, card_name: string): Promise<Node> {
    const API_URL: string = `https://api.chub.ai/api/characters/${author}/${card_name}?full=true`;
    console.log("Getting character info for " + author + "/" + card_name + " from " + API_URL);
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json() as Root;
    return data.node;
}

interface Root {
    errors: unknown
    is_favorite: boolean
    node: Node
    nodes: Nodes
    permissions: string
}

export interface Node {
createdAt: string
creatorId: unknown
definition: Definition
description: string
forks: unknown[]
forksCount: number
fullPath: string
hasGallery: boolean
id: number
is_favorite: boolean
is_public: boolean
labels: Label[]
lastActivityAt: string
nChats: number
nMessages: number
nTokens: number
n_favorites: number
n_public_chats: number
name: string
nsfw_image: boolean
permissions: string
primaryFormat: string
projectSpace: string
rating: string
ratingCount: number
related_characters: unknown[]
related_lorebooks: unknown[]
related_prompts: unknown[]
starCount: number
tagline: string
topics: string[]
}

interface Definition {
alternate_greetings: unknown[]
avatar: string
description: string
embedded_lorebook: unknown
example_dialogs: string
extensions: Extensions
first_message: string
full_path: string
id: number
is_public: boolean
name: string
nsfw_image: boolean
personality: string
post_history_instructions: string
project_name: string
scenario: string
system_prompt: string
tavern_personality: string
}

interface Extensions {
chub: Chub
}

interface Chub {
expressions: unknown
full_path: string
id: number
related_lorebooks: unknown[]
}

interface Label {
description: string
title: string
}

interface Nodes {}