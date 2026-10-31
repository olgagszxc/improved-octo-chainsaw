/**
 * Central, editable business content for the Kaizen Fitness website.
 *
 * All key business facts live here so they are easy to update:
 * contact details, navigation, the referral promotion, FAQ answers,
 * and facility gallery entries. Nothing here is invented — details come
 * from Kaizen Fitness' own posters, photos and Instagram posts.
 */

import logo from "@/assets/photos/logo.png";
import logoHero from "@/assets/photos/logo-hero.jpg";
import gymFloor from "@/assets/photos/gym-floor-hiit.jpg";
import storefront from "@/assets/photos/storefront-night.jpg";
import team from "@/assets/photos/team.jpg";
import spinBikes from "@/assets/photos/spin-bikes.jpg";
import legMachine from "@/assets/photos/leg-machine.jpg";
import racks from "@/assets/photos/racks.jpg";
import plates from "@/assets/photos/plates.jpg";
import dumbbellFloor from "@/assets/photos/dumbbell-floor.jpg";
import pendulumSquat from "@/assets/photos/pendulum-squat.jpg";
import treadmills from "@/assets/photos/treadmills.jpg";

// All photos are Kaizen Fitness' own, cropped from the gym's Instagram posts.
export const images = {
  logo,
  logoHero,
  gymFloor,
  storefront,
  team,
  spinBikes,
  legMachine,
  racks,
  plates,
  dumbbellFloor,
  pendulumSquat,
  treadmills,
};

export const site = {
  name: "Kaizen Fitness",
  // The live address. Change this when the site moves to its own domain so
  // link previews on Facebook and Messenger keep showing the right image.
  url: "https://improved-octo-chainsaw.ashleyarzadon11.workers.dev",
  ogImage: "/og-image.jpg",
  tagline: "Built by discipline. Defined by progress.",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Facilities", to: "/facilities" },
  { label: "Memberships", to: "/memberships" },
  { label: "Referral Program", to: "/referral-program" },
  { label: "Contact", to: "/contact" },
] as const;

export const contact = {
  address:
    "Bugallon Street, Estacion Paniqui, Tarlac (in front of Eduardo Cojuangco National Vocational High School)",
  phoneDisplay: "0960 523 6510",
  phoneHref: "tel:+639605236510",
  facebookName: "Kaizen Fitness Paniqui",
  facebookUrl: "https://www.facebook.com/KaizenFitnessPaniqui",
  instagramHandle: "@kaizenfitness.paniqui",
  instagramUrl: "https://www.instagram.com/kaizenfitness.paniqui/",
  // From the gym's schedule post (May 2026).
  hours: "Monday to Saturday, 7:00 AM – 10:00 PM",
  hoursClosed: "Closed Sundays",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Kaizen%20Fitness%2C%20Bugallon%20Street%2C%20Estacion%2C%20Paniqui%2C%20Tarlac&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Kaizen%20Fitness%2C%20Bugallon%20Street%2C%20Estacion%2C%20Paniqui%2C%20Tarlac",
};

// To stop showing the promo, set `active` to false. To show a deadline again,
// set `endDate`, for example "December 31, 2026".
export const referralPromoData = {
  active: true,
  endDate: null as string | null,
  headline: "REFER. SAVE. REPEAT.",
  rewards: [
    {
      referrals: 1,
      label: "Refer 1 person",
      reward: "20% off",
      detail: "your next monthly renewal",
    },
    {
      referrals: 2,
      label: "Refer 2 people",
      reward: "50% off",
      detail: "your next monthly renewal",
    },
    {
      referrals: 3,
      label: "Refer 3 people",
      reward: "Free",
      detail: "your next monthly renewal",
    },
  ],
  terms: [
    "Promo is for active Kaizen Fitness members only.",
    "Referred clients must avail of 1-month access.",
    "Promo mechanics and validity apply.",
  ],
  eligibility:
    "Already an active member of Kaizen Fitness? Refer your friends and get rewarded with a discount on your next monthly renewal.",
};

export const fitnessGoals = [
  "General Fitness",
  "Weight Management",
  "Strength and Muscle Building",
  "Improved Endurance",
  "Getting Started",
  "Other",
] as const;

export const fitnessExperiences = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const timePreferences = ["Morning", "Afternoon", "Evening"] as const;

export const facilitiesCategories = [
  {
    name: "Strength Training",
    description:
      "Squat racks, Kaizen bumper plates, a pendulum squat and a leg extension and curl combo for serious lower- and upper-body strength work.",
    images: [
      {
        src: racks,
        alt: "Squat racks loaded with Kaizen bumper plates",
        credit: "Kaizen Fitness",
      },
      {
        src: plates,
        alt: "Kaizen 10 kg bumper plates on the plate tree",
        credit: "Kaizen Fitness",
      },
      {
        src: pendulumSquat,
        alt: "Pendulum squat machine loaded with Kaizen plates",
        credit: "Kaizen Fitness",
      },
      {
        src: legMachine,
        alt: "Seated leg extension and curl combo machine",
        credit: "Kaizen Fitness",
      },
    ],
  },
  {
    name: "Free Weights & Group Training",
    description:
      "A full dumbbell rack and an open floor for group sessions like our HIIT classes.",
    images: [
      {
        src: gymFloor,
        alt: "Members training with dumbbells on the gym floor",
        credit: "Kaizen Fitness",
      },
      {
        src: dumbbellFloor,
        alt: "Dumbbell rack along the rubber training floor",
        credit: "Kaizen Fitness",
      },
    ],
  },
  {
    name: "Cardio",
    description:
      "Curved Xtreme treadmills, spin bikes, Concept2 rowers and SkiErgs for endurance and conditioning.",
    images: [
      {
        src: treadmills,
        alt: "Curved treadmills in front of the spin bikes",
        credit: "Kaizen Fitness",
      },
      {
        src: spinBikes,
        alt: "Row of spin bikes in the cardio area",
        credit: "Kaizen Fitness",
      },
    ],
  },
] as const;

export const gymRates = [
  {
    name: "Monthly gym access",
    price: "₱1,400",
    detail: "Train any day we're open, Monday to Saturday",
  },
];

export const coachingRates = [
  { name: "1-on-1 coaching", price: "₱500", detail: "Per session" },
  {
    name: "1-on-1 coaching, 12 sessions",
    price: "₱4,200",
    detail: "Save ₱1,800 against single sessions",
  },
  {
    name: "Group coaching, 12 sessions",
    price: "₱2,800",
    detail: "Per person, minimum of 3 people",
  },
];

export const coachingNote =
  "Coaching fees do not include the gym rate, which is charged separately.";

export const coaches = [
  {
    name: "Coach Mond",
    role: "Coach & HIIT class lead",
    text: "Leads our high-energy HIIT group sessions: full-body circuits with structure and a push that brings out your best.",
  },
  {
    name: "Coach Dexter",
    role: "In-house coach",
    text: "Our in-house coach, great for beginners, first-time guests and anyone ready to start again.",
  },
];

export const faqItems = [
  {
    question: "How do I get started at Kaizen Fitness?",
    answer:
      "The easiest way is to book a free consultation through this website. You can also message us on Facebook, send us an Instagram DM, call 0960 523 6510, or visit us at the gym.",
  },
  {
    question: "Is the consultation free?",
    answer:
      "Yes — the consultation is completely free with no obligation. It is a conversation about your goals and your options.",
  },
  {
    question: "What happens during the consultation?",
    answer:
      "You sit down with our team to talk about your fitness goals and experience, ask any questions you have, and learn which membership options could fit you. It is a discussion — you are not asked to work out or commit to anything.",
  },
  {
    question: "Which membership should I choose?",
    answer:
      "That depends on your goals, schedule, and budget. Our team will walk you through the current options during your consultation so you can decide with the full picture.",
  },
  {
    question: "Can beginners join?",
    answer:
      "Absolutely. Many of our members started as complete beginners. Every fitness level is welcome, and the consultation is a comfortable way to start.",
  },
  {
    question: "How can I learn about membership pricing?",
    answer:
      "Monthly gym access is ₱1,400, and 1-on-1 or group coaching can be added on top. See the Memberships page for the full price list, or ask us during your free consultation.",
  },
  {
    question: "How does the referral program work?",
    answer:
      "Active members who refer friends earn a discount on their next monthly renewal — refer 1 person for 20% off, 2 people for 50% off, or 3 people for a free next monthly renewal. Referred clients must avail of 1-month access, and promo mechanics and validity apply.",
  },
  {
    question: "How do I contact the gym?",
    answer:
      "Call or text 0960 523 6510, message Kaizen Fitness Paniqui on Facebook or @kaizenfitness.paniqui on Instagram, or visit us on Bugallon Street, Estacion Paniqui, Tarlac.",
  },
] as const;
