import Head from 'next/head'
import Weather from '../components/weather'
import WeatherProvider from '../components/weather/context'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-3xl font-bold">
          My Weather Station
        </h1>
        <WeatherProvider>
          <Weather />
        </WeatherProvider>
      </main>
    </div>
  )
}
