import { FilterCard } from "@/components/search/restel-filter-card";
import { ResultCard } from "./restel-result-card";

export function MainSearch() {
  return (
    <>
      <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6 mt-6 md:mt-10 px-4">
        <FilterCard />
        <ResultCard />
      </main>
    </>
  ) 
}