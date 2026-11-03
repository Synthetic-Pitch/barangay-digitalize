import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export const BARANGAYS = ["Tumana", "Malanday", "Conception", "Parang", "Bayan"] as const;
export type BarangayName = (typeof BARANGAYS)[number];

const STORAGE_KEY = "barangay_site_name";

type BarangayContextValue = {
    barangay: BarangayName;
    setBarangay: (barangay: BarangayName) => void;
};

const BarangayContext = createContext<BarangayContextValue | null>(null);

const preserveCase = (match: string, replacement: string) => {
    if (match === match.toUpperCase()) return replacement.toUpperCase();
    if (match === match.toLowerCase()) return replacement.toLowerCase();
    return replacement;
};

const replaceBarangayName = (value: string, barangay: BarangayName, previousBarangay: BarangayName) => {
    const namesToReplace = ["Tumana", previousBarangay]
        .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|");
    return value.replace(new RegExp(namesToReplace, "gi"), (match) => preserveCase(match, barangay));
};

export const BarangayProvider = ({ children }: { children: ReactNode }) => {
    const [barangay, setBarangayState] = useState<BarangayName>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return BARANGAYS.includes(saved as BarangayName) ? (saved as BarangayName) : "Tumana";
    });
    const previousBarangay = useRef<BarangayName>("Tumana");

    const setBarangay = (nextBarangay: BarangayName) => {
        localStorage.setItem(STORAGE_KEY, nextBarangay);
        setBarangayState(nextBarangay);
    };

    useEffect(() => {
        // Existing pages contain their original copy. This keeps the selected name
        // consistent across every page, including announcements and form messages.
        const updateText = () => {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            const textNodes: Text[] = [];
            let node: Node | null;
            while ((node = walker.nextNode())) textNodes.push(node as Text);
            textNodes.forEach((textNode) => {
                const next = replaceBarangayName(textNode.nodeValue ?? "", barangay, previousBarangay.current);
                if (next !== textNode.nodeValue) textNode.nodeValue = next;
            });

            document.querySelectorAll<HTMLElement>("[title], [placeholder], [aria-label], [alt]").forEach((element) => {
                ["title", "placeholder", "aria-label", "alt"].forEach((attribute) => {
                    const value = element.getAttribute(attribute);
                    if (!value) return;
                    const next = replaceBarangayName(value, barangay, previousBarangay.current);
                    if (next !== value) element.setAttribute(attribute, next);
                });
            });
            document.title = replaceBarangayName(document.title, barangay, previousBarangay.current);
        };

        updateText();
        previousBarangay.current = barangay;
        const observer = new MutationObserver(updateText);
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
        return () => observer.disconnect();
    }, [barangay]);

    const value = useMemo(() => ({ barangay, setBarangay }), [barangay]);
    return <BarangayContext.Provider value={value}>{children}</BarangayContext.Provider>;
};

export const useBarangay = () => {
    const context = useContext(BarangayContext);
    if (!context) throw new Error("useBarangay must be used inside BarangayProvider");
    return context;
};
