import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import brushTwo from "../assets/brush-2.svg";
import brush from "../assets/brush.svg";
import facebook from "../assets/facebook.svg";
import heroImage from "../assets/hero.png";
import instagram from "../assets/instagram.svg";
import logo from "../assets/logo.svg";
import youtube from "../assets/youtube.svg";
import hero from "../styles/Hero.module.css";
import styles from "../styles/Home.module.css";
import navbar from "../styles/Navbar.module.css";
import { CardArticle } from "./Components/CardArticle";

// Navbar styles
const { NavSection, Nav, NavList, NavItem, NavLink } = navbar;

// Hero styles
const {
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroBrush,
  HeroBackground,
  HeroVeil,
} = hero;

const {
  ArticlesBrush,
  ArticlesFlexible,
  ArticlesList,
  ArticlesSection,
  ArticlesTitle,
  ArticlesWrapper,
  ContactBrush,
  ContactSection,
  ContactTitle,
  ContactWrapper,
  Container,
  FilterArticles,
  FormButton,
  FormContent,
  FormGroup,
  FormInput,
  FormInternal,
  FormInternalStyle,
  FormLabel,
  FormStyles,
  SelectedFilter,
} = styles;

const Header = ({ children }) => {
  return <header>{children}</header>;
};

const Main = ({ children }) => {
  return <main>{children}</main>;
};

const Navbar = () => {
  const links = [
    {
      link: "https://www.facebook.com/",
      logo: facebook,
      color: "#009cd9",
    },
    {
      link: "https://www.instagram.com/",
      logo: instagram,
      color: "#b72c2c",
    },
    {
      link: "https://www.youtube.com/",
      logo: youtube,
      color: "#d8ad3d",
    },
  ];

  return (
    <div className={NavSection}>
      <div className={Container}>
        <nav className={Nav}>
          <Link href="/">
            <Image src={logo} alt="Logo" quality={100} />
          </Link>

          <ul className={NavList}>
            {links.map((link) => (
              <li className={NavItem} style={{ borderColor: link.color }}>
                <a href={link.link} target="_blank" className={NavLink}>
                  <Image
                    src={
                      link.logo ? link.logo : "https://via.placeholder.com/150"
                    }
                    alt="Logo"
                    quality={100}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className={HeroSection}>
      <div className={HeroContent}>
        <div className={Container}>
          <h1 className={HeroTitle}>El secreto de tu cocina</h1>
        </div>
        <Image src={brush} alt="Brush" className={HeroBrush} />
      </div>
      <Image src={heroImage} alt="Fondo" className={HeroBackground} />
      <div className={HeroVeil} />
    </section>
  );
};

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
        <div className={ArticlesWrapper}>
          <h2 className={ArticlesTitle}>Nuestros artículos</h2>
          <Image src={brushTwo} alt="Pintura" className={ArticlesBrush} />
        </div>
        <div className={ArticlesFlexible}>
          <aside className={FilterArticles}>
            <ul className={ArticlesList}>
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
        <div className={ContactWrapper}>
          <h2 className={ContactTitle}>Contáctanos</h2>
          <Image src={brushTwo} alt="Pintura" className={ContactBrush} />
        </div>
        <div className={FormStyles}>
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

      <Header>
        <Navbar />
        <Hero />
      </Header>

      <Main>
        <Articles />
        <Form />
      </Main>

      {/* <main className={styles.MainStyle}>
        <div className={OurArticles}>
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
      </main> */}
    </>
  );
}
