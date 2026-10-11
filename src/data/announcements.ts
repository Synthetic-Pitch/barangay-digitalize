import {
    BriefcaseBusiness,
    CalendarDays,
    GraduationCap,
    HeartPulse,
    Home,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import cleaningPic from "../assets/img/community-cleanup.jpg";

export type Announcement =
    | {
        slug: string;
        category: string;
        title: string;
        description: string;
        date: string;
        body: string[];
        highlights?: string[];
        type: "image";
        image: string;
        link: string;
    }
    | {
        slug: string;
        category: string;
        title: string;
        description: string;
        date: string;
        body: string[];
        highlights?: string[];
        type: "graphic";
        icon: LucideIcon;
        graphicText: string[];
        bgClass: string;
        iconColor: string;
        textColor: string;
        link: string;
    };

export const announcements: Announcement[] = [
    {
        slug: "clean-up",
        category: "Community",
        title: "Sama-sama para sa mas malinis na Tumana",
        description: "A neighborhood clean-up brings residents together for a cleaner, greener community.",
        date: "September 27, 2026",
        type: "image",
        image: cleaningPic,
        link: "/announcements/clean-up",
        body: [
            "Noong nakaraang Sabado, sumali ang daan-daang residente ng Barangay Tumana sa aming buwanang community clean-up drive. Mula sa mga kabataan hanggang sa mga lolo at lola, nagkaisa ang lahat para linisin ang mga kalsada, estero, at mga pampublikong lugar sa buong barangay.",
            "Ang aktibidad ay sinimulan ng maaga sa umaga sa pamumuno ng Punong Barangay at ng mga kagawad, kasama ang Barangay Environment Committee at mga volunteer na kabataan. Naglaan ang barangay ng mga sako, guwantes, walis, at iba pang kagamitan upang matiyak na ligtas at organisado ang paglilinis.",
            "Bukod sa paglilinis, isinagawa rin ang isang drive para sa proper waste segregation kung saan naipon ang mahigit 80 sako ng basura mula sa mga main road at eskinita. Ang mga natipong materyales ay hinati para sa recycling at maayos na disposal sa pamamagitan ng ating mga kasosyong junk shops at garbage collection services.",
            "Patuloy ang aming paalala sa mga residente: ang malinis na Tumana ay simula ng malusog na pamayanan. Ang susunod na community clean-up ay gaganapin sa ikaapat na Sabado ng susunod na buwan. Malugod naming kayong inaanyayahan na makiisa muli — together, we keep Tumana clean and green.",
        ],
        highlights: [
            "Over 200 residents joined the clean-up drive",
            "Sacks, gloves, and cleaning tools provided by the barangay",
            "80+ sacks of garbage collected and properly segregated",
            "Next clean-up: fourth Saturday of next month, 6:00 AM at the Barangay Hall grounds",
        ],
    },
    {
        slug: "health-wellness",
        category: "Health & wellness",
        title: "Kalusugan para sa bawat pamilya",
        description: "Community health consultations and wellness initiatives for our residents.",
        date: "September 19, 2026",
        type: "graphic",
        icon: HeartPulse,
        graphicText: ["Healthy families.", "Stronger community."],
        bgClass: "bg-[#eaf1fb]",
        iconColor: "text-[#2563eb]",
        textColor: "text-[#1e40af]",
        link: "/announcements/health-wellness",
        body: [
            "Nagbukas ang Barangay Tumana ng libreng health consultations para sa lahat ng residente tuwing Miyerkules sa Tumana Health Center. Kasama sa serbisyo ang libreng blood pressure monitoring, blood sugar screening, at check-up sa mga duktor mula sa Marikina City Health Office.",
            "Bilang bahagi ng ating health and wellness program, namigay rin ang barangay ng libreng vitamins at iron supplements para sa mga buntis at batang walong taong pababa, alinsunod sa programa ng City Nutrition Office. Mayroon ding feeding session ang mga barangay health workers para sa mga batang nangangailangan ng nutrisyonal na suporta.",
            "Malugod din kaming inaanyayahan ang mga senior citizen na lumahok sa aming weekly wellness sessions na kinabibilangan ng light exercise, Zumba, at health education forums. Ang mga sessions ay gaganapin tuwing Biyernes ng umaga sa Tumana Covered Court at bukas para sa lahat ng senior citizens na naka-registro sa barangay.",
            "Para sa mga nais magpasuri, walang kinakailangang appointment — dumiretso lamang sa Tumana Health Center tuwing Miyerkules mula 8:00 AM hanggang 12:00 NN. Dalhin lamang ang inyong barangay health card o anumang valid ID. Ang ating mga barangay health workers ay handang tumulong sa mga katanungan tungkol sa inyong kalusugan.",
        ],
        highlights: [
            "Free consultations every Wednesday, 8:00 AM – 12:00 NN at Tumana Health Center",
            "Free blood pressure and blood sugar screening for all residents",
            "Vitamins and supplements for pregnant women and children 8 years old and below",
            "Senior citizen wellness sessions every Friday morning at the Covered Court",
        ],
    },
    {
        slug: "youth-education",
        category: "Youth & education",
        title: "Supporting our next generation",
        description: "Learning and youth development opportunities for young Tumanans.",
        date: "September 5, 2026",
        type: "graphic",
        icon: GraduationCap,
        graphicText: ["Big dreams.", "Brighter futures."],
        bgClass: "bg-[#faeed7]",
        iconColor: "text-[#b45309]",
        textColor: "text-[#92400e]",
        link: "/announcements/youth-education",
        body: [
            "Ipinagmamalaki ng Barangay Tumana ang paglulunsad ng Scholarship Assistance Program para sa mga kabataang Tumana na may mataas na pamantayan sa pag-aaral ngunit nangangailangan ng tulong pinansyal. Sakop ng programa ang tulong para sa matrikula, school supplies, at allowance para sa mga kwalipikadong elementary at high school students.",
            "Kasabay nito, nagbukas ang barangay ng libreng tutorial at reading sessions tuwing Sabado sa Tumana Barangay Library. Ang mga sessions ay pinamumunuan ng mga volunteer na guro at senior high school students na nais magbigay ng tulong sa mga batang nahihirapan sa Math, Science, at reading comprehension.",
            "Para naman sa mga kabataang nais magpalawak ng kanilang mga kakayahan, aktibo ang ating Sangguniang Kabataan sa mga skills training tulad ng computer literacy, bread and pastry making, at electrical wiring courses. Layunin ng mga programang ito na bigyan ang mga kabataan ng practical na kasanayan na magagamit nila sa kanilang kinabukasan.",
            "Ang pagtanggap ng application para sa Scholarship Assistance Program ay bukas hanggang sa katapusan ng buwan. Ang mga requirements at detalye ay maaaring tingnan sa Sangguniang Kabataan office o sa Barangay Hall information desk. Naniniwala kami na ang edukasyon ay pinakamagandang pamana na maibibigay natin sa ating mga kabataan.",
        ],
        highlights: [
            "Scholarship Assistance Program now open for elementary and high school students",
            "Free tutorial and reading sessions every Saturday at the Barangay Library",
            "Skills training by the SK: computer literacy, bread & pastry, and electrical wiring",
            "Applications accepted until end of the month at the SK office or Barangay Hall",
        ],
    },
    {
        slug: "barangay-id-registration",
        category: "Barangay services",
        title: "Barangay ID registration now open",
        description: "Residents may apply or renew their Barangay ID at the barangay hall this month.",
        date: "August 28, 2026",
        type: "graphic",
        icon: ShieldCheck,
        graphicText: ["Valid ID.", "Easy access."],
        bgClass: "bg-[#e8f5ee]",
        iconColor: "text-[#047857]",
        textColor: "text-[#065f46]",
        link: "/announcements/barangay-id-registration",
        body: [
            "Bukas na ang Barangay ID registration at renewal para sa lahat ng residente ng Tumana. Ang Barangay ID ay maaaring gamitin sa barangay transactions, local assistance programs, at iba pang community services.",
            "Maaaring mag-apply sa Barangay Hall mula Lunes hanggang Biyernes, 8:00 AM hanggang 5:00 PM. Pinapaalalahanan ang lahat na magdala ng valid ID, proof of residency, at isang recent 1x1 photo para mas mabilis ang proseso.",
            "Para sa senior citizens, persons with disability, at solo parents, may nakalaang priority lane upang mas maging maginhawa ang pagkuha ng serbisyo.",
        ],
        highlights: [
            "Open Monday to Friday, 8:00 AM - 5:00 PM",
            "Bring valid ID, proof of residency, and one 1x1 photo",
            "Priority lane available for seniors, PWDs, and solo parents",
        ],
    },
    {
        slug: "livelihood-training",
        category: "Livelihood",
        title: "Free livelihood training for residents",
        description: "Hands-on skills workshops are available for residents seeking extra income opportunities.",
        date: "August 16, 2026",
        type: "graphic",
        icon: BriefcaseBusiness,
        graphicText: ["New skills.", "New income."],
        bgClass: "bg-[#fff1e8]",
        iconColor: "text-[#c2410c]",
        textColor: "text-[#9a3412]",
        link: "/announcements/livelihood-training",
        body: [
            "Maglulunsad ang Barangay Tumana ng libreng livelihood training sessions para sa mga residenteng nais matuto ng practical skills na maaaring pagkakitaan.",
            "Kasama sa unang batch ng training ang basic food processing, dishwashing liquid making, candle making, at simple online selling orientation. Pangungunahan ito ng barangay livelihood committee kasama ang mga partner trainers mula sa lungsod.",
            "Limitado ang slots kada batch upang masiguro ang hands-on learning. Maaaring magpalista sa Barangay Hall information desk o sa livelihood committee representative sa inyong purok.",
        ],
        highlights: [
            "Training includes food processing, candle making, and online selling basics",
            "Limited slots per batch for hands-on learning",
            "Registration available at the Barangay Hall information desk",
        ],
    },
    {
        slug: "disaster-preparedness-drill",
        category: "Safety & preparedness",
        title: "Community disaster preparedness drill",
        description: "Residents are invited to join earthquake and fire safety drills for safer neighborhoods.",
        date: "August 4, 2026",
        type: "graphic",
        icon: Home,
        graphicText: ["Ready homes.", "Safer streets."],
        bgClass: "bg-[#eef2ff]",
        iconColor: "text-[#4f46e5]",
        textColor: "text-[#3730a3]",
        link: "/announcements/disaster-preparedness-drill",
        body: [
            "Magsasagawa ang Barangay Tumana ng community disaster preparedness drill bilang paghahanda sa lindol, sunog, at iba pang emergency situations.",
            "Kasama sa aktibidad ang basic evacuation procedures, emergency bag orientation, fire safety reminders, at first response demonstration. Layunin nitong tulungan ang bawat pamilya na malaman ang dapat gawin bago, habang, at pagkatapos ng sakuna.",
            "Hinihikayat ang bawat household na magpadala ng kahit isang representative. Magkakaroon din ng short briefing para sa mga purok leaders upang mas mapabilis ang coordination kapag may emergency.",
        ],
        highlights: [
            "Earthquake, fire safety, and evacuation reminders",
            "Emergency bag and first response demonstration",
            "Household representatives and purok leaders are encouraged to attend",
        ],
    },
    {
        slug: "senior-citizen-payout",
        category: "Senior citizens",
        title: "Senior citizen assistance payout schedule",
        description: "Registered senior citizens may check their assigned payout date and requirements.",
        date: "July 24, 2026",
        type: "graphic",
        icon: CalendarDays,
        graphicText: ["Clear dates.", "Smooth release."],
        bgClass: "bg-[#f7efe7]",
        iconColor: "text-[#a16207]",
        textColor: "text-[#854d0e]",
        link: "/announcements/senior-citizen-payout",
        body: [
            "Inilabas na ng barangay ang schedule para sa senior citizen assistance payout. Ang mga benepisyaryo ay pinapayuhang pumunta lamang sa kanilang assigned date upang maiwasan ang siksikan at mahabang pila.",
            "Dalhin ang senior citizen ID, barangay ID o valid ID, at payout stub kung mayroon. Para sa representative na kukuha, kailangan ang authorization letter at kopya ng ID ng senior citizen at representative.",
            "May nakahandang seating area at assistance desk para sa mga senior citizen na nangangailangan ng gabay sa proseso.",
        ],
        highlights: [
            "Follow assigned payout dates to avoid long lines",
            "Bring senior citizen ID and barangay ID or valid ID",
            "Representatives must bring authorization letter and ID copies",
        ],
    },
    {
        slug: "road-clearing-reminder",
        category: "Public order",
        title: "Road clearing and sidewalk reminder",
        description: "Residents and business owners are reminded to keep roads and sidewalks passable.",
        date: "July 12, 2026",
        type: "graphic",
        icon: ShieldCheck,
        graphicText: ["Clear paths.", "Safer travel."],
        bgClass: "bg-[#eff6ff]",
        iconColor: "text-[#0284c7]",
        textColor: "text-[#075985]",
        link: "/announcements/road-clearing-reminder",
        body: [
            "Pinapaalalahanan ang lahat ng residente at business owners na panatilihing malinis at maluwag ang mga kalsada, eskinita, at sidewalk sa Barangay Tumana.",
            "Iwasang maglagay ng permanenteng harang, paninda, sasakyan, o construction materials sa public pathways. Ang road clearing team ay magsasagawa ng regular inspection upang mapanatili ang ligtas at maayos na daloy ng tao at sasakyan.",
            "Ang kooperasyon ng bawat residente ay mahalaga upang maging mas ligtas, mas maaliwalas, at mas accessible ang ating barangay para sa lahat.",
        ],
        highlights: [
            "Keep roads, alleys, and sidewalks clear",
            "Avoid placing obstructions or materials on public pathways",
            "Regular inspections will be conducted by the road clearing team",
        ],
    },
    {
        slug: "weekend-market",
        category: "Community events",
        title: "Tumana weekend market returns",
        description: "Local vendors, home cooks, and small businesses will gather for a weekend market.",
        date: "July 1, 2026",
        type: "graphic",
        icon: BriefcaseBusiness,
        graphicText: ["Local goods.", "Community pride."],
        bgClass: "bg-[#fef7cd]",
        iconColor: "text-[#ca8a04]",
        textColor: "text-[#854d0e]",
        link: "/announcements/weekend-market",
        body: [
            "Magbabalik ang Tumana Weekend Market upang bigyan ng espasyo ang local vendors, home cooks, at small business owners na maipakilala ang kanilang produkto sa komunidad.",
            "Makikita sa weekend market ang lutong-bahay, snacks, handmade items, plants, school supplies, at iba pang produktong gawa o ibinebenta ng kapwa Tumanan.",
            "Ang mga interesadong vendor ay maaaring magpalista sa Barangay Hall. Bibigyan ng priority ang residents ng Tumana at maliliit na negosyo na nagsisimula pa lamang.",
        ],
        highlights: [
            "Open to local vendors, home cooks, and small businesses",
            "Products include food, handmade items, plants, and school supplies",
            "Interested vendors may register at the Barangay Hall",
        ],
    },
];

export const getAnnouncementBySlug = (slug?: string): Announcement | undefined =>
    announcements.find((item) => item.slug === slug);
