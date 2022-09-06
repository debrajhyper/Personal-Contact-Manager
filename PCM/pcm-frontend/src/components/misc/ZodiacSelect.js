import zodiac from "./ZodiacImg";

export const ZodiacSign = (sign) => {
    switch (sign) {
        case "CAPRICORN":
            return zodiac.CAPRICORN;
        case "AQUARIUS":
            return zodiac.AQUARIUS;
        case "PISCES":
            return zodiac.PISCES;
        case "ARIES":
            return zodiac.ARIES;
        case "TAURUS":
            return zodiac.TAURUS;
        case "GEMINI":
            return zodiac.GEMINI;
        case "CANCER":
            return zodiac.CANCER;
        case "LEO":
            return zodiac.LEO;
        case "VIRGO":
            return zodiac.VIRGO;
        case "LIBRA":
            return zodiac.LIBRA;
        case "SCORPIO":
            return zodiac.SCORPIO;
        case "SAGITTARIUS":
            return zodiac.SAGITTARIUS;
        default:
            return zodiac.default;
    }
}