import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Caveat, Open_Sans } from "@next/font/google";
import styles from "../styles/Home.module.css";
import hero from "../assets/hero.png";
import brush from "../assets/brush.png";
import number1 from "../assets/1.png";
import number2 from "../assets/2.png";
import number3 from "../assets/3.png";
//import { CardArticle } from "./Components/CardArticle";

const caveat = Caveat({
  weigth: ["500"],
  style: ["normal"],
  subsets: ["latin"],
});
const opensans = Open_Sans({
  weight: ["500"],
  style: ["normal"],
  subsets: ["latin"],
});

const {
  ContentHero,
  WrapperHero,
  WrapperImage,
  social,
  ContentTextHero,
  logo,
  HeaderElement,
  ContextTextHeroTitle,
  BrushStyleHero,
  BrushStyle,
  OurArticles,
  FilterArticles,
  ArticlesSection,
} = styles;

const Articles = () => {
  const [selectedFilter, setSelectedFilter] = useState('')
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(['Todos']);
  
  const handleFilter = ({ target }) => {
    const value = target.value
    
    setSelectedFilter(value)
  }
  
  const getProducts = async () => {
    const data = await fetch(`https://5eed24da4cbc340016330f0d.mockapi.io/api/articles?filter=${selectedFilter}`)
    .then(response => response.json())
    .then(data => data)

    if (filters && !filters.length) {
      const mappedCategories = data.map(product => product.category)
      const categories = ['Todos', ...new Set(mappedCategories)]
      setFilters(categories)
    }
    
    const mappedCategories = data.map(product => product.category)
    const categories = ['Todos', ...new Set(mappedCategories)]
    
    setProducts(data)
    setFilters(categories)
  }
  
  useEffect(() => {
    getProducts();
  }, [selectedFilter])
  
  return (
    <div className={ArticlesSection}>
      <aside className={[FilterArticles, opensans.className].join(" ")}>
        <ul>
          {
            filters.map(filter => (
              <li key={filter}>
                <button type="button" value={filter} onClick={handleFilter}>
                  {filter}
                </button>
              </li>
            ))
          }
        </ul>
      </aside>
      {/* <CardArticle /> */}
      
      <div className={styles.ArticlesProducts}>
      	<ol className={styles.OrderedList}>
          {
            products.map(product => (
              <li>
                <Image
                width={240}
                height={240}
                src={product.image} 
                />
                {product.title}
                {product.content}
              	{/* <CardArticle /> */ }
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={WrapperHero}>
        <div className={WrapperImage}>
          <Image
            priority
            src={hero}
            alt="Hero image"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
        </div>
        <div className={ContentHero}>
          <div className={[HeaderElement, caveat.className].join(" ")}>
            <h1 className={logo}>Logo</h1>
            <ul className={social}>
              <li>Facebok</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>

          <div className={[ContentTextHero, caveat.className].join(" ")}>
            <h2 className={ContextTextHeroTitle}>El secreto de tu cocina</h2>
            <Image
              className={BrushStyleHero}
              width={600}
              height={150}
              priority
              src={brush}
              alt="brush element"
            />
          </div>
        </div>
      </header>
      <main className="styles.MainStyle">
        <div className={[OurArticles, caveat.className].join(" ")}>
          <h3 className={styles.Centerh3}>Nuestros artículos</h3>
          <Image
            className={BrushStyle}
            width={500}
            height={100}
            priority
            src={brush}
            alt="brush element"
            style={{ opacity: 0.2 }}
          />
        </div>
        <Articles />
      </main>
    </>
  );
}
