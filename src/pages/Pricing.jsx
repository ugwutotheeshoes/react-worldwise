// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section className="grid max-[1024px]:inline-block">
        <div className="flex flex-col items-center justify-center gap-4 mx-10 my-40">
          <h2 className="max-[1024px]:text-5xl text-7xl">
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p className="max-[1024px]:text-2xl text-2xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img className="max-[1024px]:hidden" src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
