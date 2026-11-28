import React from "react";
import {
  SearchBar as EnhancedSearchBar,
  SearchBarProps as EnhancedSearchBarProps,
} from "./search/SearchBar";

export interface SearchBarProps extends EnhancedSearchBarProps {
  showSuggestions?: boolean;
}

/**
 * Centered AI-style search bar component powered by the Phase 2
 * Smart Candidate Search architecture in @/components/search.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  className,
  onSelectCandidate,
  showFilters = true,
  showResultsInline = false,
  placeholder,
}) => {
  return (
    <EnhancedSearchBar
      className={className}
      onSelectCandidate={onSelectCandidate}
      showFilters={showFilters}
      showResultsInline={showResultsInline}
      placeholder={placeholder}
    />
  );
};

export default SearchBar;
