const rules = [
    {
        title: "youtube"
    },
    {
        title: "streaming",
        sites: [
            "netflix.com"
        ]
    },
    {
        title: "games",
        sites: [
            "chess.com",
            "zombsroyale.io/",
            "diep.io"
        ]
    },
    {
        title: "communication",
        sites: [
            "web.telegram.org",
            "discord.com",
            "hangouts.google.com"
        ]
    }
]

const rulesLookup = [
    {
        title: 'break',
        disable: [
            'youtube',
            'games',
            'streaming',
            'communication'
        ],
    },
    {
        title: 'communication',
        disable: [
            'communication',
        ],
    },
    {
        title: 'youtube',
        disable: [
            'youtube',
        ],
    },
    {
        title: 'content',
        disable: [
            'youtube',
            'streaming'
        ],
    },
    {
        title: 'games',
        disable: [
            'games'
        ],
    }
]