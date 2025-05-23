interface InputProps {
  time: string;
  total: string;

}

export function TotalPrice({ time, total }: InputProps) {
  return (
    <>
      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{time}</span>
          <span className="text-xl font-bold text-gray-800">{total}</span>
        </div>
      </div>
    </>
  )
}