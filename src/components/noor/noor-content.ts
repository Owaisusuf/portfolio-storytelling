/**
 * The Noor layer's text. Qur'an and hadith are quoted verbatim from
 * authentic collections with references. Words attributed to scholars are
 * marked as "attributed" or paraphrased where the exact wording is uncertain.
 */

export type Saying = {
  text: string;
  source: string;
  arabic?: string;
  attributed?: boolean;
};

export const OPENING: Saying = {
  arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
  text: "Indeed, in the remembrance of Allah do hearts find rest.",
  source: "Qur'an 13:28",
};

export const HEART_HADITH: Saying = {
  text: "There is within the body a piece of flesh; if it is sound, the whole body is sound, and if it is corrupt, the whole body is corrupt. Truly, it is the heart.",
  source: "Prophet Muhammad ﷺ — Sahih al-Bukhari & Sahih Muslim",
};

export const EGO_HADITH: Saying = {
  text: "No one who has an atom's weight of arrogance in his heart will enter Paradise.",
  source: "Sahih Muslim",
};

export const REPENTANCE_HADITH: Saying = {
  text: "Every son of Adam sins, and the best of those who sin are those who repent.",
  source: "Jami' at-Tirmidhi",
};

export const SCHOLARS: Saying[] = [
  {
    text: "What can my enemies do to me? My paradise and my garden are in my chest; wherever I go they go with me.",
    source: "Attributed to Ibn Taymiyyah — Ibn al-Qayyim, al-Wabil al-Sayyib",
    attributed: true,
  },
  {
    text: "The truly imprisoned one is he whose heart is imprisoned from his Lord.",
    source: "Attributed to Ibn Taymiyyah",
    attributed: true,
  },
  {
    text: "Knowledge is not what is memorised — knowledge is what benefits.",
    source: "Attributed to Imam ash-Shafi'i",
    attributed: true,
  },
  {
    text: "I never debated anyone except that I prayed the truth would appear on his tongue rather than mine.",
    source: "Paraphrase of a saying attributed to Imam ash-Shafi'i",
    attributed: true,
  },
  {
    text: "A heart nourished by the remembrance of Allah finds a strength that nothing else can give it.",
    source: "Paraphrasing the theme of Ibn al-Qayyim, al-Wabil al-Sayyib",
    attributed: true,
  },
  {
    text: "Sins wound the heart; even after they heal, the mark of them remains as a warning.",
    source: "Paraphrasing a theme of Ibn al-Qayyim on the effects of sin",
    attributed: true,
  },
];

export const HASAN_AL_BASRI = [
  "The world is only three days.",
  "Yesterday has gone with all that it carried.",
  "Tomorrow may never arrive.",
  "Today is yours — so work in it.",
];

export const AHMAD: Saying = {
  text: "Between us and them are the funerals.",
  source: "Attributed to Imam Ahmad ibn Hanbal",
  attributed: true,
};

export const COMPANIONS: Saying[] = [
  {
    text: "Judge yourselves before you are judged. Weigh your deeds before they are weighed for you.",
    source: "Attributed to 'Umar ibn al-Khattab رضي الله عنه",
    attributed: true,
  },
  {
    text: "People are asleep, and when they die, they awaken.",
    source: "Attributed to 'Ali ibn Abi Talib رضي الله عنه",
    attributed: true,
  },
];

export const WHISPERS = [
  "Breathe. Say Alhamdulillah.",
  "Have you prayed today?",
  "When was the last time you opened the Qur'an?",
  "No scroll is longer than the scroll of our deeds.",
  "Say: SubhanAllah. Just once. Slowly.",
];

/** Authentic hadith only, from the six books. Rotates by day. */
export const DAILY_HADITH: Saying[] = [
  {
    text: "Actions are judged by intentions, and every person will have only what he intended.",
    source: "Sahih al-Bukhari 1 & Sahih Muslim 1907",
  },
  {
    text: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
    source: "Sahih al-Bukhari 6018 & Sahih Muslim 47",
  },
  {
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    source: "Sahih al-Bukhari 13 & Sahih Muslim 45",
  },
  {
    text: "The strong is not the one who overcomes people by his strength, but the one who controls himself while in anger.",
    source: "Sahih al-Bukhari 6114 & Sahih Muslim 2609",
  },
  {
    text: "Allah does not look at your appearance or your wealth, but He looks at your hearts and your deeds.",
    source: "Sahih Muslim 2564",
  },
  {
    text: "Be in this world as though you were a stranger or a traveller on a path.",
    source: "Sahih al-Bukhari 6416",
  },
  {
    text: "The most beloved deeds to Allah are the most constant ones, even if they are few.",
    source: "Sahih al-Bukhari 6464 & Sahih Muslim 783",
  },
];

/** Qur'an, quoted without alteration, with reference. Rotates by day. */
export const DAILY_AYAH: Saying[] = [
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    text: "For indeed, with hardship will be ease.",
    source: "Qur'an 94:5",
  },
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    text: "And whoever relies upon Allah — then He is sufficient for him.",
    source: "Qur'an 65:3",
  },
  {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    text: "And say: My Lord, increase me in knowledge.",
    source: "Qur'an 20:114",
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    text: "Indeed, Allah is with the patient.",
    source: "Qur'an 2:153",
  },
  {
    arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    text: "If you are grateful, I will surely increase you.",
    source: "Qur'an 14:7",
  },
  {
    arabic: "وَاللَّهُ خَيْرُ الرَّازِقِينَ",
    text: "And Allah is the best of providers.",
    source: "Qur'an 62:11",
  },
  {
    arabic: "أَلَا إِنَّ نَصْرَ اللَّهِ قَرِيبٌ",
    text: "Unquestionably, the help of Allah is near.",
    source: "Qur'an 2:214",
  },
];

/** Same for everyone on a given day, stable between SSR and hydration. */
export function pickForToday<T>(items: T[], date = new Date()): T {
  const day = Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86400000);
  return items[day % items.length];
}
