import { ListRoomInterior } from '@/components/detail/restel-list-room-interior'
import { MainDetail } from '@/components/detail/restel-main-detail'
import { Footer } from '@/components/restel-footer'
import { Header } from '@/components/restel-header'

export default function Detail() {
  return (
    <>
      <Header />
      <ListRoomInterior />
      <MainDetail />
      <Footer />
    </>
  )
}