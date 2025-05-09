import { SearchReservation } from "@/components/restel-search-reservation";

export function RestelBanner() {
    return (
      <>
        <div className="relative w-3/4 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center p-10 rounded-xl shadow-lg mt-10 h-64 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">Selamat Datang di ResTel</h1>
          <p className="text-xl max-w-2xl">Temukan pengalaman menginap terbaik dengan harga spesial khusus untuk Anda!</p>

        <SearchReservation />
      </div>       
      </>
    );
}
