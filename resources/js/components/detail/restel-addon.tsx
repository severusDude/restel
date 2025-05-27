interface InputProps {
  item: string;
  icon: string;
}

export function Addon({ item, icon }: InputProps) {
  return (
    <>
      <button type="button" data-option="extra_bed" className="px-3 py-2 border border-blue-100 rounded-lg text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition text-sm flex items-center tambahan-btn">
        <span className="mr-1">{ icon }</span> {item}
      </button>
    </>
  )
}