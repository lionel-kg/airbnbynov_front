import Head from 'next/head'
import Image from 'next/image'
import TitlePage from "../component/TitlePage"

export default function Home() {
  return (
    <main className='page'>
      <TitlePage title={"Home"}/>
    </main>
  )
}
