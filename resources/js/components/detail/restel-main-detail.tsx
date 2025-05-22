import { ReservationCard } from "./reservation-card";
import { DescriptionCard } from "./restel-description-card";

export function MainDetail({ room, rating } : any) {
  return (
    <>
      <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mt-10">
        <DescriptionCard room={room} rating={rating} />
        <ReservationCard />
      </main>
    </>
  )
}