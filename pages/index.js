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
import { CardArticle } from "./CardArticle";

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
  ArticlesFlexible,
  ArticlesSection,
  BrushStyle,
  BrushStyleHero,
  ContactFormStyle,
  ContactSection,
  Container,
  ContentHero,
  ContentTextHero,
  ContextTextHeroTitle,
  FilterArticles,
  FormButton,
  FormContent,
  FormGroup,
  FormInput,
  FormInternal,
  FormInternalStyle,
  FormLabel,
  FormStyles,
  HeaderElement,
  HeroBackground,
  logo,
  OurArticles,
  SelectedFilter,
  social,
  WrapperHero,
  WrapperHeroVeil,
} = styles;

const Articles = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);

  const handleFilter = ({ target }) => {
    const value = target.value;

    setSelectedFilter(value);
  };

  const getProducts = async () => {
    const data = await fetch(
      `https://5eed24da4cbc340016330f0d.mockapi.io/api/articles?filter=${selectedFilter}`
    )
      .then((response) => response.json())
      .then((data) => data);

    if (filters && !filters.length) {
      const mappedCategories = data.map((product) => product.category);
      const categories = [...new Set(mappedCategories)];
      setFilters(categories);
    }

    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, [selectedFilter]);

  return (
    <section className={ArticlesSection}>
      <div className={Container}>
        <div className={ArticlesFlexible}>
          <aside className={FilterArticles}>
            <ul>
              <li className={selectedFilter === "" ? SelectedFilter : null}>
                <button type="button" value="" onClick={handleFilter}>
                  Todos
                </button>
              </li>
              {filters.map((filter) => (
                <li
                  key={filter}
                  className={selectedFilter === filter ? SelectedFilter : null}
                >
                  <button type="button" value={filter} onClick={handleFilter}>
                    {filter}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <div className={styles.ArticlesProducts}>
            <ol className={styles.OrderedList}>
              {products.map((product) => (
                <li>
                  <CardArticle product={product} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

const Form = () => {
  return (
    <section className={ContactSection}>
      <div className={Container}>
        <div className={[FormStyles, caveat.className].join(" ")}>
          <h3 className={ContactFormStyle}>Contáctanos</h3>
          <Image
            className={BrushStyle}
            width={500}
            height={100}
            priority
            src={brush}
            alt="brush element"
            style={{ opacity: 0.25 }}
          />
          <div className={FormContent}>
            <form
              className={FormInternal}
              action="https://5eed24da4cbc340016330f0d.mockapi.io/api/newsletter"
              method="post"
            >
              <div className={FormInternalStyle}>
                <div className={FormGroup}>
                  <label for="firstname" className={FormLabel}>
                    NOMBRE
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className={FormInput}
                    required
                  />
                </div>
                <div className={FormGroup}>
                  <label for="lastname" className={FormLabel}>
                    APELLIDO
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    className={FormInput}
                    required
                  />
                </div>
                <div className={FormGroup}>
                  <label for="email" className={FormLabel}>
                    MAIL
                  </label>
                  <input
                    type="email"
                    id="mail"
                    className={FormInput}
                    required
                  />
                </div>
                <div className={FormGroup}>
                  <label for="phone" className={FormLabel}>
                    TELEFONO
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    className={FormInput}
                    required
                  />
                </div>
              </div>
              <button type="submit" className={FormButton}>
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Open+Sans&display=swap"
        />
      </Head>
      <header className={WrapperHero}>
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
        <Image
          priority
          src={hero}
          alt="Hero image"
          className={HeroBackground}
        />
        <div className={WrapperHeroVeil}></div>
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
        <Form />
      </main>
    </>
  );
}
