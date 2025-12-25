export const metadata = {
  title: 'پنل مدیریت',
  description: 'ساخته شده با Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}