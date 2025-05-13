export function ActionButtons() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <button type="button" className="px-6 py-3 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center justify-center">
            <span className="mr-2">💳</span> Metode Pembayaran
        </button>
        <button type="button" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center">
          <span className="mr-2">✓</span> Reservasi
        </button>
      </div>
    </>
  )
}