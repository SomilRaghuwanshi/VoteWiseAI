import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Candidate,
  MOCK_CANDIDATES,
  RecentSearchItem,
  SearchFilterType,
  SearchSuggestionItem,
} from "@/data/mockCandidates";

const RECENT_SEARCHES_KEY = "votewise_recent_searches";
const MAX_RECENT_SEARCHES = 5;

interface UseSearchOptions {
  initialFilter?: SearchFilterType;
  onSelectCandidate?: (candidate: Candidate) => void;
  onSelectQuery?: (query: string) => void;
}

export function useSearch({
  initialFilter = "All",
  onSelectCandidate,
  onSelectQuery,
}: UseSearchOptions = {}) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<SearchFilterType>(initialFilter);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, MAX_RECENT_SEARCHES);
        }
      }
    } catch {
      // LocalStorage unavailable
    }
    return [];
  });

  // Sync recent searches to localStorage
  const addRecentSearch = useCallback(
    (item: Omit<RecentSearchItem, "id" | "timestamp">) => {
      const newItem: RecentSearchItem = {
        ...item,
        id: item.candidateId || `query-${item.query.toLowerCase().trim()}`,
        timestamp: Date.now(),
      };

      setRecentSearches((prev) => {
        const filtered = prev.filter(
          (r) =>
            r.id !== newItem.id &&
            r.query.toLowerCase().trim() !== newItem.query.toLowerCase().trim()
        );
        const updated = [newItem, ...filtered].slice(0, MAX_RECENT_SEARCHES);
        try {
          localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
        } catch {
          // Ignore write errors
        }
        return updated;
      });
    },
    []
  );

  const removeRecentSearch = useCallback((id: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const clearQuery = useCallback(() => {
    setQuery("");
    setSelectedIndex(-1);
  }, []);

  // Filter candidate results according to search term and filter chip
  const filteredCandidates = useMemo(() => {
    const q = query.trim().toLowerCase();

    return MOCK_CANDIDATES.filter((candidate) => {
      // If query is empty, respect filter
      if (!q) {
        return true;
      }

      switch (activeFilter) {
        case "Candidate":
          return candidate.name.toLowerCase().includes(q);

        case "Party":
          return (
            candidate.party.toLowerCase().includes(q) ||
            candidate.partyShort.toLowerCase().includes(q)
          );

        case "Constituency":
          return candidate.constituency.toLowerCase().includes(q);

        case "State":
          return candidate.state.toLowerCase().includes(q);

        case "Education":
          return candidate.education.toLowerCase().includes(q);

        case "Profession":
          return candidate.profession.toLowerCase().includes(q);

        case "All":
        default:
          return (
            candidate.name.toLowerCase().includes(q) ||
            candidate.party.toLowerCase().includes(q) ||
            candidate.partyShort.toLowerCase().includes(q) ||
            candidate.constituency.toLowerCase().includes(q) ||
            candidate.state.toLowerCase().includes(q) ||
            candidate.education.toLowerCase().includes(q) ||
            candidate.profession.toLowerCase().includes(q)
          );
      }
    });
  }, [query, activeFilter]);

  // Generate live autocomplete suggestions based on current typing
  const suggestions = useMemo<SearchSuggestionItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchSuggestionItem[] = [];
    const seen = new Set<string>();

    // 1. Candidate Name Suggestions (highest priority)
    // Starts with takes precedence, followed by contains
    const nameMatches = MOCK_CANDIDATES.filter((c) =>
      c.name.toLowerCase().includes(q)
    ).sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q);
      const bStarts = b.name.toLowerCase().startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

    for (const c of nameMatches) {
      if (!seen.has(c.name)) {
        seen.add(c.name);
        results.push({
          id: `cand-${c.id}`,
          text: c.name,
          subtext: `${c.partyShort} · ${c.constituency}, ${c.state}`,
          type: "Candidate",
          candidateId: c.id,
        });
      }
      if (results.length >= 6) break;
    }

    // 2. Party suggestions
    if (activeFilter === "All" || activeFilter === "Party") {
      for (const c of MOCK_CANDIDATES) {
        if (
          (c.party.toLowerCase().includes(q) ||
            c.partyShort.toLowerCase().includes(q)) &&
          !seen.has(c.party)
        ) {
          seen.add(c.party);
          results.push({
            id: `party-${c.partyShort}`,
            text: c.party,
            subtext: `Party · ${c.partyShort}`,
            type: "Party",
          });
        }
        if (results.length >= 8) break;
      }
    }

    // 3. Constituency suggestions
    if (activeFilter === "All" || activeFilter === "Constituency") {
      for (const c of MOCK_CANDIDATES) {
        if (c.constituency.toLowerCase().includes(q) && !seen.has(c.constituency)) {
          seen.add(c.constituency);
          results.push({
            id: `const-${c.constituency}`,
            text: c.constituency,
            subtext: `Constituency · ${c.state}`,
            type: "Constituency",
          });
        }
        if (results.length >= 10) break;
      }
    }

    // 4. Profession suggestions
    if (activeFilter === "All" || activeFilter === "Profession") {
      for (const c of MOCK_CANDIDATES) {
        if (c.profession.toLowerCase().includes(q) && !seen.has(c.profession)) {
          seen.add(c.profession);
          results.push({
            id: `prof-${c.profession}`,
            text: c.profession,
            subtext: "Profession",
            type: "Profession",
          });
        }
        if (results.length >= 12) break;
      }
    }

    return results.slice(0, 8);
  }, [query, activeFilter]);

  // Reset selected keyboard index when query or filter changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query, activeFilter]);

  // Total navigable items in the active dropdown (suggestions or filtered candidates)
  const navigableCount = query.trim().length > 0 ? suggestions.length : 0;

  // Keyboard navigation handler (ArrowUp, ArrowDown, Enter, Escape)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFocused(false);
        setSelectedIndex(-1);
        (e.target as HTMLElement)?.blur();
        return;
      }

      if (navigableCount === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < navigableCount - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : navigableCount - 1));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < navigableCount) {
          e.preventDefault();
          const selected = suggestions[selectedIndex];
          if (selected) {
            if (selected.candidateId) {
              const cand = MOCK_CANDIDATES.find((c) => c.id === selected.candidateId);
              if (cand) {
                addRecentSearch({
                  query: cand.name,
                  candidateId: cand.id,
                  candidateName: cand.name,
                  party: cand.partyShort,
                  constituency: cand.constituency,
                });
                onSelectCandidate?.(cand);
              }
            } else {
              setQuery(selected.text);
              addRecentSearch({ query: selected.text });
              onSelectQuery?.(selected.text);
            }
            setIsFocused(false);
          }
        }
      }
    },
    [
      navigableCount,
      selectedIndex,
      suggestions,
      addRecentSearch,
      onSelectCandidate,
      onSelectQuery,
    ]
  );

  return {
    query,
    setQuery,
    clearQuery,
    activeFilter,
    setActiveFilter,
    isFocused,
    setIsFocused,
    selectedIndex,
    setSelectedIndex,
    suggestions,
    filteredCandidates,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    handleKeyDown,
  };
}
