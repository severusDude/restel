import { ReservationCard } from "./reservation-card";
import { DescriptionCard } from "./restel-description-card";

export function MainDetail() {
  return (
    <>
      <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mt-10">
        <DescriptionCard />
        <ReservationCard />
      </main>
    </>
  )
}