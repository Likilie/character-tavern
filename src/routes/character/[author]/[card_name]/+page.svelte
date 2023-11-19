<script lang="ts">
    import { page } from '$app/stores';
    import { getCharacterInfo, type Node } from '$lib/functions/api/get_character_info';
    import { onDestroy, onMount } from "svelte";
    import dayjs from 'dayjs';
    import CardCarrousel from '$lib/components/catalog/CardCarrousel.svelte';
    import { CacheMode, SearchSort, type Label, type TOKEN_JSON } from '$lib/type';
    import SillyTavernIcon from '$lib/assets/icons/st-logo.png';
    import ChubVenusIcon from '$lib/assets/icons/chubvenus.png';
    import RisuAIIcon from '$lib/assets/icons/risu.png';
    import ExpressionPackIcon from '$lib/assets/icons/excite.png';
    import DownloadButton from '$lib/components/character_page/DownloadButton.svelte';
    import { donwload_tavern_card } from '$lib/functions/api/download_tavern_card';
    import Loader from '$lib/components/common/Loader.svelte';
    import { Ratings } from '@skeletonlabs/skeleton';
    import { getReviews, type Rating } from '$lib/functions/api/get_reviews';
    import DefinitionPanel from '$lib/components/character_page/DefinitionPanel.svelte';

    let Recommendations_Carrousel: CardCarrousel;

    let characterInfo: Node | undefined;
    let CARD_NAME: string;
    let CARD_TAGLINE: string;
    let CARD_DESCRIPTION: string;
    let CARD_TAG: string[];
    let CARD_NSFW: string;
    let IMAGE_URL_LOW_RES: string;
    let IMAGE_URL_HD: string;
    let CARD_AUTHOR: string;
    let CARD_CREATION_DATE: string;
    let CARD_DOWNLOAD_COUNT: number;
    let CARD_FAVORITE_COUNT: number;
    let CARD_CHATS_COUNT: number;
    let CARD_MESSAGES_COUNT: number;
    // TOKENS
    let CARD_TOKENS_JSON: TOKEN_JSON | null;
    let CARD_TOKENS_DESCRIPTION: number;
    let CARD_TOKENS_PERSONALITY: number;
    let CARD_TOKENS_SCENARIO: number;
    let CARD_TOKENS_MESSAGE_EXAMPLE: number;
    let CARD_TOKENS_FIRST_MESSAGE: number;
    let CARD_TOKENS_SYSTEM_PROMPT: number;
    let CARD_TOKENS_POST_HISTORY_INSTRUCTIONS: number;
    let CARD_TOKENS_TOTAL: number;
    let CARD_PERMANENT_TOKENS: number;


    let CARD_VENUS_LINK: string;
    let CARD_RISU_LINK: string;

    let CARD_REVIEWS: Rating[];

    // CARD DEFINITION
    let CARD_DESCRIPTION_DEF: string;
    let CARD_PERSONNALITY: string;
    let CARD_FIRST_MESSAGE: string;
    let CARD_EXAMPLE_MESSAGE: string;
    let CARD_SCENARIO: string;
    let CARD_ALTERNATIVE_GREETINGS: string;
    let CARD_SYSTEM_PROMPT: string;
    let CARD_POST_HISORY_INSTRUCTIONS: string;
    // EXPRESSION PACK
    let HAS_EXPRESSION_PACK: boolean;
    let CARD_EXPRESSION_PACK_URL: string | null = null;

    let CARD_SEO_DESCRIPTION: string = "Play with " + $page.params.card_name + " using their AI Card compatible with SillyTavern, Chub Venus and RisuAI.";

    let RATINGS_AVG: number;
    const MAX_RATINGS: number = 5;


    $: if ($page.params.author && $page.params.card_name) {
        initPage($page.params.author, $page.params.card_name);
    }

    async function initPage(AUTHOR: string, NAME: string) {
        console.log("Fetching the character info for " + AUTHOR + "/" + NAME + "...");
        characterInfo = undefined;
        characterInfo = await getCharacterInfo(AUTHOR, NAME);
        CARD_NAME = characterInfo.name;
        CARD_TAGLINE = characterInfo.tagline ? characterInfo.tagline : "No tagline provided by the card creator...";
        CARD_DESCRIPTION = characterInfo.description != "Creator's notes go here." ? characterInfo.description : "No description provided by the card creator...";
        CARD_SEO_DESCRIPTION = `Roleplay with ${CARD_NAME} using their AI Card : ${[CARD_TAGLINE !== "No tagline provided by the card creator..." ? CARD_TAGLINE : CARD_DESCRIPTION !== "No description provided by the card creator..." ? CARD_DESCRIPTION : "This AI Card permit to using AI to roleplay using SillyTavern, Chub Venus or RisuAI."]}`;
        CARD_TAG = characterInfo.topics.filter(topic => topic !== "ROOT");
        CARD_NSFW = characterInfo.topics.includes("NSFW") ? "NSFW" : "SFW";
        IMAGE_URL_LOW_RES = "https://avatars.charhub.io/avatars/" + characterInfo.fullPath + "/avatar.webp";
        IMAGE_URL_HD = "https://avatars.charhub.io/avatars/" + characterInfo.fullPath + "/tavern.png";
        CARD_AUTHOR = characterInfo.fullPath.substring(0, characterInfo.fullPath.indexOf('/'));
        CARD_CREATION_DATE = dayjs(characterInfo.createdAt).format("DD/MM/YYYY");
        CARD_VENUS_LINK = "https://venus.chub.ai/characters/" + characterInfo.fullPath;
        CARD_RISU_LINK = "https://risuai.xyz/?charahub=" + characterInfo.fullPath;
        CARD_DESCRIPTION_DEF = characterInfo.definition.personality;
        CARD_PERSONNALITY = characterInfo.definition.tavern_personality;
        CARD_FIRST_MESSAGE = characterInfo.definition.first_message;
        CARD_EXAMPLE_MESSAGE = characterInfo.definition.example_dialogs;
        CARD_SCENARIO = characterInfo.definition.scenario;
        CARD_ALTERNATIVE_GREETINGS = characterInfo.definition.alternate_greetings.join("\n\n<START>\n");
        CARD_SYSTEM_PROMPT = characterInfo.definition.system_prompt;
        CARD_POST_HISORY_INSTRUCTIONS = characterInfo.definition.post_history_instructions;
        HAS_EXPRESSION_PACK = characterInfo.labels.some(label => label.title === "EXPR");
        CARD_EXPRESSION_PACK_URL = characterInfo.labels.find(label => label.title === "EXPR")?.description ?? null;
        CARD_DOWNLOAD_COUNT = characterInfo.starCount;
        CARD_FAVORITE_COUNT = characterInfo.n_favorites;
        CARD_TOKENS_JSON = GetTokenJSON(characterInfo.labels);
        console.log(characterInfo.labels);
        CARD_TOKENS_DESCRIPTION = CARD_TOKENS_JSON?.description ?? 0;
        CARD_TOKENS_PERSONALITY = CARD_TOKENS_JSON?.personality ?? 0;
        CARD_TOKENS_SCENARIO = CARD_TOKENS_JSON?.scenario ?? 0;
        CARD_TOKENS_MESSAGE_EXAMPLE = CARD_TOKENS_JSON?.mes_example ?? 0;
        CARD_TOKENS_FIRST_MESSAGE = CARD_TOKENS_JSON?.first_mes ?? 0;
        CARD_TOKENS_SYSTEM_PROMPT = CARD_TOKENS_JSON?.system_prompt ?? 0;
        CARD_TOKENS_POST_HISTORY_INSTRUCTIONS = CARD_TOKENS_JSON?.post_history_instructions ?? 0;
        CARD_TOKENS_TOTAL = CARD_TOKENS_JSON?.total ?? 0;
        CARD_PERMANENT_TOKENS = CARD_TOKENS_DESCRIPTION + CARD_TOKENS_PERSONALITY + CARD_TOKENS_SCENARIO;
        CARD_CHATS_COUNT = characterInfo.nChats;
        CARD_MESSAGES_COUNT = characterInfo.nMessages;
        CARD_REVIEWS = await getReviews(characterInfo.id);
        RATINGS_AVG = CalculateRating();
    }

    function DownloadCard() {
        if (characterInfo) {
        donwload_tavern_card(characterInfo.fullPath);
        } else {
            alert("The card is not loaded yet. Please wait a few seconds and try again.");
        }
    }

    function CalculateRating() {
        let total: number = 0;
        CARD_REVIEWS.forEach(review => {
            total += review.rating;
        });
        return Math.round(total / CARD_REVIEWS.length);
    }

    // Scrool to View

    let DownloadDiv: HTMLDivElement;

    function ScroolToDownload() {
		if (!DownloadDiv) return;
        DownloadDiv.scrollIntoView({
            behavior: 'smooth'
        });
    }

    function GetTokenJSON(label: Label[]): TOKEN_JSON | null {
        const token_label = label.find(label => label.title === "TOKEN_COUNTS");
        if (token_label) {
            const token_json = JSON.parse(token_label.description) as TOKEN_JSON;
            return token_json;
        } else {
            return null;
        }
    }


</script>

<svelte:head>
	<title> {[CARD_NAME ? CARD_NAME : $page.params.card_name]} - AI Card | Character Tavern</title>
    <meta name="description" content={CARD_SEO_DESCRIPTION} />
</svelte:head>

<main class="dark lg:mx-32 p-3 md:p-6 space-y-6">
    {#if characterInfo}
    <div class="container-section md:grid md:grid-cols-10 md:gap-4 ">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img src={IMAGE_URL_HD} alt="Photo {CARD_NAME}" class="h-full rounded shadow-xl col-span-2 max-h-[50rem] cursor-pointer mb-4 md:mb-0" on:click={ScroolToDownload}>
        <div class="flex justify-start items-start flex-col gap-4 h-full w-full md:col-span-7">
            <div class="flex flex-col flex-wrap">
                <h1 class="flex gap-4 text-xl md:text-2xl text-primary-500 font-black">{CARD_NAME} <span class="chip {[CARD_NSFW === "NSFW" ? "variant-filled-primary" : "variant-filled"]} font-normal">{CARD_NSFW}</span></h1>
                <p class="font-bold whitespace-pre-line break-words">{CARD_TAGLINE}</p>
            </div>
            <p class="font-normal whitespace-pre-wrap">{CARD_DESCRIPTION}</p> <!-- TODO: Markdown formatting-->
            <div class="flex flex-wrap gap-4">
                {#each CARD_TAG as tag}
                <span class="chip variant-filled">{tag}</span>
                {/each}
            </div>
            <span><span class="font-bold">🔢 {CARD_TOKENS_TOTAL} Tokens</span> ( including {CARD_PERMANENT_TOKENS} Permanent Tokens )</span>
            <p class="font-bold flex items-center gap-4 flex-wrap"><span><i class="fa-solid fa-download text-primary-500"></i> {CARD_DOWNLOAD_COUNT} Downloads</span><span><i class="fa-solid fa-heart text-primary-500"></i> {CARD_FAVORITE_COUNT} Favorites</span><span><i class="fa-solid fa-comment text-primary-500"></i> {CARD_CHATS_COUNT} Chats</span><span><i class="fa-solid fa-comments text-primary-500"></i> {CARD_MESSAGES_COUNT} Messages</span></p>
            <p>Created by @{CARD_AUTHOR} on {CARD_CREATION_DATE}</p>
        </div>
    </div>
    <div class="container-section flex flex-col gap-4" bind:this={DownloadDiv}>
        <h2 class="w-full text-xl font-bold">💬 Download / Use this card</h2>
        <span class="flex flex-col flex-wrap md:flex-row gap-4 font-bold"><DownloadButton on:click={DownloadCard} text="Download for SillyTavern" icon={SillyTavernIcon} bg_color="b51616" /> <a href={CARD_VENUS_LINK} target="_blank"><DownloadButton text="Chat on Chub Venus" icon={ChubVenusIcon} bg_color="f9861c" /></a> <a href={CARD_RISU_LINK} target="_blank"><DownloadButton text="Chat on RisuAI" icon={RisuAIIcon} bg_color="4682b4" /></a></span>
        {#if HAS_EXPRESSION_PACK}
        <h2 class="w-full text-xl font-bold">📖 Extras Downloads</h2>
        <a href={CARD_EXPRESSION_PACK_URL} class="flex gap-4 font-bold"><DownloadButton text="Download the Expression Pack" icon={ExpressionPackIcon} bg_color="b51616" /></a>
        {/if}
    </div>
    <DefinitionPanel CARD_PERSONNALITY={CARD_PERSONNALITY} CARD_DESCRIPTION={CARD_DESCRIPTION_DEF} CARD_FIRST_MESSAGE={CARD_FIRST_MESSAGE} CARD_EXAMPLE_MESSAGE={CARD_EXAMPLE_MESSAGE} CARD_SCENARIO={CARD_SCENARIO} CARD_ALTERNATIVE_GREETINGS={CARD_ALTERNATIVE_GREETINGS} CARD_SYSTEM_PROMPT={CARD_SYSTEM_PROMPT} CARD_POST_HISORY_INSTRUCTIONS={CARD_POST_HISORY_INSTRUCTIONS} />
    <div class="container-section flex gap-6 flex-col">
        <h2 class="font-bold text-xl">🔥 Reviews  {#if RATINGS_AVG || RATINGS_AVG === 0}({RATINGS_AVG} / {MAX_RATINGS} <span class="text-primary-500"><i class="fa-solid fa-star"></i></span>){/if}</h2>
        <div class="space-y-2">
        {#if !CARD_REVIEWS}
            <p class="font-normal text-error-500">☠️ Error: Loading reviews !</p>
        {:else if CARD_REVIEWS.length == 0}
            <p class="font-normal">☠️ No reviews yet</p>
        {:else}
            {#each CARD_REVIEWS as review}
                <div class="mb-2">
                    <span class="w-full flex justify-between"><p class="flex gap-4">Anon <Ratings value={review.rating} max={MAX_RATINGS}><svelte:fragment slot="empty"><i class="fa-regular fa-star text-primary-500"></i></svelte:fragment><svelte:fragment slot="full"><i class="fa-solid fa-star text-primary-500"></i></svelte:fragment></Ratings></p><p class="font-thin text-white/40">{dayjs(review.comment_updated_at).format("DD/MM/YYYY")}</p></span>
                    <p class="font-normal whitespace-pre-wrap">{review.comment ? review.comment : "N/A"}</p>
                </div>
            {/each}
        {/if}
        </div>
    </div>
    {:else}
        <Loader text="Loading Character Info 🔥" />
    {/if}
    <CardCarrousel title="🔥 Recommendations" search_filter={SearchSort.random} cache={CacheMode.NoStore} bind:this={Recommendations_Carrousel} /> <!-- FIXME:  2 request each reload. PROBLEM WITH REACTIVITY !-->
</main>