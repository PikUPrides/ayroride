export interface JobPosting {
    id: number;
    title: string;
    location: string;
    experience: string;
    type: string;
    description: string;
    salary: string;
    slug: string;
    postedOn: string;
    about: string;
    longDescription: string;
    dayToDay: string[];
    benefits: string[];
    requirements: string[];
    earningsInfo: string;
    environment: string;
    howToApply: string[];
    applyLink: string;
}

const commonJobDetails = {
    postedOn: "14 Jan 2026",
    about: "Ride-sharing is broken for drivers and riders. AYRO is fixing that with a modern mobility platform designed around flexibility, fairness, and opportunity. Our mission is to create reliable transportation options while giving drivers the freedom to earn on their own terms.\n\nWe believe great platforms are built by diverse people from different backgrounds, experiences, and industries. AYRO is committed to inclusion and equal opportunity, and we welcome drivers from all walks of life.\n\nOur driver partners are the backbone of our platform – connecting communities, helping people get where they need to go, and earning a livable wage with flexibility and independence.",
    dayToDay: [
        "Show up on time and drive safely using in-app navigation",
        "Keep your vehicle clean, comfortable, and road-ready",
        "Treat every rider with courtesy and respect",
        "Follow traffic laws and AYRO's safety standards",
        "That's it. Just honest work, fair expectations, and a platform that treats you like a professional – because you are."
    ],
    benefits: [
        "No Surge Pricing Games. Know what you'll earn before each ride starts.",
        "Fair, Predictable Pay. No sudden rate drops. No unexplained deductions. Guaranteed $30+ per Active Hour, plus tips.",
        "Driver-First Platform. Built with driver feedback, not investor pressure.",
        "Fair Treatment rooted in respect and long-term trust",
        "Radical Transparency – see exactly what you'll earn before accepting a ride",
        "Real Human Support when you need it",
        "Quick signup process with step-by-step support",
        "High demand in major Texas cities",
        "Earn what you deserve. Build the life you want. Drive for AYRO. This role is ideal for part-time, gig-based, seasonal, or flexible work."
    ],
    requirements: [
        "Meet the minimum age requirement to drive in your city",
        "Have at least one year of licensed driving experience in the U.S. (three years if under 25 years old)",
        "Have a valid U.S. driver's license and proof of insurance",
        "Have access to an eligible, insured vehicle",
        "Maintain a clean driving record",
        "Are comfortable using a smartphone (iOS or Android)",
        "Consent to a background check. Additional documentation may be required depending on local or state regulations."
    ],
    earningsInfo: "Guaranteed **$30+ per Active Hour** (nearly double what other platforms pay drivers)",
    environment: "AYRO is committed to fostering a respectful, inclusive, and supportive environment. We value diversity and believe different perspectives make our platform stronger. AYRO provides equal opportunity to all applicants and does not discriminate based on any protected characteristic.",
    howToApply: [
        "Submit your ZipRecruiter application",
        "Complete required documentation",
        "Finish background screening",
        "Get approved and start driving",
        "Please do not email resumes or call. Applications are processed directly through ZipRecruiter for faster review."
    ],
    applyLink: "/join-our-waitlist" // Placeholder link
};

export const jobs: JobPosting[] = [
    {
        id: 1,
        title: "Dallas, TX - Driver Jobs",
        location: "Dallas, TX",
        experience: "2 Years",
        type: "Full time, part time, gig workers",
        description: "Drive with AYRO in Dallas, TX. Earn guaranteed $30+ per Active Hour, no surge pricing, flexible schedule, and real human support. Apply today...",
        salary: "$30+/ Active Hour (guaranteed)",
        slug: "drivers-in-dallas-tx",
        longDescription: "As an AYRO driver in **Dallas**, your job is simple: get people where they need to go safely, reliably, and with respect. You pick up riders through the AYRO app, drive them to their destination, and create a calm, professional experience along the way.",
        ...commonJobDetails
    },
    {
        id: 2,
        title: "Fort Worth, TX - Driver Jobs",
        location: "Fort Worth, TX",
        experience: "2 Years",
        type: "Full time, part time, gig workers",
        description: "Looking for driver jobs in Fort Worth? AYRO offers guaranteed $30+ per Active Hour, flexible driving schedules, and transparent pay...",
        salary: "$30+/ Active Hour (guaranteed)",
        slug: "drivers-in-fort-worth-tx",
        longDescription: "As an AYRO driver in **Fort Worth**, your job is simple: get people where they need to go safely, reliably, and with respect. You pick up riders through the AYRO app, drive them to their destination, and create a calm, professional experience along the way.",
        ...commonJobDetails
    },
    {
        id: 3,
        title: "Arlington, TX - Driver Jobs",
        location: "Arlington, TX",
        experience: "2 Years",
        type: "Full time, part time, gig workers",
        description: "Apply to drive with AYRO in Arlington, TX. Earn $30+ per Active Hour, choose your hours, no surge pricing, and driver-first pay...",
        salary: "$30+/ Active Hour (guaranteed)",
        slug: "drivers-in-arlington-tx",
        longDescription: "As an AYRO driver in **Arlington**, your job is simple: get people where they need to go safely, reliably, and with respect. You pick up riders through the AYRO app, drive them to their destination, and create a calm, professional experience along the way.",
        ...commonJobDetails
    },
    {
        id: 4,
        title: "Plano, TX - Driver Jobs",
        location: "Plano, TX",
        experience: "2 Years",
        type: "Full time, part time, gig workers",
        description: "Drive in Plano with AYRO. Guaranteed $30+ per Active Hour, predictable earnings, flexible schedules, and real support when you need it...",
        salary: "$30+/ Active Hour (guaranteed)",
        slug: "drivers-in-plano-tx",
        longDescription: "As an AYRO driver in **Plano**, your job is simple: get people where they need to go safely, reliably, and with respect. You pick up riders through the AYRO app, drive them to their destination, and create a calm, professional experience along the way.",
        ...commonJobDetails
    },
    {
        id: 5,
        title: "Irving, TX - Driver Jobs",
        location: "Irving, TX",
        experience: "2 Years",
        type: "Full time, part time, gig workers",
        description: "Join AYRO as a driver in Irving, TX. Earn $30+ per Active Hour, no hidden fees, flexible hours, and a driver-first platform...",
        salary: "$30+/ Active Hour (guaranteed)",
        slug: "drivers-in-irving-tx",
        longDescription: "As an AYRO driver in **Irving**, your job is simple: get people where they need to go safely, reliably, and with respect. You pick up riders through the AYRO app, drive them to their destination, and create a calm, professional experience along the way.",
        ...commonJobDetails
    },
    {
        id: 6,
        title: "Garland, TX - Driver Jobs",
        location: "Garland, TX",
        experience: "2 Years",
        type: "Full time, part time, gig workers",
        description: "Searching for driver jobs in Garland? AYRO guarantees $30+ per Active Hour with flexible schedules and transparent pay...",
        salary: "$30+/ Active Hour (guaranteed)",
        slug: "drivers-in-garland-tx",
        longDescription: "As an AYRO driver in **Garland**, your job is simple: get people where they need to go safely, reliably, and with respect. You pick up riders through the AYRO app, drive them to their destination, and create a calm, professional experience along the way.",
        ...commonJobDetails
    },
    {
        id: 7,
        title: "Frisco, TX - Driver Jobs",
        location: "Frisco, TX",
        experience: "2 Years",
        type: "Full time, part time, gig workers",
        description: "Drive with AYRO in Frisco, TX. Earn $30+ per Active Hour, choose your schedule, and enjoy a driver-first ride-share platform.",
        salary: "$30+/ Active Hour (guaranteed)",
        slug: "drivers-in-frisco-tx",
        longDescription: "As an AYRO driver in **Frisco**, your job is simple: get people where they need to go safely, reliably, and with respect. You pick up riders through the AYRO app, drive them to their destination, and create a calm, professional experience along the way.",
        ...commonJobDetails
    },
    {
        id: 8,
        title: "McKinney, TX - Driver Jobs",
        location: "McKinney, TX",
        experience: "2 Years",
        type: "Full time, part time, gig workers",
        description: "AYRO is hiring drivers in McKinney, TX. Guaranteed $30+ per Active Hour, flexible work, and no surge pricing games.",
        salary: "$30+/ Active Hour (guaranteed)",
        slug: "drivers-in-mckinney-tx",
        longDescription: "As an AYRO driver in **McKinney**, your job is simple: get people where they need to go safely, reliably, and with respect. You pick up riders through the AYRO app, drive them to their destination, and create a calm, professional experience along the way.",
        ...commonJobDetails
    },
    {
        id: 9,
        title: "Grand Prairie, TX - Driver Jobs",
        location: "Grand Prairie, TX",
        experience: "2 Years",
        type: "Full time, part time, gig workers",
        description: "Looking for flexible driver jobs in Grand Prairie? AYRO offers guaranteed $30+ per Active Hour and predictable earnings.",
        salary: "$30+/ Active Hour (guaranteed)",
        slug: "drivers-in-grand-prairie-tx",
        longDescription: "As an AYRO driver in **Grand Prairie**, your job is simple: get people where they need to go safely, reliably, and with respect. You pick up riders through the AYRO app, drive them to their destination, and create a calm, professional experience along the way.",
        ...commonJobDetails
    }
];
