import { formatRupiah } from '@/helpers/currency';

export function ReservationPrice({ price }: { price: number }) {
  return (
    <>
      <div className="mb-4">
        <h4 className="text-2xl font-bold text-gray-800">{formatRupiah(price)}<span className="text-base font-normal text-gray-500">/malam</span></h4>
        <p className="text-sm text-gray-500">Termasuk pajak & fasilitas</p>
      </div>
    </>
  )
}
  