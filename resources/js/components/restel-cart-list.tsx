import { CartItem } from "./restel-cart-item";

export function CardList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <CartItem hotelName="Grand Mugar" location="Mugarsari, Tasikmalaya" price="Rp.120000"  />
      <CartItem hotelName="Metro Tamansari" location="Tamansari, Tasikmalaya" price="Rp.130000"  />
      <CartItem hotelName="Metro Tamansari" location="Tamansari, Tasikmalaya" price="Rp.130000"  />
      <CartItem hotelName="Metro Tamansari" location="Tamansari, Tasikmalaya" price="Rp.130000"  />
      <CartItem hotelName="Metro Tamansari" location="Tamansari, Tasikmalaya" price="Rp.130000"  />
    </div>
  )
}