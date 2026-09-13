import {Outlet} from 'react-router-dom'
import Navbar from '../components/fix-layouts/Navbar'
import Footer from '../components/fix-layouts/Footer'

export default function PublicLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
