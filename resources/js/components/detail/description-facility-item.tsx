interface InputProps {
  icon: string;
  facility: string;
  description: string;
}

export function FacilityItem({ icon, facility, description }: InputProps) {
  return (
    <>
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="text-blue-600 text-2xl mb-2">{icon}</div>
          <h4 className="font-medium text-gray-800">{facility}</h4>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
    </>
  )
}