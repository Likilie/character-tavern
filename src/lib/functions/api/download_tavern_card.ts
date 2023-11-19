export async function donwload_tavern_card(full_path: string) {
    const url = 'https://api.chub.ai/api/characters/download';
    const headers = new Headers({
        'accept': '*/*',
        'Content-Type': 'application/json'
    });

    const body = JSON.stringify({
        format: 'tavern',
        fullPath: full_path,
        version: 'main'
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = full_path + '.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}