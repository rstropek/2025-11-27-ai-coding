import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Card from '@/components/Card';
import styles from './page.module.css';

export default function Home() {
  const breadcrumbItems = [
    { label: 'Startseite', href: '/' },
    { label: 'Fahrräder', href: '/bikes' },
    { label: 'Mountainbikes' },
  ];

  const bikesOnSale = [
    { id: 10, title: 'Trail Hardtail 29', category: 'Mountainbikes', description: 'Perfect beginner mountainbike with 29-inch wheels and high-quality suspension fork. Ideal for tours and light trails.' },
    { id: 20, title: 'Enduro Full Suspension', category: 'Mountainbikes', description: 'Fully suspended enduro bike for challenging trails and downhill passages. With the latest technology in suspension systems.' },
    { id: 30, title: 'Cross Country Race', category: 'Mountainbikes', description: 'Light and agile XC-race bike for marathon riders and competition enthusiasts. Optimized for speed and efficiency.' },
    { id: 40, title: 'City Cruiser', category: 'Citybikes', description: 'Light and robust city bike for city tours and everyday use. Ideal as a replacement for the car in the city.' },
    { id: 50, title: 'E-Bike', category: 'E-Bikes', description: 'Electric mountainbike with the latest technology in suspension systems and high range. Ideal for tours and light trails.' },
    { id: 60, title: 'Rennrad', category: 'Rennräder', description: 'Light and agile race bike for competitions and training. Optimized for speed and efficiency.' },
    { id: 70, title: 'BMX', category: 'BMX', description: 'BMX bike for freestyle rides and tricksets. Ideal for BMX fans and freestyle enthusiasts.' },
    { id: 80, title: 'Gravel Bike', category: 'Gravel Bikes', description: 'Gravel bike for tours and adventures. Ideal for tours and light trails.' },
    { id: 90, title: 'E-Bike', category: 'E-Bikes', description: 'Electric mountainbike with the latest technology in suspension systems and high range. Ideal for tours and light trails.' },
    { id: 100, title: 'Rennrad', category: 'Rennräder', description: 'Light and agile race bike for competitions and training. Optimized for speed and efficiency.' },
  ];

  const bikesOnSalePrices = [
    { id: 10, price: 1000 },
    { id: 20, price: 1500 },
    { id: 30, price: 2000 },
    { id: 40, price: 2500 },
    { id: 50, price: 3000 },
    { id: 60, price: 3500 },
    { id: 70, price: 4000 },
    { id: 80, price: 4500 },
    { id: 90, price: 5000 },
    { id: 100, price: 5500 },
  ];

  const salesBikesCombined = bikesOnSale.map(bike => {
    const priceInfo = bikesOnSalePrices.find(price => price.id === bike.id);
    return { ...bike, price: priceInfo ? priceInfo.price : null };
  });

  return (
    <div className={styles.page}>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Mountainbikes</h1>
          <p>
            Entdecken Sie unsere große Auswahl an hochwertigen Mountainbikes für jedes Gelände. 
            Ob Sie anspruchsvolle Trails bezwingen oder entspannte Touren durch die Natur genießen möchten - 
            bei uns finden Sie das perfekte Bike für Ihre Bedürfnisse. Unsere Experten beraten Sie gerne 
            bei der Auswahl des richtigen Modells und der optimalen Ausstattung. Von Hardtails für 
            Einsteiger bis zu vollgefederten Enduros für erfahrene Biker bieten wir Ihnen Top-Marken 
            und neueste Technologien. Profitieren Sie von unserem umfassenden Service, der von der 
            professionellen Beratung über die individuelle Anpassung bis hin zur regelmäßigen Wartung 
            alles umfasst. Erleben Sie Fahrspaß auf höchstem Niveau!
          </p>
        </section>

        <section className={styles.searchSection}>
          <h2>Finden Sie Ihr perfektes Bike</h2>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Modell oder Kategorie suchen (z.B. E-Bike, Rennrad, MTB)"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>Suchen</button>
          </div>
        </section>

        <section className={styles.results}>
          <div className={styles.cardGrid}>
            <Card
              title="Trail Hardtail 29"
              category="Mountainbikes"
              description="Perfektes Einsteiger-Mountainbike mit 29-Zoll-Laufrädern und hochwertiger Federgabel. Ideal für Touren und leichte Trails."
            />
            <Card
              title="Enduro Full Suspension"
              category="Mountainbikes"
              description="Vollgefedertes Enduro-Bike für anspruchsvolle Trails und Downhill-Passagen. Mit modernster Fahrwerkstechnologie."
            />
            <Card
              title="Cross Country Race"
              category="Mountainbikes"
              description="Leichtes und agiles XC-Rennrad für Marathon-Fahrer und Wettkampf-Enthusiasten. Optimiert für Geschwindigkeit und Effizienz."
            />
          </div>
        </section>

      </main>
    </div>
  );
}
