import Image from "next/image";

export const CardArticle = ({ product }) => {
  const { image, title, content, url } = product;

  return (
    <article className={styles.card}>
      <div className={styles.picture}>
        <Image
          src={image}
          alt={title}
          width={270}
          height={204}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        <p className={styles.description}>{content}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Ver más
        </a>
      </div>
    </article>
  );
};
