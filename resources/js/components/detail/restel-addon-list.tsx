import { Addon } from "./restel-addon";

export function AddonList() {
  return (
    <>
      <div>
        <label className="block text-gray-700 font-medium mb-2 text-sm">Tambahan</label>
        <div className="flex flex-wrap gap-2 mb-3">
          <Addon item="+Kasur" icon="🛏️" />
          <Addon item="+Bantal" icon="🛏️" />
          <Addon item="+Spa" icon="💆" />
          <Addon item="+Sarapan" icon="🍳" />
        </div>
              
        {/* Selected options display */}
        <div id="selectedTambahan" className="hidden bg-gray-50 rounded-lg p-3 mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Tambahan yang dipilih:</h4>
          <ul id="tambahanList" className="space-y-2">
            {/* Selected options will appear here */}
          </ul>
        </div>
              
        {/* Hidden input field to store selected options */}
        <input type="hidden" id="tambahanInput" name="tambahan" value="" />
      </div>
    </>
  ) 
}