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
