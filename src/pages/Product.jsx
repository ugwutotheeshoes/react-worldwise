import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section className="grid max-[1024px]:inline-block">
        <img
        className="max-[1024px]:hidden"
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div className="flex flex-col items-center justify-center gap-4 mx-10 my-40">
          <h2 className="max-[1024px]:text-5xl text-7xl">About WorldWide.</h2>
          <p className="max-[1024px]:text-2xl text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p className="max-[1024px]:text-2xl text-2xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente
            sequi officiis et.
          </p>
        </div>
      </section>
    </main>
  );
}
