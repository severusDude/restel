import { formatRupiah } from '@/helpers/currency';

interface InputProps {
  time: string;
  total: number;
}

export function TotalPrice({ time, total }: InputProps) {
  return (
    <>
      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{time}</span>
          <span className="text-xl font-bold text-gray-800">{formatRupiah(total)}</span>
        </div>
      </div>
    </>
  )
}