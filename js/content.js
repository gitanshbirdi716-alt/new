/* ============================================================
   ALL YOUR CONTENT LIVES HERE. Edit text between the "quotes".
   - Keep the commas between items. Keep quotes balanced.
   - To add an item to a list [ ... ], copy one { ... } block (or one "line"),
     paste it right after, and change the words.
   - To remove an item, delete the whole block/line.
   - Emojis can be pasted anywhere. Use \n inside "quotes" for a line break.
   - Leave "" (empty) for anything optional you don't want.
   ============================================================ */
const SITE = {

  /* ---------- PASSWORD SCREEN (shown before anything else) ---------- */
  // Default password is: sweetheart   (CHANGE IT: open make-lock.html in your browser)
  gate: {
    enabled: true,
    title: "Before you come in 💗",
    prompt: "Enter the secret word",
    hint: "Hint: a rare nickname you gave me 😉, you only called me that 7 times in chat.",
    buttonText: "Unlock",
    wrongMessage: "Not quite, try again 💭",
    // Paste the two lines from make-lock.html here:
    salt: "176f16195271eb799704df7265d0d454",
    hash: "28d8f1f65b3eb2b664b437e322671e8ee1c56ec40559d70aa32a438527962ac1"
  },

  /* ---------- BASICS ---------- */
  pageTitle: "baby ka birthdayyy",
  girlfriendName: "motu",
  yourName: "chiku",

  /* ---------- LOOK & FEEL ---------- */
  theme: {
    pink: "#f8d7e8",        // soft pink
    cream: "#fff8f5",       // page background
    ivory: "#fffdf9",       // cards
    wine: "#7a1f3d",        // deep burgundy (headings, buttons)
    accent: "#c2456f",      // hearts, highlights
    text: "#4a2a35",        // body text
    headingFont: "Georgia, 'Times New Roman', serif",
    scriptFont: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    bodyFont: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    // Optional prettier fonts (uses Google Fonts = a third-party request). Paste a
    // link from fonts.google.com here, then put the font names in the fonts above.
    // Example: "https://fonts.googleapis.com/css2?family=Playfair+Display&family=Dancing+Script&display=swap"
    googleFontsUrl: ""
  },
  floatingHearts: true,
  heartEmojis: ["💗", "💖", "💕", "🤍", "✨"],

  /* ---------- SHOW / HIDE SECTIONS (true = show, false = hide) ---------- */
  sections: {
    hero: true, letter: true, reasons: true, gallery: true,
    timeline: true, surprises: true, final: true
  },
  /* Names shown in the top menu */
  navLabels: {
    hero: "Home", letter: "Letter", reasons: "Reasons", gallery: "Photos",
    timeline: "Memories", surprises: "Wish", final: "Finale"
  },

  /* ---------- OPENING SCREEN ---------- */
  opening: {
    enabled: true,
    greeting: "HAPPYYYY BIRTHDAYYYYY",
    message: "I made something, just for you.",
    buttonText: "Open Your Surprise 💌"
  },

  /* ---------- HERO ---------- */
  hero: {
    title: "HAPPIEST BIRTHDAY, MY BABY ❤️",
    subtitle: "aaj aapka birthday haiii hehehehehe, thank you for everything my baby.",
    image: "images/hero.jpg",     // put your photo at images/hero.jpg (or change this path)
    imagePosition: "center 30%",  // "center", "top", "center 20%", "left center" ...
    brightness: 0.9,              // 0.5 darker ... 1.2 brighter
    overlayOpacity: 0.35,         // 0 = no tint ... 0.8 = strong tint
    textAlign: "center",          // "left", "center", "right"
    textVertical: "center",       // "top", "center", "bottom"
    scrollText: "Scroll to discover"
  },

  /* ---------- LOVE LETTER ---------- */
  loveLetter: {
    title: "A litle thank you note for you 💌",
    typingEffect: false,          // true = text types out when it appears
    /* One entry per paragraph. Add as many as you like.
       Plain "text" = normal paragraph.
       { text: "...", highlight: true } = highlighted sentence. */
    paragraphs: [
      "Heyy babyy, i just want to thank you for all the love you have given me, for making my life literal heaven, for making me the happiest person on the planet, for everything you have done for me and for being the best person in my life.",
      "You literally are an ANGEL in a world full of evil, In a world where people hurt each other for their own good, you choose to heal people by being so selfless. You know i am an atheist but someone so perfect like you in a world like this makes me question everything, maybe god really did make an exception when he created you. THANK YOU SO FUCKIN MUCH  ",
      { text: "and remember this, YOU ARE THE PRETTIEST, I WILL CHOOSE ANY VERSION OF YOU OVER ANY FUCKIN ONE, YOU ARE MINE, I WILL NEVER EVER LEAVE YOU.", highlight: true },
      //"Line breaks\nwork too, if you put \\n where you want one."
    ],
    signature: "With all my love ❤️"
  },

  /* ---------- THINGS I LOVE ABOUT YOU ---------- */
  reasons: {
    title: "Things I Love About You 💗",
    intro: "A few of many.",
    items: [
      { emoji: "😊", title: "Your Smile", description: "Seeing you smile makes me smile, i always want to see you smiling no matter what, whenever i make you smile i just know i am doing something right.", image: "images/r1.jpeg" },
      { emoji: "👀", title: "Your eyes", description: "The way you see me with those beautiful eyes is something else. I am lost whenever I look into your eyes, it feels as if the whole world just fades away and it's only you and me left and its the best feeling in the world. ", image: "images/r2.jpeg" },
      { emoji: "🌍", title: "The Way You See the World", description: "In a world where people are so quick to judge, hurt, and turn away from others, you still choose to see the good in people", image: "images/r3.jpeg" },
      { emoji: "🤤", title: "Your kamar ofc", description: "I know you dont think that you are hot but trust me YOU ARE THE HOTTEST THING ON THE PLANET so shushhhh.", image: "images/r4.jpeg" }
      // add a photo to any card:  image: "images/reason-1.jpg"
    ]
  },

  /* ---------- PHOTO GALLERY ---------- */
  gallery: {
    title: "My favourite photos of US 📸",
    intro: "Tap a photo to see it bigger.",
    /* Put image files in the images/ folder, then add a line here. */
    items: [
      { image: "images/photo-1.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-2.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-3.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-4.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-5.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-6.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-7.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-8.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-9.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-10.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-11.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-12.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-13.jpeg", caption: "", date: "", note: "" },
      { image: "images/photo-14.jpeg", caption: "", date: "", note: "" }
      
    ]

    
  },

  

  /* ---------- MEMORIES TIMELINE ---------- */
  timeline: {
    title: "Our Memories ✨",
    intro: "",
    items: [
      { date: "", title: "The day i confessed", description: "10th august 2026, was the day i confessed my feelings for you. It will be always so special to me because i got to call you my girlfriend for the very first time. That day was the happiest day of my life. ", image: "", emoji: "✨", location: "" },
      { date: "", title: "Our first date", description: "31st august 2026, was the day of MY very first date with anyone, I was so nervous and scared that day even more the day I confessed because I didnt knew how to plan dates but that day became the best day of my life because i could see how happy you were.Proud of myself hehe.", image: "", emoji: "💞", location: "" },
      { date: "", title: "Today", description: "20th october 2026, your birthday, remember i told you that you are getting a boyfriend before your birthday, well here we are, not the best one but atleast you are dating your crush hehe. thank you for choosing me, thank you for never letting go of me, thank you so much for being the best.", image: "", emoji: "🎂", location: "" }
    ]
  },

  /* ---------- INTERACTIVE SURPRISES ---------- */
  surprises: {
    title: "Make your wish",

    envelope: {
      enabled: false,
      title: "Open Your Letter 💌",
      buttonText: "Open the envelope",
      message: "Replace this with a short message that appears inside the envelope.\n\nYou can use several lines."
    },

    randomMessage: {
      enabled: false,
      title: "Little Surprise ❤️",
      buttonText: "Tap for a surprise ❤️",
      messages: [
        "You are my favorite person ❤️",
        "I would choose you again and again 🫶",
        "You make life more beautiful 🥹"
      ]
    },

    reveal: {
      enabled: false,
      title: "A Special Reveal 🎁",
      buttonText: "Unwrap",
      text: "Replace this with a hidden birthday message or special paragraph.",
      image: ""                   // optional photo, e.g. "images/reveal.jpg"
    },

    cake: {
      enabled: true,
      title: "Make a Wish 🎂",
      candles: 3,
      hint: "Tap each candle to blow it out.",
      doneMessage: "Happy Birthday! I hope every wish comes true 🌟"
    },

    loveCounter: {
      enabled: true,            // set to true to show it
      title: "Days Together 💞",
      startDate: "2026-08-10",   // YYYY-MM-DD  (change to your real date!)
      label: "days of loving you"
    }
  },

  /* ---------- FINAL MESSAGE ---------- */
  final: {
    title: "Happy Birthday Love",
    message: "My love, I genuinely hope that every single wish your heart has ever made comes true. Even the little ones you whisper to yourself, the dreams you have for us, and the dreams you have for your family, all will come true one day. i hope this world is gentle toward you like you are with everyone else. i hope it gives you back all the kindness you have given to others. You are such a beautiful soul that i promise i would protect you from every little thing that could ever hurt you.",
    image: "",                   // optional background photo, e.g. "images/final.jpg"
    signature: "Forever yours, ❤️",
    buttonText: "One more thing 💗",
    buttonMessage: "I LOVE YOU SO FUCKIN MUCH BABY MWAHHHHHHHHH"
  },

  /* ---------- MUSIC ---------- */
  music: {
    enabled: false,              // set true after adding a file
    file: "audio/song.mp3",      // put YOUR file in the audio/ folder (only use music you have the right to use)
    title: "Our song",
    volume: 0.5                  // starting volume 0 to 1
  },

  footer: "Made with love by your chikuu 💗"
};
