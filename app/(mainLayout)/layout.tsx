import Navbar from '@/components/general/Navbar'
import { ReactNode } from 'react'

const MainLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-16">
        <Navbar />
        {children}
    </div>
  )
}

export default MainLayout