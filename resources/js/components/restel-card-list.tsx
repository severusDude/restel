import { CardItem } from "./restel-card-item";

type Props = {
  rooms: any[]; // sementara pakai any
};



export function CardList({ rooms } : Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

      {rooms.map((room, index) => (
        <CardItem hotelName={ room.name } slug={room.slug} location={room.location} price={room.price}  />
      ))}
      
    </div>
  )
}