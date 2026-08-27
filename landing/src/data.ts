/** All site content lives here. Pages, schema, cards, sitemap and FAQ markup
 *  are generated from this module so the visible copy and the structured data
 *  can never drift apart. */

export type Figure = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Section = {
  h2: string;
  paras: string[];
  figure?: Figure;
  cta?: { text: string };
  steps?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  /** Answer-first opening paragraph. */
  intro: string;
  feature: { src: string; alt: string; width: number; height: number };
  howto?: { name: string; steps: { name: string; text: string }[] };
  sections: Section[];
  faq: { q: string; a: string }[];
  related: string[];
};

/* ------------------------------------------------------------------ app */

export const APP = {
  name: "Swatchr",
  fullName: "Swatchr: Color Picker",
  tagline:
    "Point your camera at any color and copy it as hex, RGB, HSL or CMYK.",
  author: "Neil Brazil",
  minOS: "iOS 18",
  price: "Free with a one-time unlock",
};

export const SCREENS: Figure[] = [
  {
    src: "assets/screens/camera-crosshair-hex.jpg",
    alt: "Swatchr's live camera color picker with the crosshair on a sunflower petal, naming the color Darkkhaki and listing #CCC353, rgb(204, 195, 83), hsl(56, 54%, 56%) and cmyk(0%, 4%, 59%, 20%)",
    caption:
      "Drag the crosshair anywhere in the viewfinder. The readout updates as you move.",
    width: 552,
    height: 1200,
  },
  {
    src: "assets/screens/photo-color-picker.jpg",
    alt: "Picking a color from a saved photo of fabric bolts in Swatchr, returning Indianred #B0385E with its RGB, HSL and CMYK codes",
    caption:
      "Photos work the same way. Tap a point in any image from your library.",
    width: 552,
    height: 1200,
  },
  {
    src: "assets/screens/saved-palette.jpg",
    alt: "The Swatchr home screen showing Camera and Photo buttons above a saved palette grid of named swatches including Indianred, Darkblue, Cadetblue and Sienna with their hex codes",
    caption:
      "Saved colors sit in a grid, each with its name and hex code under the swatch.",
    width: 552,
    height: 1200,
  },
  {
    src: "assets/screens/complementary-colors.jpg",
    alt: "A saved Swatchr color called Olive, #949D0E, with three suggested harmony colors beneath it and their own hex codes",
    caption:
      "Every color comes with its opposite on the wheel plus the two shades either side of it.",
    width: 552,
    height: 1200,
  },
  {
    src: "assets/screens/home-screen-widget.jpg",
    alt: "An iPhone Home Screen with the Swatchr widget showing the saved color Olive as a filled swatch with its hex code",
    caption:
      "The widget shows your most recent saved color without opening the app.",
    width: 552,
    height: 1200,
  },
  {
    src: "assets/screens/export-color-card.jpg",
    alt: "Swatchr's export screen turning the saved color Indianred into a shareable card listing #B83760 with its RGB, HSL and CMYK values",
    caption:
      "Export any saved color as an image you can drop into a message or a brief.",
    width: 552,
    height: 1200,
  },
];

export const FEATURES = [
  {
    title: "Live camera picker",
    body: "Drag the crosshair over anything the camera can see. The color reads out as you move, so you can hunt for the exact shade instead of taking a photo and hoping.",
  },
  {
    title: "Pick from your photo library",
    body: "Open any saved image and tap a point in it. Useful for screenshots, product photos and reference shots taken months ago.",
  },
  {
    title: "Four formats, always visible",
    body: "Hex, RGB, HSL and CMYK sit on screen together. Tap the one you need and it goes to the clipboard. No format switcher, no menu.",
  },
  {
    title: "A name for every color",
    body: "Each pick is matched to the nearest of the 140-odd CSS color keywords, so you get Cadetblue or Rosybrown rather than only a six-digit code.",
  },
  {
    title: "Harmony suggestions",
    body: "Alongside each color you get its opposite on the wheel and the two neighbors 30 degrees either side, all with their own hex codes.",
  },
  {
    title: "Saved palette, widget and export",
    body: "The one-time unlock adds an unlimited saved palette, a Home Screen widget showing your latest color, and export cards you can share.",
  },
];

export const HOW_IT_WORKS = [
  {
    n: "1",
    title: "Open the camera or a photo",
    body: "Two buttons on the first screen. Nothing to set up, no account to make.",
  },
  {
    n: "2",
    title: "Move the crosshair",
    body: "Drag it over the color you want. Tap once to freeze the reading so a shaky hand doesn't lose it.",
  },
  {
    n: "3",
    title: "Tap the code you need",
    body: "Hex for CSS, RGB for most design tools, HSL for tweaking, CMYK for anything heading to print.",
  },
];

/* ------------------------------------------------------------------ FAQ */

export const FAQ = [
  {
    q: "How do I find the hex code of a color in a photo on my iPhone?",
    a: "Open the photo in Swatchr, tap the point you want, and the hex code appears with the RGB, HSL and CMYK values underneath. Tap the hex row to copy it. iOS also has a hidden eyedropper in the Markup tool, though it only gives you one value at a time.",
    guide: "how-to-find-hex-code-from-photo-iphone",
  },
  {
    q: "Can I pick a color from my camera instead of a photo?",
    a: "Yes. The camera view samples continuously as you drag the crosshair, so you can read the color of a wall, a fabric or a printed sample without photographing it first. Tap to freeze the reading once you have it.",
    guide: "pick-a-color-with-your-iphone-camera",
  },
  {
    q: "What is the difference between hex, RGB, HSL and CMYK?",
    a: "Hex and RGB describe the same screen color in different notation. HSL splits it into hue, saturation and lightness, which makes manual adjustment much easier. CMYK describes ink coverage for print.",
    guide: "hex-rgb-hsl-cmyk-color-codes-explained",
  },
  {
    q: "Does Swatchr give CMYK values for print work?",
    a: "It does, on the same readout as everything else. Treat the numbers as a starting point rather than a press-ready spec, because the conversion has no printer profile behind it.",
    guide: "get-cmyk-values-from-a-photo",
  },
  {
    q: "How do I find a color that goes with the one I picked?",
    a: "Swatchr shows three suggestions under each color: the hue rotated 180 degrees, and the two hues 30 degrees either side. Saturation and lightness stay put so the suggestions look related rather than random.",
    guide: "find-complementary-colors-for-any-color",
  },
  {
    q: "Can I save colors into a palette?",
    a: "The saved palette is part of the one-time unlock. Once it is on, there is no limit on how many colors you keep, and they stay on the device rather than syncing to a server.",
    guide: "save-a-color-palette-on-iphone",
  },
  {
    q: "What if I do not know what a color is called?",
    a: "Every pick is matched to its nearest CSS color keyword, so a murky yellow-green comes back as Darkolivegreen. It is an approximate match by distance in RGB, which is enough to describe a color to somebody else.",
    guide: "identify-a-color-you-cant-name",
  },
  {
    q: "Is there a Home Screen widget?",
    a: "Yes, included in the unlock. The small widget shows your most recent saved color as a filled swatch with its name and code, which is handy when you are working to a palette all week.",
    guide: "iphone-color-picker-widget",
  },
  {
    q: "Does Swatchr work without an internet connection?",
    a: "Everything runs on the device. There is no account, no sync and no server, so the camera and photo picking both work in airplane mode.",
  },
  {
    q: "How much does Swatchr cost?",
    a: "The download is free and the camera picking, photo picking and all four format codes are free with no usage limit. Saving to a palette, the widget and export cards are behind a single one-time purchase, not a subscription.",
  },
];

/* --------------------------------------------------------------- guides */

const F = (slug: string, alt: string) => ({
  src: `assets/guides/${slug}-feature.webp`,
  alt,
  width: 1536,
  height: 1024,
});

export const GUIDES: Guide[] = [
  {
    slug: "how-to-find-hex-code-from-photo-iphone",
    title: "How to Find the Hex Code of a Color in a Photo on iPhone",
    description:
      "Three ways to pull a hex code out of a photo on iPhone, including the eyedropper hidden in iOS Markup and a faster route that gives you RGB, HSL and CMYK at the same time.",
    h1: "How to find the hex code of a color in a photo on iPhone",
    intro:
      "Open the photo in a color picker app, tap the pixel you want, and read the hex code off the result. On stock iOS the tool is buried in Markup: screenshot the image, tap the color circle, open the Sliders tab and use the eyedropper. That gives you hex only. A dedicated picker gives you the hex plus the other three formats in the same tap.",
    feature: F(
      "how-to-find-hex-code-from-photo-iphone",
      "Horizontal color bands of varying widths on a deep navy background",
    ),
    howto: {
      name: "Find a hex code in a photo on iPhone",
      steps: [
        {
          name: "Open the image",
          text: "In Swatchr, tap Photo and choose the picture you want to sample.",
        },
        {
          name: "Position the crosshair",
          text: "Drag the crosshair to the exact pixel. Pinch to zoom first if the area is small or noisy.",
        },
        {
          name: "Copy the code",
          text: "Tap the hex row in the readout card. The value goes straight to the clipboard.",
        },
      ],
    },
    sections: [
      {
        h2: "The route Apple gives you, and where it runs out",
        paras: [
          "iOS has had an eyedropper since iOS 14, but it lives inside Markup rather than in Photos. You take a screenshot, tap the preview, tap the color circle at the bottom, switch to the Sliders tab and tap the dropper. Drag the loupe around and the hex field updates.",
          "It works. The problem is what happens next. You get one value, in one format, and you have to write it down before you leave Markup, because nothing is saved. If your day involves more than the occasional color, the friction adds up fast.",
        ],
      },
      {
        h2: "Getting the hex code and the other formats at once",
        paras: [
          "Swatchr shows all four notations on the same card: hex, RGB, HSL and CMYK. Tapping any row copies that row. If you are writing CSS you take the hex, if you are in Figma you take the RGB, and you never open a converter in between.",
          "The pick is also named. #B0385E comes back as Indianred, which matters more than it sounds when you are trying to describe a color to a client over the phone.",
        ],
        figure: SCREENS[1],
      },
      {
        h2: "Getting an accurate reading from a photograph",
        paras: [
          "A photograph is not a color swatch. JPEG compression smears color information across blocks of pixels, so two points a few pixels apart in what looks like flat color can differ by ten or fifteen in each channel.",
          "Zoom in before you sample, and pick from the middle of a flat region rather than near an edge. Avoid highlights and shadow: a wall photographed in direct sun reads several shades lighter than the paint actually is. If the photo was taken under a warm bulb, expect everything to skew yellow, and sample a known white in the frame to see how far off it is.",
        ],
        cta: {
          text: "Swatchr reads the hex, RGB, HSL and CMYK of any pixel in your photo library. Free to download.",
        },
      },
    ],
    faq: [
      {
        q: "Can I get a hex code from a screenshot?",
        a: "Yes. A screenshot is an image like any other, and screenshots avoid the camera and lighting problems entirely, so the value you read is the value that was on screen.",
      },
      {
        q: "Why does the same color give a different hex in two apps?",
        a: "Usually color space. An image tagged Display P3 sampled as sRGB comes out different, and some apps average a small area rather than reading a single pixel.",
      },
    ],
    related: [
      "pick-a-color-with-your-iphone-camera",
      "hex-rgb-hsl-cmyk-color-codes-explained",
      "identify-a-color-you-cant-name",
    ],
  },

  {
    slug: "pick-a-color-with-your-iphone-camera",
    title: "How to Pick a Color With Your iPhone Camera",
    description:
      "Use your iPhone camera as a live eyedropper to read the color of a wall, fabric or printed sample, and get a hex code without taking a photo first.",
    h1: "How to pick a color with your iPhone camera",
    intro:
      "Your iPhone camera can act as a live eyedropper. Aim it at the wall, the fabric or the printed sample, put the crosshair on the color, and the value updates as you move. Nothing is captured or saved unless you choose to save it. The advantage over photographing something first is that you can walk around the object and watch how the reading shifts under different light.",
    feature: F(
      "pick-a-color-with-your-iphone-camera",
      "Soft blurred discs of teal, green and violet drifting across a dark blue field",
    ),
    sections: [
      {
        h2: "Why live sampling beats photographing first",
        paras: [
          "When you photograph something and sample it later, you are stuck with whatever the camera decided about exposure and white balance at that moment. Live sampling lets you see the reading move. Tilt the phone, step out of the shadow, turn away from the window, and watch the numbers settle.",
          "That movement is information. If a wall reads #C8BFA6 from one angle and #B4A98E from another, neither is wrong. You are seeing how much the light is doing, and you can pick the reading that matches the conditions you actually care about.",
        ],
        figure: SCREENS[0],
      },
      {
        h2: "Freezing the reading before you lose it",
        paras: [
          "Holding a phone steady while reading four rows of numbers is awkward. Tap once and the sample locks; the button changes to Tap to Resume so you can lower the phone and read the card properly.",
          "The frozen reading behaves like any other pick. You can copy any of the four formats from it, look at the harmony suggestions, or save it to your palette if you have the unlock.",
        ],
      },
      {
        h2: "Where the camera reading will mislead you",
        paras: [
          "Three situations to watch. Glossy surfaces bounce the light source straight back, so you sample the bulb rather than the paint. Fluorescent and LED lighting shifts hue noticeably, usually green or blue. And auto-exposure adapts to whatever fills the frame, which means a dark object framed tightly comes out lighter than it is.",
          "The fix for all three is the same: fill less of the frame with the target, get out of direct light, and take a second reading from a different angle. If the two agree you can trust them.",
        ],
        cta: {
          text: "Swatchr turns the camera into a live eyedropper with hex, RGB, HSL and CMYK on one card.",
        },
      },
    ],
    faq: [
      {
        q: "Does Swatchr save photos while I am picking?",
        a: "No. The camera feed is sampled for a pixel value and nothing is written to your library or sent anywhere.",
      },
      {
        q: "Can I use it on a computer screen?",
        a: "You can, but a photo of a screen picks up moiré and the screen's own color cast. A screenshot sampled from the photo library is more accurate.",
      },
    ],
    related: [
      "how-to-find-hex-code-from-photo-iphone",
      "get-cmyk-values-from-a-photo",
      "save-a-color-palette-on-iphone",
    ],
  },

  {
    slug: "hex-rgb-hsl-cmyk-color-codes-explained",
    title: "Hex, RGB, HSL and CMYK: Which Color Code Should You Use?",
    description:
      "What hex, RGB, HSL and CMYK actually describe, how they relate to each other, and which one to reach for when you are writing CSS, working in a design tool or sending a file to print.",
    h1: "Hex, RGB, HSL and CMYK color codes explained",
    intro:
      "Hex and RGB are the same information written two ways: three channel values from 0 to 255, either in decimal or as pairs of hexadecimal digits. HSL rewrites that same color as hue, saturation and lightness, which makes it far easier to adjust by hand. CMYK is a different beast: it describes ink on paper, not light on a screen.",
    feature: F(
      "hex-rgb-hsl-cmyk-color-codes-explained",
      "A grid of violet and magenta swatch tiles with a few cells left empty",
    ),
    sections: [
      {
        h2: "Hex and RGB describe the same thing",
        paras: [
          "#B0385E and rgb(176, 56, 94) are one color. Take 176, write it in base 16 and you get B0. Do the same with 56 and 94 and you get 38 and 5E. That is the entire relationship.",
          "Which you use is a matter of context. CSS and most design tools accept both. Hex is more compact and survives being pasted into a chat window; RGB is easier to read when you want to know that the red channel is roughly three times the green.",
        ],
      },
      {
        h2: "HSL is the one worth learning",
        paras: [
          "HSL splits a color into hue in degrees around a wheel, saturation as a percentage, and lightness as a percentage. hsl(341, 52%, 45%) is the same Indianred as above.",
          "The advantage shows up the moment you want a variation. Making a color 10% lighter in hex means guessing at three separate numbers. In HSL you add ten to the last value. Building a set of tints, finding a hover state, or checking whether two colors share a hue are all trivial in HSL and fiddly in hex.",
        ],
        figure: SCREENS[3],
      },
      {
        h2: "CMYK is about ink, and it does not fully overlap",
        paras: [
          "CMYK gives four percentages for cyan, magenta, yellow and black ink. Screens emit light and get brighter as you add color; ink absorbs light and gets darker. The two describe overlapping but different sets of colors.",
          "Some screen colors have no CMYK equivalent at all. Bright saturated blues and greens are the usual casualties: the vivid #00A3FF you approved on a monitor will print duller, and no conversion setting fixes that. Knowing the CMYK number early tells you which colors are going to be a problem.",
        ],
        cta: {
          text: "Swatchr shows all four formats side by side for any color you pick. Tap one to copy it.",
        },
      },
      {
        h2: "Picking the right one",
        paras: [
          "For CSS and web work, hex. For design tools and anything where you are reasoning about channels, RGB. For building variations and checking relationships, HSL. For print, CMYK, with a proof before you commit to a run.",
          "In practice you want the same color in more than one of these on the same day, which is the argument for having all four on screen at once rather than converting between them.",
        ],
      },
    ],
    faq: [
      {
        q: "What about HSB and HSV?",
        a: "HSB and HSV are the same model as each other, and close to HSL but not identical. They use brightness rather than lightness, so full brightness gives you a saturated color where full lightness in HSL gives you white.",
      },
      {
        q: "Is a hex code with eight digits valid?",
        a: "Yes, in CSS. The last two digits are alpha, so #B0385E80 is that color at about 50% opacity.",
      },
    ],
    related: [
      "get-cmyk-values-from-a-photo",
      "find-complementary-colors-for-any-color",
      "how-to-find-hex-code-from-photo-iphone",
    ],
  },

  {
    slug: "get-cmyk-values-from-a-photo",
    title: "How to Get CMYK Values From a Color in a Photo",
    description:
      "Read the CMYK breakdown of any color from a photo or your camera, and understand why the numbers are a starting point for print rather than a press-ready specification.",
    h1: "How to get CMYK values from a color in a photo",
    intro:
      "Any picker that reports CMYK alongside RGB gives you the four ink percentages in a single tap. Swatchr puts them on the same card as the hex code, which means a color pulled off a printed sample or a photograph goes into a print spec without a detour through a converter.",
    feature: F(
      "get-cmyk-values-from-a-photo",
      "A staircase of blue bars stepping from dark to light across a dark ground",
    ),
    sections: [
      {
        h2: "Reading the four numbers",
        paras: [
          "cmyk(0%, 68%, 47%, 31%) means no cyan ink, 68% magenta, 47% yellow and 31% black. Add them up and you get total ink coverage, which matters because commercial presses have a limit, often around 300%, above which the paper stops accepting ink cleanly.",
          "The K channel is the useful one to watch. A high K with low color channels tells you the color is mostly a gray, and a color reading K of 0 with three high channels is going to be built from three inks where one black would have done it more cleanly.",
        ],
        figure: SCREENS[5],
      },
      {
        h2: "Why these numbers are a start, not a spec",
        paras: [
          "The conversion from a screen color to CMYK has no single correct answer. The right numbers depend on the press, the ink, the paper and the profile the printer works to. Coated stock takes ink differently from uncoated, and the same file sent to two printers comes back looking different.",
          "So use the reading to get in the right area and to spot problems early. If a color comes back with a very high total coverage, or with a saturated blue that has no sensible ink mix, you have learned something useful before the artwork is built rather than after the proof arrives.",
        ],
        cta: {
          text: "Get CMYK, hex, RGB and HSL from one tap on any photo or camera view.",
        },
      },
      {
        h2: "Sampling a printed sample properly",
        paras: [
          "If the color you care about is already printed, photograph it in indirect daylight, not under a desk lamp and not in direct sun. Lay the sample flat, keep the phone parallel to it, and avoid casting your own shadow across the frame.",
          "Take readings from two or three points and compare. Ink laid over a halftone screen rather than as a solid will vary point to point, and averaging your own readings by eye gets you closer than trusting a single pixel.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I get a Pantone number this way?",
        a: "No. Pantone colors are a licensed system with their own reference data, and matching to them needs that data rather than a conversion formula.",
      },
      {
        q: "Should I design in CMYK from the start?",
        a: "For print, working in CMYK from the beginning avoids nasty surprises at conversion time, because you only ever see colors the process can actually produce.",
      },
    ],
    related: [
      "hex-rgb-hsl-cmyk-color-codes-explained",
      "how-to-find-hex-code-from-photo-iphone",
      "identify-a-color-you-cant-name",
    ],
  },

  {
    slug: "find-complementary-colors-for-any-color",
    title: "How to Find Complementary Colors for Any Color",
    description:
      "Find the complement of any color by rotating its hue 180 degrees, plus the analogous shades either side, with the hex codes worked out for you.",
    h1: "How to find complementary colors for any color",
    intro:
      "The complement of a color is the hue directly opposite it on the wheel: take the hue angle and add 180 degrees, keeping saturation and lightness where they are. For hsl(64, 84%, 34%), an olive green, the complement is hsl(244, 84%, 34%), a deep indigo. Swatchr works this out for every color you pick and shows the result as a tappable swatch.",
    feature: F(
      "find-complementary-colors-for-any-color",
      "A pink field and a green field facing each other across a narrow gap",
    ),
    sections: [
      {
        h2: "The arithmetic, if you want to do it yourself",
        paras: [
          "Convert the color to HSL, add 180 to the hue, wrap anything over 360 back round to the start, and convert back. The important part is leaving saturation and lightness alone. Rotating hue alone keeps the two colors feeling like a pair; changing all three gives you two unrelated colors that happen to be opposite.",
          "This is also why a complement generated from a muted color is muted, and one generated from a fluorescent color is fluorescent. The relationship carries the character of the original across.",
        ],
        figure: SCREENS[3],
      },
      {
        h2: "Analogous colors, and when to use them instead",
        paras: [
          "A straight complement is high contrast and can be too much for a large area. The two hues 30 degrees either side of your color, its analogous neighbors, sit closer and read as a gentle progression rather than a clash.",
          "A common approach is analogous for the bulk of a design and the complement for the one thing that needs to be noticed: the button, the price, the call to action. Swatchr gives you all three under each pick, so you can see both options against the original before deciding.",
        ],
      },
      {
        h2: "Why the complement sometimes looks wrong",
        paras: [
          "Hue rotation is a mathematical relationship, not a perceptual one. Human vision is not equally sensitive across the wheel, and yellows in particular look much lighter than blues at the same lightness value. So a yellow and its computed complement can be a correct pair on paper and a poor pair on screen.",
          "Trust your eyes over the arithmetic. Use the computed complement as the starting point, then nudge the lightness until the two sit comfortably together, which usually means darkening the yellow or lightening the blue.",
        ],
        cta: {
          text: "Every color you pick in Swatchr arrives with its complement and both analogous neighbors, hex codes included.",
        },
      },
    ],
    faq: [
      {
        q: "What is a split-complementary scheme?",
        a: "Instead of the exact opposite, you take the two hues either side of it, usually 150 and 210 degrees from the original. It keeps most of the contrast while being easier to balance.",
      },
      {
        q: "Do complements work the same way in CMYK?",
        a: "The idea carries over but the numbers do not. Ink mixing is subtractive, so a complement calculated in HSL and then converted to CMYK is the reliable route.",
      },
    ],
    related: [
      "hex-rgb-hsl-cmyk-color-codes-explained",
      "save-a-color-palette-on-iphone",
      "identify-a-color-you-cant-name",
    ],
  },

  {
    slug: "save-a-color-palette-on-iphone",
    title: "How to Save a Color Palette on iPhone",
    description:
      "Keep the colors you pick in a palette on your iPhone, organize them by name and hex code, and get at them again without a screenshot folder or a notes file.",
    h1: "How to save a color palette on iPhone",
    intro:
      "There is a plus button on the readout card next to every color you pick. Tap it and the color joins a grid of saved swatches, each one showing the swatch itself, its name and its hex code. In Swatchr the palette comes with the one-time unlock. It holds as many colors as you want and lives on the device rather than in an account somewhere.",
    feature: F(
      "save-a-color-palette-on-iphone",
      "Nested rounded rectangles stepping from blue to magenta, anchored to the lower right",
    ),
    sections: [
      {
        h2: "What most people do instead, and why it stops working",
        paras: [
          "The usual system is a folder of screenshots, or a note with hex codes typed into it. Both work for about a fortnight. Screenshots lose their order and give you no way to search, and a note of hex codes is unreadable because #7EAE98 tells you nothing about what the color looks like.",
          "A palette solves the specific problem that a color needs to be seen and identified at the same time. Swatchr's grid shows the swatch, the CSS name and the hex together, so you recognize the one you want before you read anything.",
        ],
        figure: SCREENS[2],
      },
      {
        h2: "Saving harmony suggestions too",
        paras: [
          "The complement and analogous colors under each pick have their own plus buttons. If you are building a scheme around one base color, you can capture the whole set in four taps rather than picking each one separately.",
          "That is usually how a palette starts: one color off a photograph, then its neighbors, then a couple of adjustments made later once you have seen them together.",
        ],
        cta: {
          text: "Unlock an unlimited saved palette, the Home Screen widget and export cards with one purchase.",
        },
      },
      {
        h2: "Getting colors back out",
        paras: [
          "Tap any saved swatch to open it full size with all four format codes, the same as a fresh pick. Copy whichever one you need.",
          "For sending a color to somebody else, the export card turns a swatch into an image with the name and all four codes laid out, which is easier to act on than a hex code pasted into a message on its own.",
        ],
      },
    ],
    faq: [
      {
        q: "Do saved colors sync between my devices?",
        a: "No. Swatchr has no account and no server, so the palette lives on the device it was created on and is included in your encrypted device backup.",
      },
      {
        q: "Is there a limit on how many colors I can save?",
        a: "No limit once the unlock is active. It is a one-time purchase rather than a subscription.",
      },
    ],
    related: [
      "iphone-color-picker-widget",
      "find-complementary-colors-for-any-color",
      "pick-a-color-with-your-iphone-camera",
    ],
  },

  {
    slug: "identify-a-color-you-cant-name",
    title: "How to Identify a Color You Can't Name",
    description:
      "Put a name to a color you can only point at, using the standard CSS color keywords, and get the hex code that goes with it.",
    h1: "How to identify a color you can't name",
    intro:
      "The trick is to match what you sampled against a standard reference list rather than trying to describe it. Swatchr uses the CSS color keywords, about 140 named colors that every browser and design tool understands. A color you could only point at and call murky yellow-green comes back as Darkolivegreen, with #513C27 attached to it.",
    feature: F(
      "identify-a-color-you-cant-name",
      "Color-wheel segments of uneven length radiating from an off-center hub",
    ),
    sections: [
      {
        h2: "Why a name is more useful than a code",
        paras: [
          "Hex codes are precise and useless in conversation. Nobody pictures #7EAE98 when you say it. Cadetblue, though, lands immediately, and the person you are talking to can go and look it up.",
          "Names also make a saved palette scannable. A grid of twenty hex codes all looks the same at a glance, but Sienna, Olive and Rosybrown sitting next to each other tell you what kind of palette you are looking at before you have read a single number.",
        ],
        figure: SCREENS[0],
      },
      {
        h2: "How the match is worked out",
        paras: [
          "Swatchr compares the sampled color to every entry in the CSS keyword table and returns the nearest by straight-line distance in RGB. It is a simple measure rather than a perceptual one, which means it is fast, predictable, and occasionally not the name you would have chosen.",
          "The honest description is approximate. A color halfway between two keywords will pick one of them, and it may not be the one your eye votes for. Take the name as a label for the color, not a claim that they are identical.",
        ],
      },
      {
        h2: "The cases where naming breaks down",
        paras: [
          "The CSS list is dense in some regions and thin in others. There are a great many named grays and blues, and comparatively few named browns, so browns get pulled towards Sienna and Rosybrown more often than they deserve.",
          "Very dark and very light colors are the other weak spot. Below about 10% lightness everything converges on black, and the name stops carrying much information. When you are working near either end of the range, read the hex.",
        ],
        cta: {
          text: "Swatchr names every color it picks and shows the hex, RGB, HSL and CMYK alongside it.",
        },
      },
    ],
    faq: [
      {
        q: "Are CSS color names an official standard?",
        a: "They come from the CSS Color specification, which inherited them from the original X11 and SVG keyword lists. Every modern browser supports the same set.",
      },
      {
        q: "Can it name a paint or Pantone color?",
        a: "No. Those are proprietary licensed systems with their own reference data, and Swatchr matches against the open CSS keyword list instead.",
      },
    ],
    related: [
      "how-to-find-hex-code-from-photo-iphone",
      "save-a-color-palette-on-iphone",
      "hex-rgb-hsl-cmyk-color-codes-explained",
    ],
  },

  {
    slug: "iphone-color-picker-widget",
    title: "Put a Color Picker Widget on Your iPhone Home Screen",
    description:
      "Add a Home Screen widget that shows your most recent saved color as a filled swatch with its name and code, so the palette you are working to is always visible.",
    h1: "Put a color picker widget on your iPhone Home Screen",
    intro:
      "Long-press an empty area of the Home Screen, tap Edit then Add Widget, search for Swatchr and add the small size. The widget shows your latest saved color as a filled swatch with its name and code underneath, and it updates whenever you save a new one.",
    feature: F(
      "iphone-color-picker-widget",
      "Broad diagonal ribbons in magenta, red and gold crossing a dark blue frame",
    ),
    howto: {
      name: "Add the Swatchr widget to your Home Screen",
      steps: [
        {
          name: "Enter edit mode",
          text: "Press and hold an empty part of the Home Screen until the icons start to jiggle, then tap Edit and choose Add Widget.",
        },
        {
          name: "Find Swatchr",
          text: "Search for Swatchr in the widget gallery and select the small widget.",
        },
        {
          name: "Place it",
          text: "Drag it where you want it and tap Done. It fills with your most recently saved color.",
        },
      ],
    },
    sections: [
      {
        h2: "What the widget is actually for",
        paras: [
          "It is a reminder rather than a tool. When you are working to a particular color for a week, having it sitting on the Home Screen means you stop second-guessing whether the green you are looking at is the right green.",
          "Tapping it opens Swatchr on that color, so it doubles as a shortcut to the codes when you need to paste one somewhere.",
        ],
      },
      {
        h2: "Choosing which color it shows",
        paras: [
          "By default the widget follows the most recent addition to your palette. Save a new color and the widget catches up at the next refresh, which iOS schedules rather than doing instantly.",
          "The widget is part of the one-time unlock, along with the saved palette it draws from, so it needs at least one saved color before it has anything to display.",
        ],
        cta: {
          text: "The widget, the unlimited palette and export cards all come with a single one-time unlock.",
        },
      },
      {
        h2: "If it is not updating",
        paras: [
          "iOS decides when widgets refresh and it is stingy about it, particularly on Low Power Mode. A widget that looks stale is usually waiting for its next allotted refresh rather than broken.",
          "If it stays wrong for longer than a few minutes, opening the app forces the shared data to be rewritten. Removing the widget and adding it again clears anything more stubborn than that.",
        ],
        figure: SCREENS[4],
      },
    ],
    faq: [
      {
        q: "Can I put the widget on the Lock Screen?",
        a: "The current version ships a small Home Screen widget. Lock Screen sizes are a different widget family and are not included yet.",
      },
      {
        q: "Does the widget work without opening the app?",
        a: "Yes. It reads from a shared store on the device, so it displays your latest saved color whether or not the app is running.",
      },
    ],
    related: [
      "save-a-color-palette-on-iphone",
      "pick-a-color-with-your-iphone-camera",
      "find-complementary-colors-for-any-color",
    ],
  },
];

export const guideBySlug = (slug: string) =>
  GUIDES.find((g) => g.slug === slug)!;
