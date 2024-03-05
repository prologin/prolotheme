const frTranslation = 'https://raw.githubusercontent.com/scratchblocks/scratchblocks/main/locales/fr.json';

fetch(frTranslation)
    .then(s => s.json())
    .then(t => {
        window.scratchblocks.loadLanguages({
            fr: t,
        });

        scratchblocks.renderMatching('pre.blocks', {
            style:     'scratch3',
            languages: ['fr', 'en'],
            scale: 0.8,
        });
    });
