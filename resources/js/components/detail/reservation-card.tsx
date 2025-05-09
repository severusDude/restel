import { Input } from "@/components/search-reservation-input";
import { AddonList } from "@/components/detail/restel-addon-list";
import { ReservationPrice } from "@/components/detail/reservation-price";
import { TotalPrice } from "./reservation-total-price";
import { ActionButtons } from "./reservation-action-buttons";

export function ReservationCard() {
  return (
    <>
      <div className="flex-[4] bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4">
        <ReservationPrice />
    
        <form className="space-y-4">
          <Input
            type="date"
            label="Check In/Out"
            size="md"
            placeholder="Masukkan tanggal check in dan check out"
          />

          <Input
            type="text"
            label="Tamu"
            size="md"
            placeholder="2 orang dewasa, 1 anak-anak"
          />
              
          {/* Tambahan */}
          <AddonList />

          {/* Total Harga */}
          <TotalPrice time="Total (3 Malam)" total="Rp 1.250.000" />

          {/* Tombol */}
          <ActionButtons />
        </form>
      </div>
    </>
  );
}