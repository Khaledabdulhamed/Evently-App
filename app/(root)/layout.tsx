import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </html>
    )
  }